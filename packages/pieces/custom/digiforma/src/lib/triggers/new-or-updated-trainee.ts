import { digiformaAuth } from '../../';
import { DedupeStrategy, Polling, pollingHelper } from '@activepieces/pieces-common';
import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { makeClient } from '../common';
import dayjs from 'dayjs';

const polling: Polling<string, Record<string, unknown>> = {
	strategy: DedupeStrategy.TIMEBASED,
	items: async ({ auth, lastFetchEpochMS }) => {
		const client = makeClient(auth as string);
		const response: any = await client.searchTrainees({
			updatedAfter:
				lastFetchEpochMS === 0
					? dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss.SSS')
					: dayjs(lastFetchEpochMS).format('YYYY-MM-DDTHH:mm:ss.SSS'),
		});
		return response['data']['trainees'].map((trainee: any) => {
			return {
				epochMilliSeconds: dayjs(trainee['updatedAt']).valueOf(),
				data: trainee,
			};
		});
	},
};

export const newOrUpdatedTraineeTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_trainee',
	displayName: 'New or Updated Trainee',
	description: 'Triggers when a trainee is created or updated.',
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
		phoneSecondary: null,
		cityCode: null,
		note: null,
		id: '4902531',
		vatAccountingCode: null,
		levelStudies: null,
		countryCode: 'FR',
		status: 'employee',
		isPartialUnemployment: false,
		civility: 'M',
		city: null,
		dpcRpps: null,
		dpcAdeli: null,
		birthCity: null,
		freeText: null,
		grades: [],
		isTerrorismVictim: false,
		siret: null,
		roadAddress: null,
		birthRegion: null,
		code: 'ST1394961000',
		updatedAt: '2024-02-19T14:20:14',
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
		birthdate: '1984-09-27',
		lastname: 'gonzales',
		lastDiploma: null,
		companyId: null,
		hourlySalary: null,
		position: null,
		workContractType: '',
		country: 'France',
		companyName: null,
		locale: 'fr',
		company: null,
		email: 'info+jules@digiforma.com',
		logo: null,
		profession: null,
		insertedAt: '2024-01-30T10:52:31',
		dpcMainStatus: null,
		externalId: null,
		firstname: 'toto',
		handicaped: false,
		nationality: null,
		professionalCategory: null,
	},
});
