const express = require('express')
const router = express.Router()
const {addPost, getPost, getPosts} = require('../controllers/postController')

router.post('/', addPost)
router.get('/', getPosts)
router.get('/:postId', getPost)

module.exports = router