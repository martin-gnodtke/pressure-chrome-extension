import { UnauthorizedError } from "../errors/HttpErrors";

export async function fetchWithTimeout(input: RequestInfo, init?: RequestInit) {
    const abortController = new AbortController();
    const timeout = setTimeout(() => abortController.abort(), 10000)
    const response = await fetch(input, {
        ...init,
        credentials: 'include',
        signal: abortController.signal
    });
    clearTimeout(timeout);
    if (response?.ok) {
        return response;
    } else if (response?.status === 401) {
        throw new UnauthorizedError()
    } else {
        throw new Error('fetchWithTimeout failed with status code: ' + response?.status)
    }
}