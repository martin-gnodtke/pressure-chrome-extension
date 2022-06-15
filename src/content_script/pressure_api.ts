import { fetchWithTimeout } from "../util/network_utils";

export async function fetchUser() {
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