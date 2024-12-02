import {
	AuthenticationType,
	HttpMessageBody,
	HttpMethod,
	HttpRequest,
	httpClient,
} from '@activepieces/pieces-common';
import { digifromaGraphQLMutations } from './mutations';
import { digifromaGraphQLQueries } from './queries';
import {
	AbandonInput,
	AddInstructorToTrainingSessionInput,
	CompanyInput,
	CreateCustomerInput,
	CreateInvoiceInput,
	CreateQuotationInput,
	GradeInput,
	InstructorInput,
	InvoicePaymentInput,
	ProgramInput,
	TraineeInput,
	TrainingSessionInput,
	UpdateQuotationInput,
	subsessionInput,
} from './types';
// interface DigiformaResponse {
//   data: any;
//   errors?: {
//     code: string;
//     message: string;
//     path: string[];
//     locations: { line: number; column: number }[];
//     status_code: number;
//   }[];
// }

export class DigiformaClient {
	constructor(private token: string) {}

	async makeRequest<T extends HttpMessageBody>(
		method: HttpMethod,
		query: string,
		// query?: QueryParams,
		variables?: object,
		// body: any | undefined = undefined
	): Promise<T> {
		const request: HttpRequest = {
			method: method,
			url: 'https://app.digiforma.com/api/v1/graphql',
			headers: {
				'Content-Type': 'application/json',
			},
			authentication: {
				type: AuthenticationType.BEARER_TOKEN,
				token: this.token,
			},
			body: JSON.stringify({
				query: query,
				variables: variables,
			}),
		};
		const res = await httpClient.sendRequest(request);
		if (res.body.errors) {
			throw new Error(JSON.stringify(res.body.errors));
		}
		return res.body;
	}

	async listComapnies() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listComapnies);
	}

	async searchCompanies(dateFilters: { updatedAfter: string }) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchCompanies, {
			date_filters: dateFilters,
		});
	}

	async listContactsInCompany(id: string) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listContacts, {
			company_id: id,
		});
	}

	async searchContacts(pagination: { page: number; size: number }) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchContacts, {
			pagination: pagination,
		});
	}

	async createCompany(request: CompanyInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.createCompany, {
			company_input: request,
		});
	}

	async updateCompany(id: string, request: CompanyInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.updateCompany, {
			company_id: id,
			company_input: request,
		});
	}

	async listCustomers() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listCustomers);
	}

	async searchCustomers(dateFilters: { updatedAfter: string }) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchCustomers, {
			date_filters: dateFilters,
		});
	}

	async createCustomer(request: CreateCustomerInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.createCustomer, {
			customer_input: request,
		});
	}

	async updateCustomer(id: string, request: CreateCustomerInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.updateCustomer, {
			customer_id: id,
			customer_input: request,
		});
	}

	async listQuotations() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listQuotations);
	}

	async searchQuotations(pagination: { page: number; size: number }) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchQuotations, {
			pagination: pagination,
		});
	}

	async createQuotation(request: CreateQuotationInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.createQuotation, {
			quotation_input: request,
		});
	}

	async updateQuotation(id: string, request: UpdateQuotationInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.updateQuotation, {
			quotation_id: id,
			quotation_input: request,
		});
	}

	async listTrainees() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listTrainees);
	}

	async searchTrainees(dateFilters: { updatedAfter: string }) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchTrainees, {
			date_filters: dateFilters,
		});
	}

	async createTrainee(request: TraineeInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.createTrainee, {
			trainee_input: request,
		});
	}

	async updateTrainee(id: string, request: TraineeInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.updateTrainee, {
			trainee_id: id,
			trainee_input: request,
		});
	}

	async createProgram(request: ProgramInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.createProgram, {
			program_input: request,
		});
	}

	async updateProgram(id: string, request: ProgramInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.updateProgram, {
			program_id: id,
			program_input: request,
		});
	}

	async listPrograms() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listPrograms);
	}

	async searchPrograms(dateFilters: { updatedAfter: string }) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchPrograms, {
			date_filters: dateFilters,
		});
	}

	async listProgramCategories() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listProgramCategories);
	}

	async listInstructors() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listInstructors);
	}

	async searchInstructors(dateFilters: { updatedAfter: string }) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchInstructors, {
			date_filters: dateFilters,
		});
	}

	async createInstructor(request: InstructorInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.createInstructor, {
			instructor_input: request,
		});
	}

	async updateInstructor(id: string, request: InstructorInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.updateInstructor, {
			instructor_id: id,
			instructor_input: request,
		});
	}
	async createGrade(trainee_id: string, training_session_id: string, request: GradeInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.createGrade, {
			trainee_id: trainee_id,
			training_session_id: training_session_id,
			grade_input: request,
		});
	}

	async updateGrade(id: string, request: GradeInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.updateGrade, {
			grade_id: id,
			grade_input: request,
		});
	}

	async listFundingAgencies() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listFundingAgencies);
	}

	async searchFundingAgencies(dateFilters: { updatedAfter: string }) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchFundingAgencies, {
			date_filters: dateFilters,
		});
	}
	async addInstructorToSlot(slot_id: string, training_session_instructor_id: string) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.addInstructorToSlot, {
			slot_id: slot_id,
			training_session_instructor_id: training_session_instructor_id,
		});
	}

	async removeInstructorFromSlot(slot_id: string, training_session_instructor_id: string) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLMutations.removeInstructorFromSlot,
			{
				slot_id: slot_id,
				training_session_instructor_id: training_session_instructor_id,
			},
		);
	}

	async addInstructorToTrainingSession(request: AddInstructorToTrainingSessionInput) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLMutations.addInstructorToTrainingSession,
			request,
		);
	}

	async removeInstructorFromTrainingSession(training_session_instructor_id: string) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLMutations.removeInstructorFromTrainingSession,
			{
				training_session_instructor_id: training_session_instructor_id,
			},
		);
	}

	async createTrainingSession(request: TrainingSessionInput) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLMutations.createTrainingSession,
			{ session_input: request },
		);
	}

	async updateTrainingSession(id: string, request: TrainingSessionInput) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLMutations.updateTrainingSession,
			{ session_id: id, session_input: request },
		);
	}

	async listTrainingSessions() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listTrainingSessions);
	}

	async searchTrainingSessions(dateFilters: { updatedAfter: string }) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchTrainingSessions, {
			date_filters: dateFilters,
		});
	}

	async listTraineesInTrainingSession(id: string) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLQueries.listTraineesInTrainingSession,
			{ session_id: id },
		);
	}

	async listTraineeGrades(id: string) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listTraineeGrades, {
			trainee_id: id,
		});
	}

	async searchTraineeGrades(pagination: { page: number; size: number }) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchTraineeGrades, {
			pagination: pagination,
		});
	}

	async updateTrainingSubSession(id: string, request: subsessionInput) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLMutations.updateTrainingSubSession,
			{ subsession_id: id, subsession_input: request },
		);
	}

	async listTrainingSubSessions(id: string) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLQueries.listTrainingSubSessions,
			{ session_id: id },
		);
	}

	async listCustomersInTrainingSession(id: string) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLQueries.listCustomersInTrainingSession,
			{ session_id: id },
		);
	}

	async listInstructorsInTrainingSession(id: string) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLQueries.listInstructorsInTrainingSession,
			{ session_id: id },
		);
	}

	async deleteCustomer(id: string) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.deleteCustomer, {
			customer_id: id,
		});
	}

	async createInvoice(request: CreateInvoiceInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.createInvoice, {
			invoice_input: request,
		});
	}

	async updateInvoice(id: string, request: CreateInvoiceInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.updateInvoice, {
			invoice_id: id,
			invoice_input: request,
		});
	}

	async listInvoices() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listInvoices);
	}

	async searchInvoices(
		dateFilters: { updatedAfter: string },
		pagination: { page: number; size: number },
	) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchInvoices, {
			date_filters: dateFilters,
			pagination: pagination,
		});
	}

	async listInvoicePayments(id: string) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listInvoicePayments, {
			invoice_id: id,
		});
	}

	async searchInvoicePayments(pagination: { page: number; size: number }) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchInvoicePayments, {
			pagination: pagination,
		});
	}

	async createInvoicePayment(id: string, request: InvoicePaymentInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.createInvoicePayment, {
			invoice_id: id,
			payment_input: request,
		});
	}

	async updateInvoicePayment(id: string, request: InvoicePaymentInput) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLMutations.updateInvoicePayment, {
			payment_id: id,
			payment_input: request,
		});
	}

	async listProgramDiplomas() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listProgramDiplomas);
	}

	async listProgramSpecialties() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listProgramSpecialties);
	}

	async listmanagers() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listManagers);
	}

	async listMarketplaceCategories() {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLQueries.listMarketplaceCategories,
		);
	}

	async listRooms() {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.listRooms);
	}

	async createSubsession(id: string, request: subsessionInput) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLMutations.createTrainingSubSession,
			{ session_id: id, subsession_input: request },
		);
	}

	async createAbandonWithSlots(sessionId: string, traineeId: string, request: AbandonInput) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLMutations.createAbandonWithSlots,
			{ session_id: sessionId, trainee_id: traineeId, abandon_input: request },
		);
	}

	async searchCustomerFundings(pagination: { page: number; size: number }) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchCustomerFundings, {
			pagination: pagination,
		});
	}

	async searchTrainingSessionSlots(pagination: { page: number; size: number }) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLQueries.searchTrainingSessionSlots,
			{
				pagination: pagination,
			},
		);
	}

	async searchTraineesInTrainingSession(pagination: { page: number; size: number }) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLQueries.searchTraineesInTrainingSession,
			{
				pagination: pagination,
			},
		);
	}

	async searchInstructorsInTrainingSession(pagination: { page: number; size: number }) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLQueries.searchInstructorsInTrainingSession,
			{
				pagination: pagination,
			},
		);
	}

	async searchEvaluations(pagination: { page: number; size: number }) {
		return await this.makeRequest(HttpMethod.POST, digifromaGraphQLQueries.searchEvaluations, {
			pagination: pagination,
		});
	}

	async listTrainingSessionSlots(sessionId: string) {
		return await this.makeRequest(
			HttpMethod.POST,
			digifromaGraphQLQueries.listTrainingSessionSlots,
			{
				sessionId: sessionId,
			},
		);
	}
}
