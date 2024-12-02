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
		const evaluations: Record<string, any>[] = [];

		do {
			const response: any = await client.searchEvaluations({ page: page, size: 20 });
			if (response['data']['trainingSessions'].length === 0) {
				hasMore = false;
			} else {
				response['data']['trainingSessions'].forEach((session: any) => {
					session['evaluations'].forEach((evaluation: any) => {
						evaluations.push({
							...evaluation,
						});
					});
				});
			}
			page += 1;
		} while (hasMore);

		return evaluations.map((evaluation: any) => {
			return {
				epochMilliSeconds: dayjs(evaluation['updatedAt']).valueOf(),
				data: evaluation,
			};
		});
	},
};

export const newOrUpdatedEvaluationTrigger = createTrigger({
	auth: digiformaAuth,
	name: 'digiforma_new_or_updated_evaluation',
	displayName: 'New or Updated Evaluation',
	description: 'Triggers when a evalution is created or updated.',
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
		form: {
			id: '3997099',
			inputs: [
				{
					answers: [
						{
							answer: '1',
							entity: {
								firstname: 'Pétro',
								id: '4902529',
								lastname: 'Nille',
							},
						},
					],
					data: '{"answers":[{"text":"Oui, tout le temps"},{"text":"Oui, régulièrement"},{"text":"Oui, occasionnellement"},{"text":"Non l\'opportunité ne s\'est pas présentée"},{"text":"Non la formation n\'était pas adaptée au besoin"}],"question":"Avez vous pu mettre en pratique les connaissances acquises ?"}',
					id: '5d5c9098-9e26-495c-89f8-368d025e6bf4',
					input: {
						answers: [
							{
								correct: null,
								id: null,
								text: 'Oui, tout le temps',
							},
							{
								correct: null,
								id: null,
								text: 'Oui, régulièrement',
							},
							{
								correct: null,
								id: null,
								text: 'Oui, occasionnellement',
							},
							{
								correct: null,
								id: null,
								text: "Non l'opportunité ne s'est pas présentée",
							},
							{
								correct: null,
								id: null,
								text: "Non la formation n'était pas adaptée au besoin",
							},
						],
						correctAnswer: null,
						question: 'Avez vous pu mettre en pratique les connaissances acquises ?',
						required: null,
					},
					required: false,
					specialType: null,
					type: 'radio',
				},
				{
					answers: [
						{
							answer: '0',
							entity: {
								firstname: 'Pétro',
								id: '4902529',
								lastname: 'Nille',
							},
						},
					],
					data: '{"answers":[{"text":"Facile"},{"text":"Difficile mais je m\'en sors"},{"text":"Difficile, il me faudrait de l\'aide"},{"text":"Trop difficile"}],"question":"L\'application concrète des connaissances vous paraît-elle ?"}',
					id: 'b5b523ff-a5d3-4238-89be-80189eee53f5',
					input: {
						answers: [
							{
								correct: null,
								id: null,
								text: 'Facile',
							},
							{
								correct: null,
								id: null,
								text: "Difficile mais je m'en sors",
							},
							{
								correct: null,
								id: null,
								text: "Difficile, il me faudrait de l'aide",
							},
							{
								correct: null,
								id: null,
								text: 'Trop difficile',
							},
						],
						correctAnswer: null,
						question: "L'application concrète des connaissances vous paraît-elle ?",
						required: null,
					},
					required: false,
					specialType: null,
					type: 'radio',
				},
				{
					answers: [
						{
							answer: '{"0":3,"1":3}',
							entity: {
								firstname: 'Pétro',
								id: '4902529',
								lastname: 'Nille',
							},
						},
					],
					data: '{"answers":[{"text":"Cette formation a-t-elle accru votre efficacité ?"},{"text":"La formation a-t-elle accru votre valeur sur le marché du travail (interne ou externe) ?"}],"levels":[{"text":"Pas du tout"},{"text":"Peu"},{"text":"Moyennement"},{"text":"Beaucoup"}],"topic":"Impact de la formation"}',
					id: '4d6f9c91-3e72-4f72-a737-4e60375af2fb',
					input: {
						answers: [
							{
								correct: null,
								id: null,
								text: 'Cette formation a-t-elle accru votre efficacité ?',
							},
							{
								correct: null,
								id: null,
								text: 'La formation a-t-elle accru votre valeur sur le marché du travail (interne ou externe) ?',
							},
						],
						correctAnswer: null,
						question: null,
						required: null,
					},
					required: false,
					specialType: null,
					type: 'matrix',
				},
				{
					answers: [
						{
							answer: '8',
							entity: {
								firstname: 'Pétro',
								id: '4902529',
								lastname: 'Nille',
							},
						},
					],
					data: '{"question":"Evaluez vos compétences. Créer et suivre une opportunité commerciale sur Digiforma"}',
					id: '4925c20f-51eb-4e8a-9b2e-0980b344fa4d',
					input: {
						answers: null,
						correctAnswer: null,
						question:
							'Evaluez vos compétences. Créer et suivre une opportunité commerciale sur Digiforma',
						required: null,
					},
					required: false,
					specialType: null,
					type: 'score',
				},
				{
					answers: [
						{
							answer: '8',
							entity: {
								firstname: 'Pétro',
								id: '4902529',
								lastname: 'Nille',
							},
						},
					],
					data: '{"question":"Evaluez vos compétences. Construire une session de formation et gérer l\'administratif de celle-ci sur Digiforma"}',
					id: '4751e580-642d-4374-b59d-7cdcec0d8d84',
					input: {
						answers: null,
						correctAnswer: null,
						question:
							"Evaluez vos compétences. Construire une session de formation et gérer l'administratif de celle-ci sur Digiforma",
						required: null,
					},
					required: false,
					specialType: null,
					type: 'score',
				},
				{
					answers: [
						{
							answer: '8',
							entity: {
								firstname: 'Pétro',
								id: '4902529',
								lastname: 'Nille',
							},
						},
					],
					data: '{"question":"Evaluez vos compétences. Concevoir un parcours e-learning sur Digiforma"}',
					id: 'dc1e6e87-c772-4227-91cd-9798fee9ba0c',
					input: {
						answers: null,
						correctAnswer: null,
						question: 'Evaluez vos compétences. Concevoir un parcours e-learning sur Digiforma',
						required: null,
					},
					required: false,
					specialType: null,
					type: 'score',
				},
				{
					answers: [
						{
							answer: '8',
							entity: {
								firstname: 'Pétro',
								id: '4902529',
								lastname: 'Nille',
							},
						},
					],
					data: '{"question":"Evaluez vos compétences. Piloter ses indicateurs de suivi et sa démarche qualité avec Digiforma"}',
					id: '304869f3-9240-493c-8340-2a92857b25bb',
					input: {
						answers: null,
						correctAnswer: null,
						question:
							'Evaluez vos compétences. Piloter ses indicateurs de suivi et sa démarche qualité avec Digiforma',
						required: null,
					},
					required: false,
					specialType: null,
					type: 'score',
				},
				{
					answers: [
						{
							answer: '"Les exercices de mise en pratique"',
							entity: {
								firstname: 'Pétro',
								id: '4902529',
								lastname: 'Nille',
							},
						},
					],
					data: '{"question":"Quels sont avec le recul les éléments les plus utiles de la formation ?"}',
					id: '6071df98-f497-40a6-9881-4c0ecc723656',
					input: {
						answers: null,
						correctAnswer: null,
						question: 'Quels sont avec le recul les éléments les plus utiles de la formation ?',
						required: null,
					},
					required: false,
					specialType: null,
					type: 'free',
				},
				{
					answers: [
						{
							answer: '"Des supports envoyés régulièrement"',
							entity: {
								firstname: 'Pétro',
								id: '4902529',
								lastname: 'Nille',
							},
						},
					],
					data: '{"question":"Quels pourraient être les prolongements nécessaires à la formation ?"}',
					id: '44f6bb62-3ccd-4fbd-b00d-8d24f0af9bbc',
					input: {
						answers: null,
						correctAnswer: null,
						question: 'Quels pourraient être les prolongements nécessaires à la formation ?',
						required: null,
					},
					required: false,
					specialType: null,
					type: 'free',
				},
				{
					answers: [
						{
							answer: 'null',
							entity: {
								firstname: 'Pétro',
								id: '4902529',
								lastname: 'Nille',
							},
						},
					],
					data: '{"question":"Autres remarques"}',
					id: 'ba0991c8-f521-437e-a047-315ec424e222',
					input: {
						answers: null,
						correctAnswer: null,
						question: 'Autres remarques',
						required: null,
					},
					required: false,
					specialType: null,
					type: 'free',
				},
			],
			schemaVersion: '2.0',
		},
		id: '3758185',
		insertedAt: '2024-01-30T10:52:31',
		live: false,
		name: 'Évaluation à froid',
		read: null,
		replayable: false,
		showScore: true,
		syncWithInstructor: true,
		type: 'cold',
		updatedAt: '2024-01-30T10:52:31',
	},
});
