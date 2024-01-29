const { User, Post, Comment } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('posts').populate('comments');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('posts').populate('comments');
    },
    posts: async (parent, { username, topic }) => {
      const params = {};
      if (username) params.postAuthor = username;
      if (topic) params.topic = topic;
      return Post.find(params).sort({ createdAt: -1 }).populate('comments');
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId }).populate('comments');
    },
    comments: async (parent, { postId }) => {
      return Comment.find({ postId }).populate('post');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('posts').populate('comments');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, suburb }) => {
      const user = await User.create({ username, email, password, suburb });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parent, { postText, topic }, context) => {
      if (context.user) {
        const post = await Post.create({
          postText,
          postAuthor: context.user.username,
          topic,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } }
        );

        return post;
      }
      throw AuthenticationError;
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentText,
          commentAuthor: context.user.username,
          postId,
        });

        return comment;
      }
      throw AuthenticationError;
    },
    updatePost: async (parent, { postId, postText }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId, postAuthor: context.user.username },
          { postText },
          { new: true }
        );

        if (!updatedPost) {
          throw new Error('Post not found or user is not the author');
        }

        return updatedPost;
      }
      throw AuthenticationError;
    },
    updateComment: async (parent, { commentId, commentText }, context) => {
      if (context.user) {
        const updatedComment = await Comment.findOneAndUpdate(
          { _id: commentId, commentAuthor: context.user.username },
          { commentText },
          { new: true }
        );

        if (!updatedComment) {
          throw new Error('Comment not found or user is not the author');
        }

        return updatedComment;
      }
      throw AuthenticationError;
    },
    removeUser: async (parent, args, context) => {
      if (context.user) {
        await Post.deleteMany({ postAuthor: context.user.username });
        await Comment.deleteMany({ commentAuthor: context.user.username });
        await User.findByIdAndDelete(context.user._id);
        return 'User deleted successfully';
      }
      throw AuthenticationError;
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          postAuthor: context.user.username,
        });

        if (!post) {
          throw new Error('Post not found or user is not the author');
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
        );

        await Comment.deleteMany({ postId: postId });
        
        return post;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findOneAndDelete({
          _id: commentId,
          commentAuthor: context.user.username,
        });

        if (!comment) {
          throw new Error('Comment not found or user is not the author');
        }

        return comment;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
