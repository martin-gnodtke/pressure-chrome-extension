import { fetchWithTimeout } from "../util/network_utils";

export async function checkIfChainSupported(collectionSlug: string): Promise<boolean> {
    try {
        const response = await fetchWithTimeout(`http://localhost:5000/api/collection/${collectionSlug}/check-address`, {
            "mode": "cors",
        })
        return response.ok;
    } catch (error) {
        console.log();
        return false;
    }
}