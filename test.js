const mongoose = require('mongoose');

// Replace with your actual connection string
const mongoURI = 'mongodb+srv://muhammadhussain8:5Azan786@clusterq.oiawy.mongodb.net/quoteDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quotes: [{ text: String, author: String }]
});

const User = mongoose.model('User', userSchema);

// Test the connection
async function testDatabase() {
    try {
        // Test CRUD operations
        const newUser = new User({ username: 'test', password: 'test', quotes: [] });
        await newUser.save();
        console.log('Test user created successfully!');
        mongoose.connection.close();
    } catch (err) {
        console.error('Database test error:', err);
    }
}

testDatabase();
