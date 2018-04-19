import { mongoose } from "../database";

export interface IPost {
    urlImage?: string;
    dateString?: string;
    detalle: {
        title: string,
        categoria: string,
        descripcion?: string,
        linkPost: string
    };
}

export interface IPostModel extends IPost, mongoose.Document{}

const schema = new mongoose.Schema({
    urlImage: String,
    dateString: String,
    detalle: {
        title: String,
        categoria: String,
        descripcion: String,
        linkPost: String
    }
});

export const Post = mongoose.model<IPostModel>("Post", schema);
