// __tests__/controllers/priorityController.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('../../src/routes');
const Annotation = require('../../src/models/AnnotationData');

const app = express();
app.use(express.json());
app.use(routes);

beforeAll(async () => {
    const dbConfig = 'mongodb+srv://hudimelo1806:123456As@cluster0.riwz4ii.mongodb.net/annotations_test?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(dbConfig, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Priority Controller', () => {
    it('should read priority annotations', async () => {
        const response = await request(app).get('/priorities').query({ priority: true });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should update priority annotation', async () => {
        const annotation = await Annotation.create({
            title: 'Test Annotation for Priority Update',
            notes: 'This annotation will have its priority updated.',
            priority: false,
        });

        const response = await request(app).post(`/priorities/${annotation._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('priority', true);
    });

    it('should handle non-existing annotation in update', async () => {
        const response = await request(app).post('/priorities/60e3b2f8f9fd3b2a5c8f4c7e'); // ID inexistente

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });
});
