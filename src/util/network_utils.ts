export async function fetchWithTimeout(input: RequestInfo, init?: RequestInit) {
    const abortController = new AbortController();
    const timeout = setTimeout(() => abortController.abort(), 10000)
    const response = await fetch(input, {
        ...init,
        credentials: 'include',
        signal: abortController.signal
    });
    clearTimeout(timeout);
    return response;
}