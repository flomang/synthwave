import { gql } from 'apollo-boost';

export const SIGN_UP = gql`
  mutation Signup($email: String!, $username: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id 
      email
      emailVerified
      username
    }
  }
`;

export const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!, $remember: Boolean!) {
    signin(email: $email, password: $password, remember: $remember) {
      user {
        id 
        email 
        emailVerified
        username 
      }
      token {
        jwt
        refresh
      }
    }
  }
`;