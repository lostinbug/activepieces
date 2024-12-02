import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';
import { digiformaProps } from '../../common/props';

export const createCompanyAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_create_company',
  displayName: 'Create Company',
  description: 'Creates a new company.',
  props: {
    name: Property.ShortText({
      displayName: 'Name',
      required: true,
    }),
    ...digiformaProps.company,
  },
  async run(context) {
    const {
      name,
      group,
      city,
      roadAddress,
      code,
      cityCode,
      country,
      countryCode,
      locale,
      website,
      phone,
      email,
      vat,
      vatAccountingCode,
      accountingNumber,
      publicOrganization,
      note,
      siret,
    } = context.propsValue;

    const client = makeClient(context.auth);
    return await client.createCompany({
      name,
      group,
      city,
      roadAddress,
      code,
      cityCode,
      country,
      locale,
      countryCode,
      website,
      phone,
      email,
      publicOrganization,
      vat,
      vatAccountingCode,
      accountingNumber,
      note,
      siret,
    });
  },
});
