require('dotenv').config();
const express = require('express');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Endpoint to receive POST requests from NocoDB
app.post('/', async (req, res) => {
    const {Email} = req.body.data; 

    // Construct the message to send to Discord
    const discordMessage = `New review requested for ${Email}`;

    try {
        await axios.post(process.env.DISCORD_WEBHOOK_URL, { content: discordMessage });
        res.status(200).send('Message sent to Discord');
    } catch (error) {
        console.error('Error sending message to Discord:', error);
        res.status(500).send('Error sending message');
    }
});
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
