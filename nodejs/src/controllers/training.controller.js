const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { updateRole } = require('../utils/app');

let userList = [
  {
    id: 1,
    fullName: 'Nguyen Minh Hoang',
    userName: 'Hoang',
    position: 'Fresher',
  },
  { id: 2, fullName: 'Pham Minh Meo', userName: 'Meo', position: 'Junior' },
  { id: 3, fullName: 'Pham Tuan Minh', userName: 'Minh', position: 'Senior' },
  { id: 4, fullName: 'Vu Duc Vuong', userName: 'Vuong', position: 'Senior' },
];
class TrainingController {
  getUser(req, res) {
    res.json(userList);
  }
  createUser(req, res) {
    const newUser = req.body;
    userList.push(newUser);
    res.json(userList);
  }
  updateUser(req, res) {
    const updateUser = req.body;
    const newList = userList.map(user => {
      if (user.id !== updateUser.id) {
        return user;
      }
      return updateUser;
    });
    userList = newList;
    res.json(newList);
  }
  updateRole(req, res) {
    res.json(updateRole(userList));
  }
  deleteUser(req, res) {
    const { id } = req.body;
    const newList = userList.filter(user => user.id !== id);
    userList = newList;
    res.json(newList);
  }
  async fetchData(req, res) {
    const { url } = req.query;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    res.json(data);
  }
}
module.exports = new TrainingController();
