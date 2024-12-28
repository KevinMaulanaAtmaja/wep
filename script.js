// toggle btn
const menuToggle = document.querySelector(".menu");
const nav = document.querySelector("nav");
const header = document.querySelector("header");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    header.classList.toggle("mobile-header");
});

// fetch data
const select = document.getElementById("select-eps");
const img = document.getElementById("img-eps");
const desc = document.getElementById("desc-eps");

fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.eps;
            option.textContent = `Episode ${item.eps}: ${item.title}`;
            option.setAttribute("desc", item.desc);
            option.setAttribute("img", `img/eps/${item.img}`);
            select.appendChild(option);

            select.addEventListener("change", function () {
                const selectedOption = select.options[select.selectedIndex];
                const epsDesc = selectedOption.getAttribute("desc");
                const epsImg = selectedOption.getAttribute("img");

                if (epsDesc) {
                    desc.textContent = epsDesc;
                    img.src = `img/eps/${item.img}`;
                } else {
                    desc.textContent = "";
                    img.src = "";
                }

                if (epsImg) {
                    img.src = epsImg;
                }
            });

            if (data.length > 0) {
                select.value = data[0].eps;
                desc.textContent = data[0].desc;
                img.src = `img/eps/${data[0].img}`;
            }
        });
    })
    .catch((error) => console.error("Error fetching JSON:", error));

// slideshow
const slides = [
    {
        type: "iframe",
        src: "https://www.youtube.com/embed/-C2gc6RKGCI?si=Azci3Tai4GaUwdGp",
        title: "Teaser Video",
        mobileSrc: null,
    },
    {
        type: "img",
        src: "img/walp/01.webp",
        alt: "Image 1",
        mobileSrc: "img/walp/mobile/01.png",
    },
    {
        type: "img",
        src: "img/walp/02.webp",
        alt: "Image 2",
        mobileSrc: "img/walp/mobile/02.png",
    },
    {
        type: "img",
        src: "img/walp/03.webp",
        alt: "Image 3",
        mobileSrc: "img/walp/mobile/03.png",
    },
    {
        type: "img",
        src: "img/walp/04.webp",
        alt: "Image 4",
        mobileSrc: "img/walp/mobile/04.png",
    },
];

let currentSlide = 0;
const slider = document.getElementById("slider");

function isMobileDevice() {
    return window.matchMedia("(max-width: 1023px)").matches;
}

function showSlide(index) {
    slider.innerHTML = "";
    const slide = slides[index];
    const useMobile = isMobileDevice();

    if (slide.type === "img") {
        const img = document.createElement("img");
        img.src = useMobile && slide.mobileSrc ? slide.mobileSrc : slide.src;
        img.alt = slide.alt;
        slider.appendChild(img);
    } else if (slide.type === "iframe") {
        const iframe = document.createElement("iframe");
        iframe.src = slide.src;
        iframe.title = slide.title;
        iframe.frameBorder = "0";
        iframe.allowFullscreen = true;
        slider.appendChild(iframe);
    }
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

document.getElementById("prev").addEventListener("click", prevSlide);
document.getElementById("next").addEventListener("click", nextSlide);

showSlide(currentSlide);
