import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const addSlotsInTrainingSessionAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_add_slots_in_training_session',
  displayName: 'Add Slots in Training Session',
  description: 'Adds new slot in existing training session.',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    trainingSubSessionId: digiformaCommon.trainingSubSessionId(true),
    date: Property.DateTime({
      displayName: 'Slot Date',
      description: 'Use YYYY-MM-DD format.',
      required: true,
    }),
    startTime: Property.ShortText({
      displayName: 'Slot Start Time',
      description: 'Use HH:MM:SS format',
      required: true,
    }),
    endTime: Property.ShortText({
      displayName: 'Slot end Time',
      description: 'Use HH:MM:SS format',
      required: true,
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
    const { trainingSessionId, trainingSubSessionId, startTime, endTime, slot, date } =
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

    const updatedSlotList = currentSubSession.trainingSessionSlots.map((slot) => {
      return {
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        slot: slot.slot,
      };
    });
    updatedSlotList.push({
      date: date,
      startTime: startTime,
      endTime: endTime,
      slot: slot,
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
