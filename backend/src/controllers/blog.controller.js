const blogModel = require('../models/blog.model');

async function createBlog(reqest, response) {
    if(Object.keys(reqest.body).length === 0) {
       return response.status(400).send({error : true, message : "requires fields are missing"})
    }
    try {
        const {title, body, tags} = reqest.body;
        const userId = reqest.userId;
        if(!title || !body || !tags) {
            return response.status(400).send({error : true, message : "requires fields are missing"})
        }
        const checkTitle = await blogModel.findOne({title});
        if(checkTitle) {
             return response.status(400).send({error : true, message : "this title is alredy used"})
        }

        const createBlog = await blogModel.create({
            title, body, tags, author : userId
        })

        return response.status(201).send({error : false, data : createBlog, message : "blog created successfully"})

    } catch (error) {
        
    }
}

module.exports = {
    createBlog
}