import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';

export const updateCustomerAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_update_customer',
  displayName: 'Update Customer',
  description: 'Updates an existing customer in a training session.',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    customerId: digiformaCommon.customerId(true),
    ...digiformaProps.customer,
  },
  async run(context) {
    const {
      customerId,
      accountingNumber,
      contracted,
      conventionSigned,
      crmStatus,
      estimatedTraineeCount,
      foreignCustomer,
      jobless,
      stripeId,
      vat,
    } = context.propsValue;

    const client = makeClient(context.auth);
    return await client.updateCustomer(customerId!, {
      accountingNumber,
      contracted,
      conventionSigned,
      crmStatus,
      estimatedTraineeCount,
      foreignCustomer,
      jobless,
      stripeId,
      vat,
    });
  },
});
