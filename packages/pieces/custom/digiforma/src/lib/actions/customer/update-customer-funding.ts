import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const updateCustomerFundingAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_update_customer_funding',
  displayName: 'Update Customer Funding',
  description: 'Updates customer funding to existing customer.',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    customerId: digiformaCommon.customerId(true),
    customerFundingId: Property.Dropdown<string>({
      displayName: 'Funding ID',
      refreshers: ['trainingSessionId', 'customerId'],
      required: true,
      options: async ({ auth, trainingSessionId, customerId }) => {
        if (!auth || !trainingSessionId || !customerId) {
          return {
            disabled: true,
            options: [],
            placeholder: 'select training session and customer first.',
          };
        }

        const client = makeClient(auth as string);

        const res: any = await client.listCustomersInTrainingSession(trainingSessionId as string);
        const customerList: Customer[] = res['data']['trainingSession']['customers'];

        const currentCustomer = customerList.find(
          (customer) => customer.id === (customerId as string)
        );
        return {
          disabled: false,
          options: currentCustomer
            ? currentCustomer.customerFundings.map((funding) => {
                return {
                  label: funding.fundingAgency.name,
                  value: funding.id,
                };
              })
            : [],
        };
      },
    }),
    fundingAgencyId: digiformaCommon.fundingAgencyId(true),
    amount: Property.Number({
      displayName: 'Amount',
      required: true,
    }),
    fundingAgreement: Property.ShortText({
      displayName: 'Support agreement reference',
      required: false,
    }),
  },
  async run(context) {
    const {
      trainingSessionId,
      customerId,
      amount,
      customerFundingId,
      fundingAgencyId,
      fundingAgreement,
    } = context.propsValue;

    const client = makeClient(context.auth);

    const res: any = await client.listCustomersInTrainingSession(trainingSessionId!);
    const customerList: Customer[] = res['data']['trainingSession']['customers'];

    const currentCustomer = customerList.find((customer) => customer.id === customerId!);
    if (!currentCustomer) {
      throw new Error('Customer not found.');
    }

    const updatedCustomerFundings = currentCustomer.customerFundings.map((funding) => {
      if (funding.id === customerFundingId) {
        return {
          amount: amount ?? funding.amount,
          fundingAgreement: fundingAgreement ?? funding.fundingAgreement,
          fundingAgencyId: fundingAgencyId ?? funding.fundingAgency?.id,
        };
      } else {
        return {
          amount: funding.amount,
          fundingAgreement: funding.fundingAgreement,
          fundingAgencyId: funding.fundingAgency?.id,
        };
      }
    });

    return await client.updateCustomer(customerId!, {
      customerFundings: updatedCustomerFundings,
    });
  },
});

type Customer = {
  id: string;
  customerFundings: {
    id: string;
    amount: number;
    fundingAgency: {
      id: string;
      name: string;
    };
    fundingAgreement?: string;
  }[];
};
