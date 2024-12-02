import { digiformaAuth } from '../../';
import { DedupeStrategy, Polling, pollingHelper } from '@activepieces/pieces-common';
import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { makeClient } from '../common';
import dayjs from 'dayjs';

const polling: Polling<string, Record<string, unknown>> = {
	strategy: DedupeStrategy.TIMEBASED,
	items: async ({ auth, lastFetchEpochMS }) => {
		const client = makeClient(auth as string);
		const response: any = await client.searchCustomers({
			updatedAfter:
				lastFetchEpochMS === 0
					? dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss.SSS')
					: dayjs(lastFetchEpochMS).format('YYYY-MM-DDTHH:mm:ss.SSS'),
		});

		return response['data']['customers'].map((customer: any) => {
			return {
				epochMilliSeconds: dayjs(customer['updatedAt']).valueOf(),
				data: customer,
			};
		});
	},
};

export const newOrUpdatedCustomerTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_customer',
	displayName: 'New or Updated Customer',
	description: 'Triggers when a customer is created or updated.',
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
		contracted: false,
		contractedFundingUnknown: false,
		conventionSigned: false,
		costSalary: null,
		costs: [],
		crmStatus: 'WON',
		customerFundings: [],
		customerTrainees: [
			{
				id: '5988204',
			},
			{
				id: '5988203',
			},
		],
		estimatedTraineeCount: 1,
		foreignCustomer: false,
		id: '3343146',
		insertedAt: '2024-01-30T10:52:31',
		jobless: false,
		manualBpf: false,
		manualBpfAmount: 0.0,
		manualBpfHours: false,
		manualBpfHoursAmount: 0,
		manualBpfOtherAmount: 0.0,
		manualBpfPedagogicalAmount: 0.0,
		manualBpfTraineesAmount: 0,
		pipelineState: 0,
		qualityExpectations: null,
		qualitySuccessConditions: null,
		specialPrice: false,
		stripeId: null,
		subsessions: [
			{
				id: '2301707',
				name: 'Module 3 - Concevoir un parcours e-learning sur Digiforma',
			},
			{
				id: '2301708',
				name: "Module 2 - Créer une session de formation et gérer tout l'administratif d'une session de formation sur Digiforma",
			},
			{
				id: '2301706',
				name: 'Module 1 - Créer et suivre une opportunité commerciale sur Digiforma',
			},
		],
		updatedAt: '2024-01-30T10:52:31',
		vat: null,
	},
});
