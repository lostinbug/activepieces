import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';
import { ContactInputObject } from '../../common/types';

export const createContactInCompanyAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_create_contact',
  displayName: 'Create Contact',
  description: 'Creates a new contact in company.',
  props: {
    id: digiformaCommon.companyId(true),
    lastname: Property.ShortText({
      displayName: 'Last Name',
      required: true,
    }),
    ...digiformaProps.contact,
  },
  async run(context) {
    const { id, email, fax, firstname, lastname, phone, title } = context.propsValue;

    const client = makeClient(context.auth);

    const res: any = await client.listContactsInCompany(id!);

    const contactList: ContactInputObject[] = res['data']['company']['contacts'];

    contactList.push({
      email,
      fax,
      firstname,
      lastname,
      phone,
      title,
    });

    return await client.updateCompany(id!, {
      contacts: contactList,
    });
  },
});
