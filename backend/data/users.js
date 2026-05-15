const users = [
  {
    id: 1,
    email: 'admin@hcmut.edu.vn',
    password: 'admin123', // In real app, hash this
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: 2,
    email: 'user@hcmut.edu.vn',
    password: 'user123',
    role: 'user',
    name: 'Regular User'
  },
  {
    id: 3,
    email: 'staff@hcmut.edu.vn',
    password: 'staff123',
    role: 'staff',
    name: 'Staff Member'
  }
];

module.exports = users;