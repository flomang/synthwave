import { gql } from 'apollo-boost';

export const MESSAGE_POSTED = gql`
  subscription($user: String!) {
    messagePosted(user: $user) {
      id
      username
      avatarURL
      type
      text
      createdAt
    }
  }
`;
