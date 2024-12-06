const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB Connection URI
const mongoURI = 'mongodb+srv://muhammadhussain8:5Azan786@clusterq.oiawy.mongodb.net/quoteDB?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quotes: [{ text: String, author: String }]
});
const User = mongoose.model('User', userSchema);

// Routes

app.get('/', (req, res) => {
    res.send('Welcome to the API! Available routes: /register, /login, /quotes');
});


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (await User.findOne({ username })) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const newUser = new User({ username, password, quotes: [] });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/quotes/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ quotes: user.quotes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/quotes', async (req, res) => {
    const { userId, text, author } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.quotes.push({ text, author });
        await user.save();
        res.status(201).json({ message: 'Quote added', quotes: user.quotes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/quotes/:userId/:quoteId', async (req, res) => {
    const { userId, quoteId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.quotes.id(quoteId).remove();
        await user.save();
        res.status(200).json({ message: 'Quote deleted', quotes: user.quotes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
