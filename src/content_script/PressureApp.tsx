import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { OPEN_SEA_CHAIN_LOGO, OPEN_SEA_COLLECTION_STATS_BAR } from "./query_selectors";
import { User } from "../model/User";
import PressureBar from "./components/PressureBar";
import PressurePlaceholder from "./components/PressurePlaceholder";

const injectPressureAppMutationObserver = new MutationObserver((mutationList, observer) => {
    if (window.location.href.includes('opensea.io/collection/') && !document.querySelector('#pressure-app')) {
        const pressureApp = document.createElement('div');
        pressureApp.id = 'pressure-extension-root';
        ReactDOM.render(<ContentScript />, pressureApp)
        document.querySelector(OPEN_SEA_COLLECTION_STATS_BAR)?.insertAdjacentElement('afterend', pressureApp);
    }
}
);

injectPressureAppMutationObserver.observe(document, { childList: true, subtree: true });

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

    function openPressureLoginPage() {
        chrome.runtime.sendMessage({ action: 'open_login_page' });
    }

    function openBuyPremiumPage() {
        chrome.runtime.sendMessage({ action: 'open_buy_premium_page' });
    }

    chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
        if (message.action === 'clear_user') {
            setUser(null);
            return;
        }

        if (message.action === 'reload_user') {
            fetchUser();
            return;
        }
    });

    let content: JSX.Element;
    if (!chainSupported)
        content = <PressurePlaceholder><strong>Chain not supported.</strong></PressurePlaceholder>;
    else if (userLoading)
        content = <PressurePlaceholder><div>Loading user...</div></PressurePlaceholder>;
    else if (userLoadingError)
        content = <PressurePlaceholder><div>Could not load user. Please refresh the page.</div></PressurePlaceholder>;
    else if (!user)
        content = <PressurePlaceholder><button id="p-auth-button" onClick={openPressureLoginPage}>Login to Pressure</button></PressurePlaceholder>;
    else if (!user.isPremium)
        content = <PressurePlaceholder><button id="p-auth-button" onClick={openBuyPremiumPage}>Please buy Premium</button></PressurePlaceholder>;
    else
        content = <PressureBar />;

    return (
        <div id='pressure-app'>
            {content}
        </div>
    )
}