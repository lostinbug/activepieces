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
		const invoicePayments: Record<string, any>[] = [];

		do {
			const response: any = await client.searchInvoicePayments({ page: page, size: 20 });
			if (response['data']['invoices'].length === 0) {
				hasMore = false;
			} else {
				response['data']['invoices'].forEach((invoice: any) => {
					const invoiceId = invoice['id'];
					const invoiceDate = invoice['date'];
					const invoiceNumber = invoice['number'];
					const invoicePrefix = invoice['prefix'];

					invoice['invoicePayments'].forEach((payment: any) => {
						invoicePayments.push({
							invoiceId,
							invoiceDate,
							invoiceNumber,
							invoicePrefix,
							...payment,
						});
					});
				});
			}
			page += 1;
		} while (hasMore);

		return invoicePayments.map((payment: any) => {
			return {
				epochMilliSeconds: dayjs(payment['updatedAt']).valueOf(),
				data: payment,
			};
		});
	},
};

export const newOrUpdatedInvoicePaymentTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_invoice_payment',
	displayName: 'New or Updated Invoice Payment',
	description: 'Triggers when a invoice payment is created or updated.',
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
