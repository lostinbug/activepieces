import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const listTraineesInTrainingSessionAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_list_trainees_in_session',
  displayName: 'List Trainees in Training Session',
  description: 'Retrives all trainees in given training session.',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
  },
  async run(context) {
    const trainingSessionId = context.propsValue.trainingSessionId!;
    const client = makeClient(context.auth);
    return await client.listTraineesInTrainingSession(trainingSessionId);
  },
});
