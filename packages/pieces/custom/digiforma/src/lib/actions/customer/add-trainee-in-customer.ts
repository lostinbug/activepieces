import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const addTraineeInCustomerAction = createAction({
    auth: digiformaAuth,
    name: 'digiforma_add_trainee_in_customer',
    displayName: 'Add Trainee In Customer',
    description: 'Adds a trainee in a customer.',
    props: {
        trainingSessionId: digiformaCommon.trainingSessionId(true),
        customerId: digiformaCommon.customerId(true),
        traineeId: digiformaCommon.traineeId(true),
        assessment:Property.ShortText({
            displayName:'Assesment',
            required:false
        }),
        onWorkingTime:Property.Checkbox({
            displayName:'On Working Time ?',
            required:false
        }),
        passed:Property.Checkbox({
            displayName:'Passed ?',
            required:false
        }),
    },
    async run(context) {
        const {customerId,traineeId,assessment,onWorkingTime,passed} = context.propsValue;
        const client = makeClient(context.auth);
        return await client.createCustomerTrainee(customerId!,{
            assessment,
            onWorkingTime,
            passed,
            traineeId:traineeId!
        });
    }
})