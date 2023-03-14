require('dotenv').config();
const jwt = require('jsonwebtoken');

const userList = [
  {
    id: 1,
    fullName: 'Nguyen Minh Hoang',
    userName: 'Hoang',
    position: 'Fresher',
    password: '123456',
  },
  {
    id: 2,
    fullName: 'Pham Minh Meo',
    userName: 'Meo',
    position: 'Junior',
    password: '123456',
  },
  {
    id: 3,
    fullName: 'Pham Tuan Minh',
    userName: 'Minh',
    position: 'Senior',
    password: '123456',
  },
  {
    id: 4,
    fullName: 'Vu Duc Vuong',
    userName: 'Vuong',
    position: 'Senior',
    password: '123456',
  },
];

class AuthController {
  login(req, res) {
    const { userName, password } = req.body;
    const user = userList.find(user => {
      return user.userName === userName && user.password === password;
    });
    if (!user) {
      res.json('Account invalid');
      return;
    }
    const accessToken = jwt.sign(
      {
        data: {
          id: user.id,
          userName: user.userName,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ accessToken });
  }
}
module.exports = new AuthController();
