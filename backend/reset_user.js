const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Upserting User...');
        try {
            await User.deleteOne({ email: 'john@pharmacy.com' });
            await User.create({
                name: 'John Doe',
                email: 'john@pharmacy.com',
                password_hash: 'password123',
                role: 'pharmacy_owner'
            });
            console.log('User John Created/Reset Successfully');
            process.exit();
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
