import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';

export const updateCompanyAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_update_company',
  displayName: 'Update Company',
  description: 'Updated an existing company.',
  props: {
    id: digiformaCommon.companyId(true),
    name: Property.ShortText({
      displayName: 'Name',
      required: false,
    }),
    ...digiformaProps.company,
  },
  async run(context) {
    const {
      id,
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
    return await client.updateCompany(id!, {
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
