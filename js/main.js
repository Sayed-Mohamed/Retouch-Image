//navbar
document.addEventListener("DOMContentLoaded", function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

// Carousel
var carousels = bulmaCarousel.attach(); // carousels now contains an array of all Carousel instances

//Tab
document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");
  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });
  var tabs = document.querySelectorAll(".tab-pane");
  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}

//Toggle Active class for filters-buttons only
 function removeactive() {

  var btns = document.getElementsByClassName("filter-btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("is-warning");
      if (current.length > 0) {
        current[0].classList.remove("is-warning");
      }
    });
  }
}
 
//default value for effects
let brightnessValue = 0,
  contrastValue = 0,
  saturationValue = 0,
  exposureValue = 0,
  vibranceValue = 0,
  hueValue = 0,
  sepiaValue = 0,
  gammaValue = 1,
  noiseValue = 0,
  clipValue = 0,
  sharpenValue = 0,
  stackBlurValue = 0;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let img = new Image();
let fileName = "";

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");
const resizeBtn = document.getElementById("resizeBtn");
const rotateBtn = document.getElementById("rotateBtn");
let degree =0;

let resizeCheck = 0;
let resizeWidth= 0;
let resizeHeight= 0;

let uploadAfterResize = 0 ;

let rotateCheck = 0;



/// As soon as any value changes call applyFilters
function applyFilters() {
  Caman("#canvas", img, function() {
    this.revert(false);
    this.brightness(brightnessValue)
      .contrast(contrastValue)
      .saturation(saturationValue)
      .vibrance(vibranceValue)
      .exposure(exposureValue)
      .hue(hueValue)
      .sepia(sepiaValue)
      .gamma(gammaValue)
      .noise(noiseValue)
      .clip(clipValue)
      .sharpen(sharpenValue)
      .stackBlur(stackBlurValue)
      .render();
  });
}
// Filter & Effect Handlers
document.addEventListener("click", e => {
  if (e.target.classList.contains("filter-btn")) {
    if (e.target.classList.contains("brightness-add")) {
      brightnessValue = brightnessValue + 2;
      applyFilters();
       
    } else if (e.target.classList.contains("brightness-remove")) {
      brightnessValue = brightnessValue - 2;
      applyFilters();
       
    } else if (e.target.classList.contains("contrast-add")) {
      contrastValue = contrastValue + 2;
      applyFilters();
       
    } else if (e.target.classList.contains("contrast-remove")) {
      contrastValue = contrastValue - 2;
      applyFilters();
       
    } else if (e.target.classList.contains("saturation-add")) {
      saturationValue = saturationValue + 2;
      applyFilters();
       
    } else if (e.target.classList.contains("saturation-remove")) {
      saturationValue = saturationValue - 2;
      applyFilters();
       
    } else if (e.target.classList.contains("vibrance-add")) {
      vibranceValue = vibranceValue + 2;
      applyFilters();
    } else if (e.target.classList.contains("vibrance-remove")) {
      vibranceValue = vibranceValue - 2;
      applyFilters();
    } else if (e.target.classList.contains("exposure-add")) {
      exposureValue = exposureValue + 2;
      applyFilters();
    } else if (e.target.classList.contains("exposure-remove")) {
      exposureValue = exposureValue - 2;
      applyFilters();
    } else if (e.target.classList.contains("hue-add")) {
      hueValue++;
      applyFilters();
    } else if (e.target.classList.contains("hue-remove")) {
      if (hueValue >= 0) {
        hueValue--;
        Caman("#canvas", img, function() {
          this.revert();
        });
        applyFilters();
      }
    } else if (e.target.classList.contains("sepia-add")) {
      sepiaValue++;
      applyFilters();
    } else if (e.target.classList.contains("sepia-remove")) {
      sepiaValue--;
      if (sepiaValue >= 0) {
        Caman("#canvas", img, function() {
          this.revert();
        });
        applyFilters();
      }
    } else if (e.target.classList.contains("gamma-add")) {
      gammaValue = gammaValue + 0.1;
      if (gammaValue >= 0.1) {
        applyFilters();
      } else {
        Caman("#canvas", img, function() {
          this.revert();
        });
        gammaValue = 0;
      }
    } else if (e.target.classList.contains("gamma-remove")) {
      gammaValue = gammaValue - 0.1;
      if (gammaValue > 0.1) {
        Caman("#canvas", img, function() {
          this.revert();
        });
        applyFilters();
      } else {
        Caman("#canvas", img, function() {
          this.revert();
        });
        gammaValue = 0;
      }
    } else if (e.target.classList.contains("noise-add")) {
      noiseValue++;
      applyFilters();
       
    } else if (e.target.classList.contains("noise-remove")) {
      noiseValue--;
      if (noiseValue >= 0) {
        Caman("#canvas", img, function() {
          this.revert();
        });
        applyFilters();
      }
    } else if (e.target.classList.contains("clip-add")) {
      clipValue++;
      applyFilters();
    } else if (e.target.classList.contains("clip-remove")) {
      clipValue--;
      if (clipValue >= 0) {
        Caman("#canvas", img, function() {
          this.revert();
        });
        applyFilters();
      }
    } else if (e.target.classList.contains("sharpen-add")) {
      sharpenValue++;
      applyFilters();
    } else if (e.target.classList.contains("sharpen-remove")) {
      sharpenValue--;
      if (sharpenValue >= 0) {
        Caman("#canvas", img, function() {
          this.revert();
        });
        applyFilters();
      }
    } else if (e.target.classList.contains("stackBlur-add")) {
      stackBlurValue++;
      applyFilters();
      
    } else if (e.target.classList.contains("stackBlur-remove")) {
      stackBlurValue--;
      if (stackBlurValue >= 0) {
        Caman("#canvas", img, function() {
          this.revert();
        });
        applyFilters();
      }
    } else if (e.target.classList.contains("vintage-add")) {
       removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.vintage().render();
      });
    } else if (e.target.classList.contains("lomo-add")) {
       removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.lomo().render();
      });
    } else if (e.target.classList.contains("clarity-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.clarity().render();
      });
    } else if (e.target.classList.contains("sincity-add")) {
       removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.sinCity().render();
      });
    } else if (e.target.classList.contains("crossprocess-add")) {
       removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.crossProcess().render();
      });
    } else if (e.target.classList.contains("pinhole-add")) {
       removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.pinhole().render();
      });
    } else if (e.target.classList.contains("nostalgia-add")) {
       removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.nostalgia().render();
      });
    } else if (e.target.classList.contains("hermajesty-add")) {
       removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.herMajesty().render();
      });
    } else if (e.target.classList.contains("sunrise-add")) {
       removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.sunrise().render();
      });
    } else if (e.target.classList.contains("orangePeel-add")) {
       removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.orangePeel().render();
      });
    } else if (e.target.classList.contains("love-add")) {
       removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.love().render();
      });
    } else if (e.target.classList.contains("grungy-add")) {
       removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.grungy().render();
      });
    } else if (e.target.classList.contains("jarques-add")) {
       removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.jarques().render();
      });
    } else if (e.target.classList.contains("oldBoot-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.oldBoot().render();
      });
    } else if (e.target.classList.contains("glowingSun-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.glowingSun().render();
      });
    } else if (e.target.classList.contains("hemingway-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.hemingway().render();
      });
    } else if (e.target.classList.contains("greyscale-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.greyscale().render();
      });
       
    } else if (e.target.classList.contains("invert-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.invert().render();
      });
       
    } else if (e.target.classList.contains("oldpaper-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
        this.pinhole();
        this.noise(10);
        this.orangePeel();
        this.render();
      });
       
    } else if (e.target.classList.contains("pleasant-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
          this.colorize(60, 105, 218, 10);
          this.contrast(10);
          this.sunrise();
          this.hazyDays();
          this.render();
      });
       
    } 
    else if (e.target.classList.contains("emboss-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
          this.emboss().render();
      });
       
    } else if (e.target.classList.contains("tiltShift-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
          this.tiltShift({
        angle: 90,
        focusWidth: img.width
      }).render();
      });
       
    } else if (e.target.classList.contains("radialBlur-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
          this.radialBlur().render();
      });
       
    } else if (e.target.classList.contains("edgeEnhance-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
          this.edgeEnhance().render();
      });
       
    } else if (e.target.classList.contains("posterize-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
          this.posterize(8, 8).render();
      });
       
    } else if (e.target.classList.contains("hdr-add")) {
      removeactive();
      e.target.classList.add("is-warning");
      Caman("#canvas", img, function() {
          this.contrast(10);
          this.contrast(10);
          this.jarques();
          this.render();
      });
       
    }       
  }
});


// Resize img
resizeBtn.addEventListener("click", e => {
  
   resizeCheck = 1 ;
     uploadAfterResize = 1;

      resizeWidth=document.getElementById("resize-w").value;
     resizeHeight= document.getElementById("resize-h").value;

      Caman("#canvas", img, function() {
        this.resize({
                      width: resizeWidth,
                      height: resizeHeight
                  }).render();
        
        
      });
      


});

// Rotate img
rotateBtn.addEventListener("click", e => {
  
  degree =document.getElementById("degree").value;
  Caman("#canvas", img, function() {
    this.rotate(degree);
  this.render();
  });
  
  rotateCheck = 1;

});



// Revert Filters
revertBtn.addEventListener("click", e => {
  removeactive();
  Caman("#canvas", img, function() {
    this.revert();
  });


});

// Upload File
uploadFile.addEventListener("change", () => {
 
 // check if resize before
  if (uploadAfterResize == 1)
  {
    document.location.reload(true);
   
  }

  

  // Get File
  const file = document.getElementById("upload-file").files[0];
  // Init FileReader API
  const reader = new FileReader();
  // Check for file
  if (file) {
    // Set file name
    fileName = file.name;
    // Read data as URL
    reader.readAsDataURL(file);
  }

  // Add image to canvas
  reader.addEventListener(
    "load",
    () => {
      // Create image
      img = new Image();
      // Set image src
      img.src = reader.result;
      
      // On image load add to canvas
        img.onload = function() {
  
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.removeAttribute("data-caman-id");

              
        
      };

      
      
      
    },
    false
  );
});

// Download Event
downloadBtn.addEventListener("click", () => {

  // Get ext
  const fileExtension = fileName.slice(-4);
    
  // Init new filename
  let newFilename;

  // Check image type
  if (fileExtension === ".jpg" || fileExtension === ".png") {
    // new filename
    newFilename = fileName.substring(0, fileName.length - 4) + "-edited.jpg";
  }

  // Call download
  download(canvas, newFilename);
});

// Download
function download(canvas, filename) {
  // Init event
  let e;
  // Create link
  const link = document.createElement("a");
  // if image resized 
  if(resizeCheck == 1)
  {

    img.width=resizeWidth;
    img.height=resizeHeight;
    canvas.width=resizeWidth;
    canvas.height=resizeHeight;
    ctx.drawImage(this.canvas, 0, 0, img.width, img.height);
    resizeCheck=0;
  }
  // if image rotated
  if (rotateCheck == 1)
  {
    degree =document.getElementById("degree").value;
    
    if(degree == 90 || degree == -270 || degree == 270 || degree == -90)
    {
      width = canvas.height;
    height = canvas.width;
    x= width/2;
    y = height/2;
    to_radians = Math.PI/180;
    canvas.width = width;
  canvas.height = height;
  
  ctx.save();
  ctx.translate (x, y);  
  
  ctx.drawImage (this.canvas, -(canvas.width/2), -(canvas.height/2), canvas.width, canvas.height);
  ctx.restore();
    
    

    
    }
    else if ( degree == 180 )
    {

      width = canvas.width ;
    height = canvas.height ;
    x = width/2 ;
    y = height/2 ;

    canvas.width = width;
  canvas.height = height;
  
  ctx.save();
  ctx.translate (x, y);  
  
  ctx.drawImage (this.canvas, -(canvas.width/2), -(canvas.height/2), canvas.width, canvas.height);
  ctx.restore();

    }
    else 
    {
    width = Math.sqrt(Math.pow(img.width, 2) + Math.pow(img.height, 2));
    height = width;
    x = canvas.height/2;
    y = canvas.width/2;

    canvas.width = width;
  canvas.height = height;
  
  ctx.save();
  ctx.translate (x, y);  
  
  ctx.drawImage (this.canvas, -(canvas.width/2), -(canvas.height/2), canvas.width, canvas.height);
  ctx.restore();
    }


    rotateCheck = 0;
  }
  
  // Set props
  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 0.8);
  // New mouse event
  e = new MouseEvent("click");
  // Dispatch event
  link.dispatchEvent(e);
}


