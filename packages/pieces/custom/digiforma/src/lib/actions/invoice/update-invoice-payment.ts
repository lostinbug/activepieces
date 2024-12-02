import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';

export const updateInvoicePaymentAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_update_invoice_payment',
  displayName: 'Update Invoice Payment',
  description: 'Updates an existing invoice payment.',
  props: {
    invoiceId: digiformaCommon.invoiceId(true),
    invoicePaymentId: Property.Dropdown({
      displayName: 'Invoice Payment ID',
      refreshers: ['invoiceId'],
      required: true,
      options: async ({ auth, invoiceId }) => {
        if (!auth || !invoiceId) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account and select invoice.',
          };
        }

        const client = makeClient(auth as string);
        const res: any = await client.listInvoicePayments(invoiceId as string);

        return {
          disabled: false,
          options: res['data']['invoice']['invoicePayments'].map(
            (payment: { id: string; freeText?: string; mode: string; amount: number }) => {
              return {
                label: payment.freeText ?? `${payment.mode}-${payment.amount}`,
                value: payment.id,
              };
            }
          ),
        };
      },
    }),
    ...digiformaProps.invoicePayment,
  },
  async run(context) {
    const { amount, date, stripeId, freeText, mode, invoicePaymentId } = context.propsValue;

    const client = makeClient(context.auth);
    return await client.updateInvoicePayment(invoicePaymentId, {
      amount,
      date,
      stripeId,
      freeText,
      mode,
    });
  },
});
