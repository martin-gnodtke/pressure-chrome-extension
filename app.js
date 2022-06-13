
    function markupExtension() {
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

        let markupStatusBar = '<div class="pStatsBarItem">'+
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

        return {markupTimer,markupSelect,markupStatusBar}
    }

    try {
        const interval = setInterval(() => {
            let collectionStatsBar = document.getElementsByClassName('sc-1xf18x6-0 sc-1twd32i-0 sc-1y1ib3i-2 haVRLx kKpYwv hiTyHL')[0];
            console.log(collectionStatsBar);
            let emptyMessage = document.getElementsByClassName("divSolanaMessage pLogIn")[0];
            let selectTime = document.querySelector(".pDropdown");
            let timer = document.querySelector(".pTimer");
            let statusBar = document.querySelector(".pressureStatsBar");

            const disabledURLs = [
                "collection/art",
                "collection/collectibles",
                "collection/domain-names",
                "collection/music",
                "collection/photography-category",
                "collection/sports",
                "collection/trading-cards",
                "collection/utility",
                "collection/virtual-worlds",
                "solana-collections"
            ]

            const isInclude = disabledURLs.some((itemURL) => location.pathname.includes(itemURL))

            if (isInclude && emptyMessage) {
                emptyMessage && emptyMessage.remove();
            }

            if (!!selectTime && isInclude) {
                selectTime.remove();
            }

            if (!!timer && isInclude) {
                timer.remove();
            }

            if (!!statusBar && isInclude) {
                statusBar.remove();
            }

            let collectionPage = document.getElementsByClassName("Blockreact__Block-sc-1xf18x6-0 Textreact__Text-sc-1w94ul3-0 eOplTe llcnwK");


            if (!!collectionPage.length) {
                clearInterval(interval);
            }

            if (!!collectionStatsBar) {
                let collection = new URL(window.location.href);
                let col_slug1 = collection.pathname.replace('/collection/', '');
                let collectionName = col_slug1.replace("/activity","");



                const { markupTimer,markupSelect,markupStatusBar } = markupExtension();
                clearInterval(interval);

                if (!!selectTime) {
                    selectTime.innerHTML = markupSelect;
                    let newNode = selectTime.cloneNode(true)
                    selectTime.replaceWith(newNode);
                }

                if (!!timer) {
                    timer.innerHTML = markupTimer;
                }

                if (!!statusBar) {
                    statusBar.innerHTML = markupStatusBar;
                }


                async function fetchAddress(col_slug) {
                    try {
                        const response = await fetch(`http://localhost:5000/api/collection/${col_slug}/check-address`, {
                            "method": "GET",
                            "headers": {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            "mode": "cors",
                            "credentials": "include",
                            "withCredentials": "true"
                        })

                        const result =  await response.json();
                        return result;
                    } catch (e) {

                    }
                }

                fetchAddress(collectionName).then((data) => {
                    let dropdown = document.querySelector(".pDropdown");

                    try {
                        if (!!dropdown) {
                            let newNode = dropdown.cloneNode(true)
                            dropdown.replaceWith(newNode);
                        }
                        render(data.status);
                    } catch (e) {

                    }
                })

            }
        },10)
    } catch (e) {

    }

    function removeDuplicates(htmlCollection) {
        htmlCollection && Array.from(htmlCollection).forEach((domElement,idx) => idx > 0 && domElement.parentNode.removeChild(domElement));
    }

    function clearDuplicates() {
        let dropdown = document.getElementsByClassName("pDropdown");
        let statBar = document.getElementsByClassName("pressureStatsBar");
        let timer = document.getElementsByClassName("pTimer");

        if (!!statBar || !!timer || !!dropdown.length) {
            removeDuplicates(statBar);
            removeDuplicates(timer);
            removeDuplicates(dropdown);
        }
    }

    function render(status) {
        let collectionStatsBar = document.getElementsByClassName('sc-1xf18x6-0 sc-1twd32i-0 sc-1y1ib3i-2 haVRLx kKpYwv hiTyHL')[0];
        console.log(collectionStatsBar);
        let chainData = document.getElementsByClassName("sc-1pie21o-0 elyzfO Asset--anchor")[0]; // First Item of Grid
        console.log(chainData);
        const chainLabel = chainData.getAttribute("href"); // href element includes the chain name
        console.log(chainLabel);

        fetchAccount().then((data) => {
            if(status !== 200 && chainLabel.includes("matic")) {
                renderChainUnsupportedMessage("Polygon");
            } else if (chainLabel.includes("klaytn")) {
                renderChainUnsupportedMessage("KLAY");
            } else if (chainLabel.includes("solana")) {
                renderChainUnsupportedMessage("Solana");
            } else if (data.id) {
                renderStatusBar();
            } else {
                renderButtonLogIn();
            }
        }).catch(() => {
            if (chainLabel.includes("KLAY")) {
                renderChainUnsupportedMessage("KLAY");
            } else if (chainLabel.includes("SOL")) {
                renderChainUnsupportedMessage("Solana");
            } else {
                renderButtonLogIn()
            }
        })

        async function refreshToken() {
            let controller = new AbortController();
            await fetch("http://localhost:5000/api/user/refresh-access", {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                "mode": "cors",
                "credentials": "include",
                "withCredentials": "true",
                signal: controller.signal
            }).catch((error) => console.error(error));
        }

        async function fetchInformation (col_slug, queryTime, signal) {
            const response = await fetch(`http://localhost:5000/api/collection/${col_slug}/information/${queryTime}`, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                "mode": "cors",
                "credentials": "include",
                "withCredentials": "true",
                signal: signal
            }).catch(error => console.log(error));
            const result = await response.json();
            return result;
        }

        async function fetchListings(col_slug, queryTime, signal) {
            const response = await fetch(`http://localhost:5000/api/collection/${col_slug}/listings/${queryTime}`, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                "mode": "cors",
                "credentials": "include",
                "withCredentials": "true",
                signal: signal
            }).catch(error => console.log(error));
            const result = await response.json();
            return result;
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
                "withCredentials": "true",
            }).catch(error => console.log(error));
            const result = await response.json();
            return result;
        }

        const { markupTimer,markupSelect } = markupExtension();
        let selectTime= document.querySelector(".pDropdown");
        let timer = document.querySelector(".pTimer");
        let pTimer = null;
        let pDropdown = null;

        if (!selectTime) {
            pTimer = document.createElement('div');
            pTimer.className = "pTimer";
            pTimer.innerHTML = markupTimer;
            collectionStatsBar.parentNode.insertBefore(pTimer, collectionStatsBar.nextSibling);
        }

        if (!timer) {
            pDropdown = document.createElement('div');
            pDropdown.className = "pDropdown";
            pDropdown.innerHTML = markupSelect
            collectionStatsBar.parentNode.insertBefore(pDropdown, collectionStatsBar.nextSibling);
        }

        function renderStatusBar() {
            document.querySelector(".pDropdownSelect").removeAttribute("disabled");
            let statusBar = document.querySelector(".pressureStatsBar");
            const { markupStatusBar } = markupExtension();
            let selectTime = document.querySelector(".pDropdown");
            let display = document.querySelector('#countdown');
            let firstTime = true;

            if (!statusBar) {
                let pressureStatsBar = document.createElement('div');
                pressureStatsBar.className = "pressureStatsBar";
                pressureStatsBar.innerHTML = markupStatusBar
                collectionStatsBar.parentNode.insertBefore(pressureStatsBar, pTimer);
            }

            selectTime.addEventListener("change", function() {
                if(firstTime) {
                    updateData(display);
                    firstTime = false;
                }
            });

            clearDuplicates();
        }

        function renderChainUnsupportedMessage(nameChain) {
            let unSupportElement = document.getElementsByClassName("divSolanaMessage pLogIn");

            if (!unSupportElement.length) {
                let divSolanaMessage = document.createElement("div");
                divSolanaMessage.className = "divSolanaMessage pLogIn";
                divSolanaMessage.innerHTML = "<span class='pSolanaMessage'>" + `${nameChain} Collections are currently not supported` + "</span>";
                collectionStatsBar.parentNode.insertBefore(divSolanaMessage, pTimer);
                document.querySelector(".pDropdownSelect").setAttribute("disabled","true")
            }
        }

        function renderButtonLogIn() {
            let buttonElement = document.querySelector(".pLogIn");

            try {
                if (!buttonElement) {
                    let pLogInButton = document.createElement("div");
                    pLogInButton.className = "pLogIn";
                    pLogInButton.innerHTML = "<button class='pLogInButton'>" +
                        "<span class='pLogInText'>" +
                        "login to use pressure" +
                        "</span>" +
                        "</button>";

                    let select = document.querySelector(".pDropdownSelect");

                    select.setAttribute("disabled","true");
                    collectionStatsBar.parentNode.insertBefore(pLogInButton, pTimer);

                    document.querySelector(".pLogIn").addEventListener("click",(event) => {
                        refreshToken().then(() => {
                            document.querySelector(".pLogIn").remove();
                            renderStatusBar();
                        })
                    })
                }

            } catch (e) {

            }


        }

        async function updateData(display) {
            let pDropdown = document.querySelector(".pDropdown");

            const controller = new AbortController();
            const signal = controller.signal;

            if (!!pDropdown) {
                let selectedTime = pDropdown.firstChild;
                let queryTime = new Date();
                queryTime.setMinutes(queryTime.getMinutes() - parseInt(selectedTime.value));
                let collection = new URL(window.location.href);

                let col_slug1 = collection.pathname.replace('/collection/', '');
                let collectionName = col_slug1.replace("/activity","");

                Promise.all([
                    fetchInformation(collectionName,selectedTime.value,signal),
                    fetchListings(collectionName,selectedTime.value,signal)
                ]).then(([information,listingsItems]) => {
                    const { sales } = information;
                    const {listings} = listingsItems

                    let pressure = (sales-listings);

                    let pTimerIcon = document.querySelector('.pTimerIcon');
                    if (!!pTimerIcon) {
                        pTimerIcon.style.display = "none";
                    }
                    display.innerText = "refresh..";

                    const {markupTimer,markupSelect} = markupExtension();

                    if (sales === undefined || listings === undefined) {
                        document.querySelector(".pressureStatsBar").remove();
                        document.querySelector(".pTimer").innerHTML = markupTimer;
                        document.querySelector(".pDropdownSelect").innerHTML = markupSelect;
                        renderButtonLogIn();
                    } else {
                        startTimer(30, display);
                    }

                    const salesItem = document.querySelector('.salesValue').firstChild;
                    const listedItem = document.querySelector('.listedValue').firstChild;
                    const pressureItem = document.querySelector('.pressureValue');

                    if (!!salesItem || !!listedItem || !!pressureItem) {
                        salesItem.innerHTML = sales;
                        listedItem.innerHTML = listings;
                        pressureItem.firstChild.style.color = ((pressure < 0) ? '#770b0c' : '#1c9d00');
                        pressureItem.firstChild.innerHTML = pressure;
                    }
                })
            }
        }

        function startTimer(duration, display) {
            let timer = duration;

            const interval = setInterval(async function () {
                let minusTimer = --timer;
                let lastURL = location.href;

                new MutationObserver(() => {
                    const url = location.href;
                    if (url !== lastURL) {
                        clearInterval(interval);
                    }
                }).observe(document, {subtree:true, childList:true});


                if (minusTimer < 0) {
                    await updateData(display,interval);

                    let pTimerIcon = document.querySelector('.pTimerIcon');
                    if (!!pTimerIcon) {
                        pTimerIcon.style.display = "none";
                    }
                    display.innerText = "refresh..";
                    timer = duration;
                    clearInterval(interval)
                } else {

                    const pTimerIcon = document.querySelector('.pTimerIcon');
                    display.innerText = timer.toString()+"s";
                    if (!!pTimerIcon) pTimerIcon.style.display = "flex";
                }
            }, 1000);
        }
    }

    function addExtension() {
        const { markupTimer,markupSelect,markupStatusBar } = markupExtension();
    }