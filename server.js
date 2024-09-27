const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to receive POST requests from NocoDB
app.post('/', async (req, res) => {
    const {Email} = req.body.data; // Adjust this according to your NocoDB payload

    // Construct the message to send to Discord
    const discordMessage = `New review requested for ${Email}`;

    try {
        await axios.post('https://discord.com/api/webhooks/1289258497439039489/p9DKCm2zDbshHp3hoEGaG2OGo-9lDBvGCGJ3z-nOzZ9Do2-43ruTUY_LvyRlBujsAyYA', { content: discordMessage });
        res.status(200).send('Message sent to Discord');
    } catch (error) {
        console.error('Error sending message to Discord:', error);
        res.status(500).send('Error sending message');
    }
});
// Enhanced health check endpoint
app.get('/health', async (req, res) => {
    try {
        // Perform a simple POST request to the Discord webhook
        await axios.post('https://discord.com/api/webhooks/1289258497439039489/p9DKCm2zDbshHp3hoEGaG2OGo-9lDBvGCGJ3z-nOzZ9Do2-43ruTUY_LvyRlBujsAyYA', { content: 'Health check' });
        res.status(200).json({ status: 'OK', message: 'Server is healthy, Discord webhook is responsive' });
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({ status: 'Error', message: 'Server is running, but Discord webhook is not responsive' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
