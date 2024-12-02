import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';

export const updateTraineeAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_update_trainee',
  displayName: 'Update Trainee',
  description: 'Updates an existing trainee.',
  props: {
    traineeId: digiformaCommon.traineeId(true),
    lastname: Property.ShortText({
      displayName: 'Last Name',
      required: false,
    }),
    ...digiformaProps.trainee,
  },
  async run(context) {
    const {
      traineeId,
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
    return await client.updateTrainee(traineeId!, {
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
