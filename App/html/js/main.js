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
