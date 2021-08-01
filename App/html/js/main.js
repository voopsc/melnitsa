function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function hide(element) {
  element.style.display = 'none';
}

function addClass(element, className) {
  element.classList.add(className)
}

function removeClass(element, className) {
  element.classList.remove(className)
}

function changeDisplay(element, status)
{
  element.style.display = status;
}

// animate element
function animateIt() {

  let elements = document.querySelectorAll('.animateIt');

  let loading = elementsAnimation(elements);

  setTimeout(scrollAnimation, loading, elements);
};

// helper functions for animateIt
function elementsAnimation(elements) {
    let i = 0;
    Array.prototype.forEach.call(elements, function(item){
      let animationName = item.getAttribute('data-animation');
      setTimeout(checkElementInViewport, i, item, animationName);
      i += 50;
    });
    return i;
};

function scrollAnimation(elements) {
  window.addEventListener('scroll', function() {

    Array.prototype.forEach.call(elements, function(scrollItem){
      let doneClass = scrollItem.className;
      if (doneClass.match('done')) {
        return false;
      } else {
        elementsAnimation(elements);
      }
    });
  });
}

function checkElementInViewport(element, animationName) {
  let targetPosition = {
        top: window.pageYOffset + element.getBoundingClientRect().top,
        left: window.pageXOffset + element.getBoundingClientRect().left,
        right: window.pageXOffset + element.getBoundingClientRect().right,
        bottom: window.pageYOffset + element.getBoundingClientRect().bottom
      },
      windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };
  if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
    targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
    targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
    targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
    // Если элемент полностью видно, то запускаем следующий код
    element.classList.add(animationName);
    element.classList.add('done');
  }
};
// end of helper functions

// Get background image for singleElement
function getBgImage(className) {
  let element = document.querySelectorAll(className);
  Array.prototype.forEach.call(element, function(item){
    if (item) {
      let value = item.getAttribute('data-bg');
      item.style.background = "url('"+ value +"') no-repeat center center";
      item.style.backgroundSize = 'cover';
    }
  });

};

function modal(ovrClass = '.overlay') {

  function modalBtn() {
    let buttons = document.querySelectorAll('[data-modal-btn]');
    Array.prototype.forEach.call(buttons, function(btnItem){
      btnItem.addEventListener('click', function(){
        let btnValue = btnItem.getAttribute('data-modal-btn');
        callModal(btnValue);
      });
    });
  };
  modalBtn();

  function callModal(value) {
    let element = document.querySelector("[data-modal=" + value + "]");
    if (element) {
      setTimeout(changeDisplay, 50, element, 'flex');
      setTimeout(addClass, 150, element, 'open');
    }
  }

  function hideModal() {
    let overlays = document.querySelectorAll(ovrClass);
    Array.prototype.forEach.call(overlays, function(overlay){
      overlay.addEventListener('click', function(){
        let modal = overlay.parentElement;
        setTimeout(removeClass, 50, modal, 'open');
        setTimeout(changeDisplay, 350, modal, 'none');
      })
    });
  };
  hideModal();

  function closeIcon()
  {
    let closeIcons = document.querySelectorAll('.close-modal');

    if (closeIcons) {
      Array.prototype.forEach.call(closeIcons, function(icon){
        icon.addEventListener('click', function(){
          let popUp = icon.closest('.modal.open');
          setTimeout(removeClass, 50, popUp, 'open');
          setTimeout(changeDisplay, 350, popUp, 'none');
        });
      });
    }
  }
  closeIcon();
}

function burger(burgerObj, headerClass) {
  let burgerBtn = document.querySelector(burgerObj);
  let header = document.querySelector(headerClass);

  if (burgerBtn) {
    burgerBtn.addEventListener('click', function(){
      if (burgerBtn.classList.contains('active')) {
        burgerBtn.classList.remove('active');
      } else {
        burgerBtn.classList.add('active');
      }

      if (header.classList.contains('open')) {
        header.classList.remove('open');
      } else {
        header.classList.add('open');
      }
    }, false);
  }
}
