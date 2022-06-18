var fs = require("fs");
var posts = []
var categories = []

exports.initialize = () => 
{
    return new Promise ((resolve, reject) =>
     {
        fs.readFile('./data/posts.json', 'utf8', (err,data) => 
        {
            if (err) 
            {
                reject("Error! Failure");
            }
            else 
            {
                posts = JSON.parse(data);
            }
        });

        fs.readFile('./data/categories.json', 'utf8', (err,data)=> 
        {
            if (err) 
            {
                reject("Error! Failure");
            }
            else 
            {
                categories = JSON.parse(data);
            }
        });
        resolve();
    })
};

exports.getAllPosts = () => 
{
    return new Promise ((resolve,reject) => 
    {
        if (posts.length == 0) 
        {
            reject('Error');
        }
        else 
        {
            resolve(posts);
        }
    })
};

exports.getPublishedPosts = () => 
{
    return new Promise ((resolve, reject) => 
    {
        var publishposts = posts.filter(post => post.published == true);
       
        if (publishposts.length == 0) 
        {
            reject('Error');
        }
        else{
        resolve(publishposts);
        }
    })
};

exports.getCategories = () => 
{
    return new Promise ((resolve,reject) => 
    {
        if (categories.length == 0) 
        {
            reject('Error');
        }
        else 
        {
            resolve(categories);
        }
    })
};
module.exports.addPost = (postData) => {
    let promise = new Promise((resolve, rejects) => {
        typeof postData.published === "undefined" ? postData.published = false : postData.published = true;
        postData.category = parseInt(postData.category, 10);
        postData.id = postArray.length + 1;
        postArray.push(postData);
        
        resolve (postArray);
    })
    return promise;
}


module.exports.getPostsByCategory = (category) => {
    let promise = new Promise((resolve, rejects) => {
        let post_Cate = postArray.filter(post => post.category == category)
        if (post_Cate.length === 0) {
            rejects({message : "no results returned"})
        }
        resolve (post_Cate);
    })
    return promise;
}

module.exports.getPostById = (id) => {
    let promise = new Promise((resolve, rejects) => {
        let post_id = postArray.filter(post => post.id == id)
        if (post_id.length === 0) {
            rejects({message : "no results returned"})
        }
        resolve (post_id);
    })
    return promise;
}

module.exports.getPostsByMinDate = (minDateStr) => {
    let promise = new Promise((resolve, rejects) => {
        let postDateSearch = postArray.filter(post => new Date(post.postDate) >= new Date(minDateStr))
        if (postDateSearch.length === 0) {
            rejects({message : "no results returned"})
        }
        resolve (postDateSearch);
    })
    return promise;
}