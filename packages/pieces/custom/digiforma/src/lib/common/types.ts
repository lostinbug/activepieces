export type ContactInputObject = {
	id?: string;
	email?: string;
	fax?: string;
	firstname?: string;
	lastname?: string;
	phone?: string;
	title?: string;
};
export type CompanyInput = {
	name?: string;
	group?: string;
	code?: string;
	roadAddress?: string;
	city?: string;
	cityCode?: string;
	country?: string;
	locale?: string;
	countryCode?: string;
	website?: string;
	phone?: string;
	email?: string;
	vat?: string;
	vatAccountingCode?: string;
	accountingNumber?: string;
	publicOrganization?: boolean;
	note?: string;
	siret?: string;
	contacts?: ContactInputObject[];
};
export type InputCustomerFunding = {
	amount?: number;
	fundingAgencyId?: string;
	fundingAgreement?: string;
};

export type CreateCustomerInput = {
	accountingNumber?: string;
	companyId?: string;
	contracted?: boolean;
	contractedFundingUnknown?: boolean;
	conventionSigned?: boolean;
	costSalary?: number;
	crmStatus?: string;
	estimatedTraineeCount?: number;
	foreignCustomer?: boolean;
	jobless?: boolean;
	manualBpf?: boolean;
	manualBpfAmount?: number;
	manualBpfHours?: boolean;
	manualBpfHoursAmount?: number;
	manualBpfOtherAmount?: number;
	manualBpfPedagogicalAmount?: number;
	manualBpfTraineesAmount?: number;
	pipelineState?: number;
	qualityExpectations?: string;
	qualitySuccessConditions?: string;
	quotationAccepted?: boolean;
	specialPrice?: boolean;
	stripeId?: string;
	traineeId?: string;
	trainingSessionId?: string;
	vat?: number;
	customerFundings?: InputCustomerFunding[];
};

export type InstructorInput = {
	firstname?: string;
	lastname?: string;
	roadAddress?: string;
	email?: string;
	code?: string;
	cityCode?: string;
	city?: string;
	nationality?: string;
	birthName?: string;
	countryCode?: string;
	phone?: string;
	birthCity?: string;
	birthRegion?: string;
	birthdate?: string;
	locale?: string;
	socialNumber?: string;
	company?: string;
	siret?: string;
	insurance?: string;
	status?: string;
	cost?: number;
	vat?: number;
	accountingNumber?: string;
	profession?: string;
	bio?: string;
	diploma?: string;
	note?: string;
	skills?: string;
};

export type GradeInput = {
	description?: string;
	label?: string;
	scoreComment?: string;
	scoreResult?: number;
};

export type TraineeInput = {
	firstname?: string;
	lastname?: string;
	roadAddress?: string;
	email?: string;
	code?: string;
	cityCode?: string;
	city?: string;
	nationality?: string;
	phone?: string;
	phoneSecondary?: string;
	birthName?: string;
	birthCity?: string;
	birthRegion?: string;
	birthdate?: string;
	birthCityCode?: string;
	country?: string;
	countryCode?: string;
	locale?: string;
	status?: string;
	profession?: string;
	note?: string;
	accountingNumber?: string;
	vatAccountingCode?: string;
	freeText?: string;
};

export type AddInstructorToTrainingSessionInput = {
	contractAccepted?: boolean;
	cost?: number;
	costMode?: string;
	days?: number;
	hours?: number;
	instructorId?: string;
	subcontractingBpf?: boolean;
	trainingSessionId?: string;
	tutoringType?: string;
	vat?: number;
};

export type InvoiceItemInput = {
	name?: string;
	description?: string;
	quantity?: number;
	type?: string;
	vat?: number;
	unitPrice?: number;
};

export type CreateQuotationInput = {
	companyId?: string;
	customerId?: string;
	date?: string;
	fundingAgencyId?: string;
	items?: InvoiceItemInput[];
	traineeId?: string;
};

export type UpdateQuotationInput = {
	date?: string;
	items?: InvoiceItemInput[];
};
export type TrainingSessionDateInput = {
	date?: string;
	endTime?: string;
	startTime?: string;
	slot?: string;
};
export type TrainingSessionInput = {
	averageDurationPerDate?: number;
	datesAreInterval?: boolean;
	cityCode?: string;
	pipelineState?: string;
	roomId?: string;
	code?: string;
	showRulesInExtranet?: boolean;
	showSigningButtonInExtranet?: boolean;
	codeFundae?: string;
	contracted?: boolean;
	diploma?: string;
	diplomaTitle?: string;
	dpc?: boolean;
	inter?: boolean;
	managerId?: string;
	secondManagerId?: string;
	name?: string;
	place?: string;
	programId?: string;
	qualityAnalysis?: string;
	qualityExpectations?: string;
	placeName?: string;
	professionalArea?: string;
	qualitySuccessConditions?: string;
	remote?: boolean;
	timezone?: string;
	showDatesInExtranet?: boolean;
	showPlaceInExtranet?: boolean;
	showProgramInExtranet?: boolean;
	showTraineePedagogicalTrackingInExtranet?: boolean;
	showTraineesInExtranet?: boolean;
	specialty?: string;
	trainingType?: string;
	type?: string;
	useMap?: boolean;
	vaeAdmissibilityDate?: string;
	dates?: TrainingSessionDateInput[];
};
// export type createCustomerInput = {
//   trainingSessionId?: string;
//   accountingNumber?: string;
//   companyId?: string;
//   contracted?: boolean;
//   conventionSigned?: boolean;
//   crmStatus?: CRMStatus;
//   estimatedTraineeCount?: number;
//   foreignCustomer?: boolean;
//   jobless?: boolean;
//   manualBpf?: boolean;
//   manualBpfAmount?: number;
//   manualBpfHours?: number;
//   stripeId?: string;
//   traineeId?: string;
//   vat?: number;
// };

export type CreateInvoiceInput = {
	accountingAnalytics?: string;
	companyId?: string;
	customerId?: string;
	date?: string;
	freeText?: string;
	fundingAgencyId?: string;
	items?: InvoiceItemInput[];
	number?: number;
	prefix?: string;
	refrence?: string;
	traineeId?: string;
	vat?: number;
};

export type InvoicePaymentInput = {
	amount?: number;
	date?: string;
	freeText?: string;
	mode?: string;
	stripeId?: string;
};

export type ProgramInput = {
	name?: string;
	subtitle?: string;
	accessDelay?: number;
	accessDelayUnit?: string;
	code?: string;
	admissionModality?: number;
	capacity?: {
		active?: boolean;
		max?: number;
		min?: number;
	};
	assessments?: { text: string }[];
	onSale?: boolean;
	version?: number;
	certificateurContratId?: string;
	certificationModality?: string;
	certificationModalityAccess?: string;
	certifiedData?: boolean;
	certifierName?: string;
	createdAt?: string;
	cpf?: boolean;
	enrollingLevel?: number;
	cpfCode?: string;
	certificationType?: string;
	enrollingLevelEnforced?: boolean;
	graduatedLevel?: number;
	entryExitModality?: number;
	certificateurId?: string;
	durationInDays?: number;
	durationInHours?: number;
	handicappedAccessibility?: string;
	hoursCenter?: number;
	hoursCompany?: number;
	language?: string;
	categoryId?: string;
	description?: string;
	accountingNumber?: string;
	accountingNumberFundingAgency?: string;
	accountingAnalytics?: string;
	certifInfoCode?: string;
	marketplaceCategoryId?: string;
	marketplaceTargetLevel?: string;
	overallGoal?: string;
	certificationDetails?: string;
	pedagogicalResources?: { text: string }[];
	certificationIncludedInAdditionalExpenses?: boolean;
	certificationRegistrationDate?: string;
	diploma?: string;
	sellOnMarketplace?: boolean;
	showInstructors?: boolean;
	trainingModality?: number;
	youtubeId?: string;
	transmitterCertificationId?: string;
	steps?: { text: string }[];
	trainingType?: string;
	skillBlock?: boolean;
	tags?: string[];
	tailored?: boolean;
	rncpCode?: string;
	rsCode?: string;
	rythm?: number;
	diplomaTitle?: string;
	dpc?: boolean;
	economicalModel?: number;
	goals?: { text: string }[];
	graduationTarget?: string;
	graduationModality?: string;
	graduationValidityYears?: number;
	mentoring?: string;
	prerequisites?: { text: string }[];
	satisfactionDescription?: string;
	specialty?: string;
	targets?: { text: string }[];
	trainingPedagogicalModality?: number;
};

export type TrainingSessionSlot = {
	id?: string;
	date?: string;
	startTime?: string;
	endTime?: string;
	slot?: string;
};

export type subsessionInput = {
	dates?: TrainingSessionDateInput[];
	name?: string;
	modality?: string;
	attendanceFromModules?: boolean;
	averageDurationPerDate?: number;
	color?: string;
	datesAreInterval?: boolean;
	durationDays?: number;
	durationHours?: number;
	costs?: TrainingSessionCostInput[];
};

export type TrainingSessionCostInput = {
	cost?: number;
	costIndependant?: number;
	costIndividual?: number;
	description?: string;
	monthly?: boolean;
	costMode?: string;
	vat?: number;
	type?: string;
};

export type AbandonInput = {
	comment?: string;
	commentJustifiedAbsence?: string;
	isBack?: boolean;
	isJustified?: boolean;
	trainingSessionSlotIds: Array<string>;
};


export type CreateCustomerTraineeInput = {
	assessment?: string;
	onWorkingTime?: boolean;
	passed?: boolean;
	traineeId: string;
};