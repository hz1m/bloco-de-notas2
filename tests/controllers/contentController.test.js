
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

describe('Content Controller', () => {
    it('should update content of an annotation', async () => {
        const annotation = await Annotation.create({
            title: 'Test Annotation for Content Update',
            notes: 'This annotation will have its content updated.',
            priority: false,
        });

        const response = await request(app)
            .post(`/contents/${annotation._id}`)
            .send({
                title: 'Updated Title',
                notes: 'Updated Notes'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated Title');
        expect(response.body).toHaveProperty('notes', 'Updated Notes');
    });

    it('should handle non-existing annotation in update', async () => {
        const response = await request(app)
            .post('/contents/60e3b2f8f9fd3b2a5c8f4c7e')
            .send({
                title: 'Updated Title',
                notes: 'Updated Notes'
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });
});
