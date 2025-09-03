const express = require('express');
const { register, profile, login, guestLogin } = require('../controllers/user.controller');
const { createBlog, getAllBlogs, getBlogId, updateBlog, deleteBlog} = require('../controllers/blog.controller')
const { AuntenticateUser } = require('../middleware/Auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/guestLogin', guestLogin);

router.get('/profile', AuntenticateUser, profile) // route level middleware

router.post('/blog', AuntenticateUser, createBlog)
router.get('/blog', AuntenticateUser, getAllBlogs) 
router.get('/blog/:blogId', getBlogId)
router.put('/blog/:blogId', AuntenticateUser, updateBlog) 
router.delete('/blog/:blogId', AuntenticateUser, deleteBlog) 




module.exports = router;

/*
{
    "email" : "abcdef@email.com",
    "password" : "123456789"
}

*/