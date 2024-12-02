import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const addTraineeInTrainingSession = createAction({
  auth: digiformaAuth,
  name: 'digiforma_add_trainee_in_session',
  displayName: 'Add Trainee in Training Session',
  description: 'Adds trainee in existing training session.',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    traineeId: digiformaCommon.traineeId(
      true,
      'Select the trainee who is not part of the training session.'
    ),
    crmStatus: Property.StaticDropdown({
      displayName: 'CRM status',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'CANCELLED',
            value: 'CANCELLED',
          },
          { label: 'COMPLETED', value: 'COMPLETED' },
          { label: 'LOST', value: 'LOST' },
          { label: 'UNDECIDED', value: 'UNDECIDED' },
          { label: 'WON', value: 'WON' },
        ],
      },
    }),
  },
  async run(context) {
    const trainingSessionId = context.propsValue.trainingSessionId!;
    const traineeId = context.propsValue.traineeId!;
    const crmStatus = context.propsValue.crmStatus;

    const client = makeClient(context.auth);
    return await client.createCustomer({
      trainingSessionId: trainingSessionId,
      traineeId: traineeId,
      crmStatus: crmStatus,
    });
  },
});
