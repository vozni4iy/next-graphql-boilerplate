import { gql } from 'react-apollo';

export const customerQuery = gql`
  query($_id: String!) {
    customer (_id: $_id) {
      _id,
      fullname,
      email,
      picture,
      address
    }
  }
`;

export const vendorQuery = gql`
  query($_id: String!) {
    vendor (_id: $_id) {
      _id,
      fullname,
      email,
      picture,
      address
    }
  }
`;
