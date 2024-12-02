import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const listSubsessionsInTrainingSessionAction = createAction({
	auth: digiformaAuth,
	name: 'digiforma_list_subsessions_in_session',
	displayName: 'List Subsessions in Training Session',
	description: 'Retrives all subsessions in given training session.',
	props: {
		trainingSessionId: digiformaCommon.trainingSessionId(true),
	},
	async run(context) {
		const trainingSessionId = context.propsValue.trainingSessionId!;
		const client = makeClient(context.auth);
		return await client.listTrainingSubSessions(trainingSessionId);
	},
});
