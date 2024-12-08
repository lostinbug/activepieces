import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const getCustomerTraineeAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_get_customer_trainee',
  displayName: 'Get Customer Trainee',
  description: 'Gets customer trainee details.',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    customerId: digiformaCommon.customerId(true),
    customerTraineeId: digiformaCommon.customerTraineeId(true),
  },
  async run(context) {
    const {
      customerId,
      customerTraineeId,
    } = context.propsValue;

    const client = makeClient(context.auth);

    const response:any= await client.listCustomerTrainees(customerId!);

    return response['data']['customer']['customerTrainees'].find((trainee:{id:string})=>trainee.id===customerTraineeId!);
  }})