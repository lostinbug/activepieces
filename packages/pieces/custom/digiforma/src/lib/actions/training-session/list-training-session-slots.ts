import { digiformaAuth } from '../../..';

import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaCommon, makeClient } from '../../common';

export const listTrainingSessionSlotsAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_list_slot_in_training_session',
  displayName: 'List Training Session Slots',
  description: 'Retrives all slots in given training session.',
  props:{
    traineeId:digiformaCommon.traineeId(false),
    trainingSessionId:digiformaCommon.trainingSessionId(false),
    subSessionId:Property.Dropdown<string>({
        displayName: 'Training Sub Session',
        refreshers: ['trainingSessionId'],
        required:false,
        options: async ({ auth, trainingSessionId }) => {
          if (!auth || !trainingSessionId) {
            return {
              disabled: true,
              options: [],
              placeholder: 'Please connect your account and select training session.',
            };
          }
          const client = makeClient(auth as string);
          const res: any = await client.listTrainingSubSessions(trainingSessionId as string);
  
          return {
            disabled: false,
            options: res['data']['trainingSession']['subsessions'].map(
              (subsession: { id: string; name: string,modality:string }) => {
                return {
                  label: `${subsession.modality} - ${subsession.name} ${subsession.id}`,
                  value: subsession.id,
                };
              }
            ),
          };
        },
      }),
    customerId:Property.Dropdown<string>({
        displayName: 'Customer ID',
        refreshers: [],
        required:false,
        options: async ({ auth }) => {
          if (!auth ) {
            return {
              disabled: true,
              options: [],
              placeholder: 'Please connect your account and select training session.',
            };
          }
          const client = makeClient(auth as string);
          const res: any = await client.listCustomers();
          type CustomerEntity = {
            __typename: string;
            name?: string;
            firstname?: string;
            lastname?: string;
          };
  
          return {
            disabled: false,
            options: res['data']['customers'].map(
              (customer: { id:string,entity: CustomerEntity}) => {
                if (customer.entity.__typename === 'Company') {
                    return {
                      label: customer.entity.name ?? '',
                      value: customer.id,
                    };
                  } else {
                    return {
                      label: `${customer.entity.firstname ?? ''} ${customer.entity.lastname ?? ''}`,
                      value: customer.id,
                    };
                  }
              }
            ),
          };
        },
      }),
      customerTraineeId:digiformaCommon.customerTraineeId(false),
      instructorId:digiformaCommon.instructorId(false),
      month:Property.StaticMultiSelectDropdown({
        displayName: 'Month',
        required:false,
        options:{
            disabled:false,
            options:[
                {label:'January',value:1},
                {label:'February',value:2},
                {label:'March',value:3},
                {label:'April',value:4},
                {label:'May',value:5},
                {label:'June',value:6},
                {label:'July',value:7},
                {label:'August',value:8},
                {label:'September',value:9},
                {label:'October',value:10},
                {label:'November',value:11},
                {label:'December',value:12}
            ]
        },
      }),
      year:Property.Number({
        displayName:'Year',
        required:false,
    })

    

  },
  async run(context)
  {
    const {trainingSessionId,subSessionId,customerId,customerTraineeId,instructorId,month,year} = context.propsValue;
    const client = makeClient(context.auth);

    let hasMore = true;
	let page = 0;
    const sessions:Record<string,any>[]=[];

    do
    {
        const response:any = await client.listAllTrainingSessions({page:page,size:20});
        if (response['data']['trainingSessions'].length === 0) {
            hasMore = false;
        }
        else
        {
            response['data']['trainingSessions'].forEach((session:any)=>{
                sessions.push({
                    ...session,
                });
            });
        }
        page+=1;

    }while(hasMore);

    const result: string[] = [];
    sessions.forEach((session:any)=>{
        // Check Training Session ID
        if (trainingSessionId && session.id !== trainingSessionId) {
            return;
        }

        session.trainingSessionSlots.forEach((slot: any) => {
            // Check Sub Session ID
            if (subSessionId && slot.subsession.id !== subSessionId) {
                return;
            }
        // Check Customer
        if (customerId) {
            const customerMatch = slot.customers.some((customer: any) => customer.id === customerId);
            if (!customerMatch) return;
        }

        // Check Customer Trainee
        if (customerTraineeId) {
            const customerTraineeMatch = slot.customers.some((customer: any) =>
                customer.customerTrainees.some((trainee: any) => trainee.id === customerTraineeId)
            );
            if (!customerTraineeMatch) return;
        }

        // Check Instructor
        if (instructorId) {
            const instructorMatch = slot.trainingSessionInstructors.some(
                (instructor: any) => instructor.instructor.id === instructorId
            );
            if (!instructorMatch) return;
        }

        // Check Month and Year
        if (month || year) {
            const slotDate = new Date(slot.date as string);
            if (year && slotDate.getFullYear() !== year) return;
            if (month && !month.includes(slotDate.getMonth() + 1)) return;
        }
        // If all criteria match, add the slot ID
        result.push(slot.id);
        })
    })

    const trainingSessionSlots:Record<string,any>[]=[];

    for(const id of result)
    {
        const response:any = await client.getTrainingSessionSlot(id);
        trainingSessionSlots.push({
            ...response['data']['trainingSessionSlot'],
        });
    }

    return trainingSessionSlots;

  }
})