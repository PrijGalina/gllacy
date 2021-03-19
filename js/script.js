/* map */
const map_block = document.querySelector('#map');
if(map_block){
  function initMap() {
    let coordinatesmarker = {lat: 59.938635, lng: 30.323118};
    let coordinates = {lat: 59.938897, lng: 30.328693};
    let image = "img/pin.svg";
    map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 15,
        disableDefaultUI: true,
        scrollwheel: false
    });
    marker = new google.maps.Marker({
      position: coordinatesmarker,
      map: map,
      icon: image
    });
  }

  function addScript(src){
    var script = document.createElement('script');
    script.src = src;
    script.async = false; 
    document.head.appendChild(script);
  }
  addScript("https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyAImiABCDquzpZQ4aQHQU-g89xQEHinWHM"); 

  (function () {
    var func = EventTarget.prototype.addEventListener;
    
    EventTarget.prototype.addEventListener = function (type, fn, capture) {
        this.func = func;
        capture = capture || {};
        capture.passive = false;
        this.func(type, fn, capture);
    };
  }());
}


const selectSingle = document.querySelector('.custom-select');
if(selectSingle){
  const selectSingle_title = selectSingle.querySelector('.custom-selected-value');
  const selectSingle_labels = selectSingle.querySelectorAll('.select-content-label');

  selectSingle_title.addEventListener('click', () => {
    if ('active' === selectSingle.getAttribute('data-state')) {
      selectSingle.setAttribute('data-state', '');
    } else {
      selectSingle.setAttribute('data-state', 'active');
    }
  });

  for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener('click', (evt) => {
      selectSingle_title.textContent = evt.target.textContent;
      selectSingle.setAttribute('data-state', '');
    });
  }
}

let body_element = document.querySelector(".page-body");
let main_slider_controls = document.querySelectorAll(".main-slider-controls-item");
let main_slider_items = document.querySelectorAll(".main-slider-item");

main_slider_controls.forEach(function (item, num) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    let main_slider_control_active = document.querySelector(".current-controls");
    let main_slider_item_active = document.querySelector(".current-slide");
    if (item !== main_slider_control_active) {
      main_slider_control_active.classList.remove("current-controls");
      main_slider_item_active.classList.remove("current-slide");
      item.classList.add("current-controls");
      main_slider_items[num].classList.add("current-slide");
      let page_current_class = main_slider_item_active.getAttribute('data-page-bg');
      body_element.classList.remove(page_current_class);
    }
    let page_class = main_slider_items[num].getAttribute('data-page-bg');
    body_element.classList.add(page_class);
    item.blur();
  });
});


/* contact modal form */
let overlay = document.querySelector(".overlay");
let contact_modal_open_button = document.querySelector(".open-contact-form");
let contact_modal = document.querySelector(".modal-contact");
let iterationCount = 0;
let isStorageSupport = true;
const storage_name = "";
const storage_email = "";

try {
  storage_name = localStorage.getItem("name");
  storage_email = localStorage.getItem("email");
}
catch (err) {
  isStorageSupport = false;
}

if (contact_modal) {

  let contact_modal_close = contact_modal.querySelector(".modal-close");
  let contact_form = contact_modal.querySelector(".contact-form");
  let contact_field_name = contact_form.querySelector("[name=contact-name]");
  let contact_field_email = contact_form.querySelector("[name=user-email]");
  let contact_feld_message = contact_form.querySelector("textarea");
  contact_modal_open_button.addEventListener("click", function (e) {
    e.preventDefault();
    overlay.classList.add("open");
    contact_modal.classList.add("modal-open");
    contact_modal.classList.add("modal-emergence");
    if (storage_name) {
      contact_field_name.value = storage_name;
      contact_field_email.value = storage_email;
      contact_feld_message.focus();
    }
    else {
      contact_field_name.focus();
    }
  });

  contact_modal_close.addEventListener("click", function (e) {
    e.preventDefault();
    contact_modal.classList.remove("modal-open");
    contact_modal.classList.remove("modal-emergence");
    overlay.classList.remove("open");
    contact_modal.classList.remove("modal-error");
  });

  contact_form.addEventListener("submit", function (e) {
    if (!contact_field_name.value || !contact_field_email.value) {
      e.preventDefault();
      contact_modal.classList.add("modal-error");
    }
    else {
      if (isStorageSupport) {
        localStorage.setItem("name", contact_field_name.value);
        localStorage.setItem("email", contact_field_email.value);
      }
    }
  });

  //
  contact_modal.addEventListener("animationend", () => {
    if (contact_modal.classList.contains("modal-error")) {
      contact_modal.classList.remove("modal-error");
      contact_modal.classList.remove("modal-emergence");
    }
  });
}
if (overlay) {
  overlay.addEventListener("click", function (e) {
    e.preventDefault();
    contact_modal.classList.remove("modal-open");
    contact_modal.classList.remove("modal-emergence");
    overlay.classList.remove("open");
  });
}
