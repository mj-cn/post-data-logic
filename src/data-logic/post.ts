import {IPost, Post} from "../models";
import {DocumentQuery} from "mongoose";

export interface IPostService {
    getById: (id: string) => Promise<IPost>
    create: (post: IPost) => Promise<IPost>
    update: (post: IPost, id: number) => DocumentQuery<IPost | null, IPost>
    read: () => DocumentQuery<IPost[] | null, IPost>
    delete: (id: number) => DocumentQuery<IPost | null, IPost>
}

const ERR_NODATA = 'no posts were found with the criteria applied';
const ERR_CREATE = 'we cannot create the post';
const ERR_DELETE = 'we cannot delete the post';
const ERR_UPDATE = 'we cannot update the post';
const ERR_INVALIDPOST = 'Invalid post';
const ERR_NOID = 'undefined parameter ID';
const ERR_NOREPO = 'undefined repository';

export function PostService(): IPostService {

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
        create: (post: IPost) => {
            if (!post)
                throw new Error(ERR_INVALIDPOST);
            const newPost = new Post(post);
            return newPost.save();

        },
        update: (post: IPost, id: number) => {
            if (!id)
                throw new Error(ERR_NOID);
            if (!post)
                throw new Error(ERR_INVALIDPOST);
            return Post.findByIdAndUpdate(id, post, {new: true});
        },
        read: () => {
            return Post.find();
        },
        delete: (id: number) => {
            if (!id)
                throw new Error(ERR_NOID);
            return Post.findByIdAndRemove(id);
        }
    };
}