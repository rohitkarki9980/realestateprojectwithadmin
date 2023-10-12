const mongoose = require("mongoose")

const PropertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 6,
    },
    type: {
        type: String,
        enum: ["apartments", "townhouse", "colony"],
        required: true
    },
    desc: {
        type: String,
        required: true,
        min: 50,
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sqmeters: {
        type: Number,
        required: true,
        min: 15
    },
    district: {
        type: String,
        required: true
    },
    BHK: {
        type: Number,
        required: true,
        min: 1
    },
    location:{
        type:String,
        required:true,
        min: 15,
    },
    featured:{
        type:Boolean,
        default:true
    },
    bookmarkedUsers: {
        type: [String],
        default: []
    },
    favResd:{
        type:[String],
        default:[]
    },

    isVerified:{
        type:Boolean,
        default:false
    }
    
    
}, {timestamps: true})

module.exports = mongoose.model("Property", PropertySchema)