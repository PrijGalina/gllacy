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

/* select */
const selectSingle = document.querySelector('.custom-select');
const selectSingle_title = selectSingle.querySelector('.custom-selected-value');
const selectSingle_labels = selectSingle.querySelectorAll('.select-content-label');

// Toggle menu
selectSingle_title.addEventListener('click', () => {
  if ('active' === selectSingle.getAttribute('data-state')) {
    selectSingle.setAttribute('data-state', '');
  } else {
    selectSingle.setAttribute('data-state', 'active');
  }
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener('click', (evt) => {
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute('data-state', '');
  });
}
