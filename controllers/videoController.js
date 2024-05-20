const videoPlatform = require('../models/socialsModel');
const asyncHandler = require('express-async-handler')


//get all videos
const getVideos = asyncHandler(async (req, res) => {
    try {
        const video = await videoPlatform.find({});
        res.status(200).json(video)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
//get a single video by id
const getaVideo = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const video = await videoPlatform.findById(id);
        res.status(200).json(video)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
//post multiple videos
const postVideos = asyncHandler(async (req, res) => {
    try {
        const videos = await videoPlatform.insertMany(req.body)
        res.status(200).json(videos);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
//update a video by id
const updateVideo = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const video = await videoPlatform.findByIdAndUpdate(id, req.body);
        if (!video) {
            res.status(404);
            throw new Error(`cannot find any videos with id ${id}`);
        }
        const updatedVideo = await videoPlatform.findById(id);
        res.status(200).json(updatedVideo)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
//delete video by id
const deleteVideo = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const video = await videoPlatform.findByIdAndDelete(id);
        if (!video) {
            res.status(404);
            throw new Error(`cannot find any videos with id ${id}`);
        }
        res.status(200).json(video)

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

module.exports = {
    getVideos,
    getaVideo,
    postVideos,
    updateVideo,
    deleteVideo
}