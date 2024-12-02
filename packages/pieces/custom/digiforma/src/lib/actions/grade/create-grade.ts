import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';

export const createGradeAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_create_grade',
  displayName: 'Create Grade',
  description: 'Creates an appreciation for trainee.',
  props: {
    trainingSessionId: digiformaCommon.trainingSessionId(true),
    traineeId: Property.Dropdown({
      displayName: 'Trainee ID',
      refreshers: ['trainingSessionId'],
      required: true,
      description: 'Trainee shoud be part of training session.',
      options: async ({ auth, trainingSessionId }) => {
        if (!auth || !trainingSessionId) {
          return {
            options: [],
            disabled: true,
            placeholder: 'Please select training session first.',
          };
        }

        const client = makeClient(auth as string);
        const res: any = await client.listTraineesInTrainingSession(trainingSessionId as string);

        return {
          disabled: false,
          options: res['data']['trainingSession']['trainees'].map(
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
    label: Property.ShortText({
      displayName: 'Title of Assessment',
      required: true,
    }),
    description: Property.ShortText({
      displayName: 'Description',
      required: false,
    }),
    scoreComment: Property.ShortText({
      displayName: 'Pedagogical Commentary',
      required: false,
    }),
    scoreResult: Property.Number({
      displayName: 'Score',
      required: false,
    }),
  },
  async run(context) {
    const { traineeId, trainingSessionId, label, description, scoreComment, scoreResult } =
      context.propsValue;
    const client = makeClient(context.auth);
    return await client.createGrade(traineeId!, trainingSessionId!, {
      label,
      description,
      scoreComment,
      scoreResult,
    });
  },
});
