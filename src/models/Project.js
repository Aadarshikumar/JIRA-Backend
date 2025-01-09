const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(__dirname, '../data/projects.json');

class Project {
  static async initDB() {
    try {
      await fs.access(DB_PATH);
    } catch {
      await fs.writeFile(DB_PATH, JSON.stringify([]));
    }
  }

  static async create(projectData) {
    const projects = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    
    const newProject = {
      id: uuidv4(),
      name: projectData.name,
      description: projectData.description,
      teamMembers: projectData.teamMembers || [],
      status: 'active',
      createdAt: new Date().toISOString(),
      tasks: [],
      tickets: []
    };

    projects.push(newProject);
    await fs.writeFile(DB_PATH, JSON.stringify(projects, null, 2));
    return newProject;
  }

  static async findById(id) {
    const projects = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    return projects.find(project => project.id === id);
  }

  static async update(id, updateData) {
    const projects = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    const index = projects.findIndex(project => project.id === id);
    
    if (index === -1) return null;
    
    projects[index] = { ...projects[index], ...updateData };
    await fs.writeFile(DB_PATH, JSON.stringify(projects, null, 2));
    return projects[index];
  }

  static async delete(id) {
    const projects = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    const filteredProjects = projects.filter(project => project.id !== id);
    await fs.writeFile(DB_PATH, JSON.stringify(filteredProjects, null, 2));
  }
}

Project.initDB();

module.exports = Project;