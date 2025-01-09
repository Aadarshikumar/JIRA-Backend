const Task = require('../models/Task');

class TaskPresenter {
  static async createTask(taskData, userId) {
    try {
      const task = await Task.create({
        ...taskData,
        assignee: taskData.assignee || userId
      });
      return task;
    } catch (error) {
      throw error;
    }
  }

  static async getProjectTasks(projectId) {
    try {
      const tasks = await Task.findByProjectId(projectId);
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  static async updateTaskStatus(taskId, status) {
    try {
      const task = await Task.updateStatus(taskId, status);
      if (!task) {
        throw new Error('Task not found');
      }
      return task;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TaskPresenter;