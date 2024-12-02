import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';

export const listInvoicesAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_list_invoices',
  displayName: 'List Invoices',
  description: 'Retrives all invoices.',
  props: {},
  async run(context) {
    const client = makeClient(context.auth);
    return await client.listInvoices();
  },
});
