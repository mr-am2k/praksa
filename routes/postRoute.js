const express = require('express')
const router = express.Router()
const {addPost, getPost, getPosts,getMyPosts, deletePost} = require('../controllers/postController')

router.post('/', addPost)
router.get('/', getPosts)
router.get('/:location&:company&:position', getPosts)
router.get('/:postId', getPost)
router.get('/my-posts/:userId', getMyPosts)
router.delete('/:postId', deletePost)


module.exports = router