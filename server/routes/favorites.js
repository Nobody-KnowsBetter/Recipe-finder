const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        // "Bearer <token>"
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET || "default_secret", (err, user) => {
            if (err) return res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

// GET Favorites
router.get('/', verify, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user.favorites);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ADD Favorite
router.post('/', verify, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Prevent duplicates
        const isFavorited = user.favorites.some(f => f.recipeId === req.body.recipeId);
        if (isFavorited) return res.status(400).json("Recipe already in favorites");

        user.favorites.push(req.body);
        await user.save();
        res.status(200).json(user.favorites);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE Favorite
router.delete('/:id', verify, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.favorites = user.favorites.filter(f => f.recipeId !== req.params.id);
        await user.save();
        res.status(200).json(user.favorites);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
