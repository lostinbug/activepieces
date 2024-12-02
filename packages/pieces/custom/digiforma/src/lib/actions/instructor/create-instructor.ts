import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';
import { digiformaProps } from '../../common/props';

export const createInstructorAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_create_instructor',
  displayName: 'Create Instructor',
  description: 'Creates a new instructor.',
  props: {
    lastname: Property.ShortText({
      displayName: 'Last Name',
      required: true,
    }),
    ...digiformaProps.instructor,
  },
  async run(context) {
    const {
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
    return await client.createInstructor({
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
