import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';

export const createInvoicePaymentAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_create_invoice_payment',
  displayName: 'Create Invoice Payment',
  description: 'Creates a new invoice payment',
  props: {
    id: digiformaCommon.invoiceId(true),
    ...digiformaProps.invoicePayment,
  },
  async run(context) {
    const { amount, date, stripeId, freeText, mode, id } = context.propsValue;

    const client = makeClient(context.auth);
    return await client.createInvoicePayment(id!, {
      amount,
      date,
      stripeId,
      freeText,
      mode,
    });
  },
});
