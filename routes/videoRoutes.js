const express = require('express')
const router = express.Router()
const { getVideos, getaVideo, postVideos, updateVideo, deleteVideo } = require('../controllers/videoController')

//get all videos
router.get('/', getVideos)

//get a video by id
router.get('/:id', getaVideo)

//post videos
router.post('/', postVideos)

//update a video
router.put('/:id', updateVideo)

//delete a video
router.delete('/:id', deleteVideo)

module.exports = router;