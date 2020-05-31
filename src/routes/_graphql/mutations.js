import { gql } from 'apollo-boost';

export const SIGN_UP = gql`
  mutation($email: String!, $username: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id 
      email
      emailVerified
      username
    }
  }
`;

export const SIGN_IN = gql`
  mutation($email: String!, $password: String!, $remember: Boolean!) {
    signin(email: $email, password: $password, remember: $remember) {
      user {
        id 
        username 
        avatarURL
        email 
        emailVerified
      }
      token {
        jwt
        refresh
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation($selector: String!) {
    signout(selector: $selector) 
  }
`;

export const POST_MESSAGE = gql`
  mutation($input: MessageInput) {
    postMessage(input: $input) {
      id 
      username 
      createdAt
      text
    }
  }
`;