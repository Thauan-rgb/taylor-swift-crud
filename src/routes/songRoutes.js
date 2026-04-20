const express = require('express');
const router  = express.Router();
const c       = require('../controllers/songController');

router.get('/',     c.listSongs);
router.get('/:id',  c.getSongById);
router.post('/',    c.createSong);
router.put('/:id',  c.updateSong);
router.delete('/:id', c.deleteSong);

module.exports = router;
