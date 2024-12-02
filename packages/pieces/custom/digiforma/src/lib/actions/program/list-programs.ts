import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';

export const listProgramsAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_list_programs',
  displayName: 'List Programs',
  description: 'Retrives all programs.',
  props: {},
  async run(context) {
    const client = makeClient(context.auth);
    return await client.listPrograms();
  },
});
