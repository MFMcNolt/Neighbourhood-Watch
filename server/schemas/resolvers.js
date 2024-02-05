const { User, Post } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('posts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('posts');
    },

    posts: async (parent, { username, topic }) => {
      const params = username ? { username } : {};
      if (topic) {
        params.topic = topic;
      }
      return Post.find(params).sort({ createdAt: -1 });
    },

    post: async (parent, { postId }) => {
      return Post.findById(postId);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate('posts');
      }
      throw new AuthenticationError('You need to be logged in!');
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
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parent, { postTitle, postText, topic }, context) => {
      if (context.user) {
        const post = await Post.create({
          postTitle,
          postText,
          postAuthor: context.user.username,
          topic
        });

        await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { posts: post._id } },
          { new: true }
        );

        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          postAuthor: context.user.username,
        });

        if (post) {
          await User.findByIdAndUpdate(
            context.user._id,
            { $pull: { posts: postId } }
          );
        }

        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
