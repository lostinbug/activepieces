import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';

export const listCompaniesAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_list_companies',
  displayName: 'List Companies',
  description: 'Retrives all comapanies.',
  props: {},
  async run(context) {
    const client = makeClient(context.auth);
    return await client.listComapnies();
  },
});
