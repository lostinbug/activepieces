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
		const quotations: Record<string, any>[] = [];

		do {
			const response: any = await client.searchQuotations({ page: page, size: 20 });
			if (response['data']['quotations'].length === 0) {
				hasMore = false;
			} else {
				quotations.push(...response['data']['quotations']);
			}
			page += 1;
		} while (hasMore);

		return quotations.map((quotation: any) => {
			return {
				epochMilliSeconds: dayjs(quotation['updatedAt']).valueOf(),
				data: quotation,
			};
		});
	},
};

export const newOrUpdatedQuotationTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_quotation',
	displayName: 'New or Updated Quotation',
	description: 'Triggers when a quotation is created or updated.',
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
		customer: {
			id: '3407092',
		},
		date: '2024-04-05',
		id: '2270457',
		insertedAt: '2024-04-05T13:04:45',
		items: [
			{
				id: '6e04f336-6510-4c12-8cb4-2bcf4b245f1d',
				name: 'test',
				quantity: 1.0,
				type: 'training',
				unitPrice: 10.0,
				vat: 1.0,
			},
		],
		recipient: {
			firstname: null,
			id: '5040628',
			lastname: 'vdgfb',
		},
		trainingSession: {
			id: '1704980',
			name: 'test session',
		},
		updatedAt: '2024-04-05T13:04:45',
	},
});
