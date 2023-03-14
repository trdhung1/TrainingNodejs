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
const updateRole = userList => {
  const newList = userList.map(user => {
    const { position } = user;
    let role = 'Junior';
    switch (position) {
      case 'Senior':
        role = 'Admin';
        break;
      case 'Fresher':
        role = 'HR';
      default:
        break;
    }
    return { ...user, role };
  });
  return newList;
};
// console.log(updateRole(userList));
const handleString5 = input => {
  const output = input.replaceAll(' ', ' Văn ');
  return output;
};
// console.log(handleString5('Nguyễn A'));
const handleString6 = input => {
  const output = `${input} Fresher`;
  return output;
};
// console.log(handleString6('Nguyễn Văn A'));
const handleString7 = input => {
  const output = input.replaceAll(' ', '-');
  return output;
};
// console.log(handleString7('Nguyễn Văn A'));
// const handlePromise = async url => {
//   const response = await fetch(url);
//   const result = await response.json();
//   return result;
// };

module.exports = { updateRole };
