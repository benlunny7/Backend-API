const getModelForCollection = require('../models/socialsModel');
const asyncHandler = require('express-async-handler')


//get all videos
const getVideos = asyncHandler(async (req, res) => {
    const { dbName, collectionName } = req.query; // Assuming you are passing these as query parameters
    const VideoModel = getModelForCollection(dbName, collectionName);

    try {
        const videos = await VideoModel.find({});
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
//get a single video by id
const getaVideo = asyncHandler(async (req, res) => {
    const { dbName, collectionName } = req.query;
    const { id } = req.params; // Get id from route parameter
    const VideoModel = getModelForCollection(dbName, collectionName);

    try {
        const video = await VideoModel.findById(id);
        if (!video) {
            res.status(404).send('Video not found');
            return;
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
//post multiple videos
const postVideos = asyncHandler(async (req, res) => {
    const { dbName, collectionName } = req.query; // Include dbName and collectionName in the query or as part of the body
    const VideoModel = getModelForCollection(dbName, collectionName);

    try {
        const videos = await VideoModel.insertMany(req.body);
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
//update a video by id
const updateVideo = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get id from path parameter
    const { dbName, collectionName } = req.query; // dbName and collectionName from query
    const VideoModel = getModelForCollection(dbName, collectionName);

    try {
        const video = await VideoModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!video) {
            res.status(404).send(`Cannot find any videos with ID ${id}`);
            return;
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
//delete video by id
const deleteVideo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { dbName, collectionName } = req.query;
    const VideoModel = getModelForCollection(dbName, collectionName);

    try {
        const video = await VideoModel.findByIdAndDelete(id);
        if (!video) {
            res.status(404).send(`Cannot find any videos with ID ${id}`);
            return;
        }
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = {
    getVideos,
    getaVideo,
    postVideos,
    updateVideo,
    deleteVideo
}