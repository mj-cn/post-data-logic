interface IPost {
    urlImage?: string;
    dateString?: string;
    detalle: {
        title: string,
        categoria: string,
        descripcion?: string,
        linkPost: string
    };
}

export = IPost;