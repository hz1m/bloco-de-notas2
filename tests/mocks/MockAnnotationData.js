// __mocks__/MockAnnotationData.js

const mockAnnotations = [
  { _id: '1', title: 'Nota 1', notes: 'Esta é a nota 1', priority: 1 },
  { _id: '2', title: 'Nota 2', notes: 'Esta é a nota 2', priority: 2 },
];

const find = jest.fn().mockResolvedValue(mockAnnotations);
const findById = jest.fn().mockImplementation((id) =>
  Promise.resolve(mockAnnotations.find(annotation => annotation._id === id))
);
const create = jest.fn().mockImplementation((newAnnotation) =>
  Promise.resolve({ _id: '3', ...newAnnotation })
);
const findOneAndDelete = jest.fn().mockImplementation((id) => {
  const index = mockAnnotations.findIndex(annotation => annotation._id === id);
  if (index !== -1) {
    const deletedAnnotation = mockAnnotations.splice(index, 1)[0];
    return Promise.resolve(deletedAnnotation);
  }
  return Promise.resolve(null);
});
const save = jest.fn().mockImplementation((updatedAnnotation) =>
  Promise.resolve(updatedAnnotation)
);

const mockAnnotationsModule = {
  find,
  findById,
  create,
  findOneAndDelete,
  save
};

module.exports = mockAnnotationsModule;
