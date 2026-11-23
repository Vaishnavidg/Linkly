import mongoose, { Schema } from 'mongoose';

const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true
    },
    originalUrl:{
        type: String,
        required: true
    },
    visitHistory:[{timestamp: {type: Date, default: Date.now}}],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
}, {timestamps: true});

const UrlModel = mongoose.model('Url', urlSchema);

export default UrlModel;