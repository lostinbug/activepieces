import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';
import { CreateInvoiceInput, InvoiceItemInput } from '../../common/types';

export const updateInvoiceAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_invoice_invoice',
  description: 'Updates an existing invoice.',
  displayName: 'Update Invoice',
  props: {
    id: digiformaCommon.invoiceId(true),
    ...digiformaProps.invoice,
  },
  async run(context) {
    const { accountingAnalytics, id, freeText, number, prefix } =
      context.propsValue;
    const items = context.propsValue.items as InvoiceItemInput[];
    const updatedItems = items
      .filter((item) => Object.keys(item).length !== 0)
      .map((item) => {
        return {
          name: item.name,
          description: item.description,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
          vat: Number(item.vat),
          type: item.type,
        };
      });

    const invoiceInput: CreateInvoiceInput = {
      accountingAnalytics,
      freeText,
      number,
      prefix,
    };

    if (updatedItems.length > 0) {
      invoiceInput.items = updatedItems;
    }

    const client = makeClient(context.auth);
    return await client.updateInvoice(id!, invoiceInput);
  },
});
