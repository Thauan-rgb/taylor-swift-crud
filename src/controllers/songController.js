const Song = require('../models/Song');

// GET /api/songs
exports.listSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar músicas.', error: err.message });
  }
};

// GET /api/songs/:id
exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: 'Música não encontrada.' });
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar música.', error: err.message });
  }
};

// POST /api/songs
exports.createSong = async (req, res) => {
  try {
    const { name, album, duration, lyrics, rating } = req.body;

    if (!name || !album || !rating) {
      return res.status(400).json({ message: 'Nome, álbum e classificação são obrigatórios.' });
    }

    const song = await Song.create({ name, album, duration, lyrics, rating });
    res.status(201).json(song);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar música.', error: err.message });
  }
};

// PUT /api/songs/:id  — usado para mover entre colunas ou editar
exports.updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!song) return res.status(404).json({ message: 'Música não encontrada.' });
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar música.', error: err.message });
  }
};

// DELETE /api/songs/:id
exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ message: 'Música não encontrada.' });
    res.json({ message: 'Música removida com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover música.', error: err.message });
  }
};
