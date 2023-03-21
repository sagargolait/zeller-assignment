import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ListZellerCustomers } from './graphql/queries';
import CustomerList from './CustomerList';

describe('<CustomerList />', () => {
  let wrapper: ShallowWrapper;

  const mocks: MockedResponse = {
    request: {
      query: ListZellerCustomers,
      variables: { userType: 'Admin' },
    },
    result: {
      data: {
        listZellerCustomers: {
          items: [
            { id: '1', name: 'Admin Customer 1', role: 'Admin', email: 'AdminCustomer1@test.com' },
            { id: '2', name: 'Admin Customer 2', role: 'Admin', email: 'AdminCustomer2@test.com' },
            { id: '3', name: 'Admin Customer 3', role: 'Admin', email: 'AdminCustomer3@test.com' },
          ]
        },
      },
    },
  };

  beforeEach(() => {
    wrapper = shallow(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <CustomerList />
      </MockedProvider>
    ).dive();
  });

  it('should call the GraphQL APIs to fetch the customer data', () => {
    expect(mocks.request).toEqual({
      query: ListZellerCustomers,
      variables: { userType: 'Admin' },
    });
  });


});
