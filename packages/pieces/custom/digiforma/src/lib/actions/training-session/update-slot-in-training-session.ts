import { digiformaAuth } from '../../..';

import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaCommon, makeClient } from '../../common';

export const updateSlotInTrainingSessionAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_update_slot_in_training_session',
  displayName: 'Update Slot in Training Session',
  description: 'Updates an existing slot in training session.',
  props: {
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
    date: Property.DateTime({
      displayName: 'Slot Date',
      description: 'Use YYYY-MM-DD format.',
      required: false,
    }),
    startTime: Property.ShortText({
      displayName: 'Slot Start Time',
      description: 'Use HH:MM:SS format',
      required: false,
    }),
    endTime: Property.ShortText({
      displayName: 'Slot end Time',
      description: 'Use HH:MM:SS format',
      required: false,
    }),
    slot: Property.StaticDropdown({
      displayName: 'Slot',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'Morning',
            value: 'morning',
          },
          {
            label: 'Afternoon',
            value: 'afternoon',
          },
        ],
      },
    }),
  },
  async run(context) {
    const { trainingSessionId, trainingSubSessionId, startTime, endTime, slot, slotId, date } =
      context.propsValue;

    const client = makeClient(context.auth);

    const res: any = await client.listTrainingSubSessions(trainingSessionId!);

    const subSessionList: SubSession[] = res['data']['trainingSession']['subsessions'];
    const currentSubSession = subSessionList.find(
      (subsession) => subsession.id === trainingSubSessionId
    );

    if (!currentSubSession) {
      throw new Error('SubSession not found.');
    }

    const updatedSlotList = currentSubSession.trainingSessionSlots.map((slotObj) => {
      if (slotObj.id === slotId!) {
        return {
          date: date ?? slotObj.date,
          startTime: startTime ?? slotObj.startTime,
          endTime: endTime ?? slotObj.endTime,
          slot: slot ?? slotObj.slot,
        };
      }
      return {
        date: slotObj.date,
        startTime: slotObj.startTime,
        endTime: slotObj.endTime,
        slot: slotObj.slot,
      };
    });

    return await client.updateTrainingSubSession(trainingSubSessionId!, {
      dates: updatedSlotList,
    });
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
