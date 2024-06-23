// tests/delete.test.js
jest.mock('../models/AnnotationData');
const Annotations = require('../models/AnnotationData');
const annotationController = require('../controllers/annotationController');

describe('Testes para o método delete', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve deletar uma anotação existente', async () => {
    const mockRequest = {
      params: { id: '1' }
    };
    const mockResponse = {
      json: jest.fn()
    };

    const mockDeletedAnnotation = { _id: '1', title: 'Anotação 1', notes: 'Nota 1', priority: 1 };

    Annotations.findOneAndDelete.mockResolvedValue(mockDeletedAnnotation);

    await annotationController.delete(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockDeletedAnnotation);
  });

  it('deve lidar com anotação não encontrada ao deletar', async () => {
    const mockRequest = {
      params: { id: '999' } // ID que não existe
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Annotations.findOneAndDelete.mockResolvedValue(null);

    await annotationController.delete(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'NÃO FOI ENCONTRADO' });
  });

  it('deve lidar com erro ao deletar uma anotação', async () => {
    const mockRequest = {
      params: { id: '1' }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockError = new Error('Erro ao deletar anotação');

    Annotations.findOneAndDelete.mockRejectedValue(mockError);

    await annotationController.delete(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: mockError.message });
  });
});
