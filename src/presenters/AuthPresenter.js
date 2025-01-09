const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class AuthPresenter {
  static async register(userData) {
    try {
      const existingUser = await User.findByUsername(userData.username);
      if (existingUser) {
        throw new Error('Username already exists');
      }

      const user = await User.create(userData);
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
      
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  static async login(credentials) {
    try {
      const user = await User.findByUsername(credentials.username);
      if (!user) {
        throw new Error('User not found');
      }

      const isValid = await User.validatePassword(user, credentials.password);
      if (!isValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
      const { password, ...userWithoutPassword } = user;
      
      return { user: userWithoutPassword, token };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthPresenter;