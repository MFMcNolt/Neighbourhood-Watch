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
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
    topic: Topic!
  }
  
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  enum Topic {
    NEWS
    FOR_SALE
    CRIME
    INFRASTRUCTURE
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String, topic: Topic): [Post]
    post(postId: ID!): Post
    comments(postId: ID!): [Comment]
    me: User
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!, suburb: String!): Auth # Add suburb argument
    login(email: String!, password: String!): Auth
    addPost(postTitle: String! postText: String!, topic: Topic!): Post
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
