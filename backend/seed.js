const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Medicine = require('./models/Medicine');
const Pharmacy = require('./models/Pharmacy');
const Stock = require('./models/Stock');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/checker')
    .then(async () => {
        console.log('Connected to MongoDB. Starting Seed...');
        await seedData();
    })
    .catch(err => {
        console.error('CRITICAL: MongoDB Connection Failed!', err.message);
        process.exit(1);
    });

async function seedData() {
    try {
        console.log('Clearing old data (especially Hospitals)...');
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

        // Create Retail Medicals in Trichy and Delhi
        const pharmacies = await Pharmacy.insertMany([
            {
                name: 'Kauvery Medicals - Cantonment',
                address: 'Cantonment Area, Trichy',
                owner_id: user._id,
                location: { type: 'Point', coordinates: [78.6835, 10.8158] }
            },
            {
                name: 'Apollo Pharmacy - Thillai Nagar',
                address: 'Main Road, Thillai Nagar, Trichy',
                owner_id: user._id,
                location: { type: 'Point', coordinates: [78.6865, 10.8285] }
            },
            {
                name: 'MedPlus Medical Store',
                address: 'Tennur High Road, Trichy',
                owner_id: user._id,
                location: { type: 'Point', coordinates: [78.6890, 10.8250] }
            },
            {
                name: 'Trichy Central Medicals',
                address: 'Near Central Bus Stand, Trichy',
                owner_id: user._id,
                location: { type: 'Point', coordinates: [78.6780, 10.8100] }
            },
            {
                name: 'City Pharma & Medicals',
                address: 'Chatram Bus Stand, Trichy',
                owner_id: user._id,
                location: { type: 'Point', coordinates: [78.6940, 10.8350] }
            }
        ]);

        // Create Stock for all pharmacies
        const stockData = [];
        pharmacies.forEach(pharma => {
            meds.forEach(med => {
                stockData.push({
                    medicine: med._id,
                    pharmacy: pharma._id,
                    price: Math.floor(Math.random() * (200 - 10 + 1)) + 10,
                    quantity: Math.floor(Math.random() * 100) + 20
                });
            });
        });
        await Stock.insertMany(stockData);

        console.log('Data Seeded Successfully with Trichy Landmarks');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
