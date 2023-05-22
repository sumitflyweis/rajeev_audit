const express = require("express");
const router = express.Router();
const Post = require("../model/post");


exports.createPost = async (req, res) => {
  try {
    const { category, image_vedio, topic, desc } = req.body;
    const newPost = new Post({
      category,
      image_vedio,
      topic,
      desc,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

// Controller function to get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("category")
    res.json({msg:posts});
  } catch (error) {
    res.status(500).json({ error: "Failed to get posts" });
  }
};

// Controller function to get a specific post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate("category")
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({msg:post});
  } catch (error) {
    res.status(500).json({ error: "Failed to get post" });
  }
};

// Controller function to update a post by ID
exports.updatePost = async (req, res) => {
  try {
    const { category, image_vedio, topic, desc } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { category, image_vedio, topic, desc },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Controller function to delete a post by ID
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

// Controller function to like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.like.count += 1;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to like post" });
  }
};

// Controller function to comment on a post
exports.commentOnPost = async (req, res) => {
  try {
    const { comment } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.comment.count += 1;
    post.comment.driver = comment
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to like post" });
  }
};
