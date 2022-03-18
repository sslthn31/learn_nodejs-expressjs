const {validationResult} = require('express-validator');
const blogPost = require('../models/blog');
const fs = require('fs');
const path = require('path');

exports.createBlogPost = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const err = new Error('Invalid Value Input');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    };

    if (!req.file){
        const err = new Error('Image harus di upload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    
    const posting = new blogPost({
        title: title,
        body: body,
        image: image,
        author: {uuid: 1, name: 'Sento'}
    });

    posting.save()
    .then(result => {
        res.status(201).json({
            message: "Create Blog Post Success",
            data: result
        });        
    })
    .catch(err => {console.log('err:', err)});
}

exports.getAllBlogPost = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    blogPost.find()
    .countDocuments()
    .then(count => {
        totalItems = count;
        return blogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then(result => {
        res.status(200).json({
            message: "Data Sukses Dipanggil",
            data: result,
            total_data: totalItems,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage)
        });
    })
    .catch(err => {
        next(err)
    })
}

exports.getBlogPostById = (req, res, next) => {
    const postId = req.params.postId;
    blogPost.findById(postId)
    .then(result => {
        if(!result){
            const error = new Error('Data Blog Post Tidak Ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: "Data Blog Post Sukses Ditemukan",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
};

exports.updateBlogPost = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const err = new Error('Invalid Value Input');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    };

    if (!req.file){
        const err = new Error('Image harus di upload');
        err.errorStatus = 422;
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    const findPostId = req.params.postId;

    blogPost.findById(findPostId)
    .then(post => {
        if(!post){
            const error = new Error('Data Blog Post Tidak Ditemukan');
            error.errorStatus = 404;
            throw error;
        }

        post.title = title;
        post.body = body;
        post.image = image;
        
        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: "Data Blog Post Sukses Di Update",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}; 

exports.deleteBlogPost = (req, res, next) => {
    const findPostId = req.params.postId;
    
    blogPost.findById(findPostId)
    .then(post => {
        if(!post){
            const error = new Error('Data Blog Post Tidak Ditemukan');
            error.errorStatus = 404;
            throw error;
        };

        removeImage(post.image);
        return blogPost.findByIdAndRemove(findPostId);
    })
    .then(result => {
        res.status(200).json({
            message: "Delete Blog Post berhasil",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

const removeImage = (filePath) => {
    console.log('filepath', filePath);
    console.log('dirname', __dirname);

    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath, err => console.log(err));
}