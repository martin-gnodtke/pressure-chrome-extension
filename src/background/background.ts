import * as PressureAPI from '../network/pressure_api';

chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    if (message.action === 'fetch_collection_sales_and_listings') {
        fetchCollectionListingsAndSales(message.payload.collectionSlug, message.payload.lookBackTime)
            .then(result => {
                sendResponse(result);
            })
            .catch(error => {
                console.log('fetchCollectionListingsAndSales failed with error: ' + error);
                //TODO: Show error in UI
            });
    }
    return true;
});

async function fetchCollectionListingsAndSales(collectionSlug: string, lookBackTime: string) {
    return await Promise.all([
        PressureAPI.fetchCollectionSales(collectionSlug, lookBackTime),
        PressureAPI.fetchCollectionListings(collectionSlug, lookBackTime)
    ]);
}