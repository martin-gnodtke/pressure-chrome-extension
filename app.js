var collectionStatsBar = document.getElementsByClassName('CollectionStatsBarreact__Container-sc-8gdi9o-0')[0].parentNode;

var pTimer = document.createElement('div');
pTimer.className = "pTimer";
pTimer.innerHTML = 
    '<div>'+
        '<div class="pTimerIcon">'+
            '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stopwatch" class="svg-inline--fa fa-stopwatch fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M432 304c0 114.9-93.1 208-208 208S16 418.9 16 304c0-104 76.3-190.2 176-205.5V64h-28c-6.6 0-12-5.4-12-12V12c0-6.6 5.4-12 12-12h120c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-28v34.5c37.5 5.8 71.7 21.6 99.7 44.6l27.5-27.5c4.7-4.7 12.3-4.7 17 0l28.3 28.3c4.7 4.7 4.7 12.3 0 17l-29.4 29.4-.6.6C419.7 223.3 432 262.2 432 304zm-176 36V188.5c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12V340c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"/></svg>'+
        '</div>'+
        '<span id="countdown">'+
            '-'+
        '</span>'+
    '</div>';
collectionStatsBar.parentNode.insertBefore(pTimer, collectionStatsBar.nextSibling);

var pressureStatsBar = document.createElement('div');
pressureStatsBar.className = "pressureStatsBar";
pressureStatsBar.innerHTML =
    '<div class="pStatsBarItem">'+
        '<div class="pStatsBarItemInner salesItem">'+
            '<div>'+
                '<div class="pStatsBarItemInnerValue salesValue">'+
                    '<span class="pStatsBarItemValue">-</span>'+
                '</div>'+
                '<div class="pStatsBarItemText">sales</div>'+
                '</div>'+
            '</div>'+
        '<div class="pStatsBarItemInner listedItem">'+
            '<div>'+
                '<div class="pStatsBarItemInnerValue listedValue">'+
                    '<span class="pStatsBarItemValue">-</span>'+
                '</div>'+
                '<div class="pStatsBarItemText">listed</div>'+
                '</div>'+
            '</div>'+
        '<div class="pStatsBarItemInner pressureItem">'+
            '<div>'+
                '<div class="pStatsBarItemInnerValue pressureValue">'+
                    '<span class="pStatsBarItemValue">-</span>'+
                '</div>'+
                '<div class="pStatsBarItemText">pressure</div>'+
            '</div>'+
        '</div>'+
    '</div>';
collectionStatsBar.parentNode.insertBefore(pressureStatsBar, collectionStatsBar.nextSibling);

var pDropdown = document.createElement('div');
pDropdown.className = "pDropdown";
pDropdown.innerHTML =
    '<select>'+
        '<option value="30" disabled selected>Select Time</option>'+
        '<option value="1">1 Minute</option>'+
        '<option value="5">5 Minutes</option>'+
        '<option value="10">10 Minutes</option>'+
        '<option value="15">15 Minutes</option>'+
        '<option value="30">30 Minutes</option>'+
    '</select>'
collectionStatsBar.parentNode.insertBefore(pDropdown, collectionStatsBar.nextSibling);

async function fetchSales(col_slug, queryTime) {
    const response = await fetch(`http://localhost:5000/api/collection/${col_slug}/sales/${queryTime}`, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        "mode": "cors",
        "credentials": "include",
        "withCredentials": "true"
    }).catch(error => console.log(error));
    const sales = await response.json();
    console.log(sales.sales);
    return sales.sales;
}

async function fetchListings(col_slug, queryTime) {
    const response = await fetch(`http://localhost:5000/api/collection/${col_slug}/listings/${queryTime}`, {
        "method": "GET",
        "headers": {            
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        "mode": "cors",
        "credentials": "include",
        "withCredentials": "true"
    }).catch(error => console.log(error));
    const listings = await response.json();
    console.log(listings.listings);
    return listings.listings;
}

async function updateData(display) {
    let selectedTime = document.querySelector(".pDropdown").firstChild;
    let queryTime = new Date();
    queryTime.setMinutes(queryTime.getMinutes() - parseInt(selectedTime.value));
    let collection = new URL(window.location.href);
    let col_slug = collection.pathname.replace('/collection/', '');

    let sales = await fetchSales(col_slug, selectedTime.value);
    let listings = await fetchListings(col_slug, selectedTime.value);
    let pressure = (sales-listings);

    document.querySelector('.pTimerIcon').style.display = "none";
    display.innerText = "refresh..";
    document.querySelector('.salesValue').firstChild.innerHTML = sales;
    document.querySelector('.listedValue').firstChild.innerHTML = listings;
    document.querySelector('.pressureValue').firstChild.style.color = ((pressure < 0) ? '#770b0c' : '#1c9d00');
    document.querySelector('.pressureValue').firstChild.innerHTML = pressure;
}

function startTimer(duration, display) {
    var timer = duration;
    
    setInterval(async function () {
        display.innerText = timer.toString()+"s";
        
        if (--timer < 0) {
            await updateData(display);
            timer = duration;
        } else {
            document.querySelector('.pTimerIcon').style.display = "flex";
        }
    }, 1000);
}

window.onload = function () {
    var display = document.querySelector('#countdown');
    var firstTime = true;

    document.querySelector(".pDropdown").addEventListener("change", function() {
        if(firstTime) {
            updateData(display);
            startTimer(30, display);
            firstTime = false;
        }

    });
};