import mongoose from "mongoose";


const tripSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    likeCount: {
        type: Number,
        default: 0,
    },
});


export default mongoose.model('Trip', tripSchema);
