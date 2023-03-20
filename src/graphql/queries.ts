import gql from 'graphql-tag';

export const ListZellerCustomers = gql`
  query ListZellerCustomers {
    listZellerCustomers {
      items {
        email
        id
        name
        role
      }
    }
  }
`;
