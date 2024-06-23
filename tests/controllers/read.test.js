// tests/read.test.js
jest.mock('../models/AnnotationData');
const Annotations = require('../models/AnnotationData');
const annotationController = require('../controllers/annotationController');

describe('Testes para o método read', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar uma lista de anotações', async () => {
    const mockAnnotations = [
      { _id: '1', title: 'Anotação 1', notes: 'Nota 1', priority: 1 },
      { _id: '2', title: 'Anotação 2', notes: 'Nota 2', priority: 2 }
    ];

    const mockRequest = {};
    const mockResponse = {
      json: jest.fn()
    };

    Annotations.find.mockResolvedValue(mockAnnotations);

    await annotationController.read(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockAnnotations);
  });

  it('deve lidar com erro ao obter anotações', async () => {
    const mockError = new Error('Erro ao obter anotações');

    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Annotations.find.mockRejectedValue(mockError);

    await annotationController.read(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: mockError.message });
  });
});
