import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const removeInstructorFromSlotAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_remove_instructor_from_slot',
  displayName: 'Remove Instructor from Slot',
  description:
    'Removes a training session instructor from a training session slot. If no instructor get assign to a slot, all instructor registered to the training session will appear on the slot. If your request fail, there might be no instructor assigned to the slot.',
  props: {
    markdown: Property.MarkDown({
      value:
        'Remove a training session instructor from a training session slot. If no instructor get assign to a slot, all instructor registered to the training session will appear on the slot. If your request fail, there might be no instructor assigned to the slot.',
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
    return await client.removeInstructorFromSlot(slotId!, trainingSessionInstructorId!);
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