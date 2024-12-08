import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const getInvoiceAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_get_invoice',
  displayName: 'Get Invoice',
  description: 'Retrives an invoice.',
  props: {
    id: digiformaCommon.invoiceId(true),
  },
  async run(context) {
    const client = makeClient(context.auth);
    return await client.getInvoice(context.propsValue.id!);
  },
});
