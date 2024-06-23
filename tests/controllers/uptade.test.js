// tests/update.test.js
jest.mock('../models/AnnotationData');
const Annotations = require('../models/AnnotationData');
const annotationController = require('../controllers/annotationController');

describe('Testes para o método update', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve atualizar uma anotação existente', async () => {
    const mockRequest = {
      params: { id: '1' },
      body: { title: 'Novo Título' }
    };
    const mockResponse = {
      json: jest.fn()
    };

    const mockUpdatedAnnotation = { _id: '1', title: 'Novo Título', notes: 'Nota 1', priority: 1 };

    const mockAnnotationInstance = {
      save: jest.fn().mockResolvedValue(mockUpdatedAnnotation)
    };

    Annotations.findById.mockResolvedValue(mockAnnotationInstance);

    await annotationController.update(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedAnnotation);
  });

  it('deve lidar com anotação não encontrada ao atualizar', async () => {
    const mockRequest = {
      params: { id: '999' }, // ID que não existe
      body: { title: 'Novo Título' }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Annotations.findById.mockResolvedValue(null);

    await annotationController.update(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Anotação não encontrada' });
  });

  it('deve lidar com erro ao atualizar uma anotação', async () => {
    const mockRequest = {
      params: { id: '1' },
      body: { title: 'Novo Título' }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockError = new Error('Erro ao atualizar anotação');

    const mockAnnotationInstance = {
      save: jest.fn().mockRejectedValue(mockError)
    };

    Annotations.findById.mockResolvedValue(mockAnnotationInstance);

    await annotationController.update(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: mockError.message });
  });
});
