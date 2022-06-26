import { UnauthorizedError } from '../errors/HttpErrors';
import * as PressureApi from '../network/pressure_api';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab?.url?.includes("/collection/")) {
        chrome.scripting.executeScript({ files: ["./static/js/PressureApp.js"], target: { tabId: tabId } })
    }
});

chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    if (message.action === 'fetch_logged_in_user') {
        fetchLoggedInUser()
            .then(result => {
                sendResponse({ user: result });
            })
            .catch(error => {
                if (error instanceof UnauthorizedError) {
                    console.log('User not logged in. Returning null user.');
                    sendResponse({ user: null });
                } else {
                    console.log('fetchLoggedInUser failed with error: ' + error);
                    sendResponse({ error: true });
                }
            })
        return true;
    };

    if (message.action === 'fetch_collection_sales_and_listings') {
        fetchCollectionListingsAndSales(message.payload.collectionSlug, message.payload.lookBackTime)
            .then(result => {
                sendResponse({ salesAndListings: result });
            })
            .catch(error => {
                console.log('fetchCollectionListingsAndSales failed with error: ' + error);
                sendResponse({ error: true });
            });
        return true;
    }

    if (message.action === 'open_login_page') {
        chrome.tabs.create({ 'url': process.env.REACT_APP_WEBSITE_URL });
        return;
    }
});

chrome.runtime.onMessageExternal.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    if (message.action === 'logged_out') {
        sendMessageToAllTabs({ action: 'logged_out' })
        return;
    }

    if (message.action === 'logged_in') {
        sendMessageToAllTabs({ action: 'logged_in' })
        return;
    }
});

async function fetchCollectionListingsAndSales(collectionSlug: string, lookBackTime: string) {
    return await Promise.all([
        PressureApi.fetchCollectionSales(collectionSlug, lookBackTime),
        PressureApi.fetchCollectionListings(collectionSlug, lookBackTime)
    ]);
}

async function fetchLoggedInUser() {
    return await PressureApi.fetchLoggedInUser();
}

function sendMessageToAllTabs(message: any) {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id!, message)
        })
    })
}