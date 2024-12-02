import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';

export const listTrainingSessionsAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_list_training_sessions',
  displayName: 'List Training Sessions',
  description: 'Retrives all training sessions.',
  props: {},
  async run(context) {
    const client = makeClient(context.auth);
    return await client.listTrainingSessions();
  },
});
