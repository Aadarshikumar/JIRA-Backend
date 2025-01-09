const Project = require('../models/Project');

class ProjectPresenter {
  static async createProject(projectData, userId) {
    try {
      const project = await Project.create({
        ...projectData,
        teamMembers: [userId]
      });
      return project;
    } catch (error) {
      throw error;
    }
  }

  static async updateProject(id, updateData, userId) {
    try {
      const project = await Project.findById(id);
      if (!project) {
        throw new Error('Project not found');
      }

      if (!project.teamMembers.includes(userId)) {
        throw new Error('Unauthorized');
      }

      const updatedProject = await Project.update(id, updateData);
      return updatedProject;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProject(id, userId) {
    try {
      const project = await Project.findById(id);
      if (!project) {
        throw new Error('Project not found');
      }

      if (!project.teamMembers.includes(userId)) {
        throw new Error('Unauthorized');
      }

      await Project.delete(id);
      return { message: 'Project deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProjectPresenter;