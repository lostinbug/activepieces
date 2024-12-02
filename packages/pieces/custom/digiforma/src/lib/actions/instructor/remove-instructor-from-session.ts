import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const removeInstructorFromTrainingSessionAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_remove_instructor_from_training_session',
  displayName: 'Remove Instructor from Training Session',
  description: 'Removes instructor from training session.',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    trainingSessionInstructorId: digiformaCommon.trainingSessionInstructorId(true),
  },
  async run(context) {
    const { trainingSessionInstructorId } = context.propsValue;
    const client = makeClient(context.auth);
    return await client.removeInstructorFromTrainingSession(trainingSessionInstructorId!);
  },
});
