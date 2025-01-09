const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(__dirname, '../data/users.json');

class User {
  static async initDB() {
    try {
      await fs.access(DB_PATH);
      // Check if there are any users, if not create admin
      const users = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
      if (users.length === 0) {
        await this.create({
          username: 'admin',
          password: 'admin123',
          role: 'admin'
        });
      }
    } catch {
      await fs.writeFile(DB_PATH, JSON.stringify([]));
    }
  }

  static async findByUsername(username) {
    const users = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    return users.find(user => user.username === username);
  }

  static async create(userData) {
    const users = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = {
      id: uuidv4(),
      username: userData.username,
      password: hashedPassword,
      role: userData.role || 'developer',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
    
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  static async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
}

User.initDB();

module.exports = User;