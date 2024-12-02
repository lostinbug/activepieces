import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';

export const listQuotationsAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_list_quotations',
  displayName: 'List Quotations',
  description: 'Retrives all quotations.',
  props: {},
  async run(context) {
    const client = makeClient(context.auth);
    return await client.listQuotations();
  },
});
