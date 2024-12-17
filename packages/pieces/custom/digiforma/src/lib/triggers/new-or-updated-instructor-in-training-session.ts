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
		const instructors: Record<string, any>[] = [];

		do {
			const response: any = await client.searchInstructorsInTrainingSession({
				page: page,
				size: 20,
			});
			if (response['data']['trainingSessions'].length === 0) {
				hasMore = false;
			} else {
				response['data']['trainingSessions'].forEach((session: any) => {
					const trainingSessionname = session['name'];
					const trainingSessionId = session['id'];

					session['trainingSessionInstructors'].forEach((instructor: any) => {
						instructors.push({
							...instructor,
							trainingSessionId,
							trainingSessionname,
						});
					});
				});
			}
			page += 1;
		} while (hasMore);

		return instructors.map((trainee: any) => {
			return {
				epochMilliSeconds: dayjs(trainee['updatedAt']).valueOf(),
				data: trainee,
			};
		});
	},
};

export const newOrUpdatedInstructorInTrainingSessionTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_instructor_in_training_session',
	displayName: 'New or Updated Instructor in Training Session',
	description: 'Triggers when a instructor in training session is created or updated.',
	type: TriggerStrategy.POLLING,
	props: {},
	async test(context) {
		const { store, auth, propsValue,files } = context;
		return await pollingHelper.test(polling, { store, auth, propsValue,files });
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
		const { store, auth, propsValue,files } = context;
		return await pollingHelper.poll(polling, { store, auth, propsValue,files });
	},
	sampleData: {
		trainingSessionId: '1711427',
		trainingSessionName: 'test session',
		contractAccepted: false,
		cost: 0.0,
		costMode: 'DAILY',
		days: null,
		hours: null,
		id: '1450667',
		insertedAt: '2024-04-05T16:39:04',
		instructor: {
			firstname: 'Dhruv',
			id: '312058',
			lastname: 'John',
		},
		subcontractingBpf: false,
		tutoringType: null,
		updatedAt: '2024-04-05T16:39:04',
		vat: 20.0,
	},
});
