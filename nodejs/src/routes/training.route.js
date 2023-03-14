const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/training.controller');

router.get('/fetchData',trainingController.fetchData)
router.get('/users', trainingController.getUser);
router.put('/users/updateRole', trainingController.updateRole);
router.post('/users',trainingController.createUser);
router.put('/users',trainingController.updateUser)
router.delete('/users',trainingController.deleteUser)

module.exports = router;
