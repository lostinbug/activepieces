import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const removeTraineeFromTrainingSessionAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_remove_trainee_from_training_session',
  displayName: 'Remove Trainee from Training Session',
  description: 'Removes existing trainee from training session.',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    traineeId: digiformaCommon.customerId(true, 'Trainee'),
  },
  async run(context) {
    const traineeId = context.propsValue.traineeId!;

    const client = makeClient(context.auth);
    return await client.deleteCustomer(traineeId);
  },
});
