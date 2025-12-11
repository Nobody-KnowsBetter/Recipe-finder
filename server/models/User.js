const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        recipeId: String,
        title: String,
        image: String,
        missedIngredientCount: Number,
        ingredients: [String]
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
