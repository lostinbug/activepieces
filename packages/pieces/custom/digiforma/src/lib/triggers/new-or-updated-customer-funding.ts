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
		const fundings: Record<string, any>[] = [];

		do {
			const response: any = await client.searchCustomerFundings({ page: page, size: 20 });
			if (response['data']['customers'].length === 0) {
				hasMore = false;
			} else {
				response['data']['customers'].forEach((customer: any) => {
					const customerId = customer['id'];

					customer['customerFundings'].forEach((funding: any) => {
						fundings.push({
							...funding,
							customerId,
						});
					});
				});
			}
			page += 1;
		} while (hasMore);

		return fundings.map((funding: any) => {
			return {
				epochMilliSeconds: dayjs(funding['updatedAt']).valueOf(),
				data: funding,
			};
		});
	},
};

export const newOrUpdatedCustomerFundingTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_customer_funding',
	displayName: 'New or Updated Customer Funding',
	description: 'Triggers when a customer funding is created or updated.',
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
		customerId: '3406281',
		amount: 109.0,
		cif: false,
		contratApprentissage: false,
		contratPro: false,
		cpf: false,
		cpfCode: null,
		cpfDuration: null,
		cpfTransition: false,
		fundingAgency: {
			id: '127857',
			name: 'Caisse des Dépôts et des Consignations',
		},
		fundingAgreement: null,
		id: '979864',
		insertedAt: '2024-02-15T08:32:48',
		manualBpfAmount: 0.0,
		periodePro: false,
		planFormation: false,
		subrogation: false,
		updatedAt: '2024-02-15T08:32:48',
	},
});
