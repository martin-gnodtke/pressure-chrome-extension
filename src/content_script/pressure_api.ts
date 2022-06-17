import { fetchWithTimeout } from "../util/network_utils";

export async function fetchLoggedInUser() {
    const response = await fetchWithTimeout('http://localhost:5000/api/user/account', {
        "mode": "cors",
        "credentials": "include",
    });
    if (response.ok) {
        return await response.json();
    } else {
        return null; //TODO: Distinguish 401 from actual errors (show error message)
    }
}

export async function fetchCollectionSales(collectionSlug: string, queryTime: string) {
    const response = await fetchWithTimeout(`http://localhost:5000/api/collection/${collectionSlug}/sales/${queryTime}`, {
        "mode": "cors",
        "credentials": "include",
    });
    if (response.ok) {
        return await response.json();
    } else {
        return null; //TODO: Distinguish 401 from actual errors (show error message)
    }
}

export async function fetchCollectionListings(collectionSlug: string, queryTime: string) {
    const response = await fetchWithTimeout(`http://localhost:5000/api/collection/${collectionSlug}/listings/${queryTime}`, {
        "mode": "cors",
        "credentials": "include",
    });
    if (response.ok) {
        return await response.json();
    } else {
        return null; //TODO: Distinguish 401 from actual errors (show error message)
    }
}