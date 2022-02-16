const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const {body} = require('express-validator')

const blogController = require('../controllers/blog');
const { route } = require('express/lib/application');

//POST : /v1/blog/post
router.post('/post', 
[
    body('title').isLength({min: 5}).withMessage('Invalid Title Input'),
    body('body').isLength({min: 5}).withMessage('Invalid Body Input'),
],
blogController.createBlogPost);

router.get('/posts', blogController.getAllBlogPost);

router.get('/post/:postId', blogController.getBlogPostById);

router.put('/post/:postId',
[
    body('title').isLength({min: 5}).withMessage('Invalid Title Input'),
    body('body').isLength({min: 5}).withMessage('Invalid Body Input'),
],
blogController.updateBlogPost);

router.delete('/post/:postId', blogController.deleteBlogPost);


module.exports = router;