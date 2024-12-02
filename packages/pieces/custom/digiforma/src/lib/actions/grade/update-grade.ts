import { Property, createAction } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';

export const updateGradeAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_update_grade',
  displayName: 'Update Grade',
  description: 'Updates an existing appreciation for trainee.',
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
    gradeId: Property.Dropdown({
      displayName: 'Grade ID',
      refreshers: ['traineeId'],
      required: true,
      options: async ({ auth, traineeId }) => {
        if (!auth || !traineeId) {
          return {
            options: [],
            disabled: true,
            placeholder: 'Please select trainee first.',
          };
        }
        const client = makeClient(auth as string);
        const res: any = await client.listTraineeGrades(traineeId as string);

        return {
          disabled: false,
          options: res['data']['trainee']['grades'].map((grade: { id: string; label: string }) => {
            return {
              label: grade.label,
              value: grade.id,
            };
          }),
        };
      },
    }),
    ...digiformaProps.grade,
  },
  async run(context) {
    const { gradeId, label, description, scoreComment, scoreResult } = context.propsValue;
    const client = makeClient(context.auth);
    return await client.updateGrade(gradeId, {
      label,
      description,
      scoreComment,
      scoreResult,
    });
  },
});
