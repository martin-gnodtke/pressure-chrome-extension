import * as HTMLElements from './html_elements';
import { OPEN_SEA_COLLECTION_STATS_BAR } from './query_selectors';
import * as PressureAPI from './pressure_api';

let pDropdown = document.createElement('div');
pDropdown.innerHTML = HTMLElements.pDropdown;

let pStatsBar = document.createElement('div');
pStatsBar.innerHTML = HTMLElements.pStatsBar;

let pTimer = document.createElement('div');
pTimer.innerHTML = HTMLElements.pTimer;

startExtension();

function startExtension() {
    insertHtmlElements();
    const chainSupported = checkIfChainSupported();
}

function insertHtmlElements() {
    document.querySelector(OPEN_SEA_COLLECTION_STATS_BAR)?.insertAdjacentElement('afterend', pDropdown);
    pDropdown.insertAdjacentElement('afterend', pStatsBar);
    pStatsBar.insertAdjacentElement('afterend', pTimer);
}

async function checkIfChainSupported() {
    const url = window.location.href;
    const collectionSlug = url.substring(url.lastIndexOf('/') + 1)
    return await PressureAPI.checkIfChainSupported(collectionSlug);
}