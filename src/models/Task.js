const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(__dirname, '../data/tasks.json');

class Task {
  static async initDB() {
    try {
      await fs.access(DB_PATH);
    } catch {
      await fs.writeFile(DB_PATH, JSON.stringify([]));
    }
  }

  static async create(taskData) {
    const tasks = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      projectId: taskData.projectId,
      assignee: taskData.assignee,
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2));
    return newTask;
  }

  static async findByProjectId(projectId) {
    const tasks = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    return tasks.filter(task => task.projectId === projectId);
  }

  static async updateStatus(id, status) {
    const tasks = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) return null;
    
    tasks[index].status = status;
    await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2));
    return tasks[index];
  }
}

Task.initDB();

module.exports = Task;