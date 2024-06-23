

const annotationController = require('./annotationController');
const Annotations = require('../models/AnnotationData');

describe('Controlador de Anotações', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma nova anotação com dados válidos', async () => {
    const mockRequest = {
      body: { title: 'Nova Nota', notes: 'Conteúdo da nova nota', priority: 3 }
    };
    const mockResponse = {
      json: jest.fn()s
    };

    const mockCreatedAnnotation = { _id: '4', ...mockRequest.body };
    Annotations.create.mockResolvedValue(mockCreatedAnnotation);

    await annotationController.create(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedAnnotation);
    expect(Annotations.create).toHaveBeenCalledWith(mockRequest.body);
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
    expect(Annotations.create).toHaveBeenCalledWith(mockRequest.body);
  });


});
