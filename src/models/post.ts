import { mongoose } from "../database";

export interface IPost extends mongoose.Document{
    urlImage?: string;
    dateString?: string;
    detalle: {
        title: string,
        categoria: string,
        descripcion?: string,
        linkPost: string
    };
}

export interface IPostModel extends mongoose.Model<IPost> {}

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

export const Post = mongoose.model<IPost>("Post", schema) as IPostModel;
