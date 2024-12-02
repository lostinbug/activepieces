import { digiformaAuth } from '../../';
import { DedupeStrategy, Polling, pollingHelper } from '@activepieces/pieces-common';
import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { makeClient } from '../common';
import dayjs from 'dayjs';

const polling: Polling<string, Record<string, unknown>> = {
	strategy: DedupeStrategy.TIMEBASED,
	items: async ({ auth, lastFetchEpochMS }) => {
		const client = makeClient(auth as string);
		const response: any = await client.searchCompanies({
			updatedAfter:
				lastFetchEpochMS === 0
					? dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss.SSS')
					: dayjs(lastFetchEpochMS).format('YYYY-MM-DDTHH:mm:ss.SSS'),
		});

		return response['data']['companies'].map((company: any) => {
			return {
				epochMilliSeconds: dayjs(company['updatedAt']).valueOf(),
				data: company,
			};
		});
	},
};

export const newOrUpdatedCompanyTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_company',
	displayName: 'New or Updated Company',
	description: 'Triggers when a company is created or updated.',
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
		ape: null,
		city: null,
		cityCode: null,
		code: 'EN2359130861',
		country: null,
		countryCode: null,
		email: null,
		employeesCount: null,
		externalId: null,
		id: '1197966',
		idcc: null,
		insertedAt: '2024-01-30T10:52:31',
		isRlt: false,
		locale: 'fr',
		nace: null,
		name: 'Ecole de la compétence',
		note: null,
		opca: null,
		opcaNumber: null,
		phone: null,
		publicOrganization: false,
		rcsCity: null,
		roadAddress: null,
		siret: null,
		updatedAt: '2024-01-30T10:52:36',
		vat: null,
		website: null,
	},
});
