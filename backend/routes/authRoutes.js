const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const bcrypt = require('bcryptjs'); // Assuming we add this later or use simple compare for now
// const jwt = require('jsonwebtoken');

// Placeholder for real auth
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // In real app: hash password
        const user = new User({ name, email, password_hash: password, role });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password_hash !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful', user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
