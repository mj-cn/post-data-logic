import {IPost, IPostModel, Post} from "../models";
import {DocumentQuery} from "mongoose";

export interface IPostAPI {
    getById: (id: string) => Promise<IPostModel>
    create: (post: IPost) => Promise<IPostModel>
    update: (post: IPost, id: string) => DocumentQuery<IPostModel | null, IPostModel>
    read: () => DocumentQuery<IPostModel[] | null, IPostModel>
    delete: (id: string) => DocumentQuery<IPostModel | null, IPostModel>
    getByCategory: (category: string) => Promise<IPostModel[] | null>
}

const ERR_NODATA = 'no posts were found with the criteria applied';
const ERR_CREATE = 'we cannot create the post';
const ERR_DELETE = 'we cannot delete the post';
const ERR_UPDATE = 'we cannot update the post';
const ERR_INVALIDPOST = 'Invalid post';
const ERR_NOID = 'undefined parameter ID';
const ERR_NOCAT = 'undefined categort';
const ERR_NOREPO = 'undefined repository';

export function PostAPI(): IPostAPI {

    return {
        getById: (id: string) => {
            if (!id)
                throw new Error(ERR_NOID);
            return Post.findById(id).then(res => {
                if (!res)
                    throw new Error(ERR_NODATA);
                return res;
            });
        },
        getByCategory: (category: string) => {
            if (!category)
                throw new Error(ERR_NOCAT);
            return Post.find({'detalle.categoria': category}).then(res => {
                return res;
            });
        },
        create: (post: IPost) => {
            if (!post)
                throw new Error(ERR_INVALIDPOST);
            const newPost = new Post(post);
            return newPost.save();

        },
        update: (post: IPost, id: string) => {
            if (!id)
                throw new Error(ERR_NOID);
            if (!post)
                throw new Error(ERR_INVALIDPOST);
            return Post.findByIdAndUpdate(id, post, {new: true});
        },
        read: () => {
            return Post.find();
        },
        delete: (id: string) => {
            if (!id)
                throw new Error(ERR_NOID);
            return Post.findByIdAndRemove(id);
        }
    };
}