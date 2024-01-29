const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    suburb: String # Add suburb field
    posts: [Post]!
    comments: [Comment]!
  }

  type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
    topic: Topic
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
    addPost(postText: String!, topic: Topic!): Post # Remove myNeighbourhoodId argument
    addComment(postId: ID!, commentText: String!): Comment
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Comment
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
