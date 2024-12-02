import { createPiece, PieceAuth } from '@activepieces/pieces-framework';
import { createCompanyAction } from './lib/actions/company/create-company';
import { createContactInCompanyAction } from './lib/actions/company/create-contact';
import { listCompaniesAction } from './lib/actions/company/list-comapnies';
import { listContactsInCompanyAction } from './lib/actions/company/list-contacts';
import { updateCompanyAction } from './lib/actions/company/update-company';
import { updateContactInCompanyAction } from './lib/actions/company/update-contact';
import { addCustomerFundingAction } from './lib/actions/customer/add-customer-funding';
import { createCustomerAction } from './lib/actions/customer/create-customer';
import { listCustomersAction } from './lib/actions/customer/list-customers';
import { updateCustomerFundingAction } from './lib/actions/customer/update-customer-funding';
import { updateCustomerAction } from './lib/actions/customer/update-cutomer';
import { listFundingAgenciesAction } from './lib/actions/funding-agency/list-funding-agencies';
import { createGradeAction } from './lib/actions/grade/create-grade';
import { updateGradeAction } from './lib/actions/grade/update-grade';
import { addInstructorToTrainingSessionAction } from './lib/actions/instructor/add-instructor-to-session';
import { addInstructorToSlotAction } from './lib/actions/instructor/add-intructor-to-slot';
import { createInstructorAction } from './lib/actions/instructor/create-instructor';
import { listInstructorsAction } from './lib/actions/instructor/list-instructors';
import { removeInstructorFromTrainingSessionAction } from './lib/actions/instructor/remove-instructor-from-session';
import { removeInstructorFromSlotAction } from './lib/actions/instructor/remove-instructor-from-slot';
import { updateInstructorAction } from './lib/actions/instructor/update-instructor';
import { createInvoiceAction } from './lib/actions/invoice/create-invoice';
import { createInvoicePaymentAction } from './lib/actions/invoice/create-invoice-payment';
import { listInvoicesAction } from './lib/actions/invoice/list-invoices';
import { updateInvoiceAction } from './lib/actions/invoice/update-invoice';
import { updateInvoicePaymentAction } from './lib/actions/invoice/update-invoice-payment';
import { createProgramAction } from './lib/actions/program/create-program';
import { listProgramsAction } from './lib/actions/program/list-programs';
import { updateProgramAction } from './lib/actions/program/update-program';
import { createQuotationAction } from './lib/actions/quotation/create-quotation';
import { listQuotationsAction } from './lib/actions/quotation/list-quotations';
import { updateQuotationAction } from './lib/actions/quotation/update-quotation';
import { createTraineeAction } from './lib/actions/trainee/create-trainee';
import { listTraineesAction } from './lib/actions/trainee/list-trainees';
import { updateTraineeAction } from './lib/actions/trainee/update-trainee';
import { addSlotsInTrainingSessionAction } from './lib/actions/training-session/add-slots-in-training-session';
import { addTraineeInTrainingSession } from './lib/actions/training-session/add-trainee-in-training-session';
import { createSubsessionAction } from './lib/actions/training-session/create-subsession';
import { createTrainingSessionAction } from './lib/actions/training-session/create-training-session';
import { listTraineesInTrainingSessionAction } from './lib/actions/training-session/list-trainee-in-training-session';
import { listTrainingSessionsAction } from './lib/actions/training-session/list-training-sessions';
import { removeTraineeFromTrainingSessionAction } from './lib/actions/training-session/remove-trainee-from-training-session';
import { updateSlotInTrainingSessionAction } from './lib/actions/training-session/update-slot-in-training-session';
import { updateTrainingSessionAction } from './lib/actions/training-session/update-training-session';
import { newOrUpdatedInstructorTrigger } from './lib/triggers/new-or-updated-instructor';
import { newOrUpdatedCompanyTrigger } from './lib/triggers/new-or-updated-company';
import { newOrUpdatedCustomerTrigger } from './lib/triggers/new-or-updated-customer';
import { newOrUpdatedTrainingSessionTrigger } from './lib/triggers/new-or-updated-training-session';
import { newOrUpdatedTraineeTrigger } from './lib/triggers/new-or-updated-trainee';
import { newOrUpdatedFundingAgencyTrigger } from './lib/triggers/new-or-updated-funding-agency';
import { newOrUpdatedProgramTrigger } from './lib/triggers/new-or-updated-program';
import { newOrUpdatedQuotationTrigger } from './lib/triggers/new-or-updated-quotation';
import { newOrUpdatedInvoiceTrigger } from './lib/triggers/new-or-updated-invoice';
import { newOrUpdatedInvoicePaymentTrigger } from './lib/triggers/new-or-updated-invoice-payment';
import { newOrUpdatedGradeTrigger } from './lib/triggers/new-or-updated-grade';
import { newOrUpdatedContactTrigger } from './lib/triggers/new-or-updated-contact';
import { newOrUpdatedCustomerFundingTrigger } from './lib/triggers/new-or-updated-customer-funding';
import { newOrUpdatedTrainingSessionSlotTrigger } from './lib/triggers/new-or-updated-training-session-slot';
import { newOrUpdatedTraineeInTrainingSessionTrigger } from './lib/triggers/new-or-updated-trainee-in-training-session';
import { newOrUpdatedInstructorInTrainingSessionTrigger } from './lib/triggers/new-or-updated-instructor-in-training-session';
import { newOrUpdatedEvaluationTrigger } from './lib/triggers/new-or-updated-evaluation';
import { createAbandonInSlotAction } from './lib/actions/training-session/create-abandon-in-slot';
import { updateSubsessionAction } from './lib/actions/training-session/update-subsession';
import { listSubsessionsInTrainingSessionAction } from './lib/actions/training-session/list-subsessions';

export const digiformaAuth = PieceAuth.SecretText({
	displayName: 'Token',
	description: `
  1. Log in to digiforma account.\n4
  2. Navigate to **Account->Integrations->GRAPHQL**.
  3. Generate new token and copy it to clipboard.`,
	required: true,
});

export const digiforma = createPiece({
	displayName: 'Digiforma',
	auth: digiformaAuth,
	minimumSupportedRelease: '0.20.0',
	logoUrl: 'https://images.yourstory.com/cs/images/companies/Digiforma1-1699010689657.jpg',
	authors: [],
	actions: [
		createCompanyAction,
		updateCompanyAction,
		listCompaniesAction,
		createQuotationAction,
		updateQuotationAction,
		listQuotationsAction,
		createCustomerAction,
		updateCustomerAction,
		listCustomersAction,
		listTraineesAction,
		createProgramAction,
		updateProgramAction,
		listProgramsAction,
		createInstructorAction,
		updateInstructorAction,
		listInstructorsAction,
		createGradeAction,
		updateGradeAction,
		listFundingAgenciesAction,
		createTraineeAction,
		updateTraineeAction,
		listTraineesAction,
		createTrainingSessionAction,
		updateTrainingSessionAction,
		listTrainingSessionsAction,
		addInstructorToSlotAction,
		removeInstructorFromSlotAction,
		addInstructorToTrainingSessionAction,
		removeInstructorFromTrainingSessionAction,
		listTraineesInTrainingSessionAction,
		addTraineeInTrainingSession,
		removeTraineeFromTrainingSessionAction,
		createInvoiceAction,
		updateInvoiceAction,
		listInvoicesAction,
		createInvoicePaymentAction,
		updateInvoicePaymentAction,
		createContactInCompanyAction,
		updateContactInCompanyAction,
		listContactsInCompanyAction,
		addSlotsInTrainingSessionAction,
		updateSlotInTrainingSessionAction,
		addCustomerFundingAction,
		updateCustomerFundingAction,
		createSubsessionAction,
		updateSubsessionAction,
		listSubsessionsInTrainingSessionAction,
		createAbandonInSlotAction,
	],
	triggers: [
		newOrUpdatedInstructorTrigger,
		newOrUpdatedCompanyTrigger,
		newOrUpdatedContactTrigger,
		newOrUpdatedCustomerTrigger,
		newOrUpdatedCustomerFundingTrigger,
		newOrUpdatedEvaluationTrigger,
		newOrUpdatedGradeTrigger,
		newOrUpdatedInstructorInTrainingSessionTrigger,
		newOrUpdatedInvoiceTrigger,
		newOrUpdatedInvoicePaymentTrigger,
		newOrUpdatedTrainingSessionTrigger,
		newOrUpdatedTraineeInTrainingSessionTrigger,
		newOrUpdatedTrainingSessionSlotTrigger,
		newOrUpdatedTraineeTrigger,
		newOrUpdatedFundingAgencyTrigger,
		newOrUpdatedProgramTrigger,
		newOrUpdatedQuotationTrigger,
	],
});
