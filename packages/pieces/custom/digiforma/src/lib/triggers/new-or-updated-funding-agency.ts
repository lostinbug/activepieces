import { digiformaAuth } from '../../';
import { DedupeStrategy, Polling, pollingHelper } from '@activepieces/pieces-common';
import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { makeClient } from '../common';
import dayjs from 'dayjs';

const polling: Polling<string, Record<string, unknown>> = {
	strategy: DedupeStrategy.TIMEBASED,
	items: async ({ auth, lastFetchEpochMS }) => {
		const client = makeClient(auth as string);
		const response: any = await client.searchFundingAgencies({
			updatedAfter:
				lastFetchEpochMS === 0
					? dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss.SSS')
					: dayjs(lastFetchEpochMS).format('YYYY-MM-DDTHH:mm:ss.SSS'),
		});

		return response['data']['fundingAgencies'].map((agency: any) => {
			return {
				epochMilliSeconds: dayjs(agency['updatedAt']).valueOf(),
				data: agency,
			};
		});
	},
};

export const newOrUpdatedFundingAgencyTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_funding_agency',
	displayName: 'New or Updated Funding Agency',
	description: 'Triggers when a funding agency is created or updated.',
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
		accountingNumber: null,
		city: null,
		cityCode: null,
		code: 'FE9341882088',
		country: 'France',
		countryCode: 'FR',
		email: null,
		externalId: null,
		id: '127857',
		insertedAt: '2024-01-30T10:52:31',
		locale: 'fr',
		name: 'Caisse des Dépôts et des Consignations',
		note: null,
		phone: null,
		roadAddress: null,
		siret: null,
		trainingSessions: [
			{
				id: '1711427',
				name: 'say my name',
			},
			{
				id: '1704980',
				name: 'test session',
			},
		],
		type: 'Caisse des Dépôts',
		updatedAt: '2024-01-30T10:52:36',
	},
});
