import { gql } from 'react-apollo'

export const updateCustomerMutation = gql`
  mutation ($_id: String!, $fullname: String, $email: String, $picture: String, $address: String, ) {
    updateCustomer (customer: {
      _id: $_id,
      fullname: $fullname,
      email: $email,
      picture: $picture,
      address: $address
    }) {
        _id,
        fullname,
        email,
        picture,
        address
      }
  }
`;

export const updateVendorMutation = gql`
  mutation ($_id: String!, $fullname: String, $email: String, $picture: String, $address: String, ) {
    updateVendor (vendor: {
      _id: $_id,
      fullname: $fullname,
      email: $email,
      picture: $picture,
      address: $address
    }) {
        _id,
        fullname,
        email,
        picture,
        address
      }
  }
`;
