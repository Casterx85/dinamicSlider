let dataImages;
let total;
let step;
let timeSlider = 8; //Step load time (seconds)
let interval;

window.addEventListener('load', () => {

  //load Data Images
  loadJSON(function(response) {
    // Parse JSON string into object
    let data = JSON.parse(response);
    dataImages = data.dataImages;

    //DOM elements
    body = $('body');
    slider = $('#slider');
    bar = $('#bar');
    next = $('.next');
    prev = $('.prev');

    // initial slide
    step = parseInt( slider.data('step') );

    // total slides
    total = dataImages.length;

    // show first side
    showSlide(step);

    /**
     * event next button
     */
    body.on('click', '.next', () => {
      enext();
    });

    /** 
     * event prev button
     */
    body.on("click", '.prev', () => {
      eprev();
    });

  });

  const enext = () => {
    step++;
    if (step > total) { step = 1; }
    clearInterval(interval);
    showSlide(step);
  };

  const eprev = () => {
    step--;
    if (step < 1) { step = total; }
    clearInterval(interval);
    showSlide(step);
  };

  /**
   * show slides
   * 
   * @param {number} n 
   * @return {null}
   * 
   */
  function showSlide(n) {
    n--; // decrement 1
    let text = '';
    text += '<div class="bg bg1"><img src="assets/images/rock.jpg" alt="Rock" /></div>';
    text += '<div class="bg bg2"><img src="'+dataImages[n].bgImage+'" alt="Astronaut on the moon" /></div>';
    text += '<div class="bg bg3"><img src="'+dataImages[n].imageRocket+'" alt="Rocket flying" /></div>';

    text += '<div class="logo"><img src="'+dataImages[n].logo+'" alt="Logo" /></div>';
    text += '<div class="title"><h1>'+dataImages[n].title+'</h1><a href="#" rel="home"><button>Start your trip &#10095;</button></a></div>';
    text += '<div class="subtitle"><img src="'+dataImages[n].iconTrip+'" alt="Logo" /><h2>'+dataImages[n].subtitle+'</h2><hr><p class="hash">'+dataImages[n].hash+'</p></div>';

    text += '<div class="bg bg4"><img src="assets/images/background moon.png" alt="Moon" /></div>';
    text += '<p class="textBg4">Explore <br>the surface<p>';

    text += '<div class="loading"><div id="bar"><span></span></div></div>';
    text += '<div class="buttons"><div class="prev">'+dataImages[n].linkprev+'</div><div class="next">'+dataImages[n].linknext+'</div></div>';

    //Show HTML elements
    slider.data('step', step);
    slider.html( text );

    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i) )
    {
      console.log("You are using Mobile Device. Progress bar doesn't working.");
    }
    else
    {
      //progress bar
      interval = setInterval( () => { enext(); }, 1000 * timeSlider);
    }
  }

  /**
   * load JSON file
   */
  function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './data/slider.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);  
  }

});