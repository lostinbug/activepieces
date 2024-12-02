import { digiformaAuth } from '../../';
import { DedupeStrategy, Polling, pollingHelper } from '@activepieces/pieces-common';
import { TriggerStrategy, createTrigger } from '@activepieces/pieces-framework';
import { makeClient } from '../common';
import dayjs from 'dayjs';

const polling: Polling<string, Record<string, unknown>> = {
	strategy: DedupeStrategy.TIMEBASED,
	items: async ({ auth, lastFetchEpochMS }) => {
		const client = makeClient(auth as string);
		const response: any = await client.searchPrograms({
			updatedAfter:
				lastFetchEpochMS === 0
					? dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss.SSS')
					: dayjs(lastFetchEpochMS).format('YYYY-MM-DDTHH:mm:ss.SSS'),
		});

		return response['data']['programs'].map((program: any) => {
			return {
				epochMilliSeconds: dayjs(program['updatedAt']).valueOf(),
				data: program,
			};
		});
	},
};

export const newOrUpdatedProgramTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_program',
	displayName: 'New or Updated Program',
	description: 'Triggers when a program is created or updated.',
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
		targets: [
			{
				sourceId: null,
				text: "Responsable d'Organisme de Formation",
			},
			{
				sourceId: null,
				text: 'Assistant Administratif dans un Organismes de Formation',
			},
		],
		certifierName: null,
		cpf: false,
		id: '1634341',
		enrollingLevelEnforced: false,
		subtitle: 'Découvrir et maîtriser les différentes fonctionnalités de Digiforma',
		certificationDetails: null,
		youtubeId: null,
		pedagogicalResources: [
			{
				sourceId: null,
				text: 'Ressources e-learning',
			},
			{
				sourceId: null,
				text: 'Livret de formation',
			},
		],
		certifInfoCode: null,
		graduationTarget: null,
		category: null,
		certificationRegistrationDate: null,
		trainingModality: 1,
		durationInHours: 140.0,
		accountingAnalytics: null,
		certificationIncludedInAdditionalExpenses: false,
		trainingType: 'Action de formation',
		dpc: false,
		entryExitModality: 0,
		goals: [
			{
				sourceId: null,
				text: 'Créer et suivre une opportunité commerciale sur Digiforma',
			},
			{
				sourceId: null,
				text: "Construire une session de formation et gérer l'administratif de celle-ci sur Digiforma",
			},
			{
				sourceId: null,
				text: 'Concevoir un parcours e-learning sur Digiforma',
			},
			{
				sourceId: null,
				text: 'Piloter ses indicateurs de suivi et sa démarche qualité avec Digiforma',
			},
		],
		steps: [
			{
				sourceId: null,
				text: 'Créer et suivre une opportunité commerciale sur Digiforma',
			},
			{
				sourceId: null,
				text: "Construire une session de formation et gérer l'administratif de celle-ci sur Digiforma",
			},
			{
				sourceId: null,
				text: 'Concevoir un parcours e-learning sur Digiforma',
			},
			{
				sourceId: null,
				text: 'Piloter ses indicateurs de suivi et sa démarche qualité avec Digiforma',
			},
		],
		certificateurId: null,
		rsCode: null,
		diplomaTitle: null,
		code: null,
		version: 1,
		rncpCode: null,
		certificationModality: null,
		updatedAt: '2024-02-23T15:29:30',
		accessDelayUnit: 'WEEKS',
		tags: [],
		onSale: false,
		diploma: 'none',
		accountingNumberFundingAgency: null,
		diplomaName: null,
		prerequisites: [
			{
				sourceId: null,
				text: "Expérience de la formation professionnelle en tant que Formateur ou Assistant Administratif d'Organisme de Formation",
			},
			{
				sourceId: null,
				text: 'Maîtrise des outils informatiques fondamentaux (internet, bureautique)',
			},
		],
		trainingPedagogicalModality: 0,
		tailored: false,
		accountingNumber: null,
		graduationValidityYears: null,
		createdAt: '2024-02-23',
		assessments: [
			{
				sourceId: null,
				text: "Travaux pratiques (à distance) de création concrète d'une session exemple dans Digiforma",
			},
			{
				sourceId: null,
				text: "Formulaires d'évaluation de la formation, à chaud et à froid",
			},
			{
				sourceId: null,
				text: "Suivi de l'acquisition et de la mise en œuvre des compétences à distance 2 mois après la fin de la formation",
			},
		],
		certificationType: null,
		documents: [],
		certifiedData: false,
		economicalModel: 2,
		rythm: 1,
		certificationModalityAccess: null,
		description:
			"A l'issue de cette formation aux fonctionnalités de Digiforma, l'apprenant maîtrisera la conception et la réalisation de sessions dans le logiciel Digiforma.",
		graduatedLevel: 1,
		certificateurContratId: null,
		durationInDays: null,
		transmitterCertificationId: null,
		admissionModality: 99999,
		name: 'Apprendre à utiliser Digiforma',
		accessDelay: 4,
		graduationModality: null,
		cpfCode: null,
	},
});
