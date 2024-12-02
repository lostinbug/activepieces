import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';

export const updateInstructorAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_update_instructor',
  displayName: 'Update Instructor',
  description: 'Updates an existing instructor.',
  props: {
    instructorId: digiformaCommon.instructorId(true),
    lastname: Property.ShortText({
      displayName: 'Last Name',
      required: false,
    }),
    ...digiformaProps.instructor,
  },
  async run(context) {
    const {
      instructorId,
      firstname,
      lastname,
      roadAddress,
      email,
      code,
      cityCode,
      city,
      nationality,
      birthName,
      countryCode,
      phone,
      birthCity,
      birthRegion,
      birthdate,
      locale,
      socialNumber,
      company,
      siret,
      insurance,
      status,
      cost,
      vat,
      accountingNumber,
      profession,
      bio,
      diploma,
      note,
      skills,
    } = context.propsValue;

    const client = makeClient(context.auth);
    return await client.updateInstructor(instructorId!, {
      firstname,
      lastname,
      roadAddress,
      email,
      code,
      cityCode,
      city,
      nationality,
      birthName,
      countryCode,
      phone,
      birthCity,
      birthRegion,
      birthdate,
      locale,
      socialNumber,
      company,
      siret,
      insurance,
      status,
      cost,
      vat,
      accountingNumber,
      profession,
      bio,
      diploma,
      note,
      skills,
    });
  },
});
