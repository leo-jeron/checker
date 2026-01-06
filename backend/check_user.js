const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Checking for users...');
        const users = await User.find({});
        console.log('Found users:', users);
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
