const blogModel = require('../models/blog.model');

async function createBlog(reqest, response) {
    if (Object.keys(reqest.body).length === 0) {
        return response.status(400).send({ error: true, message: "requires fields are missing" })
    }
    try {
        const { title, body, tags, category } = reqest.body;
        const userId = reqest.user._id;
        if (!title || !body || !tags || !category) {
            return response.status(400).send({ error: true, message: "requires fields are missing" })
        }
        const checkTitle = await blogModel.findOne({ title });
        if (checkTitle) {
            return response.status(400).send({ error: true, message: "this title is alredy used" })
        }

        const createNewBlog = await blogModel.create({
            title, body, tags, author: userId, category
        })

        return response.status(201).send({ error: false, data: createNewBlog, message: "blog created successfully" })

    } catch (error) {
        return response.status(500).send({ error: true, data: error.message });
    }
}

async function getAllBlogs(reqest, response) {
    try {
        let blogs = await blogModel.find({isDeleted : false, isPublished : true}).sort({"_id" : -1});
        return response.status(200).send({ error: false, data: blogs })
    } catch (error) {
        return response.status(500).send({ error: true, data: error.message });
    }
}

async function getBlogId(reqest, response) {
    try {
        let { blogId } = reqest.params;
        let {title,  author, body, tags, category, createdAt, updatedAt} = await blogModel.findById(blogId).populate('author');
        const blodData = {
            title, 
            author : {
                name : author.name,
                role : author.role,
                bio : author.bio
            },
            body,
            tags,
            category,
            createdAt,
            updatedAt
        }
        return response.status(200).send({ error: false, data: blodData })
    } catch (error) {
        return response.status(500).send({ error: true, data: error.message });
    }
}

async function updateBlog(reqest, response) {
    try {
        let { blogId } = reqest.params;
        let { title, body, tags } = reqest.body;

        let updateBlogDataObj = {};

        if (title) {
            updateBlogDataObj.title = title
        }
        if (body) {
            updateBlogDataObj.body = body
        }

        const isAuthBlog = await blogModel.findById(blogId);

        if (isAuthBlog.author.toString() !== reqest.user._id && reqest.user.role !== "admin") {
            return response.status(403).send({ error: true, message: "Not authorized to update this blog" })
        }
        const updateBlog = await blogModel.findByIdAndUpdate(
            blogId,
            {
                $set: updateBlogDataObj,
                $push: { tags }
            },
            { new: true }
        );
        return response.status(200).send({ error: false, data: updateBlog, message: "Blog updated" })
    } catch (error) {
        return response.status(500).send({ error: true, data: error.message });
    }
}

async function deleteBlog(reqest, response) {
    try {
        let { blogId } = reqest.params;
        const isAuthBlog = await blogModel.findById(blogId);

        if (isAuthBlog.author.toString() !== reqest.user._id && reqest.user.role !== "admin") {
            return response.status(403).send({ error: true, message: "Not authorized to update this blog" })
        }
        if (isAuthBlog.isDeleted) {
            return response.status(400).send({ error: true, message: "blog is already deleted" })
        }
        await blogModel.findByIdAndUpdate(
            blogId,
            {isDeleted: true,deletedAt: Date.now()},
            { new: true }
        );
        return response.status(200).send({ error: false, message: "Blog got deleted" })
    } catch (error) {
        return response.status(500).send({ error: true, data: error.message });
    }
}

module.exports = {
    createBlog,
    getBlogId,
    getAllBlogs,
    updateBlog,
    deleteBlog
}