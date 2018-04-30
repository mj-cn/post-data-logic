import mongoose = require("mongoose");


import IPost = require("./IPost");

export interface IPostModel extends IPost, mongoose.Document { }
var postSchema = new mongoose.Schema({
    urlImage: String,
    dateString: String,
    detalle: {
        title: String,
        categoria: String,
        descripcion: String,
        linkPost: String
    }
});


export var Post = mongoose.model<IPostModel>("PostModel", postSchema);