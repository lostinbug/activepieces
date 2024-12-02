import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';

export const listFundingAgenciesAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_list_funding_agencies',
  displayName: 'List Funding Agencies',
  description: 'Fetch all funding agencies.',
  props: {},
  async run(context) {
    const client = makeClient(context.auth);
    return await client.listFundingAgencies();
  },
});
