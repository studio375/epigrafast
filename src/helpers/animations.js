import { gsap, ScrollTrigger } from "@/lib/gsap";
import { parseSVG } from "svg-path-parser";

export function imageSequence(config) {
  let playhead = { frame: 0 },
    canvasElement = gsap.utils.toArray(config.canvas)[0],
    ctx = canvasElement.getContext("2d"),
    images = [],
    onUpdate = config.onUpdate,
    scrollTriggerInstance,
    parent = canvasElement.parentNode;

  // Funzione per aggiornare l'immagine corrente sul canvas
  const updateImage = () => {
    let img = images[Math.round(playhead.frame)];
    if (!img) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    var canvasWidth = parent.offsetWidth;
    
    // Calcola le dimensioni del canvas in base all'immagine e alla densità di pixel
    let scale = canvasWidth / img.width;
    let scaledHeight = img.height * scale;

    // Imposta le dimensioni del canvas
    canvasElement.width = canvasWidth;
    canvasElement.height = scaledHeight;

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      canvasWidth,
      scaledHeight
    );

    onUpdate && onUpdate.call(this);
  };

  // Funzione per caricare le immagini
  const loadImages = (urls) => {
    images = urls.map((url, i) => {
      let img = new Image();
      img.src = url;
      if (i === 0) img.onload = updateImage; // Aggiorna il canvas con il primo frame
      return img;
    });
  };

  // Funzione per pulire e ricreare il canvas
  const resetCanvas = () => {
    canvasElement.width = window.innerWidth * (window.devicePixelRatio || 1);
    // Non è necessario impostare l'altezza qui; viene gestita da updateImage()
    canvasElement.height = canvasElement.height;
    ctx = canvasElement.getContext("2d");
  };

  // Funzione per ricreare lo ScrollTrigger
  const createScrollTrigger = () => {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill(); // Rimuove il trigger esistente se presente
    }
    scrollTriggerInstance = gsap.to(playhead, {
      frame: images.length - 1,
      ease: "none",
      onUpdate: updateImage,
      scrollTrigger: {
        ...config.scrollTrigger,
        onUpdate: ScrollTrigger.update,
      },
    });
  };

  // Carica le immagini iniziali e crea l'animazione
  loadImages(config.urls);
  createScrollTrigger();

  // Oggetto ritornato per gestire l'aggiornamento delle immagini
  return {
    update(newUrls) {
      resetCanvas(); // Pulizia e ricreazione del canvas
      loadImages(newUrls);
      // Ricrea lo ScrollTrigger con i nuovi URL delle immagini
      createScrollTrigger();
    },
  };
}

export function commonAnimations(){
  gsap.utils.toArray('.show-on-scroll').forEach(elem => {
      var tml3 = gsap.timeline({
          scrollTrigger: {
              trigger: elem, 
              start: 'top 50%',
              end: 'bottom 50%',
              scrub: true,
              invalidateOnRefresh: true
          }
      });
      tml3.to(elem, {opacity: 1, ease: 'none'});
  })
  gsap.utils.toArray('.draw-line:not(.no-common)').forEach(elem => {
      gsap.to(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 40%',
            end: 'bottom 40%',
            scrub: true,
            invalidateOnRefresh: true
          },
          drawSVG: '0%', ease: 'none'
      });
  })
}

export function followLine(container, element, line, scrollTriggerOptions = {}){
  var d = line.getAttribute('d');
  var coordinates = parseSVG(d);
  var firstStep = coordinates[0];
  element.style.left = `${firstStep.x}px`;
  element.style.top = `${firstStep.y}px`;

  var tml = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 40%',
        end: 'bottom 40%',  
        scrub: true,
        invalidateOnRefresh: true,
        ...scrollTriggerOptions
      }
  });
  coordinates.forEach((step, index) => {
      var x2 = (step.x2 < -80)?0:step.x2;
      if(step.x2){
          tml.to(element, {left: step.x1, top: step.y1, ease: 'none'})
              .to(element, {left: x2, top: step.y2, ease: 'none'})
              .to(element, {left: step.x, top: step.y, ease: 'none'});
      }else{
          tml.to(element, {left: step.x, top: step.y, ease: 'none'});
      }
  });
}