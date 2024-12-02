import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';

export const createCustomerAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_create_customer',
  displayName: 'Create Customer',
  description: 'Creates a customer in a training session.',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    markdown: Property.MarkDown({
      value: "Don't use companyid and traineeid at the same time.",
    }),
    companyId: digiformaCommon.companyId(false),
    traineeId: digiformaCommon.traineeId(false),
    ...digiformaProps.customer,
  },
  async run(context) {
    const {
      trainingSessionId,
      accountingNumber,
      companyId,
      contracted,
      conventionSigned,
      crmStatus,
      estimatedTraineeCount,
      foreignCustomer,
      jobless,
      stripeId,
      traineeId,
      vat,
    } = context.propsValue;

    const client = makeClient(context.auth);
    return await client.createCustomer({
      trainingSessionId,
      accountingNumber,
      companyId,
      contracted,
      conventionSigned,
      crmStatus,
      estimatedTraineeCount,
      foreignCustomer,
      jobless,
      stripeId,
      traineeId,
      vat,
    });
  },
});
