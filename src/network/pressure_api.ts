import { fetchWithTimeout } from "../util/network_utils";

export async function fetchLoggedInUser() {
    const response = await fetchWithTimeout('http://localhost:5000/user/account', {
        "mode": "cors",
        "credentials": "include",
    });
    if (response.ok) {
        return await response.json();
    } else {
        return null; //TODO: Distinguish 401 from actual errors (show error message)
    }
}

export async function fetchCollectionSales(collectionSlug: string, lookBackTime: string) {
    const response = await fetchWithTimeout(`http://localhost:5000/collection/${collectionSlug}/sales/${lookBackTime}`, {
        "mode": "cors",
        "credentials": "include",
    });
    if (response.ok) {
        return await response.json();
    } else {
        return null; //TODO: Distinguish 401 from actual errors (show error message)
    }
}

export async function fetchCollectionListings(collectionSlug: string, lookBackTime: string) {
    const response = await fetchWithTimeout(`http://localhost:5000/collection/${collectionSlug}/listings/${lookBackTime}`, {
        "mode": "cors",
        "credentials": "include",
    });
    if (response.ok) {
        return await response.json();
    } else {
        return null; //TODO: Distinguish 401 from actual errors (show error message)
    }
}