import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { InvoiceItemInput } from '../../common/types';

export const createQuotationAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_create_quotation',
  displayName: 'Create Quotation',
  description: 'Creates a new quotation.',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    customerId: digiformaCommon.customerId(true),
    markdown: Property.MarkDown({
      value: 'Choose exactly one field from funding agency,trainee or company.',
    }),
    fundingAgencyId: digiformaCommon.fundingAgencyId(false),
    traineeId: digiformaCommon.traineeId(false),
    companyId: digiformaCommon.companyId(false),

    date: Property.DateTime({
      displayName: 'Date',
      description: 'Use YYYY-MM-DD format.',
      required: true,
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
  },
  async run(context) {
    const { companyId, customerId, date, fundingAgencyId, traineeId } = context.propsValue;
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
    return await client.createQuotation({
      companyId,
      customerId,
      date,
      fundingAgencyId,
      items: updatedItems,
      traineeId,
    });
  },
});
