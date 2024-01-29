const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    myNeighbourhood: MyNeighbourhood
    posts: [Post]!
    comments: [Comment]!
  }

  type MyNeighbourhood {
    _id: ID
    name: String
    description: String
    posts: [Post]!
  }

  enum Topic {
    NEWS
    FOR_SALE
    CRIME
    INFRASTRUCTURE
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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    myNeighbourhoods: [MyNeighbourhood]
    myNeighbourhood(name: String!): MyNeighbourhood
    posts(username: String, topic: Topic): [Post]
    post(postId: ID!): Post
    comments(postId: ID!): [Comment]
    me: User
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMyNeighbourhood(name: String!, description: String!): MyNeighbourhood
    addPost(postText: String!, myNeighbourhoodId: ID!, topic: Topic!):
    addComment(postId: ID!, commentText: String!): Comment
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Comment
  }
  
`;

module.exports = typeDefs;






// const typeDefs = `
//   type User {
//     _id: ID
//     username: String
//     email: String
//     password: String
//     thoughts: [Thought]!
//   }

//   type Thought {
//     _id: ID
//     thoughtText: String
//     thoughtAuthor: String
//     createdAt: String
//     comments: [Comment]!
//   }

//   type Comment {
//     _id: ID
//     commentText: String
//     commentAuthor: String
//     createdAt: String
//   }

//   type Auth {
//     token: ID!
//     user: User
//   }

//   type Query {
//     users: [User]
//     user(username: String!): User
//     thoughts(username: String): [Thought]
//     thought(thoughtId: ID!): Thought
//     me: User
//   }

//   type Mutation {
//     addUser(username: String!, email: String!, password: String!): Auth
//     login(email: String!, password: String!): Auth
//     addThought(thoughtText: String!): Thought
//     addComment(thoughtId: ID!, commentText: String!): Thought
//     removeThought(thoughtId: ID!): Thought
//     removeComment(thoughtId: ID!, commentId: ID!): Thought
//   }
// `;

// module.exports = typeDefs;
