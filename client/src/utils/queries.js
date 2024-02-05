import { gql } from "@apollo/client";

const QUERY_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      suburb
      posts {
        _id
        postTitle
        postText
        createdAt
      }
    }
  }
`;

const QUERY_POSTS = gql`
  query GetPosts {
    posts {
      _id
      postTitle
      postTopic
      postText
      createdAt
      postAuthor {
        _id
        username
      }
      }
    }
  }
`;

const QUERY_SINGLE_POST = gql`
  query GetSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      postTitle
      postTopic
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

const QUERY_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
      subrub
      posts {
        _id
        postTitle
        postText
        postAuthor
        createdAt
        // comments {
        //   _id
        //   commentText
        //   commentAuthor
        //   createdAt
        // }
      }
    }
  }
`;
