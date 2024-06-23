const Annotations = require('../models/AnnotationData');

module.exports = {
  async read(request, response) {
    try {
      const annotationsList = await Annotations.find();
      return response.json(annotationsList);
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  },

  async create(request, response) {
    try {
      const { title, notes, priority } = request.body;

      if (!notes || !title) {
        return response.status(400).json({ error: "Necessário um título/anotação!" });
      }

      const annotationCreated = await Annotations.create({
        title,
        notes,
        priority
      });

      return response.json(annotationCreated);
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const annotationDeleted = await Annotations.findOneAndDelete({ _id: id });

      if (annotationDeleted) {
        return response.json(annotationDeleted);
      }

      return response.status(404).json({ error: 'NÃO FOI ENCONTRADO' });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const { title, notes, priority } = request.body;

      const annotation = await Annotations.findById(id);
      if (!annotation) {
        return response.status(404).json({ error: 'Anotação não encontrada' });
      }

      if (title) annotation.title = title;
      if (notes) annotation.notes = notes;
      if (priority !== undefined) annotation.priority = priority;

      const updatedAnnotation = await annotation.save();
      return response.json(updatedAnnotation);
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }
};
