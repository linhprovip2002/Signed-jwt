const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const middlewareController = require('../controllers/middleware');

router.put('/:id/edit',middlewareController.verifyToken,middlewareController.verifyTokenAndAdmin,userController.edituser);

router.delete('/:id',middlewareController.verifyToken,middlewareController.verifyTokenAndAdmin,userController.deleteUser);

router.get('/',middlewareController.verifyToken,userController.getalluser);

module.exports =  router;