const express = require('express')
const adminController = require('../controllers/admin')

const router = express.Router()

// Admin CRUD routes for users
router.get('/users', adminController.getAllUsers) // Get all users
router.get('/users/:id', adminController.getUserById) // Get user by ID
router.post('/users', adminController.createUser) // Create new user
router.put('/users/:id', adminController.updateUser) // Update user
router.delete('/users/:id', adminController.deleteUser) // Delete user

router.get('/', adminController.adminPage) // Render admin panel
router.get('/history', adminController.getHistory) //  View API request history

module.exports = router
