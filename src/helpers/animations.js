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
    var canvasWidth = parent.offsetWidth*devicePixelRatio;
    var imgRatio = img.width / img.height;
    
    // Calcola le dimensioni del canvas in base all'immagine e alla densità di pixel
    let scaledHeight = canvasWidth/imgRatio;

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
      return;
      scrollTriggerInstance.kill(); // Rimuove il trigger esistente se presente
      ScrollTrigger.refresh();
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
              end: '+=200px',
              scrub: true,
              invalidateOnRefresh: true,
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

export function followLine(container, element, line, scrollTriggerOptions = {}, skip = []){
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
    var skipX = (skip[index]?.indexOf('x') > -1);
    var skipX1 = (skip[index]?.indexOf('x1') > -1);
    var skipX2 = (skip[index]?.indexOf('x2') > -1);
    var x2 = (step.x2 < -80)?0:step.x2;
    if(step.x2){
      if(!skipX1)
        tml.to(element, {left: step.x1, top: step.y1, ease: 'none'});
      if(!skipX2)
        tml.to(element, {left: x2, top: step.y2, ease: 'none'});
      if(!skipX)
        tml.to(element, {left: step.x, top: step.y, ease: 'none'});
    }else{
        tml.to(element, {left: step.x, top: step.y, ease: 'none'});
    }
  });
  return tml;
}