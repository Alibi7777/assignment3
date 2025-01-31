const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register', async (req, res) => {
  const { firstname, email, password } = req.body

  if (!firstname || !email || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' })
  }

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'Пользователь с таким email уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      firstname,
      email,
      password: hashedPassword,
      role: 'user'
    })

    await newUser.save()
    res.status(201).json({ message: 'Registration successful!' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Неверный email или пароль' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный email или пароль' })
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
      expiresIn: '24h'
    })

    res.json({ token })
  } catch (error) {
    console.error('Ошибка входа:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

module.exports = router
