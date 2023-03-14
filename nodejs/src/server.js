const express = require('express');
const trainingRoute = require('./routes/training.route');
const authRoute = require('./routes/auth.route');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
app.use(
  express.urlencoded({
    limit: '30mb',
    extended: true,
  })
);
app.use(
  express.json({
    limit: '30mb',
    extended: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/training', trainingRoute);
app.use('/auth', authRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
