import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { InvoiceItemInput } from '../../common/types';

export const createInvoiceAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_create_invoice',
  description: 'Creates a new invoice.',
  displayName: 'Create Invoice',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    customerId: digiformaCommon.customerId(true),
    markdown: Property.MarkDown({
      value: 'Choose exactly one field from funding agency,trainee or company.',
    }),
    companyId: digiformaCommon.companyId(false),
    fundingAgencyId: digiformaCommon.fundingAgencyId(false),
    traineeId: digiformaCommon.traineeId(false),
    accountingAnalytics: Property.ShortText({
      displayName: 'Cost accounting code',
      required: false,
    }),
    date: Property.DateTime({
      required: true,
      displayName: 'Bill Date',
      description: 'Use YYYY-MM-DD format.',
    }),
    freeText: Property.ShortText({
      displayName: 'Free Mention',
      required: false,
    }),
    items: Property.Array({
      displayName: 'Items',
      required: true,
      properties: {
        name: Property.ShortText({
          displayName: 'Name',
          required: true,
        }),
        description: Property.ShortText({
          displayName: 'Description',
          required: false,
        }),
        quantity: Property.Number({
          displayName: 'Quantity',
          required: true,
        }),
        type: Property.StaticDropdown({
          displayName: 'Type',
          required: true,
          options: {
            disabled: false,
            options: [
              {
                label: 'Training & Educational Costs',
                value: 'training',
              },
              {
                label: 'Additional Costs',
                value: 'other_expenses',
              },
              {
                label: 'Educational Tools',
                value: 'pedagogical_products',
              },
              {
                label: 'Outside of Training',
                value: 'non_training',
              },
            ],
          },
        }),
        unitPrice: Property.Number({
          displayName: 'Unit Price',
          required: true,
        }),
        vat: Property.Number({
          displayName: 'VAT',
          required: true,
        }),
      },
    }),
    number: Property.Number({
      displayName: 'Bill Number',
      required: true,
    }),
    prefix: Property.ShortText({
      displayName: 'Invoice Prefix',
      required: true,
    }),
  },
  async run(context) {
    const {
      customerId,
      accountingAnalytics,
      companyId,
      freeText,
      fundingAgencyId,
      traineeId,
      number,
      prefix,
    } = context.propsValue;
    const items = context.propsValue.items as InvoiceItemInput[];
    const updatedItems = items.map((item) => {
      return {
        name: item.name,
        description: item.description,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
        vat: Number(item.vat),
        type: item.type,
      };
    });

    const client = makeClient(context.auth);
    return await client.createInvoice({
      accountingAnalytics,
      customerId,
      companyId,
      freeText,
      fundingAgencyId,
      traineeId,
      number,
      prefix,
      items: updatedItems,
    });
  },
});
