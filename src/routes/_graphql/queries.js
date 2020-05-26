import { gql } from 'apollo-boost';

export const MESSAGES = gql`
{
  messages {
    id
    userID
    username
    text
    type
    avatarURL
    createdAt
  }
}`;
