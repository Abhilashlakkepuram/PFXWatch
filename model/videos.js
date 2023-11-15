const mongoose = require("mongoose");

const {Schema} = mongoose;

const channelSchema = new mongoose.Schema ({
    name:String,
    profile_image_url:String,
    subscriber_count:String
});

const videosSchema = new mongoose.Schema({
    title:String,
    thumbnail_url:String,
    channel:[channelSchema],
    view_count:String,
    published_at:String,
    category:String

})

const videos = mongoose.model("Videos",videosSchema)

const videoDetailsSchema = new mongoose.Schema({
    title:String,
    video_url:String,
    thumbnail_url:String,
    channel:[channelSchema],
    view_count:String,
    published_at:String,
    description:String
})

const videoDetails = mongoose.model("videoDetails",videoDetailsSchema);
module.exports = {videoDetails,videos}