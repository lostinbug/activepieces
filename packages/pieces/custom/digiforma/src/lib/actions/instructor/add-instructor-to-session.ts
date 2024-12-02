import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const addInstructorToTrainingSessionAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_add_instructor_to_training_session',
  displayName: 'Add Instructor to Training Session',
  description: 'Adds an existing instructor to an existing training session.',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    instructorId: digiformaCommon.instructorId(true),
    contractAccepted: Property.Checkbox({
      displayName: 'Contact Accepted?',
      required: false,
    }),
    cost: Property.Number({
      displayName: 'Cost',
      required: false,
    }),
    costMode: Property.StaticDropdown({
      displayName: 'Cost Mode',
      required: true,
      options: {
        disabled: false,
        options: [
          {
            label: 'Per Day',
            value: 'DAILY',
          },
          {
            label: 'Flat Rate',
            value: 'FIXED',
          },
          {
            label: 'Per Hour',
            value: 'HOURLY',
          },
        ],
      },
    }),
    days: Property.Number({
      displayName: 'Days',
      required: false,
    }),
    hours: Property.Number({
      displayName: 'Hours',
      required: false,
    }),
    subcontractingBpf: Property.Checkbox({
      displayName: 'Subcontacting BPF',
      required: false,
    }),
    tutoringType: Property.StaticDropdown({
      displayName: 'Tutoring Type',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'Email',
            value: 'EMAIL',
          },
          {
            label: 'Forum',
            value: 'FORUM',
          },
          {
            label: 'Livestream',
            value: 'LIVESTREAM',
          },
          {
            label: 'Other',
            value: 'OTHER',
          },
        ],
      },
    }),
    vat: Property.Number({
      displayName: 'VAT',
      required: false,
    }),
  },
  async run(context) {
    const {
      contractAccepted,
      cost,
      costMode,
      days,
      hours,
      instructorId,
      subcontractingBpf,
      trainingSessionId,
      tutoringType,
      vat,
    } = context.propsValue;
    const client = makeClient(context.auth);
    return await client.addInstructorToTrainingSession({
      contractAccepted,
      cost,
      costMode,
      days,
      hours,
      instructorId,
      subcontractingBpf,
      trainingSessionId,
      tutoringType,
      vat,
    });
  },
});
