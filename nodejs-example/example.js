const StatsD = require('hot-shots');
const client = new StatsD({ host: 'telegraf', port: 8125, prefix: 'performance' });

const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5050;

const countMetrics = {
    successful: 0,
    failed: 0
};

app.get('/app', async (req, res) => {
    try {
        const esResponse = await axios.get('http://elasticsearch:9200/_search');
        const mongoClient = await MongoClient.connect('mongodb://mongodb:27017/');
        const db = mongoClient.db('sw_db');
        const mongoData = await db.collection('sw_collection').find({}).toArray();

        res.json({ esData: esResponse.data, mongoData });

        mongoClient.close();

        // Increment successful requests metric
        countMetrics.successful++;
        client.increment('nodejs.request.successful');
        console.log(`Successful request count: ${countMetrics.successful}`);
    } catch (error) {
        console.error("Detailed error:", error.message); // Log the detailed error message
        res.status(500).json({ error: 'An error occurred' });

        // Increment failed requests metric
        countMetrics.failed++;
        client.increment('nodejs.request.failed');
        console.log(`Failed request count: ${countMetrics.failed}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} at time: ${new Date()}`);
});
