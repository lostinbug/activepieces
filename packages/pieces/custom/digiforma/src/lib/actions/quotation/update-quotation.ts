import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';
import { digiformaProps } from '../../common/props';
import { CreateInvoiceInput, InvoiceItemInput } from '../../common/types';

export const updateQuotationAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_update_quotation',
  displayName: 'update Quotation',
  description: 'updates an existing quotation.',
  props: {
    quotation_id: Property.ShortText({
      displayName: 'Quotation ID',
      required: true,
    }),
    ...digiformaProps.quotation,
  },
  async run(context) {
    const { date, quotation_id } = context.propsValue;
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
      date,
    };

    if (updatedItems.length > 0) {
      invoiceInput.items = updatedItems;
    }
    const client = makeClient(context.auth);
    return await client.updateQuotation(quotation_id, invoiceInput);
  },
});
