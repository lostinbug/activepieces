import { digiformaAuth } from '../../../';
import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaCommon, makeClient } from '../../common';

export const createAbandonInSlotAction = createAction({
	auth: digiformaAuth,
	name: 'digiforma_create_abandon_in_slot',
	displayName: 'Create an Abandon in Slot',
	description: 'Create an abandon or absence on dates when the trainee is absent on the training',
	props: {
		trainingSessionId: digiformaCommon.trainingSessionId(true),
		traineeId: Property.Dropdown({
			displayName: 'Trainee ID',
			refreshers: ['trainingSessionId'],
			required: true,
			description: 'Trainee shoud be part of training session.',
			options: async ({ auth, trainingSessionId }) => {
				if (!auth || !trainingSessionId) {
					return {
						options: [],
						disabled: true,
						placeholder: 'Please select training session first.',
					};
				}

				const client = makeClient(auth as string);
				const res: any = await client.listTraineesInTrainingSession(trainingSessionId as string);

				return {
					disabled: false,
					options: res['data']['trainingSession']['trainees'].map(
						(trainee: { id: string; firstname: string; lastname: string }) => {
							return {
								label: `${trainee.firstname} ${trainee.lastname}`,
								value: trainee.id,
							};
						},
					),
				};
			},
		}),
		comment: Property.ShortText({
			displayName: 'General comment',
			required: false,
		}),
		commentJustifiedAbsence: Property.LongText({
			displayName: 'Reason',
			required: false,
		}),
		isBack: Property.Checkbox({
			displayName: 'The learner has resumed training?',
			required: false,
		}),
		isJustified: Property.Checkbox({
			displayName: 'Is Justified Absence?',
			required: false,
		}),
		slotId: Property.MultiSelectDropdown({
			displayName: 'Concerned Modules IDs',
			refreshers: ['trainingSessionId'],
			required: true,
			description: 'Trainee shoud be part of training session.',
			options: async ({ auth, trainingSessionId }) => {
				if (!auth || !trainingSessionId) {
					return {
						options: [],
						disabled: true,
						placeholder: 'Please select training session first.',
					};
				}

				const client = makeClient(auth as string);
				const res: any = await client.listTrainingSessionSlots(trainingSessionId as string);

				return {
					disabled: false,
					options: res['data']['trainingSession']['trainingSessionSlots'].map(
						(slot: {
							id: string;
							endTime: string;
							startTime: string;
							slot: string;
							date: string;
							subsession: { name: string };
						}) => {
							return {
								label: `(${slot.subsession.name}) ${slot.date} ${slot.startTime}-${slot.endTime}`,
								value: slot.id,
							};
						},
					),
				};
			},
		}),
	},
	async run(context) {
		const {
			traineeId,
			trainingSessionId,
			slotId,
			comment,
			commentJustifiedAbsence,
			isBack,
			isJustified,
		} = context.propsValue;

		const client = makeClient(context.auth);
		return await client.createAbandonWithSlots(trainingSessionId!, traineeId, {
			comment,
			commentJustifiedAbsence,
			isBack,
			isJustified,
			trainingSessionSlotIds: slotId,
		});
	},
});
