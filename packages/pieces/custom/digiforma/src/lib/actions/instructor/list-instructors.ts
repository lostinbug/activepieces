import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';

export const listInstructorsAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_list_instructors',
  displayName: 'List Instructors',
  description: 'Retrives all instructors.',
  props: {},
  async run(context) {
    const client = makeClient(context.auth);
    return await client.listInstructors();
  },
});
