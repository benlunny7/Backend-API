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

//.........................................................................................................
//CHANGE COLLECTION STRING
const platform = 'Instagram';
//.........................................................................................................



const videoPlatform = mongoose.model(platform, socialMediaPostSchema, platform);


module.exports = videoPlatform;
