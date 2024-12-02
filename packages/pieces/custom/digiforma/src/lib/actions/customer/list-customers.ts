import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';

export const listCustomersAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_list_customers',
  displayName: 'List Customers',
  description: 'Retrives all customers.',
  props: {},
  async run(context) {
    const client = makeClient(context.auth);
    return await client.listCustomers();
  },
});
