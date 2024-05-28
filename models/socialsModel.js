const mongoose = require('mongoose');

const socialMediaPostSchema = mongoose.Schema({
    postType: {
        type: String,
        required: true
    },
    postCaptions: {
        type: String,
        required: true
    },
    hashtagsUsed: {
        type: [String],
        default: []
    },
    postDate: {
        type: String,
        required: true
    },
    linkToPost: {
        type: String,
        required: true
    },
    impressions: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const DEFAULT_COLLECTION_NAME = process.env.DEFAULT_COLLECTION_NAME;

function getModelForCollection(dbName = process.env.DEFAULT_DB_NAME, collectionName = DEFAULT_COLLECTION_NAME) {
    const dbUri = process.env.MONGO_URL.replace('databaseName', dbName);
    const conn = mongoose.createConnection(dbUri);
    return conn.model(collectionName, socialMediaPostSchema, collectionName);
}

module.exports = getModelForCollection;
