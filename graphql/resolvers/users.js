const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { UserInputError } = require('apollo-server')
const { SECRET_KEY } = require('../../config');

module.exports = {
    Mutation: {
        async register(_, { registerInput: {
            username, email, password, confirmPassword
        } }, context, info) {
            // TODO: Validate user data
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError("Username is taken", {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            // TODO: make sure users doesnt exist
            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })
            const res = await newUser.save();
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username

            }, SECRET_KEY, { expiresIn: '1h' });
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}