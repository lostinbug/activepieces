import { PiecePropValueSchema, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../';
import { DigiformaClient } from './client';

export function makeClient(auth: PiecePropValueSchema<typeof digiformaAuth>) {
  const client = new DigiformaClient(auth as string);
  return client;
}

export const digiformaCommon = {
  trainingSessionId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Training Session',
      refreshers: [],
      required,
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listTrainingSessions();

        return {
          disabled: false,
          options: res['data']['trainingSessions'].map((session: { id: string; name: string }) => {
            return {
              label: session.name,
              value: session.id,
            };
          }),
        };
      },
    }),
  trainingSessionInstructorId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Training Session Instructor',
      refreshers: ['trainingSessionId'],
      required,
      options: async ({ auth, trainingSessionId }) => {
        if (!auth || !trainingSessionId) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account and select training session.',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listInstructorsInTrainingSession(trainingSessionId as string);

        return {
          disabled: false,
          options: res['data']['trainingSession']['trainingSessionInstructors'].map(
            (trainingInstructor: {
              id: string;
              instructor: { firstname: string; lastname: string };
            }) => {
              return {
                label: `${trainingInstructor.instructor.firstname ?? ''} ${
                  trainingInstructor.instructor.lastname
                }`,
                value: trainingInstructor.id,
              };
            }
          ),
        };
      },
    }),
  customerId: (required = false, displayName = 'Customer') =>
    Property.Dropdown<string>({
      displayName,
      refreshers: ['trainingSessionId'],
      required,
      options: async ({ auth, trainingSessionId }) => {
        if (!auth || !trainingSessionId) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account and select training session.',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listCustomersInTrainingSession(trainingSessionId as string);

        type CustomerEntity = {
          __typename: string;
          name?: string;
          firstname?: string;
          lastname?: string;
        };

        return {
          disabled: false,
          options: res['data']['trainingSession']['customers'].map(
            (customer: { id: string; entity: CustomerEntity }) => {
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
  trainingSubSessionId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Training Sub Session',
      refreshers: ['trainingSessionId'],
      required,
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
        console.log(res);

        return {
          disabled: false,
          options: res['data']['trainingSession']['subsessions'].map(
            (subsession: { id: string; name: string }) => {
              return {
                label: subsession.name,
                value: subsession.id,
              };
            }
          ),
        };
      },
    }),
  instructorId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Instructor',
      refreshers: [],
      required,
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listInstructors();

        return {
          disabled: false,
          options: res['data']['instructors'].map(
            (instructor: { id: string; firstname: string; lastname: string }) => {
              return {
                label: `${instructor.firstname} ${instructor.lastname}`,
                value: instructor.id,
              };
            }
          ),
        };
      },
    }),
  companyId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Company',
      refreshers: [],
      required,
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listComapnies();

        return {
          disabled: false,
          options: res['data']['companies'].map((company: { id: string; name: string }) => {
            return {
              label: company.name,
              value: company.id,
            };
          }),
        };
      },
    }),
  fundingAgencyId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Funding Agency',
      refreshers: [],
      required,
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listFundingAgencies();

        return {
          disabled: false,
          options: res['data']['fundingAgencies'].map((agency: { id: string; name: string }) => {
            return {
              label: agency.name,
              value: agency.id,
            };
          }),
        };
      },
    }),
  traineeId: (required = false, description = '') =>
    Property.Dropdown<string>({
      displayName: 'Trainee',
      description,
      refreshers: [],
      required,
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listTrainees();

        return {
          disabled: false,
          options: res['data']['trainees'].map(
            (trainee: { id: string; firstname: string; lastname: string }) => {
              return {
                label: `${trainee.firstname} ${trainee.lastname}`,
                value: trainee.id,
              };
            }
          ),
        };
      },
    }),
  managerId: (required = false, displayName = '', description = '') =>
    Property.Dropdown<string>({
      displayName,
      description,
      refreshers: [],
      required,
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listmanagers();

        return {
          disabled: false,
          options: res['data']['managers'].map(
            (manager: { id: string; firstname: string; lastname: string }) => {
              return {
                label: `${manager.firstname} ${manager.lastname}`,
                value: manager.id,
              };
            }
          ),
        };
      },
    }),
  invoiceId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Invoice',
      refreshers: [],
      required,
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listInvoices();

        return {
          disabled: false,
          options: res['data']['invoices'].map(
            (invoice: { id: string; number: number; prefix: string }) => {
              return {
                label: `${invoice.prefix} ${invoice.number}`,
                value: invoice.id,
              };
            }
          ),
        };
      },
    }),
  programCategoryId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Program Category',
      refreshers: [],
      required,
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listProgramCategories();
        return {
          disabled: false,
          options: res['data']['programCategories'].map(
            (category: { id: string; name: string }) => {
              return {
                label: category.name,
                value: category.id,
              };
            }
          ),
        };
      },
    }),
  programId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Program',
      refreshers: [],
      required,
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listPrograms();
        return {
          disabled: false,
          options: res['data']['programs'].map((program: { id: string; name: string }) => {
            return {
              label: program.name,
              value: program.id,
            };
          }),
        };
      },
    }),
  contactId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Contact',
      refreshers: ['companyId'],
      required,
      options: async ({ auth, companyId }) => {
        if (!auth || !companyId) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account and select company.',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listContactsInCompany(companyId as string);

        return {
          disabled: false,
          options: res['data']['company']['contacts'].map(
            (contact: { id: string; firstname: string; lastname: string }) => {
              return {
                label: `${contact.firstname} ${contact.lastname}`,
                value: contact.id,
              };
            }
          ),
        };
      },
    }),
  programDiplomaId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Diploma',
      description: 'Code of the diploma sought by the training.',
      refreshers: [],
      required,
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listProgramDiplomas();
        return {
          disabled: false,
          options: res['data']['programDiplomas'].map((diploma: { code: string; name: string }) => {
            return {
              label: diploma.name,
              value: diploma.code,
            };
          }),
        };
      },
    }),
  programSpecialtyId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Specialty',
      refreshers: [],
      required,
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listProgramSpecialties();
        return {
          disabled: false,
          options: res['data']['programSpecialties'].map(
            (diploma: { code: string; name: string }) => {
              return {
                label: diploma.name,
                value: diploma.code,
              };
            }
          ),
        };
      },
    }),
  marketplaceCategoryId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Marketplace Category',
      refreshers: [],
      required,
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listMarketplaceCategories();
        return {
          disabled: false,
          options: res['data']['marketplaceCategories'].map(
            (category: { id: string; name: string }) => {
              return {
                label: category.name,
                value: category.id,
              };
            }
          ),
        };
      },
    }),
  roomId: (required = false) =>
    Property.Dropdown<string>({
      displayName: 'Room Id',
      refreshers: [],
      required,
      options: async ({ auth }) => {
        if (!auth) {
          return {
            disabled: true,
            options: [],
            placeholder: 'Please connect your account',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listRooms();
        return {
          disabled: false,
          options: res['data']['rooms'].map((room: { id: string; name: string }) => {
            return {
              label: room.name,
              value: room.id,
            };
          }),
        };
      },
    }),
};
