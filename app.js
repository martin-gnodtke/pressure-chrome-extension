var domain = window.location.hostname;
domain = domain.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0];

var collectionStatsBar = document.getElementsByClassName('CollectionStatsBarreact__Container-sc-8gdi9o-0')[0].parentNode;

var pTimer = document.createElement('div');
pTimer.className = "pTimer";
pTimer.innerHTML = 
    '<div>'+
        '<div class="pTimerIcon">'+
            '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stopwatch" class="svg-inline--fa fa-stopwatch fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M432 304c0 114.9-93.1 208-208 208S16 418.9 16 304c0-104 76.3-190.2 176-205.5V64h-28c-6.6 0-12-5.4-12-12V12c0-6.6 5.4-12 12-12h120c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-28v34.5c37.5 5.8 71.7 21.6 99.7 44.6l27.5-27.5c4.7-4.7 12.3-4.7 17 0l28.3 28.3c4.7 4.7 4.7 12.3 0 17l-29.4 29.4-.6.6C419.7 223.3 432 262.2 432 304zm-176 36V188.5c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12V340c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"/></svg>'+
        '</div>'+
        '<span id="countdown">'+
            '60s'+
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
                    '<span class="pStatsBarItemValue">10</span>'+
                '</div>'+
                '<div class="pStatsBarItemText">sales</div>'+
                '</div>'+
            '</div>'+
        '<div class="pStatsBarItemInner listedItem">'+
            '<div>'+
                '<div class="pStatsBarItemInnerValue listedValue">'+
                    '<span class="pStatsBarItemValue">20</span>'+
                '</div>'+
                '<div class="pStatsBarItemText">listed</div>'+
                '</div>'+
            '</div>'+
        '<div class="pStatsBarItemInner pressureItem">'+
            '<div>'+
                '<div class="pStatsBarItemInnerValue pressureValue">'+
                    '<span class="pStatsBarItemValue">-10</span>'+
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
        '<option disabled selected>Select Time</option>'+
        '<option>1 Minute</option>'+
        '<option>5 Minutes</option>'+
        '<option>10 Minutes</option>'+
        '<option>15 Minutes</option>'+
        '<option>30 Minutes</option>'+
    '</select>'
collectionStatsBar.parentNode.insertBefore(pDropdown, collectionStatsBar.nextSibling);

/*pressureStatsBar.className = 'cGbeUj jYqxGr';
pressureStatsBar.id = 'pressureStatsBar';
var volumeItem = document.createElement('div');
volumeItem.className = 'dhHyRY';
volumeItem.innerText = 'TEST';
pressureStatsBar.append(volumeItem);
var salesItem = document.createElement('div');
salesItem.className = 'dhHyRY';
salesItem.innerText = 'TEST';
pressureStatsBar.append(salesItem);
var listedItem = document.createElement('div');
listedItem.className = 'dhHyRY';
listedItem.innerText = 'TEST';
pressureStatsBar.append(listedItem);*/

function startTimer(duration, display) {
    var timer = duration;
    
    setInterval(function () {
        display.innerText = timer.toString()+"s";
        
        if (--timer < 0) {
            timer = duration;
            document.querySelector('.pTimerIcon').style.display = "none";
            display.innerText = "refresh..";
        } else {
            document.querySelector('.pTimerIcon').style.display = "flex";
        }
    }, 1000);
}

window.onload = function () {
    var display = document.querySelector('#countdown');
    startTimer(60, display);
};