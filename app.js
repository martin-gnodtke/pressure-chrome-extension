try {
    const interval = setInterval(() => {
        let collectionStatsBar = document.getElementsByClassName('Blockreact__Block-sc-1xf18x6-0 hfScwI')[1];

        if (!!collectionStatsBar) {
            clearInterval(interval);
            render();
        }
    },10)
} catch (e) {

}

function render() {
    let collectionStatsBar = document.getElementsByClassName('Blockreact__Block-sc-1xf18x6-0 hfScwI')[1];

    fetchAccount().then((data) => {
        if (data.id) {
            renderStatusBar()
        } else {
            renderButtonLogIn()
        }
    }).catch(() => renderButtonLogIn())




    async function refreshToken() {
        await fetch("http://localhost:5000/api/user/refresh-access", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            "mode": "cors",
            "credentials": "include",
            "withCredentials": "true"
        }).catch((error) => console.error(error));
    }

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
        return listings.listings;
    }

    async function fetchAccount() {
        const response = await fetch(`http://localhost:5000/api/user/account`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            "mode": "cors",
            "credentials": "include",
            "withCredentials": "true"
        }).catch(error => console.log(error));
        return await response.json();
    }

    let markupTimer = '<div>'+
        '<div class="pTimerIcon">'+
        '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stopwatch" class="svg-inline--fa fa-stopwatch fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M432 304c0 114.9-93.1 208-208 208S16 418.9 16 304c0-104 76.3-190.2 176-205.5V64h-28c-6.6 0-12-5.4-12-12V12c0-6.6 5.4-12 12-12h120c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-28v34.5c37.5 5.8 71.7 21.6 99.7 44.6l27.5-27.5c4.7-4.7 12.3-4.7 17 0l28.3 28.3c4.7 4.7 4.7 12.3 0 17l-29.4 29.4-.6.6C419.7 223.3 432 262.2 432 304zm-176 36V188.5c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12V340c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"/></svg>'+
        '</div>'+
        '<span id="countdown">'+
        '-'+
        '</span>'+
        '</div>';

    let markupSelect = '<select class="pDropdownSelect">'+
        '<option value="30" disabled selected>Select Time</option>'+
        '<option value="1">1 Minute</option>'+
        '<option value="5">5 Minutes</option>'+
        '<option value="10">10 Minutes</option>'+
        '<option value="15">15 Minutes</option>'+
        '<option value="30">30 Minutes</option>'+
        '</select>'

    let pTimer = document.createElement('div');
    pTimer.className = "pTimer";
    pTimer.innerHTML = markupTimer;
    collectionStatsBar.parentNode.insertBefore(pTimer, collectionStatsBar.nextSibling);


    let pDropdown = document.createElement('div');
    pDropdown.className = "pDropdown";
    pDropdown.innerHTML = markupSelect

    collectionStatsBar.parentNode.insertBefore(pDropdown, collectionStatsBar.nextSibling);


    function renderStatusBar() {
        let pressureStatsBar = document.createElement('div');
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

        collectionStatsBar.parentNode.insertBefore(pressureStatsBar, pTimer);

        let display = document.querySelector('#countdown');
        let firstTime = true;

        document.querySelector(".pDropdown").addEventListener("change", function() {
            if(firstTime) {
                startTimer(30, display);
                updateData(display);
                firstTime = false;
            }
        });

    }

    function renderButtonLogIn() {
        let pLogInButton = document.createElement("div");
        pLogInButton.className = "pLogIn";
        pLogInButton.innerHTML = "<button class='pLogInButton'>" +
            "<span class='pLogInText'>" +
            "login to use pressure" +
            "</span>" +
            "</button>";

        collectionStatsBar.parentNode.insertBefore(pLogInButton, pTimer);

        document.querySelector(".pLogIn").addEventListener("click",(event) => {
            refreshToken().then(() => {
                document.querySelector(".pLogIn").remove();
                renderStatusBar()
            })
        })
    }

    async function updateData(display,interval) {
        let pDropdown = document.querySelector(".pDropdown");

        if (!!pDropdown) {
            let selectedTime = pDropdown.firstChild;
            let queryTime = new Date();
            queryTime.setMinutes(queryTime.getMinutes() - parseInt(selectedTime.value));
            let collection = new URL(window.location.href);
            let col_slug = collection.pathname.replace('/collection/', '');

            let sales = await fetchSales(col_slug, selectedTime.value);
            let listings = await fetchListings(col_slug, selectedTime.value);

            let pressure = (sales-listings);

            if (sales === undefined || listings === undefined) {
                clearInterval(interval)
                document.querySelector(".pressureStatsBar").remove();
                document.querySelector(".pTimer").innerHTML = markupTimer;
                document.querySelector(".pDropdownSelect").innerHTML = markupSelect;
                renderButtonLogIn();
            } else {
                let pTimerIcon = document.querySelector('.pTimerIcon');
                if (!!pTimerIcon) {
                    pTimerIcon.style.display = "none";
                }
                display.innerText = "refresh..";
            }
            document.querySelector('.salesValue').firstChild.innerHTML = sales;
            document.querySelector('.listedValue').firstChild.innerHTML = listings;
            document.querySelector('.pressureValue').firstChild.style.color = ((pressure < 0) ? '#770b0c' : '#1c9d00');
            document.querySelector('.pressureValue').firstChild.innerHTML = pressure;
        }
    }

    function startTimer(duration, display) {
        let timer = duration;

        const interval = setInterval(async function () {
            display.innerText = timer.toString()+"s";
            let minusTimer = --timer

            if (minusTimer < 0) {
                await updateData(display,interval);
                timer = duration;
            } else {
                const pTimerIcon = document.querySelector('.pTimerIcon');
                if (!!pTimerIcon) pTimerIcon.style.display = "flex";
            }
        }, 1000);
    }



}
