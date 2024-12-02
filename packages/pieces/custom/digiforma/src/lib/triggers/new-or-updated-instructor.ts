import { digiformaAuth } from '../../';
import { DedupeStrategy, Polling, pollingHelper } from '@activepieces/pieces-common';
import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { makeClient } from '../common';
import dayjs from 'dayjs';

const polling: Polling<string, Record<string, unknown>> = {
	strategy: DedupeStrategy.TIMEBASED,
	items: async ({ auth, lastFetchEpochMS }) => {
		const client = makeClient(auth as string);
		const response: any = await client.searchInstructors({
			updatedAfter:
				lastFetchEpochMS === 0
					? dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss.SSS')
					: dayjs(lastFetchEpochMS).format('YYYY-MM-DDTHH:mm:ss.SSS'),
		});

		return response['data']['instructors'].map((instructor: any) => {
			return {
				epochMilliSeconds: dayjs(instructor['updatedAt']).valueOf(),
				data: instructor,
			};
		});
	},
};

export const newOrUpdatedInstructorTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_instructor',
	displayName: 'New or Updated Instructor',
	description: 'Triggers when a instructor is created or updated.',
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
		cityCode: null,
		note: null,
		id: '303569',
		cost: null,
		countryCode: null,
		status: 'internal',
		instructorLegalNumber: null,
		civility: 'none',
		city: null,
		dpcRpps: null,
		dpcAdeli: null,
		birthCity: null,
		siret: null,
		roadAddress: null,
		insurance: null,
		birthRegion: null,
		code: 'FR4240401191',
		updatedAt: '2024-02-19T14:00:20',
		vat: 20.0,
		tags: [],
		birthName: null,
		diploma: null,
		academyId: '62648',
		phone: null,
		socialNumber: null,
		skills: null,
		accountingNumber: null,
		birthdate: null,
		lastname: 'Curry',
		country: null,
		contractAccepted: false,
		locale: 'fr',
		company: null,
		email: 'formation+pierre@digiforma.com',
		bio: null,
		logo: null,
		profession: null,
		insertedAt: '2024-01-30T10:52:36',
		externalId: null,
		firstname: 'Paul',
		nationality: null,
	},
});
