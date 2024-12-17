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
		const contacts: Record<string, any>[] = [];

		do {
			const response: any = await client.searchContacts({ page: page, size: 20 });
			if (response['data']['companies'].length === 0) {
				hasMore = false;
			} else {
				response['data']['companies'].forEach((company: any) => {
					const companyName = company['name'];
					const companyId = company['id'];

					company['contacts'].forEach((contact: any) => {
						contacts.push({
							...contact,
							companyId,
							companyName,
						});
					});
				});
			}
			page += 1;
		} while (hasMore);

		return contacts.map((contact: any) => {
			return {
				epochMilliSeconds: dayjs(contact['updatedAt']).valueOf(),
				data: contact,
			};
		});
	},
};

export const newOrUpdatedContactTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_contact',
	displayName: 'New or Updated Contact',
	description: 'Triggers when a contact is created or updated.',
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
		civility: 'mme',
		email: 'formation+petronille@digiforma.com',
		fax: null,
		firstname: 'Pétro',
		id: '789147',
		insertedAt: '2024-01-30T10:52:31',
		lastname: 'Nille',
		phone: null,
		position: 'Directrice ',
		tags: ['learning'],
		title: "Directrice de l'Organisme de Formation",
		updatedAt: '2024-01-30T10:52:31',
		companyId: '1197965',
		companyName: 'Organisme de formation Junior',
	},
});
