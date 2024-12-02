import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const addInstructorToSlotAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_add_instructor_to_slot',
  displayName: 'Add Instructor to Slot',
  description:
    'Add a training session instructor to a training session slot. Make sure you already added the instructor to the training session and you are using the id of the training session instructor and not the id of the instructor.',
  props: {
    markdown: Property.MarkDown({
      value:
        'Add a training session instructor to a training session slot. Make sure you already added the instructor to the training session and you are using the id of the training session instructor and not the id of the instructor.',
    }),
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    trainingSubSessionId: digiformaCommon.trainingSubSessionId(true),
    slotId: Property.Dropdown({
      displayName: 'Training Session Slot',
      refreshers: ['trainingSessionId', 'trainingSubSessionId'],
      required: true,
      options: async ({ auth, trainingSessionId, trainingSubSessionId }) => {
        if (!auth || !trainingSessionId || !trainingSubSessionId) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account and select training session.',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listTrainingSubSessions(trainingSessionId as string);
        const subSessionList: SubSession[] = res['data']['trainingSession']['subsessions'];

        const currentSubSession = subSessionList.find(
          (subsession) => subsession.id === trainingSubSessionId
        );

        if (currentSubSession) {
          return {
            disabled: false,
            options: currentSubSession.trainingSessionSlots?.map((slot) => {
              return {
                label: `${slot.date} (${slot.startTime}-${slot.endTime})`,
                value: slot.id,
              };
            }),
          };
        } else {
          return {
            disabled: true,
            options: [],
            placeholder: 'Training Session not found.',
          };
        }
      },
    }),
    trainingSessionInstructorId: digiformaCommon.trainingSessionInstructorId(true),
  },
  async run(context) {
    const { slotId, trainingSessionInstructorId } = context.propsValue;
    const client = makeClient(context.auth);
    return await client.addInstructorToSlot(slotId!, trainingSessionInstructorId!);
  },
});
type SubSession = {
  id: string;
  name: string;
  trainingSessionSlots: {
    id?: string;
    startTime?: string;
    endTime?: string;
    date?: string;
    slot?: string;
  }[];
};
