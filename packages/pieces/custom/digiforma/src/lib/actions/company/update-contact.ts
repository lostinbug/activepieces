import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';
import { ContactInputObject } from '../../common/types';

export const updateContactInCompanyAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_update_contact',
  displayName: 'Update Contact',
  description: 'Updates a new contact in company.',
  props: {
    companyId: digiformaCommon.companyId(true),
    contactId: digiformaCommon.contactId(true),
    lastname: Property.ShortText({
      displayName: 'Last Name',
      required: false,
    }),
    ...digiformaProps.contact,
  },
  async run(context) {
    const { companyId, contactId, firstname, lastname, email, phone, title, fax } =
      context.propsValue;

    const client = makeClient(context.auth);

    const res: any = await client.listContactsInCompany(companyId!);

    const updatedContactList = res['data']['company']['contacts'].map(
      (contact: ContactInputObject) => {
        if (contact['id'] === contactId!) {
          return {
            ...contact,
            firstname: firstname ?? contact.firstname,
            lastname: lastname ?? contact.lastname,
            email: email ?? contact.email,
            phone: phone ?? contact.phone,
            title: title ?? contact.title,
            fax: fax ?? contact.fax,
          };
        }
        return contact;
      }
    );

    return await client.updateCompany(companyId!, {
      contacts: updatedContactList,
    });
  },
});
