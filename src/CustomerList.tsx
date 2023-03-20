import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { ListZellerCustomers } from './graphql/queries';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { camelize } from './utils/util';

Amplify.configure(awsconfig);

export type GetCustomersQuery = {
  listZellerCustomers: {
    items: [
      {
        email: string;
        id: string;
        name: string;
        role: string;
      }
    ];
  };
};

const CustomerList: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'Manager'>(
    'Admin'
  );
  const [customers, setCustomers]: any = useState([]);

  const fetchCustomers = async () => {
    try {
      const result = (await API.graphql(
        graphqlOperation(ListZellerCustomers)
      )) as {
        data: GetCustomersQuery;
      };

      setCustomers(result?.data?.listZellerCustomers?.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [selectedRole]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value as 'Admin' | 'Manager');
  };

  const filteredCustomers = customers.filter(
    (customer: any) =>
      customer.role.toLowerCase() === selectedRole.toLowerCase()
  );

  return (
    <div className="container mx-auto flex flex-col p-12 text-lg">
      <h1 className="text-4xl">User Types</h1>
      <form className="mt-6 ">
        <div className="flex flex-col">
          <label
            style={
              selectedRole === 'Admin' ? { backgroundColor: 'aliceblue' } : {}
            }
            className="flex items-center p-4 rounded-lg"
          >
            <input
              className="w-[20px] h-[20px] mr-2"
              type="radio"
              name="role"
              value="Admin"
              checked={selectedRole === 'Admin'}
              onChange={handleRoleChange}
            />
            Admin
          </label>
          <label
            style={
              selectedRole === 'Manager' ? { backgroundColor: 'aliceblue' } : {}
            }
            className="flex items-center p-4 rounded-lg"
          >
            <input
              className="w-[20px] h-[20px] mr-2"
              type="radio"
              name="role"
              value="Manager"
              checked={selectedRole === 'Manager'}
              onChange={handleRoleChange}
            />
            Manager
          </label>
        </div>
      </form>
      <hr className="my-8" />
      <>
        <h1 className="text-4xl">{`${camelize(selectedRole)} Users`}</h1>
        <div className="mt-2 flex flex-col">
          <ul>
            {filteredCustomers.map((customers: any) => (
              <li className="flex gap-4 my-2 items-center text-medium">
                <span className="px-6 py-4 rounded-md bg-sky-50 outline-none text-sky-600">
                  {customers.name.charAt(0)}
                </span>
                <div className="flex flex-col">
                  <span className="text-md text-current">{customers.name}</span>
                  <span className="text-sm text-stone-400">
                    {camelize(customers.role)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
      <hr className="my-8" />
    </div>
  );
};

export default CustomerList;
