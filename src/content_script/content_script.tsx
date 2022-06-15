import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { OPEN_SEA_CHAIN_LOGO, OPEN_SEA_COLLECTION_STATS_BAR } from "./query_selectors";
import * as PressureAPI from './pressure_api';
import { User } from "../model/User";

const osCollectionStatsBar = document.querySelector(OPEN_SEA_COLLECTION_STATS_BAR);

const ContentScript = () => {
    const [chainSupported, setChainSupported] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const chainLogo = document.querySelector(OPEN_SEA_CHAIN_LOGO);
        const chainSupported = chainLogo?.firstElementChild?.ariaLabel === "ETH logo";
        setChainSupported(chainSupported);
    }, []);

    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        const user = await PressureAPI.fetchUser();
        setUser(user);
    }

    return (
        <>
            {chainSupported
                ? <>
                    {user
                        ? <div>Logged in</div>
                        : <div>Not logged in</div>}
                </>
                : <div>Chain not supported</div>
            }
        </>
    );
}

const pressureApp = document.createElement('div');
pressureApp.id = 'pressure-extension-root';
osCollectionStatsBar?.insertAdjacentElement('afterend', pressureApp);
ReactDOM.render(<ContentScript />, pressureApp)