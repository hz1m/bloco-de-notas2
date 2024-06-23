// tests/create.test.js
jest.mock('../models/AnnotationData');
const Annotations = require('../models/AnnotationData');
const annotationController = require('../controllers/annotationController');

describe('Testes para o método create', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma nova anotação com dados válidos', async () => {
    const mockRequest = {
      body: { title: 'Nova Nota', notes: 'Conteúdo da nova nota', priority: 3 }
    };
    const mockResponse = {
      json: jest.fn()
    };

    const mockCreatedAnnotation = { _id: '3', ...mockRequest.body };

    Annotations.create.mockResolvedValue(mockCreatedAnnotation);

    await annotationController.create(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedAnnotation);
  });

  it('deve lidar com erro ao criar uma nova anotação', async () => {
    const mockRequest = {
      body: { title: 'Nova Nota', notes: 'Conteúdo da nova nota', priority: 3 }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockError = new Error('Erro ao criar anotação');

    Annotations.create.mockRejectedValue(mockError);

    await annotationController.create(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: mockError.message });
  });
});
