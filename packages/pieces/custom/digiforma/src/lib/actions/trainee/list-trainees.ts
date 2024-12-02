import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';

export const listTraineesAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_list_trainees',
  displayName: 'List Trainees',
  description: 'Retrives all trainees.',
  props: {},
  async run(context) {
    const client = makeClient(context.auth);
    return await client.listTrainees();
  },
});
