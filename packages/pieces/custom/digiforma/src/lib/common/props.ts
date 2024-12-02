import { Property } from '@activepieces/pieces-framework';
import { digiformaCommon } from '.';

export const digiformaProps = {
  company: {
    group: Property.ShortText({
      displayName: 'Group',
      required: false,
    }),
    code: Property.ShortText({
      displayName: 'Internal Code',
      required: false,
    }),
    roadAddress: Property.LongText({
      displayName: 'Address',
      required: false,
    }),
    city: Property.ShortText({
      displayName: 'City',
      required: false,
    }),
    cityCode: Property.ShortText({
      displayName: 'Post Code',
      required: false,
    }),
    country: Property.ShortText({
      displayName: 'Country',
      required: false,
    }),
    locale: Property.ShortText({
      displayName: 'Language',
      required: false,
    }),
    countryCode: Property.ShortText({
      displayName: 'Country Code',
      required: false,
    }),
    website: Property.ShortText({
      displayName: 'Website',
      required: false,
    }),
    phone: Property.ShortText({
      displayName: 'Company Phone',
      required: false,
    }),
    email: Property.ShortText({
      displayName: 'Company Email',
      required: false,
    }),
    vat: Property.ShortText({
      displayName: 'VAT number',
      required: false,
    }),
    vatAccountingCode: Property.ShortText({
      displayName: 'VAT account number in accounting',
      required: false,
    }),
    accountingNumber: Property.ShortText({
      displayName: 'Customer account number in accounting',
      required: false,
    }),
    publicOrganization: Property.Checkbox({
      displayName:
        'State or local authority or public administrative establishment?',
      required: false,
      defaultValue: false,
    }),
    note: Property.LongText({
      displayName: 'Free Notes',
      required: false,
    }),
    siret: Property.ShortText({
      displayName: 'Company identification code',
      required: false,
    }),
  },
  instructor: {
    firstname: Property.ShortText({
      displayName: 'First Name',
      required: false,
    }),
    roadAddress: Property.LongText({
      displayName: 'Address',
      required: false,
    }),
    email: Property.ShortText({
      displayName: 'Email',
      required: false,
    }),
    code: Property.ShortText({
      displayName: 'Internal Code',
      required: false,
    }),
    cityCode: Property.ShortText({
      displayName: 'Postal Code',
      required: false,
    }),
    city: Property.ShortText({
      displayName: 'City',
      required: false,
    }),
    nationality: Property.ShortText({
      displayName: 'Nationality',
      required: false,
    }),
    birthName: Property.ShortText({
      displayName: 'Birth Name',
      required: false,
    }),
    countryCode: Property.ShortText({
      displayName: 'Country Code',
      required: false,
    }),
    phone: Property.ShortText({
      displayName: 'Phone',
      required: false,
    }),
    birthCity: Property.ShortText({
      displayName: 'City of birth',
      required: false,
    }),
    birthRegion: Property.ShortText({
      displayName: 'Department of birth',
      required: false,
    }),
    birthdate: Property.DateTime({
      displayName: 'Date of birth',
      description: 'Use YYYY-MM-DD format.',
      required: false,
    }),
    socialNumber: Property.ShortText({
      displayName: 'Social Security Number',
      required: false,
    }),
    locale: Property.StaticDropdown({
      displayName: 'Language',
      required: false,
      defaultValue: 'fr',
      options: {
        disabled: false,
        options: [
          {
            label: 'English',
            value: 'en',
          },
          {
            label: 'French',
            value: 'fr',
          },
          {
            label: 'Spanish',
            value: 'es',
          },
          {
            label: 'German',
            value: 'de',
          },
          {
            label: 'Italian',
            value: 'it',
          },
        ],
      },
    }),
    company: Property.ShortText({
      displayName: 'Company',
      required: false,
    }),
    siret: Property.ShortText({
      displayName: 'Company Identification Code',
      required: false,
    }),
    insurance: Property.ShortText({
      displayName: 'Insurance No',
      required: false,
    }),
    status: Property.StaticDropdown({
      displayName: 'Default Status',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'Internal',
            value: 'internal',
          },
          {
            label: 'External',
            value: 'external',
          },
        ],
      },
    }),
    cost: Property.Number({
      displayName: 'Default Rate',
      required: false,
    }),
    vat: Property.Number({
      displayName: 'VAT',
      required: false,
    }),
    accountingNumber: Property.ShortText({
      displayName: 'Account Number in Accounting',
      required: false,
    }),
    profession: Property.ShortText({
      displayName: 'Profession',
      required: false,
    }),
    bio: Property.ShortText({
      displayName: 'Bio',
      required: false,
    }),
    diploma: Property.ShortText({
      displayName: 'Diplomas',
      required: false,
    }),
    note: Property.LongText({
      displayName: 'Free Notes',
      required: false,
    }),
    skills: Property.LongText({
      displayName: 'Competency Notes',
      required: false,
    }),
  },
  grade: {
    label: Property.ShortText({
      displayName: 'Title of Assessment',
      required: false,
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
  trainee: {
    firstname: Property.ShortText({
      displayName: 'First Name',
      required: false,
    }),

    roadAddress: Property.LongText({
      displayName: 'Address',
      required: false,
    }),
    email: Property.ShortText({
      displayName: 'Email',
      required: false,
    }),
    code: Property.ShortText({
      displayName: 'Internal Code',
      required: false,
    }),
    cityCode: Property.ShortText({
      displayName: 'Postal Code',
      required: false,
    }),
    city: Property.ShortText({
      displayName: 'City',
      required: false,
    }),
    nationality: Property.ShortText({
      displayName: 'Nationality',
      required: false,
    }),
    phone: Property.ShortText({
      displayName: 'Phone',
      required: false,
    }),
    phoneSecondary: Property.ShortText({
      displayName: 'Secondary Phone',
      required: false,
    }),
    birthName: Property.ShortText({
      displayName: 'Birth Name',
      required: false,
    }),
    birthCity: Property.ShortText({
      displayName: 'City of birth',
      required: false,
    }),
    birthRegion: Property.ShortText({
      displayName: 'Department of birth',
      required: false,
    }),
    birthCityCode: Property.ShortText({
      displayName: 'Postalcode of place of birth',
      required: false,
    }),
    birthdate: Property.DateTime({
      displayName: 'Date of birth',
      description: 'Use YYYY-MM-DD format.',
      required: false,
    }),
    country: Property.ShortText({
      displayName: 'Country',
      required: false,
    }),
    countryCode: Property.ShortText({
      displayName: 'Country Code',
      required: false,
    }),
    locale: Property.StaticDropdown({
      displayName: 'Language on the Training Portal',
      required: false,
      defaultValue: 'fr',
      options: {
        disabled: false,
        options: [
          {
            label: 'English',
            value: 'en',
          },
          {
            label: 'French',
            value: 'fr',
          },
          {
            label: 'Spanish',
            value: 'es',
          },
          {
            label: 'German',
            value: 'de',
          },
          {
            label: 'Italian',
            value: 'it',
          },
        ],
      },
    }),
    status: Property.StaticDropdown({
      displayName: 'Default Status',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'Employee',
            value: 'employee',
          },
          {
            label: 'Self Employeed',
            value: 'independant',
          },
          {
            label: 'Private Individual',
            value: 'individual',
          },
        ],
      },
    }),
    profession: Property.ShortText({
      displayName: 'Profession',
      required: false,
    }),
    note: Property.LongText({
      displayName: 'Free Notes',
      required: false,
    }),
    accountingNumber: Property.ShortText({
      displayName: 'Account Number in Accounting',
      required: false,
    }),
    vatAccountingCode: Property.ShortText({
      displayName: 'VAT Account Number in Accounting',
      required: false,
    }),
    freeText: Property.ShortText({
      displayName: 'Mention to be added in the documents',
      required: false,
    }),
  },
  quotation: {
    date: Property.DateTime({
      displayName: 'Date',
      description: 'Use YYYY-MM-DD format.',
      required: false,
    }),
    items: Property.Array({
      displayName: 'Items',
      required: true,
      properties: {
        name: Property.ShortText({
          displayName: 'Name',
          required: false,
        }),
        description: Property.ShortText({
          displayName: 'Description',
          required: false,
        }),
        quantity: Property.Number({
          displayName: 'Quantity',
          required: false,
        }),
        type: Property.StaticDropdown({
          displayName: 'Type',
          required: false,
          options: {
            disabled: false,
            options: [
              {
                label: 'Training & Educational Costs',
                value: 'training',
              },
              {
                label: 'Additional Costs',
                value: 'other_expenses',
              },
              {
                label: 'Educational Tools',
                value: 'pedagogical_products',
              },
              {
                label: 'Outside of Training',
                value: 'non_training',
              },
            ],
          },
        }),
        unitPrice: Property.Number({
          displayName: 'Unit Price',
          required: false,
        }),
        vat: Property.Number({
          displayName: 'VAT',
          required: false,
        }),
      },
    }),
  },
  customer: {
    accountingNumber: Property.ShortText({
      displayName: 'Accounting Number',
      description: 'Customer account number in accounting',
      required: false,
    }),
    contracted: Property.Checkbox({
      displayName: 'Subcontracting situation?',
      required: false,
    }),
    conventionSigned: Property.Checkbox({
      displayName: 'Agreement signed?',
      required: false,
    }),
    crmStatus: Property.StaticDropdown({
      displayName: 'CRM status',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'CANCELLED',
            value: 'CANCELLED',
          },
          { label: 'COMPLETED', value: 'COMPLETED' },
          { label: 'LOST', value: 'LOST' },
          { label: 'UNDECIDED', value: 'UNDECIDED' },
          { label: 'WON', value: 'WON' },
        ],
      },
    }),
    estimatedTraineeCount: Property.Number({
      displayName: 'Number of learners',
      required: false,
    }),
    foreignCustomer: Property.Checkbox({
      displayName: 'Foreign customer ?',
      required: false,
    }),
    jobless: Property.Checkbox({
      displayName: 'Individual in a situation of unemployment ?',
      required: false,
    }),
    stripeId: Property.ShortText({
      displayName: 'Stripe ID',
      required: false,
    }),
    vat: Property.Number({
      displayName: 'VAT Rate',
      required: false,
    }),
  },
  trainingSession: {
    averageDurationPerDate: Property.Number({
      displayName: 'Duration Per Date',
      description: 'Average duration of a slot in the date range',
      required: false,
    }),
    datesAreInterval: Property.Checkbox({
      displayName: 'Dates in interval mode?',
      required: false,
    }),
    pipelineState: Property.ShortText({
      displayName: 'Advancement stage',
      required: false,
    }),
    roomId: digiformaCommon.roomId(false),
    code: Property.ShortText({
      displayName: 'Internal session code',
      required: false,
    }),
    cityCode: Property.ShortText({
      displayName: 'Postcode',
      required: false,
      description: 'Postcode of training location.',
    }),
    codeFundae: Property.ShortText({
      displayName: 'Fundae Code',
      required: false,
    }),
    contracted: Property.Checkbox({
      displayName: 'Subcontracting ?',
      required: false,
    }),
    diploma: Property.ShortText({
      displayName: 'Diploma',
      required: false,
    }),
    diplomaTitle: Property.ShortText({
      displayName: 'Diploma Title',
      required: false,
    }),
    dpc: Property.Checkbox({
      displayName: 'DPC ?',
      required: false,
    }),
    inter: Property.Checkbox({
      displayName: 'Inter Corporation ?',
      required: false,
    }),
    professionalArea: Property.ShortText({
      displayName: 'Professional Area',
      description:
        'Used only for Spain administration - Should be 4 letters from administration rules',
      required: false,
    }),
    place: Property.ShortText({
      displayName: 'Place',
      description:
        'If no room associated with the session, address of the training location.',
      required: false,
    }),
    placeName: Property.ShortText({
      displayName: 'Place Name',
      description:
        'If no room associated with the session, name of the training location',
      required: false,
    }),
    qualityAnalysis: Property.LongText({
      displayName: 'Quality Analysis',
      description: 'Summaries of the results of satisfaction evaluations',
      required: false,
    }),
    qualityExpectations: Property.LongText({
      displayName: 'Quality Expectations',
      description: 'Customer expectations',
      required: false,
    }),
    qualitySuccessConditions: Property.LongText({
      displayName: 'Quality Success Conditions',
      required: false,
    }),
    remote: Property.Checkbox({
      displayName: 'Distance learning ?',
      required: false,
    }),
    showDatesInExtranet: Property.Checkbox({
      displayName: 'Dates visible in the extranet?',
      required: false,
    }),
    showPlaceInExtranet: Property.Checkbox({
      displayName: 'Location visible in the extranet?',
      required: false,
    }),
    showProgramInExtranet: Property.Checkbox({
      displayName: 'Card visible in the extranet?',
      required: false,
    }),
    showRulesInExtranet: Property.Checkbox({
      displayName: 'Internal regulations visible on the extranet?',
      required: false,
    }),
    showSigningButtonInExtranet: Property.Checkbox({
      displayName: 'Sign-in button automatically displayed?',
      required: false,
    }),
    showTraineePedagogicalTrackingInExtranet: Property.Checkbox({
      displayName: 'Individualized educational monitoring page?',
      required: false,
    }),
    showTraineesInExtranet: Property.Checkbox({
      displayName: 'List of learners visible in the extranet?',
      required: false,
    }),
    specialty: digiformaCommon.programSpecialtyId(false),
    trainingType: Property.StaticDropdown({
      displayName: 'Training Type',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'Training Action',
            value: 'Training action',
          },
          { label: 'Skills Assessment', value: 'Skills assessment' },
          {
            label: 'Action to Validate Acquired Experience',
            value: 'Action to validate acquired experience',
          },
          {
            label: 'Training Action through Apprenticeship',
            value: 'Training action through apprenticeship',
          },
        ],
      },
    }),
    timezone: Property.ShortText({
      displayName: 'Timezone',
      required: false,
    }),
    type: Property.ShortText({
      displayName: 'Session Type',
      required: false,
    }),
    useMap: Property.Checkbox({
      displayName: 'Use Map?',
      required: false,
    }),
    vaeAdmissibilityDate: Property.DateTime({
      displayName: 'VAE eligibility date',
      required: false,
      description: 'Use YYYY-MM-DD format.',
    }),
  },
  invoice: {
    accountingAnalytics: Property.ShortText({
      displayName: 'Cost accounting code',
      required: false,
    }),
    date: Property.DateTime({
      required: false,
      displayName: 'Bill Date',
      description: 'Use YYYY-MM-DD format.',
    }),
    freeText: Property.ShortText({
      displayName: 'Free Mention',
      required: false,
    }),
    items: Property.Array({
      displayName: 'Items',
      required: true,
      properties: {
        name: Property.ShortText({
          displayName: 'Name',
          required: false,
        }),
        description: Property.ShortText({
          displayName: 'Description',
          required: false,
        }),
        quantity: Property.Number({
          displayName: 'Quantity',
          required: false,
        }),
        type: Property.StaticDropdown({
          displayName: 'Type',
          required: false,
          options: {
            disabled: false,
            options: [
              {
                label: 'Training & Educational Costs',
                value: 'training',
              },
              {
                label: 'Additional Costs',
                value: 'other_expenses',
              },
              {
                label: 'Educational Tools',
                value: 'pedagogical_products',
              },
              {
                label: 'Outside of Training',
                value: 'non_training',
              },
            ],
          },
        }),
        unitPrice: Property.Number({
          displayName: 'Unit Price',
          required: false,
        }),
        vat: Property.Number({
          displayName: 'VAT',
          required: false,
        }),
      },
    }),
    number: Property.Number({
      displayName: 'Bill Number',
      required: false,
    }),
    prefix: Property.ShortText({
      displayName: 'Invoice Prefix',
      required: false,
    }),
  },
  invoicePayment: {
    amount: Property.Number({
      displayName: 'Amount',
      required: false,
    }),
    date: Property.DateTime({
      required: false,
      displayName: 'Bill Date',
      description: 'Use YYYY-MM-DD format.',
    }),
    freeText: Property.ShortText({
      displayName: 'Free Mention',
      required: false,
    }),
    mode: Property.StaticDropdown({
      displayName: 'Payment Mode',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'Cash',
            value: 'CASH',
          },
          {
            label: 'Transfer',
            value: 'TRANSFER',
          },
          {
            label: 'Online',
            value: 'ONLINE',
          },
          {
            label: 'Cheque',
            value: 'CHECK',
          },
          {
            label: 'Credit Card',
            value: 'CARD',
          },
          {
            label: 'Direct Debit',
            value: 'DIRECT_DEBIT',
          },
        ],
      },
    }),
    stripeId: Property.ShortText({
      displayName: 'Stripe ID',
      required: false,
    }),
  },
  program: {
    subtitle: Property.ShortText({
      displayName: 'Sub Title',
      required: false,
    }),
    accessDelay: Property.Number({
      displayName: 'Access Delay',
      required: false,
    }),
    accessDelayUnit: Property.StaticDropdown({
      displayName: 'Access Delay Unit',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'Days',
            value: 'DAYS',
          },
          {
            label: 'Hours',
            value: 'HOURS',
          },
          {
            label: 'Weeks',
            value: 'WEEKS',
          },
        ],
      },
    }),
    description: Property.LongText({
      displayName: 'Description',
      required: false,
    }),
    code: Property.ShortText({
      displayName: 'Internal Program Code',
      required: false,
    }),
    categoryId: digiformaCommon.programCategoryId(false),
    onSale: Property.Checkbox({
      displayName: 'Sell on the online catalogue?',
      required: false,
    }),
    version: Property.Number({
      displayName: 'Program Version',
      required: false,
    }),
    durationInDays: Property.Number({
      displayName: 'Day Duration',
      required: false,
    }),
    durationInHours: Property.Number({
      displayName: 'Hour Duration',
      required: false,
    }),
    accountingNumber: Property.ShortText({
      displayName: 'Product code in accounting',
      required: false,
    }),
    accountingNumberFundingAgency: Property.ShortText({
      displayName: 'Product code for funders (optional)',
      required: false,
    }),
    accountingAnalytics: Property.ShortText({
      displayName: 'Analytical Accounting code',
      required: false,
    }),
    admissionModality: Property.Number({
      displayName: 'Admission procedure',
      required: false,
    }),
    active: Property.Checkbox({
      displayName: 'Class Size?',
      required: false,
    }),
    max: Property.Number({
      displayName: 'Max Class size',
      required: false,
      defaultValue: 100,
    }),
    min: Property.Number({
      displayName: 'Min Class size',
      required: false,
      defaultValue: 1,
    }),
    assessments: Property.Array({
      displayName: 'Assessments',
      required: false,
    }),
    certifInfoCode: Property.ShortText({
      displayName: 'Certificate code',
      required: false,
    }),
    certificateurContratId: Property.ShortText({
      displayName: 'Certifier contract number',
      required: false,
    }),
    certificateurId: Property.ShortText({
      displayName: 'Certifier ID',
      required: false,
    }),
    certificationDetails: Property.LongText({
      displayName: 'Certification Details',
      required: false,
    }),
    certificationIncludedInAdditionalExpenses: Property.Checkbox({
      displayName: 'Certification included in additional costs?',
      required: false,
    }),
    certificationModality: Property.StaticDropdown({
      displayName: 'Procedures for obtaining certification',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'Admission',
            value: 'ADMISSION',
          },
          { label: 'Scoring', value: 'SCORING' },
        ],
      },
    }),
    certificationModalityAccess: Property.StaticDropdown({
      displayName: 'Certification Modality Access',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'CANDIDAT_LIBRE',
            value: 'CANDIDAT_LIBRE',
          },
          {
            label: 'EQUIVALENCE_DIPLOME_ETRANGER',
            value: 'EQUIVALENCE_DIPLOME_ETRANGER',
          },
          {
            label: 'FORMATION_CONTINUE_CONTRAT_DE_PROFESSIONNALISATION',
            value: 'FORMATION_CONTINUE_CONTRAT_DE_PROFESSIONNALISATION',
          },
          {
            label: 'FORMATION_CONTINUE_HORS_CONTRAT_DE_PROFESSIONNALISATION',
            value: 'FORMATION_CONTINUE_HORS_CONTRAT_DE_PROFESSIONNALISATION',
          },
          {
            label: 'FORMATION_INITIALE_APPRENTISSAGE',
            value: 'FORMATION_INITIALE_APPRENTISSAGE',
          },
          {
            label: 'FORMATION_INITIALE_HORS_APPRENTISSAGE',
            value: 'FORMATION_INITIALE_HORS_APPRENTISSAGE',
          },
          { label: 'VAE', value: 'VAE' },
        ],
      },
    }),
    certificationRegistrationDate: Property.DateTime({
      displayName: 'Certification registration date',
      required: false,
      description: 'Use YYYY-MM-DD format.',
    }),
    certificationType: Property.StaticDropdown({
      displayName: 'Certification Type',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'University',
            value: 'UNIVERSITAIRE',
          },
          {
            label: 'Establishment',
            value: 'ETABLISSEMENT',
          },
          {
            label: 'Authorization',
            value: 'HABILITATION',
          },
          {
            label: 'RNCP',
            value: 'RNCP',
          },
          { label: 'RS', value: 'RS' },
          {
            label: 'Acknowledgement',
            value: 'RECONNAISSANCE',
          },
        ],
      },
    }),
    certifiedData: Property.Checkbox({
      displayName: 'Certified data',
      required: false,
    }),
    certifierName: Property.ShortText({
      displayName: 'Name of certifier',
      required: false,
    }),
    cpf: Property.Checkbox({
      displayName: 'CPF?',
      required: false,
    }),
    cpfCode: Property.ShortText({
      displayName: 'CPF Code',
      required: false,
    }),
    createdAt: Property.DateTime({
      displayName: 'Date Added',
      required: false,
      description: 'Use YYYY-MM-DD format.',
    }),
    diploma: digiformaCommon.programDiplomaId(false),
    diplomaTitle: Property.ShortText({
      displayName: 'Diploma Title',
      required: false,
    }),
    dpc: Property.Checkbox({
      displayName: 'DPC ?',
      required: false,
    }),
    economicalModel: Property.StaticDropdown({
      displayName: 'Economical Model',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'attendance: calculation in hours,hald day,day',
            value: 1,
          },
          {
            label: 'flate rate: flat rate calculation',
            value: 2,
          },
        ],
      },
    }),
    enrollingLevel: Property.Number({
      displayName: 'Enrolling Level',
      required: false,
    }),
    enrollingLevelEnforced: Property.Checkbox({
      displayName: 'Mandatory entry level?',
      required: false,
    }),
    entryExitModality: Property.StaticDropdown({
      displayName: 'Entry Exit Modality',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'On Fixed Dates',
            value: 0,
          },
          {
            label: 'Permanent (without fixed dates)',
            value: 1,
          },
        ],
      },
    }),
    goals: Property.Array({
      displayName: 'Educational Objectives',
      required: false,
    }),
    graduatedLevel: Property.Number({
      displayName: 'Output level',
      required: false,
    }),
    graduationTarget: Property.ShortText({
      displayName: 'Expected results at the end of the training.',
      required: false,
    }),
    graduationModality: Property.ShortText({
      displayName: 'Obtaining Procedures',
      required: false,
    }),
    graduationValidityYears: Property.Number({
      displayName: 'Validity',
      description: 'Validity period (in years) of certificate',
      required: false,
    }),
    handicappedAccessibility: Property.ShortText({
      displayName: 'Handicapped Accessibility',
      required: false,
    }),
    hoursCenter: Property.Number({
      displayName: 'Training hours completed in the center',
      required: false,
    }),
    hoursCompany: Property.Number({
      displayName: 'Hours of training completed in-company',
      required: false,
    }),
    language: Property.ShortText({
      displayName: 'Language',
      required: false,
    }),
    marketplaceCategoryId: digiformaCommon.marketplaceCategoryId(false),
    marketplaceTargetLevel: Property.StaticDropdown({
      displayName: 'Marketplace Target Level',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'Advanced',
            value: 'ADVANCED',
          },
          {
            label: 'Any Level',
            value: 'ANY_LEVEL',
          },
          {
            label: 'Beginner',
            value: 'BEGINNER',
          },
          {
            label: 'Middle',
            value: 'MIDDLE',
          },
        ],
      },
    }),
    mentoring: Property.ShortText({
      displayName: 'Description of the teaching staff',
      required: false,
    }),
    overallGoal: Property.ShortText({
      displayName: 'General objective of the training (EDOF)',
      required: false,
    }),
    pedagogicalResources: Property.Array({
      displayName: 'Pedagogical Resources',
      required: false,
    }),
    prerequisites: Property.Array({
      displayName: 'Learners Requirements',
      required: false,
    }),
    rncpCode: Property.ShortText({
      displayName: 'RNCP code',
      required: false,
    }),
    rsCode: Property.ShortText({
      displayName: 'RS code',
      required: false,
    }),
    rythm: Property.Number({
      displayName: 'Pace of training',
      required: false,
    }),
    satisfactionDescription: Property.ShortText({
      displayName: 'Perfomance Indicators',
      required: false,
    }),
    sellOnMarketplace: Property.Checkbox({
      displayName: 'Sell on Marketplace ?',
      required: false,
    }),
    showInstructors: Property.Checkbox({
      displayName: 'Show speakers in the catalog?',
      required: false,
    }),
    skillBlock: Property.Checkbox({
      displayName: 'Skill block?',
      required: false,
    }),
    specialty: digiformaCommon.programSpecialtyId(false),
    tags: Property.Array({
      displayName: 'Tags',
      required: false,
    }),
    tailored: Property.Checkbox({
      displayName: 'available on quote(option on online catalog) ?',
      required: false,
    }),
    targets: Property.Array({
      displayName: 'Target audience for this course',
      required: false,
    }),
    trainingModality: Property.Number({
      displayName: 'Type of training course',
      required: false,
    }),
    trainingPedagogicalModality: Property.StaticDropdown({
      displayName: 'Teaching methods',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'In Person Training',
            value: 0,
          },
          {
            label: 'Blended Training',
            value: 1,
          },
          {
            label: 'Distance Training',
            value: 2,
          },
        ],
      },
    }),
    trainingType: Property.StaticDropdown({
      displayName: 'Training Type',
      required: false,
      options: {
        disabled: false,
        options: [
          {
            label: 'APPRENTISSAGE',
            value: 'APPRENTISSAGE',
          },
          { label: 'EXPERIENCE', value: 'EXPERIENCE' },
          { label: 'COMPETENCE', value: 'COMPETENCE' },
        ],
      },
    }),
    transmitterCertificationId: Property.ShortText({
      displayName: 'Issuer ID',
      required: false,
    }),
    youtubeId: Property.ShortText({
      displayName: 'youtube video code',
      required: false,
    }),
    steps: Property.Array({
      displayName: 'COURSE CONTENT (LEARNING PROGRESSION)',
      required: false,
    }),
  },
  contact: {
    firstname: Property.ShortText({
      displayName: 'First Name',
      required: false,
    }),
    email: Property.ShortText({
      displayName: 'Email',
      required: false,
    }),
    fax: Property.ShortText({
      displayName: 'Fax',
      required: false,
    }),
    phone: Property.ShortText({
      displayName: 'Phone',
      required: false,
    }),
    title: Property.ShortText({
      displayName: 'Title',
      required: false,
    }),
  },
  subsession: {
    attendanceFromModules: Property.Checkbox({
      displayName: 'Attendance calculated from elearning connections?',
      required: false,
    }),
    averageDurationPerDate: Property.Number({
      displayName: 'Duration per Date',
      required: false,
    }),
    color: Property.ShortText({
      displayName: 'Module Color',
      required: false,
    }),
    datesAreInterval: Property.Checkbox({
      displayName: 'Dates in interval mode?',
      required: false,
    }),
    durationDays: Property.Number({
      displayName: 'Duration in days',
      required: false,
    }),
    durationHours: Property.Number({
      displayName: 'Duration in hours',
      required: false,
    }),
    modality: Property.ShortText({
      displayName: 'Modality',
      required: false,
    }),
    costs: Property.Array({
      displayName: 'Costs',
      required: false,
      properties: {
        cost: Property.Number({
          displayName: 'Cost',
          required: false,
        }),
        costIndependant: Property.Number({
          displayName: 'Independent price',
          required: false,
        }),
        costIndividual: Property.Number({
          displayName: 'Special price ?',
          required: false,
        }),
        description: Property.LongText({
          displayName: 'Description',
          required: false,
        }),
        monthly: Property.Checkbox({
          displayName: 'Monthly ?',
          required: false,
        }),
        type: Property.StaticDropdown({
          displayName: 'Type',
          required: false,
          options: {
            disabled: false,
            options: [
              {
                label: 'Training & Educational Costs',
                value: 'training',
              },
              {
                label: 'Additional Costs',
                value: 'other_expenses',
              },
              {
                label: 'Educational Tools',
                value: 'pedagogical_products',
              },
              {
                label: 'Outside of Training',
                value: 'non_training',
              },
            ],
          },
        }),
        costMode: Property.StaticDropdown({
          displayName: 'Cost Mode',
          required: false,
          options: {
            disabled: false,
            options: [
              {
                label: 'By Client and Hour',
                value: 'per_customer_hour',
              },
              {
                label: 'By Leaner',
                value: 'per_trainee',
              },
              {
                label: 'By Learner and Hour',
                value: 'per_hour',
              },
              {
                label: 'Per Learner per Day',
                value: 'per_day',
              },
              {
                label: 'By Client',
                value: 'per_customer',
              },
              {
                label: 'Per Client per Day',
                value: 'per_customer_day',
              },
              {
                label: 'By Client and Date',
                value: 'per_customer_day_indivisible',
              },
            ],
          },
        }),
        vat: Property.Number({
          displayName: 'VAT',
          required: false,
        }),
      },
    }),
  },
};
