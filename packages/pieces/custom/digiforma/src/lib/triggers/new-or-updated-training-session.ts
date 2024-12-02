import { digiformaAuth } from '../../';
import { DedupeStrategy, Polling, pollingHelper } from '@activepieces/pieces-common';
import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { makeClient } from '../common';
import dayjs from 'dayjs';

const polling: Polling<string, Record<string, unknown>> = {
	strategy: DedupeStrategy.TIMEBASED,
	items: async ({ auth, lastFetchEpochMS }) => {
		const client = makeClient(auth as string);
		const response: any = await client.searchTrainingSessions({
			updatedAfter:
				lastFetchEpochMS === 0
					? dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss.SSS')
					: dayjs(lastFetchEpochMS).format('YYYY-MM-DDTHH:mm:ss.SSS'),
		});

		return response['data']['trainingSessions'].map((trainingSession: any) => {
			return {
				epochMilliSeconds: dayjs(trainingSession['updatedAt']).valueOf(),
				data: trainingSession,
			};
		});
	},
};

export const newOrUpdatedTrainingSessionTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_training_session',
	displayName: 'New or Updated Training Session',
	description: 'Triggers when a training session is created or updated.',
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
		academy: {
			contactEmail: null,
			id: null,
		},
		address: '',
		addressName: '',
		attendanceId: '1722051',
		baseDocuments: [],
		cityCode: null,
		code: 'AF2041381965',
		codeFundae: null,
		comments: [],
		contracted: false,
		costs: [
			{
				cost: 0.0,
				costMode: 'per_customer',
				description: 'Formation',
				id: 'a07377bc-1c30-42ea-83bc-d4aa5be3f206',
				type: 'training',
				vat: 20.0,
			},
		],
		customName: null,
		customers: [],
		dates: [],
		datesGoogleUrl: 'https://calendar.google.com/calendar/b/1',
		datesWebcalUrl: 'https://app.digiforma.com/re/9xxVIrDG',
		diploma: 'Niveau III',
		diplomaTitle: 'Le bac de toto',
		dpc: false,
		endDate: null,
		id: '1720747',
		insertedAt: '2024-02-23T15:29:30',
		name: 'Apprendre à utiliser Digiforma',
		updatedAt: '2024-02-23T15:30:15',
	},
});
