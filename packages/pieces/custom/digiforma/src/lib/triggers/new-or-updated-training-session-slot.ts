import { digiformaAuth } from '../../';
import { DedupeStrategy, Polling, pollingHelper } from '@activepieces/pieces-common';
import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { makeClient } from '../common';
import dayjs from 'dayjs';

const polling: Polling<string, Record<string, unknown>> = {
	strategy: DedupeStrategy.TIMEBASED,
	items: async ({ auth, lastFetchEpochMS }) => {
		const client = makeClient(auth as string);

		let hasMore = true;
		let page = 0;
		const slots: Record<string, any>[] = [];

		do {
			const response: any = await client.searchTrainingSessionSlots({ page: page, size: 20 });
			if (response['data']['trainingSessions'].length === 0) {
				hasMore = false;
			} else {
				response['data']['trainingSessions'].forEach((session: any) => {
					const trainingSessionname = session['name'];
					const trainingSessionId = session['id'];

					session['trainingSessionSlots'].forEach((slot: any) => {
						slots.push({
							...slot,
							trainingSessionId,
							trainingSessionname,
						});
					});
				});
			}
			page += 1;
		} while (hasMore);

		return slots.map((slot: any) => {
			return {
				epochMilliSeconds: dayjs(slot['updatedAt']).valueOf(),
				data: slot,
			};
		});
	},
};

export const newOrUpdatedTrainingSessionSlotTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_training_session_slot',
	displayName: 'New or Updated Training Session Slot',
	description: 'Triggers when a training session slot is created or updated.',
	type: TriggerStrategy.POLLING,
	props: {},
	async test(context) {
		const { store, auth, propsValue } = context;
		return await pollingHelper.test(polling, { store, auth, propsValue });
	},
	async onEnable(context) {
		const { store, auth, propsValue } = context;
		await pollingHelper.onEnable(polling, { store, auth, propsValue });
	},

	async onDisable(context) {
		const { store, auth, propsValue } = context;
		await pollingHelper.onDisable(polling, { store, auth, propsValue });
	},

	async run(context) {
		const { store, auth, propsValue } = context;
		return await pollingHelper.poll(polling, { store, auth, propsValue });
	},
	sampleData: {
		trainingSessionId: '1711427',
		trainingSessionname: 'test session',
		bypassConflicts: false,
		date: '2024-02-20',
		endTime: '12:00:00',
		id: '20164740',
		insertedAt: '2024-02-19T15:40:12',
		room: null,
		slot: 'morning',
		startTime: '11:00:00',
		subsession: {
			id: '2354347',
			name: 'Module 1',
		},
		trainingSessionInstructors: [
			{
				id: '1384183',
				instructor: {
					firstname: 'Marie',
					id: '303568',
					lastname: 'Curry',
				},
				tutoringType: 'EMAIL',
			},
		],
		updatedAt: '2024-02-19T15:40:12',
	},
});
