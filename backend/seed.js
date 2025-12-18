const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Medicine = require('./models/Medicine');
const Pharmacy = require('./models/Pharmacy');
const Stock = require('./models/Stock');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => seedData())
    .catch(err => console.log(err));

async function seedData() {
    console.log('Seeding Data...');
    try {
        await Medicine.deleteMany({});
        await Pharmacy.deleteMany({});
        await Stock.deleteMany({});
        await User.deleteMany({});

        // Create Medicines with images
        const meds = await Medicine.insertMany([
            {
                name: 'Paracetamol',
                salt_composition: 'Paracetamol',
                brand: 'Generic',
                description: 'Pain reliever and fever reducer',
                image_url: 'https://images.apollo247.com/pub/media/catalog/product/p/a/par0023.jpg'
            },
            {
                name: 'Dolo 650',
                salt_composition: 'Paracetamol',
                brand: 'Micro Labs',
                description: 'Fever reducer and pain relief tablet',
                image_url: 'https://www.netmeds.com/images/product-v1/600x600/341545/dolo_650mg_tablet_15s_0.jpg'
            },
            {
                name: 'Crosin',
                salt_composition: 'Paracetamol',
                brand: 'GSK',
                description: 'Fast relief from pain and fever',
                image_url: 'https://www.netmeds.com/images/product-v1/600x600/341452/crocin_pain_relief_tablet_15s_0.jpg'
            },
            {
                name: 'Amoxyclav',
                salt_composition: 'Amoxicillin + Clavulanic Acid',
                brand: 'Mankind',
                description: 'Antibiotic for bacterial infections',
                image_url: 'https://www.netmeds.com/images/product-v1/600x600/341395/moxclav_625_tablet_10s_0.jpg'
            },
            {
                name: 'Azithromycin 500',
                salt_composition: 'Azithromycin',
                brand: 'Zithro',
                description: 'Antibiotic for respiratory infections',
                image_url: 'https://www.netmeds.com/images/product-v1/600x600/341511/azithral_500mg_tablet_5s_0.jpg'
            },
            {
                name: 'Cetirizine 10mg',
                salt_composition: 'Cetirizine',
                brand: 'AllerGone',
                description: 'Allergy relief medicine',
                image_url: 'https://www.netmeds.com/images/product-v1/600x600/325091/cetzine_10mg_tablet_10s_0.jpg'
            },
            {
                name: 'Vitamin C 1000mg',
                salt_composition: 'Ascorbic Acid',
                brand: 'HealthBoost',
                description: 'Immunity booster supplement',
                image_url: 'https://www.netmeds.com/images/product-v1/600x600/414977/limcee_chewable_vitamin_c_orange_500mg_tablet_15s_0.jpg'
            },
            {
                name: 'Ibuprofen 400mg',
                salt_composition: 'Ibuprofen',
                brand: 'PainFree',
                description: 'Anti-inflammatory pain reliever',
                image_url: 'https://www.netmeds.com/images/product-v1/600x600/406007/brufen_400mg_tablet_15s_0.jpg'
            },
            {
                name: 'Aspirin 75mg',
                salt_composition: 'Aspirin',
                brand: 'HeartSafe',
                description: 'Blood thinner for heart health',
                image_url: 'https://www.netmeds.com/images/product-v1/600x600/341460/ecosprin_75mg_tablet_14s_0.jpg'
            },
            {
                name: 'Metformin 500mg',
                salt_composition: 'Metformin',
                brand: 'DiaCare',
                description: 'Diabetes management medicine',
                image_url: 'https://www.netmeds.com/images/product-v1/600x600/341609/glycomet_500mg_tablet_20s_0.jpg'
            }
        ]);

        // Create Pharmacy Owner User
        const user = await User.create({
            name: 'John Doe',
            email: 'john@pharmacy.com',
            password_hash: 'password123',
            role: 'pharmacy_owner'
        });

        // Create Pharmacies
        const pharmacies = await Pharmacy.insertMany([
            { name: 'Apollo Pharmacy', address: '123 Main St', owner_id: user._id, location: { type: 'Point', coordinates: [77.2090, 28.6139] } }, // Delhi example
            { name: 'Wellness Forever', address: '456 Market Rd', owner_id: user._id, location: { type: 'Point', coordinates: [77.2100, 28.6100] } }
        ]);

        // Create Stock - Add all medicines to both pharmacies with different prices
        await Stock.insertMany([
            // Apollo Pharmacy stock
            { medicine: meds[0]._id, pharmacy: pharmacies[0]._id, price: 20, quantity: 100 },
            { medicine: meds[1]._id, pharmacy: pharmacies[0]._id, price: 30, quantity: 50 },
            { medicine: meds[2]._id, pharmacy: pharmacies[0]._id, price: 28, quantity: 75 },
            { medicine: meds[3]._id, pharmacy: pharmacies[0]._id, price: 150, quantity: 10 },
            { medicine: meds[4]._id, pharmacy: pharmacies[0]._id, price: 85, quantity: 30 },
            { medicine: meds[5]._id, pharmacy: pharmacies[0]._id, price: 15, quantity: 120 },
            { medicine: meds[6]._id, pharmacy: pharmacies[0]._id, price: 95, quantity: 60 },
            { medicine: meds[7]._id, pharmacy: pharmacies[0]._id, price: 25, quantity: 90 },
            { medicine: meds[8]._id, pharmacy: pharmacies[0]._id, price: 12, quantity: 150 },
            { medicine: meds[9]._id, pharmacy: pharmacies[0]._id, price: 45, quantity: 80 },

            // Wellness Forever stock (with different prices for comparison)
            { medicine: meds[0]._id, pharmacy: pharmacies[1]._id, price: 22, quantity: 80 },
            { medicine: meds[1]._id, pharmacy: pharmacies[1]._id, price: 28, quantity: 40 },
            { medicine: meds[2]._id, pharmacy: pharmacies[1]._id, price: 30, quantity: 60 },
            { medicine: meds[3]._id, pharmacy: pharmacies[1]._id, price: 145, quantity: 15 },
            { medicine: meds[4]._id, pharmacy: pharmacies[1]._id, price: 90, quantity: 25 },
            { medicine: meds[5]._id, pharmacy: pharmacies[1]._id, price: 14, quantity: 100 },
            { medicine: meds[6]._id, pharmacy: pharmacies[1]._id, price: 100, quantity: 50 },
            { medicine: meds[7]._id, pharmacy: pharmacies[1]._id, price: 23, quantity: 95 },
            { medicine: meds[8]._id, pharmacy: pharmacies[1]._id, price: 13, quantity: 140 },
            { medicine: meds[9]._id, pharmacy: pharmacies[1]._id, price: 42, quantity: 70 }
        ]);

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
