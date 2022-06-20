import { useRef, useState } from "react";

const PressureBar = () => {
    const TIMER_DURATION_IN_SECONDS = process.env.REACT_APP_NODE_ENV === 'production' ? 30 : 8;

    const [sales, setSales] = useState<number | null>(null);
    const [listings, setListings] = useState<number | null>(null);

    const pressure = (sales !== null && listings !== null) ? sales - listings : null

    const lookBackTimeSelectRef = useRef<HTMLSelectElement>(null!);

    const [timerRunning, setTimerRunning] = useState(false);
    const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(0);

    function startUpdateTimer() {
        async function updateSalesAndListings() {
            const selectedLookBackTime = lookBackTimeSelectRef.current.value;
            const collectionSlug = window.location.href.split('?')[0].split("#")[0].split('/').slice(-1)[0];

            const [sales, listings] = await chrome.runtime.sendMessage({
                action: 'fetch_collection_sales_and_listings',
                payload: {
                    collectionSlug: collectionSlug,
                    lookBackTime: selectedLookBackTime,
                }
            })

            setSales(sales);
            setListings(listings);
        }

        updateSalesAndListings();
        let countdownTimeLeft = TIMER_DURATION_IN_SECONDS;
        setTimerRunning(true);

        function nextTick() {
            setTimeLeftInSeconds(countdownTimeLeft)

            if (countdownTimeLeft < 1) {
                startUpdateTimer();
                return;
            }

            setTimeout(() => {
                countdownTimeLeft--;
                nextTick();
            }, 1000);
        }
        nextTick();
    }

    function onQueryTimeSelected() {
        if (!timerRunning) {
            startUpdateTimer();
        }
    }

    return (
        <div id="p-dropdown-select-lookback-time">
            <select ref={lookBackTimeSelectRef} onChange={onQueryTimeSelected}>
                <option value={undefined} disabled={timerRunning}>Select time</option>
                <option value="1">1 Minute</option>
                <option value="5">5 Minutes</option>
                <option value="10">10 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
            </select>

            <div id="p-statsbar">
                <div className="p-statsbar-item">
                    <span className="p-statsbar-item-value">{sales ?? '-'}</span>
                    <div className="p-statsbar-item-text">sales</div>
                </div>
                <div className="p-statsbar-item">
                    <span className="p-statsbar-item-value">{listings ?? '-'}</span>
                    <div className="p-statsbar-item-text">listed</div>
                </div>
                <div className="p-statsbar-item">
                    <span className={"p-statsbar-item-value " + ((pressure !== null || pressure !== 'undefined') ? '' : (pressure < 0) ? 'p-negative' : 'p-positive') }>{pressure ?? '-'}</span>
                    <div className="p-statsbar-item-text">pressure</div>
                </div>
            </div>

            <div id="p-timer">
                <div id="timer-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stopwatch" className="svg-inline--fa fa-stopwatch fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M432 304c0 114.9-93.1 208-208 208S16 418.9 16 304c0-104 76.3-190.2 176-205.5V64h-28c-6.6 0-12-5.4-12-12V12c0-6.6 5.4-12 12-12h120c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-28v34.5c37.5 5.8 71.7 21.6 99.7 44.6l27.5-27.5c4.7-4.7 12.3-4.7 17 0l28.3 28.3c4.7 4.7 4.7 12.3 0 17l-29.4 29.4-.6.6C419.7 223.3 432 262.2 432 304zm-176 36V188.5c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12V340c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z" /></svg>
                </div>
                <span>
                    {timeLeftInSeconds || '-'}
                </span>
            </div>
        </div>
    );
}

export default PressureBar;