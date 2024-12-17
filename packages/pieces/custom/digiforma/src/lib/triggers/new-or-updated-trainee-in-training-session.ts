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
		const trainees: Record<string, any>[] = [];

		do {
			const response: any = await client.searchTraineesInTrainingSession({
				page: page,
				size: 20,
			});
			if (response['data']['trainingSessions'].length === 0) {
				hasMore = false;
			} else {
				response['data']['trainingSessions'].forEach((session: any) => {
					const trainingSessionname = session['name'];
					const trainingSessionId = session['id'];

					session['customers'].forEach((customer: any) => {
						trainees.push({
							...customer,
							trainingSessionId,
							trainingSessionname,
						});
					});
				});
			}
			page += 1;
		} while (hasMore);

		return trainees.map((trainee: any) => {
			return {
				epochMilliSeconds: dayjs(trainee['updatedAt']).valueOf(),
				data: trainee,
			};
		});
	},
};

export const newOrUpdatedTraineeInTrainingSessionTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_trainee_in_training_session',
	displayName: 'New or Updated Trainee in Training Session',
	description: 'Triggers when a trainee in training session is created or updated.',
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
		trainingSessionId: '1711427',
		trainingSessionName: 'test session',
		phoneSecondary: null,
		cityCode: null,
		id: '5022609',
		vatAccountingCode: null,
		levelStudies: null,
		countryCode: null,
		status: 'employee',
		isPartialUnemployment: false,
		civility: 'other',
		city: null,
		dpcRpps: null,
		dpcAdeli: null,
		birthCity: null,
		freeText: null,
		isTerrorismVictim: false,
		siret: null,
		roadAddress: null,
		birthRegion: null,
		code: 'ST8319701151',
		updatedAt: '2024-02-14T18:08:38',
		vat: null,
		birthName: null,
		academyId: '62648',
		phone: null,
		draft: false,
		isSexualHarassmentVictim: false,
		birthCityCode: null,
		socialCategory: '',
		socialNumber: null,
		accountingNumber: null,
		birthdate: null,
		lastname: 'kmm',
		lastDiploma: null,
		companyId: null,
		hourlySalary: null,
		position: null,
		workContractType: '',
		country: null,
		companyName: null,
		locale: 'fr',
		email: null,
		profession: null,
		insertedAt: '2024-02-14T18:08:38',
		dpcMainStatus: null,
		externalId: null,
		firstname: 'mkk',
		handicaped: false,
		nationality: null,
		professionalCategory: null,
	},
});
