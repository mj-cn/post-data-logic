import { DocumentQuery } from "mongoose";
import { Post } from "./Post";
import IPost = require('./IPost');

export interface IPostAPI {
    getById: (id: string) => Promise<IPost>
    create: (post: IPost) => Promise<IPost>
    update: (post: IPost, id: string) => Promise<IPost>
    read: () => Promise<IPost[]>
    delete: (id: string) => Promise<any>
    getByCategory: (category: string) => Promise<IPost[]>
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
        getById: (id: string): Promise<IPost> => {
            if (!id)
                throw new Error(ERR_NOID);
            return Post.findById(id).then(res => {
                if (!res)
                    throw new Error(ERR_NODATA);
                var post: IPost = {
                    dateString: res.dateString,
                    urlImage: res.urlImage,
                    detalle: res.detalle
                };
                return post;
            });
        },
        getByCategory: (category: string) => {
            if (!category)
                throw new Error(ERR_NOCAT);
            return Post.find({ 'detalle.categoria': category }).then(res => {
                if (!res) {
                    throw new Error(ERR_NODATA);
                }
                return res.map(value => {
                    return {
                        dateString: value.dateString,
                        urlImage: value.urlImage,
                        detalle: value.detalle
                    };
                });
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
            return Post.findByIdAndUpdate(id, post, { new: true })
                .then(res => {
                    if (!res) {
                        throw new Error(ERR_UPDATE);
                    }
                    var p: IPost = {
                        dateString: res.dateString,
                        urlImage: res.urlImage,
                        detalle: res.detalle
                    };
                    return p;
                })
        },
        read: () => {
            return Post.find()
                .then(res => {
                    if (!res) {
                        throw new Error(ERR_NODATA);
                    }
                    return res.map(value => {
                        return {
                            dateString: value.dateString,
                            urlImage: value.urlImage,
                            detalle: value.detalle
                        };
                    });
                })
        },
        delete: (id: string) => {
            if (!id)
                throw new Error(ERR_NOID);
            return Post.findByIdAndRemove(id)
                .then(res => {
                    return res;
                })
        }
    };
}