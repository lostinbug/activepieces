import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const addCustomerFundingAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_add_customer_funding',
  displayName: 'Add Customer Funding',
  description: 'Adds customer funding to existing customer.',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    customerId: digiformaCommon.customerId(true),
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
    const { trainingSessionId, customerId, amount, fundingAgencyId, fundingAgreement } =
      context.propsValue;

    const client = makeClient(context.auth);

    const res: any = await client.listCustomersInTrainingSession(trainingSessionId!);
    const customerList: Customer[] = res['data']['trainingSession']['customers'];

    const currentCustomer = customerList.find((customer) => customer.id === customerId!);
    if (!currentCustomer) {
      throw new Error('Customer not found.');
    }
    const updatedCustomerFundings = currentCustomer.customerFundings.map((funding) => {
      return {
        amount: funding.amount,
        fundingAgreement: funding.fundingAgreement,
        fundingAgencyId: funding.fundingAgency?.id,
      };
    });
    updatedCustomerFundings.push({
      amount: amount,
      fundingAgreement: fundingAgreement,
      fundingAgencyId: fundingAgencyId,
    });

    return await client.updateCustomer(customerId!, {
      customerFundings: updatedCustomerFundings,
    });
  },
});

type Customer = {
  id: string;
  customerFundings: {
    id?: string;
    amount?: number;
    fundingAgency?: {
      id: string;
      name: string;
    };
    fundingAgreement?: string;
  }[];
};
