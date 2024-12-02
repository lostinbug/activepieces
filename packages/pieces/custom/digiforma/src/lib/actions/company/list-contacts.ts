import { createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const listContactsInCompanyAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_list_contacts',
  displayName: 'List Contacts',
  description: 'Retrives all contacts from given company.',
  props: {
    id: digiformaCommon.companyId(true),
  },
  async run(context) {
    const id = context.propsValue.id!;
    const client = makeClient(context.auth);
    return await client.listContactsInCompany(id);
  },
});
