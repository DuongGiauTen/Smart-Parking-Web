const users = require('../data/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key'; // In real app, use env var

class AuthService {
  async login(email, password) {
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    // For mock, compare plain text. In real, use bcrypt.compare
    if (password !== user.password) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    return { user: { id: user.id, email: user.email, role: user.role, name: user.name }, token };
  }

  async getCurrentUser(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = users.find(u => u.id === decoded.id);
      if (!user) throw new Error('User not found');
      return { id: user.id, email: user.email, role: user.role, name: user.name };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

module.exports = new AuthService();