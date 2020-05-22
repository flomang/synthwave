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