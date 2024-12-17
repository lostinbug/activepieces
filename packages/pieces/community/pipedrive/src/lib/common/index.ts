import {
	AuthenticationType,
	httpClient,
	HttpMessageBody,
	HttpMethod,
	HttpRequest,
	QueryParams,
} from '@activepieces/pieces-common';
import { GetField, PaginatedResponse, RequestParams } from './types';

export const pipedriveCommon = {
	subscribeWebhook: async (
		object: string,
		action: string,
		webhookUrl: string,
		apiDomain: string,
		accessToken: string,
	) => {
		const request: HttpRequest = {
			method: HttpMethod.POST,
			url: `${apiDomain}/api/v1/webhooks`,
			body: {
				event_object: object,
				event_action: action,
				subscription_url: webhookUrl,
			},
			authentication: {
				type: AuthenticationType.BEARER_TOKEN,
				token: accessToken,
			},
			queryParams: {},
		};

		const { body: webhook } = await httpClient.sendRequest<{
			data: { id: string };
		}>(request);
		return webhook;
	},
	unsubscribeWebhook: async (webhookId: string, apiDomain: string, accessToken: string) => {
		const request: HttpRequest = {
			method: HttpMethod.DELETE,
			url: `${apiDomain}/api/v1/webhooks/${webhookId}`,
			authentication: {
				type: AuthenticationType.BEARER_TOKEN,
				token: accessToken,
			},
		};
		return await httpClient.sendRequest(request);
	},
};

export type PipedriveApiCallParams = {
	accessToken: string;
	apiDomain: string;
	method: HttpMethod;
	resourceUri: string;
	query?: RequestParams;
	body?: any;
};

export async function pipedriveApiCall<T extends HttpMessageBody>({
	accessToken,
	apiDomain,
	method,
	resourceUri,
	query,
	body,
}: PipedriveApiCallParams): Promise<T> {
	const baseUrl = `${apiDomain}/api/v1`;
	const qs: QueryParams = {};

	if (query) {
		for (const [key, value] of Object.entries(query)) {
			if (value !== null && value !== undefined) {
				qs[key] = String(value);
			}
		}
	}
	const request: HttpRequest = {
		method,
		url: baseUrl + resourceUri,
		authentication: {
			type: AuthenticationType.BEARER_TOKEN,
			token: accessToken,
		},
		queryParams: qs,
		body,
	};

	const response = await httpClient.sendRequest<T>(request);
	return response.body;
}

export async function pipedrivePaginatedApiCall<T extends HttpMessageBody>({
	accessToken,
	apiDomain,
	method,
	resourceUri,
	query,
	body,
}: PipedriveApiCallParams): Promise<T[]> {
	const qs = query ? query : {};

	qs.start = 0;
	qs.limit = 100;

	const resultData: T[] = [];
	let hasMoreItems = true;

	do {
		const response = await pipedriveApiCall<PaginatedResponse<T>>({
			accessToken,
			apiDomain,
			method,
			resourceUri,
			query: qs,
			body,
		});
		resultData.push(...response.data);
		qs.start = response.additional_data.pagination.next_start;
		hasMoreItems = response.additional_data.pagination.more_items_in_collection;
	} while (hasMoreItems);

	return resultData;
}

export function pipedriveTransformCustomFields(
	CustomFields: GetField[],
	responseData: Record<string, any>,
): Record<string, any> {
	const updatedResponseData = { ...responseData };

	for (const field of CustomFields) {
		if (!field.edit_flag) {
			continue;
		}
		const oldKey = field.key;
		const newKey = field.name;
		const fieldType = field.field_type;

		if (oldKey in responseData) {
			if (responseData[oldKey] === null || responseData[oldKey] === undefined) {
				updatedResponseData[newKey] = null;
			} else if (fieldType === 'enum') {
				updatedResponseData[newKey] =
					field.options?.find((option) => option.id.toString() === responseData[oldKey])?.label ||
					null;
			} else if (fieldType === 'set') {
				const values: string[] = responseData[oldKey].split(',');
				updatedResponseData[newKey] = values.map(
					(item) => field.options?.find((option) => option.id.toString() === item)?.label || null,
				);
			} else {
				updatedResponseData[newKey] = responseData[oldKey];
			}
			delete updatedResponseData[oldKey];
		}
	}
	return updatedResponseData;
}
