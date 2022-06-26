import { fetchWithTimeout } from "../util/network_utils";

export async function fetchLoggedInUser() {
    const response = await fetchWithTimeout(process.env.REACT_APP_SERVER_URL + '/user/account');
    return await response.json();
}

export async function fetchCollectionSales(collectionSlug: string, lookBackTime: string) {
    const response = await fetchWithTimeout(process.env.REACT_APP_SERVER_URL + `/collection/${collectionSlug}/sales/${lookBackTime}`);
    return await response.json();
}

export async function fetchCollectionListings(collectionSlug: string, lookBackTime: string) {
    const response = await fetchWithTimeout(process.env.REACT_APP_SERVER_URL + `/collection/${collectionSlug}/listings/${lookBackTime}`);
    return await response.json();
}