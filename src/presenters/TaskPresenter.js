const Task = require('../models/Task');
const axios = require('axios');
require('dotenv').config();

class TaskPresenter {
  static async generateTaskTitle(taskTitle) {
    const apiKey = process.env.ROUTER_API_KEY; // Replace with your actual API key

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/completions', // OpenRouter endpoint
        {
          model: 'gpt-3.5-turbo', // Use the desired model
          prompt: `Suggest a 50 word description for the task title: "${taskTitle}"`,
          max_tokens: 100, // Adjust token limit as needed
          temperature: 0.7, // Controls creativity
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`, // Use your API key here
            'Content-Type': 'application/json',
          },
        }
      );

      const generatedTitle = response.data.choices[0]?.text.trim();
      return generatedTitle || taskTitle; // Fallback to original title if API fails
    } catch (error) {
      console.error('Error generating task title:', error.response?.data || error.message);
      return taskTitle; // Fallback to original title if an error occurs
    }
  }

  static async createTask(taskData, userId) {
    try {
      // Generate the task title using OpenRouter API
      const generatedTitle = await TaskPresenter.generateTaskTitle(taskData.title);

      // Create the task with the generated title
      const task = await Task.create({
        ...taskData,
        title: taskData.title, // Use the generated title
        description: generatedTitle,
        assignee: taskData.assignee || userId,
      });

      console.log('Task createdAAA:', task);
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