const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('crypto').randomBytes(64).toString('hex')
const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
var users = [
    {
        "id": 1,
        "fullName": "Nguyen Minh Hoang",
        "userName": "Hoang",
        "position": "Fresher",
        "role": ""
    },
    {
        "id": 2,
        "fullName": "Pham Minh Meo",
        "userName": "Meo",
        "position": "Junior",
        "role": ""
    },
    {
        "id": 3,
        "fullName": "Pham Tuan Minh",
        "userName": "Minh",
        "position": "Senior",
        "role": ""
    },
    {
        "id": 4,
        "fullName": "Vu Duc Vuong",
        "userName": "Vuong",
        "position": "Senior",
        "role": ""
    },
]
var Password = [
    {
        "password": "1234567",

    }
]
for (var i = 0; i < users.length; i++) {
    switch (users[i].position) {
        case 'Senior':
            users[i].role = "Admin";
            break;
        case 'Fresher':
            users[i].role = "Hr";
            break;
        default:
            users[i].role = "Junior";
            break;
    }
}

app.get('/data1', (req, res) => {
    const endpoint = 'https://dummyjson.com/products/1';

    fetch(endpoint)
        .then((response) => response.json())
        .then((data) => res.send(data));
});
app.get('/data2', async function (req, res) {
    const url = "https://dummyjson.com/products/1";

    const response = await fetch(url);
    const data = await response.json();
    res.send(data)
})
app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/pass', (req, res) => {
    res.send(Password);
});
app.get('/users/str1', (req, res) => {

    let str = "Vũ Vượng"
    let result = str.split('');
    result.splice(2, 0, " Đức");
    result = result.join('')
    res.send(result)


})
app.get('/users/str2', (req, res) => {
    let str = "Vũ Đức Vượng"
    let result = str.concat(" ", "Fresher")
    res.send(result)
})

app.get('/users/:id', (req, res) => {

    let user = users.find((user) => {
        return user.id == parseInt(req.params.id);
    });

    res.send(user)
})
app.get('/users/find/:position', (req, res) => {
    let position_search = req.params;

    let result = users.filter((user) => user.position.toLowerCase().indexOf(position_search.position.toLowerCase()) !== -1)

    res.send(result)

})

app.post('/users', (req, res) => {
    users.push(req.body);
    res.redirect('/users')
})
function generateAccessToken(password) {
    return jwt.sign(password, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
app.post('/users/password', (req, res) => {
    const token = generateAccessToken({ password: req.body.password });
    let p = Password.find((p) => {
        return p.password == parseInt(req.body.password);
    });
    if (p != null) {
        res.send('password already exists')
    }
    else Password.push(req.body)
    res.json(token);
})

app.put('/users/:id', function (req, res) {
    let user = users.findIndex((user) => {
        return user.id == parseInt(req.params.id);
    });

    users.splice(user, 1);
    users.push(req.body);
    res.redirect('/users')
}
)

app.patch('/users/:id', function (req, res) {
    let user = users.findIndex((user) => {
        return user.id == parseInt(req.params.id);
    });

    users.splice(user, 1);
    users.push(req.body);
    res.redirect('/users')

})

app.delete('/users/delete/:id', function (req, res) {

    let user = users.findIndex((user) => {
        return user.id == parseInt(req.params.id);
    });

    users.splice(user, 1);
    res.send({ message: 'successful delete' });

})
app.listen(port, function () {
    console.log("Your app running on port " + port);
})