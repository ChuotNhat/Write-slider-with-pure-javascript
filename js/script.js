var lengthItem = document.querySelectorAll('.item').length,
    innerSliderEle = document.getElementsByClassName('carousel-inner')[0],
    widthItem = document.getElementsByClassName('item')[0].offsetWidth;

window.onload = function(){
    var itemFirstEle = document.querySelectorAll('.item')[0],
        itemLastEle = document.getElementsByClassName('item')[lengthItem - 1],
        clnFirstEle = itemFirstEle.cloneNode(true),
        clnLastEle = itemLastEle.cloneNode(true);

    clnFirstEle.classList.remove('active');
    innerSliderEle.insertBefore(clnLastEle, innerSliderEle.childNodes[0]);
    innerSliderEle.appendChild(clnFirstEle);
};

function setActiveClassForItem(idNextTo, itemCurrentEle, liCurrentEle) {
    var liNextToEle = document.querySelectorAll("li")[idNextTo],
        itemNextToEle = document.querySelectorAll(".item")[idNextTo + 1];
    
    itemCurrentEle.classList.remove("active");
    itemNextToEle.classList.add("active");

    liCurrentEle.classList.remove('active');
    liNextToEle.classList.add("active");
};

var flag = false;

function moveNextToSlide(moveItemCB, target) {
    clearInterval(moveNextItem);
    var liCurrentEle = document.querySelectorAll("li.active")[0],
        idCurrent = parseInt(liCurrentEle.getAttribute("data-slide-to")),
        itemCurrentEle = document.querySelectorAll(".item")[idCurrent + 1];

    if (flag) return;
        flag = true;

    innerSliderEle.classList.remove('none-transition');
    var idNextTo = moveItemCB(idCurrent, target);
    setActiveClassForItem(idNextTo, itemCurrentEle, liCurrentEle);
    setTimeout (function(){
        flag = false;
    }, 500);
};

function applyTransitionPrevButton(idCurrent) {
    var idNextTo;

    if (idCurrent == 0) {
        idNextTo = lengthItem - 1;
        setTimeout( function(){
            innerSliderEle.style.marginLeft = -widthItem*(idNextTo + 1);
            innerSliderEle.classList.add('none-transition');
        }, 500);
    } else {
        idNextTo = idCurrent - 1;
    }

    innerSliderEle.style.marginLeft = innerSliderEle.offsetLeft + widthItem;
    return idNextTo;
}

function applyTransitionNextButton(idCurrent) {
    var idNextTo;

    if (idCurrent == lengthItem - 1) {
        idNextTo = 0;
        setTimeout( function(){
            innerSliderEle.style.marginLeft = widthItem*(idNextTo - 1);
            innerSliderEle.classList.add('none-transition');
        }, 500);
    } else {
        idNextTo = idCurrent + 1;
    }

    innerSliderEle.style.marginLeft = innerSliderEle.offsetLeft - widthItem;
    return idNextTo;
}

function applyTransitionControlButton(idCurrent, target) {
    var idNextTo = parseInt(target.getAttribute('data-slide-to'));
    innerSliderEle.style.marginLeft = -widthItem*(1 + idNextTo);
    return idNextTo;
}

// sự kiện onclick button prev
function movePrevItem() {
    moveNextToSlide(applyTransitionPrevButton);
};

// sự kiện onclick button next
function moveNextItem() {;
    moveNextToSlide(applyTransitionNextButton);
};

// Sự kiện khi click li (control button)
var olEle = document.getElementsByClassName('carousel-indicators')[0];
olEle.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI'){
        moveNextToSlide(applyTransitionControlButton);
    }
});

// Tự động chuyển slide sau 3s và lặp lại
setInterval(moveNextItem, 3000);