const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    suburb: String
    posts: [Post]!
    comments: [Comment]!
  }

  type Post {
    _id: ID
    postTitle: String
    postTopic: PostTopic
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
  }
  
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  enum PostTopic {
    NEWS
    FOR_SALE
    CRIME
    INFRASTRUCTURE
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String, postTopic: PostTopic): [Post]  # Change topic to postTopic
    post(postId: ID!): Post
    comments(postId: ID!): [Comment]
    me: User
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!, suburb: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postTitle: String!, postText: String!, postTopic: PostTopic!, postAuthor: String!): Post  # Change Topic to PostTopic
    addComment(postId: ID!, commentText: String!): Comment
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Comment
    updatePost(postId: ID!, postText: String!): Post
  }
  
  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
