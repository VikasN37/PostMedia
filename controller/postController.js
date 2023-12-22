const Post = require('../model/postModel')
const APIfeatures = require('../utils/apiFeatures')

exports.getAllPosts = async (req, res) => {
  try {
    const features = new APIfeatures(Post.find(), req.query).sort()

    const posts = await features.query
    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'could not process req',
    })
  }
}

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: {
        posts: post,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body)
    res.status(200).json({
      status: 'success',
      data: {
        post: newPost,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json({
      status: 'success',
      data: {
        posts: post,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'could not update',
    })
  }
}

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'could not delete',
    })
  }
}
