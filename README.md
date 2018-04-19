# Post Escuelita data layer

This Node.js module represents the data layer of escuelita posts app.
The module uses  MongoDB.

## API Methods

 - getById 
 - create
 - update
 - read
 - delete

## Usage

**Initialize a PostAPI instance**

```
const postAPI = PostAPI();  
var post: IPost = {  
    detalle: {  
        title: 'A Title',  
        categoria: 'Post Category',  
        descripcion: 'Post description',  
        linkPost: 'http://www.elpost.com/1'  
  },  
    urlImage: 'http://www.instagram.com/mgasd/1.png',  
    dateString: new Date().toDateString()  
};
```

**Create a post**

    postAPI.create(post).then(value => {  
        console.log(value);  
    })  
    .catch(reason => {  
        console.log(reason);  
    })

**Delete a post**

    postAPI.delete('507f1f77bcf86cd799439011').then(res => {  
        console.log(res)  
    }).catch(reason => console.log(reason));

**Read all posts**

    postAPI.read().then(value => {  
        console.log(value);  
    }).catch(reason => {  
        console.log(reason);  
    })
**Find a post by id**

    postAPI.getById('507f1f77bcf86cd799439011').then(value => {  
        console.log(value);  
    }).catch(reason => {  
        console.log(reason);  
    })
**Get all post by category**

    postAPI.getByCategory('some-cat').then(value => {  
        console.log(value)  
    }).catch(reason => {  
        console.log(reason);  
    })
