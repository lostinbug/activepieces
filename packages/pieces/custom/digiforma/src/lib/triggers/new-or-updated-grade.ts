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
		const grades: Record<string, any>[] = [];

		do {
			const response: any = await client.searchTraineeGrades({ page: page, size: 20 });
			if (response['data']['trainees'].length === 0) {
				hasMore = false;
			} else {
				response['data']['trainees'].forEach((trainee: any) => {
					grades.push(...trainee['grades']);
				});
			}
			page += 1;
		} while (hasMore);

		return grades.map((grade: any) => {
			return {
				epochMilliSeconds: dayjs(grade['updatedAt']).valueOf(),
				data: grade,
			};
		});
	},
};

export const newOrUpdatedGradeTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_grade',
	displayName: 'New or Updated Grade',
	description: 'Triggers when a grade is created or updated.',
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
		description: 'uocuoc',
		id: '30148',
		insertedAt: '2024-02-19T14:08:14',
		label: 'ndbvk',
		scoreComment: 'toto',
		scoreResult: 4,
		trainee: {
			firstname: 'Régis',
			id: '4902530',
			lastname: 'Soeur',
		},
		trainingSession: {
			id: '1676507',
			name: 'Session DEMO : Apprendre à utiliser Digiforma',
		},
		updatedAt: '2024-02-19T14:10:05',
	},
});
