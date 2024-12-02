import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { makeClient } from '../../common';
import { digiformaProps } from '../../common/props';

export const createTraineeAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_create_trainee',
  displayName: 'Create Trainee',
  description: 'Creates a new trainee.',
  props: {
    lastname: Property.ShortText({
      displayName: 'Last Name',
      required: true,
    }),
    ...digiformaProps.trainee,
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
      phone,
      phoneSecondary,
      birthCity,
      birthCityCode,
      birthName,
      birthRegion,
      birthdate,
      country,
      countryCode,
      locale,
      status,
      profession,
      note,
      accountingNumber,
      vatAccountingCode,
      freeText,
    } = context.propsValue;
    const client = makeClient(context.auth);
    return await client.createTrainee({
      firstname,
      lastname,
      roadAddress,
      email,
      code,
      cityCode,
      city,
      nationality,
      phone,
      phoneSecondary,
      birthCity,
      birthCityCode,
      birthName,
      birthRegion,
      birthdate,
      country,
      countryCode,
      locale,
      status,
      profession,
      note,
      accountingNumber,
      vatAccountingCode,
      freeText,
    });
  },
});
