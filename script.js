const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 0,
    MaxIndex: 452
};

let imageLoaded = 0;
const images = [];

function preloadeImages() {
    for (i = 1; i <= frames.MaxIndex; i++) {
        const imageUrl = `./Animated/frame_${i.toString().padStart(4, "0")}.jpeg`
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imageLoaded++;
            if (imageLoaded === frames.MaxIndex) {
                loadImage(frames.currentIndex);
                startAnimation();
            }
        }
        images.push(img);
    }
}

function loadImage(index) {
    if (index >=0 && index <= frames.MaxIndex) {
        const img = images[index];
        canvas.width = 1350;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high"
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.currentIndex = index;
    }
}

function startAnimation(){
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#workingarea",
            start:"top top",
            scrub: 2, 
            markers: true,
        }
    })

    tl.to(frames, {
        currentIndex: frames.MaxIndex,
        onUpdate: function(){
            loadImage(Math.floor(frames.currentIndex))
        }
    })
}

preloadeImages();

const slidr = document.querySelectorAll(".slide");
let counter = 0;

slidr.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`
})

document.getElementById("btn1").addEventListener('click', () => {
    counter--
    slideImage()
});

document.getElementById("btn2").addEventListener('click', () => {
    counter++
    slideImage()
});

const slideImage = () => {
    slidr.forEach((slide) => {
        slide.style.transform = `translateX(-${counter* 100}%)`
    })
    if(counter==4){
        counter= 3;
    }
}
