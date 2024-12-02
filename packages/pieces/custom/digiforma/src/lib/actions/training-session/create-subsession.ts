import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';
import { subsessionInput, TrainingSessionCostInput } from '../../common/types';

export const createSubsessionAction = createAction({
	auth: digiformaAuth,
	name: 'digiforma_create_subsession',
	displayName: 'Create Subsession',
	description: 'Creates a new subsession in existing training session',
	props: {
		trainingSessionId: digiformaCommon.trainingSessionId(true),
		name: Property.ShortText({
			displayName: 'Module Name',
			required: true,
		}),
		...digiformaProps.subsession,
	},
	async run(context) {
		const {
			trainingSessionId,
			name,
			attendanceFromModules,
			modality,
			averageDurationPerDate,
			datesAreInterval,
			durationDays,
			durationHours,
			color,
		} = context.propsValue;

		const costs = context.propsValue.costs as TrainingSessionCostInput[];
		const updatedCosts = costs
			.filter((cost) => Object.keys(cost).length !== 0)
			.map((cost) => {
				return {
					description: cost.description,
					type: cost.type,
					costMode: cost.costMode,
					monthly: cost.monthly,
					costIndependant: Number(cost.costIndependant) ?? 0,
					costIndividual: Number(cost.costIndividual) ?? 0,
					cost: Number(cost.cost) ?? 0,
					vat: Number(cost.vat) ?? 0,
				};
			});
		const subsessionInput: subsessionInput = {
			name,
			attendanceFromModules,
			modality,
			averageDurationPerDate,
			datesAreInterval,
			durationDays,
			durationHours,
			color,
		};
		if (updatedCosts.length > 0) {
			subsessionInput.costs = updatedCosts;
		}
		const client = makeClient(context.auth);
		return await client.createSubsession(trainingSessionId!, subsessionInput);
	},
});
