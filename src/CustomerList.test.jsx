import React from 'react';
import { shallow } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerList from './CustomerList';
import { ListZellerCustomers } from './graphql/queries';

describe('CustomerList', () => {
  const mockCustomers = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Admin',
    },
    {
      id: '2',
      name: 'Jane Doe',
      role: 'Manager',
    },
  ];

  it('renders a list of customers', async () => {
    const mocks = [
      {
        request: {
          query: ListZellerCustomers,
        },
        result: {
          data: {
            ListZellerCustomers: {
              items: mockCustomers,
            },
          },
        },
      },
    ];

    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomerList />
      </MockedProvider>
    );

    await waitFor(() => screen.getByText('John Doe'));

    expect(container.querySelector('li')?.textContent).toBe('John Doe');
    expect(container.querySelectorAll('li')).toHaveLength(2);
  });

  it('filters customers by role', () => {
    const wrapper = shallow(<CustomerList />);

    expect(wrapper.find('li')).toHaveLength(2);

    wrapper.find('input[value="Manager"]').simulate('change', {
      target: { value: 'Manager' },
    });

    expect(wrapper.find('li')).toHaveLength(1);
    expect(wrapper.find('li').text()).toBe('Jane Doe');
  });
});
