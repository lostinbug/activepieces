import { createAction, Property } from '@activepieces/pieces-framework';
import { digiformaAuth } from '../../..';
import { digiformaCommon, makeClient } from '../../common';
import { digiformaProps } from '../../common/props';
import { ProgramInput } from '../../common/types';

export const updateProgramAction = createAction({
  auth: digiformaAuth,
  name: 'digiforma_update_program',
  displayName: 'Update Program',
  description: 'Updates an existing program.',
  props: {
    programId: digiformaCommon.programId(true),
    name: Property.ShortText({
      displayName: 'Name',
      required: false,
    }),
    ...digiformaProps.program,
  },
  async run(context) {
    const {
      programId,
      name,
      subtitle,
      code,
      onSale,
      version,
      durationInDays,
      durationInHours,
      categoryId,
      description,
      accessDelay,
      accessDelayUnit,
      admissionModality,
      active,
      min,
      max,
      certificateurContratId,
      certificateurId,
      certificationModality,
      certificationModalityAccess,
      certificationType,
      certifiedData,
      certifierName,
      cpf,
      cpfCode,
      createdAt,
      enrollingLevel,
      enrollingLevelEnforced,
      graduatedLevel,
      entryExitModality,
      handicappedAccessibility,
      hoursCenter,
      hoursCompany,
      language,
      marketplaceCategoryId,
      marketplaceTargetLevel,
      sellOnMarketplace,
      showInstructors,
      trainingModality,
      youtubeId,
      transmitterCertificationId,
      trainingType,
      skillBlock,
      tailored,
      rncpCode,
      rsCode,
      rythm,
      accountingAnalytics,
      accountingNumber,
      accountingNumberFundingAgency,
      certifInfoCode,
      certificationDetails,
      certificationIncludedInAdditionalExpenses,
      certificationRegistrationDate,
      diploma,
      diplomaTitle,
      dpc,
      economicalModel,
      graduationTarget,
      graduationModality,
      graduationValidityYears,
      mentoring,
      satisfactionDescription,
      specialty,
      trainingPedagogicalModality,
    } = context.propsValue;

    const goals = context.propsValue.goals as string[];
    const targets = context.propsValue.targets as string[];
    const prerequisites = context.propsValue.prerequisites as string[];
    const assessments = context.propsValue.assessments as string[];
    const pedagogicalResources = context.propsValue.pedagogicalResources as string[];
    const steps = context.propsValue.steps as string[];
    const tags = context.propsValue.tags as string[];

    const input: ProgramInput = {
      name,
      subtitle,
      code,
      onSale,
      version,
      durationInDays,
      durationInHours,
      categoryId,
      description,
      accountingAnalytics,
      accountingNumber,
      accountingNumberFundingAgency,
      certifInfoCode,
      certificationDetails,
      certificationIncludedInAdditionalExpenses,
      certificationRegistrationDate,
      diploma,
      diplomaTitle,
      dpc,
      economicalModel,
      graduationTarget,
      graduationModality,
      graduationValidityYears,
      mentoring,
      satisfactionDescription,
      specialty,
      trainingPedagogicalModality,
      accessDelay,
      accessDelayUnit,
      admissionModality,
      capacity: { active, min, max },
      certificateurContratId,
      certificateurId,
      certificationModality,
      certificationModalityAccess,
      certificationType,
      certifiedData,
      certifierName,
      cpf,
      cpfCode,
      createdAt,
      enrollingLevel,
      enrollingLevelEnforced,
      graduatedLevel,
      entryExitModality,
      handicappedAccessibility,
      hoursCenter,
      hoursCompany,
      language,
      marketplaceCategoryId,
      marketplaceTargetLevel,
      sellOnMarketplace,
      showInstructors,
      trainingModality,
      youtubeId,
      transmitterCertificationId,
      trainingType,
      skillBlock,
      tags,
      tailored,
      rncpCode,
      rsCode,
      rythm,
    };
    if (goals.length !== 0) input.goals = goals.map((text) => ({ text }));
    if (targets.length !== 0) input.targets = targets.map((text) => ({ text }));
    if (prerequisites.length !== 0) input.prerequisites = prerequisites.map((text) => ({ text }));
    if (assessments.length !== 0) input.assessments = assessments.map((text) => ({ text }));
    if (pedagogicalResources.length !== 0)
      input.pedagogicalResources = pedagogicalResources.map((text) => ({ text }));
    if (steps.length !== 0) input.steps = steps.map((text) => ({ text }));

    const client = makeClient(context.auth);
    return await client.updateProgram(programId!, input);
  },
});
