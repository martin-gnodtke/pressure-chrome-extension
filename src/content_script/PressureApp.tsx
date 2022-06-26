import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { OPEN_SEA_CHAIN_LOGO, OPEN_SEA_COLLECTION_STATS_BAR } from "./query_selectors";
import { User } from "../model/User";
import PressureBar from "./components/PressureBar";

const openSeaCollectionStatsBar = document.querySelector(OPEN_SEA_COLLECTION_STATS_BAR);

const ContentScript = () => {
    const [chainSupported, setChainSupported] = useState(true);

    const [user, setUser] = useState<User | null>(null);
    const [userLoading, setUserLoading] = useState(true);
    const [userLoadingError, setUserLoadingError] = useState(false);

    useEffect(() => {
        const chainLogo = document.querySelector(OPEN_SEA_CHAIN_LOGO);
        const chainSupported = chainLogo?.firstElementChild?.ariaLabel === "ETH logo";
        setChainSupported(chainSupported);
    }, []);

    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        setUserLoadingError(false);
        setUserLoading(true);

        const result = await chrome.runtime.sendMessage({ action: 'fetch_logged_in_user' });

        if (result.error) {
            setUserLoadingError(true);
        } else {
            console.log('loaded user: ' + JSON.stringify(result.user));
            setUser(result.user);
        }
        setUserLoading(false);
    }

    function openPressureLogin() {
        chrome.runtime.sendMessage({ action: 'open_login_page' });
    }

    chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
        if (message.action === 'logged_out') {
            setUser(null);
            return;
        }

        if (message.action === 'logged_in') {
            fetchUser();
            return;
        }
    });

    if (!chainSupported) return <div>Chain not supported.</div>;
    if (userLoading) return <div>Loading user...</div>;
    if (userLoadingError) return <div>Could not load user. Please refresh the page.</div>;
    if (!user) return <button id="p-login-button" onClick={openPressureLogin}>Login with Pressure</button>;
    return <PressureBar />;
}

const pressureApp = document.createElement('div');
pressureApp.id = 'pressure-extension-root';
openSeaCollectionStatsBar?.insertAdjacentElement('afterend', pressureApp);
ReactDOM.render(<ContentScript />, pressureApp)