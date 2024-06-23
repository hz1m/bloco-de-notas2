
const mongoose = require('mongoose');

const dbConfig = 'mongodb+srv://hudimelo1806:123456As@cluster0.riwz4ii.mongodb.net/annotations?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbConfig)
    .then(() => {
        console.log('Connected successfully to MongoDB');
    })
    .catch((err) => {
        console.error('Connection error', err);
    });

module.exports = mongoose;
