let filters = {
    brightness: {
        unit: "%",
        min: 0,
        max: 200,
        value: 100,
    },
    saturation: {
        unit: "%",
        min: 0,
        max: 200,
        value: 100,
    },

    contrast: {
        unit: "%",
        min: 0,
        max: 200,
        value: 100,
    },


    grayscale: {
        unit: "%",
        min: 0,
        max: 100,
        value: 0,
    },

    huerotate: {
        unit: "deg",
        min: 0,
        max: 360,
        value: 0,
    },


    sepia: {
        unit: "%",
        min: 0,
        max: 100,
        value: 0,
    },
    blur: {
        unit: "px",
        min: 0,
        max: 10,
        value: 0,
    },

    invert: {
        unit: "%",
        min: 0,
        max: 100,
        value: 0,
    },
    opacity: {
        unit: "%",
        min: 0,
        max: 100,
        value: 100,
    },
};

const filtersContainer = document.querySelector(".filters");
const imgcanvas = document.querySelector("#img-canvas");
const canvasctx = imgcanvas.getContext("2d");
const imginput = document.querySelector("#img-input");
const resetbtn = document.querySelector("#reset-button");
const downloadbtn = document.querySelector("#download-button");
let file = null;
let image = null;



function CreatefilterElement(Name, unit = "%", min, max, value) {

    const div = document.createElement("div");
    div.classList.add("main-filter");

    const input = document.createElement("input");
    input.type = "range";
    input.id = Name;
    input.min = min;
    input.max = max;
    input.value = value;

    const p = document.createElement("p");
    p.innerText = Name;

    div.appendChild(p);
    div.appendChild(input);


    input.addEventListener("input", (e) => {
        filters[Name].value = input.value;
        applyFilters()
    });

    return div;



};

function createfilter() {
    Object.keys(filters).forEach(key => {

        const filterElement = CreatefilterElement(key, filters[key].unit, filters[key].min, filters[key].max, filters[key].value);
        filtersContainer.appendChild(filterElement);

    });

}

createfilter();


imginput.addEventListener("change", (e) => {

    const file = e.target.files[0];

    const placeholder = document.querySelector(".i");

    placeholder.style.display = "none";

    image = new Image();

    image.src = URL.createObjectURL(file);

    image.onload = () => {
        imgcanvas.width = image.width;
        imgcanvas.height = image.height;
        canvasctx.drawImage(image, 0, 0);
    }

}
);



function applyFilters() {

    canvasctx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        hue-rotate(${filters.huerotate.value}${filters.huerotate.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        invert(${filters.invert.value}${filters.invert.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})

    `;

    canvasctx.clearRect(0, 0, imgcanvas.width, imgcanvas.height);

    canvasctx.drawImage(image, 0, 0);
}



resetbtn.addEventListener("click", () => {
    filters = {
        brightness: {
            unit: "%",
            min: 0,
            max: 200,
            value: 100,
        },
        saturation: {
            unit: "%",
            min: 0,
            max: 200,
            value: 100,
        },

        contrast: {
            unit: "%",
            min: 0,
            max: 200,
            value: 100,
        },


        grayscale: {
            unit: "%",
            min: 0,
            max: 100,
            value: 0,
        },

        huerotate: {
            unit: "deg",
            min: 0,
            max: 360,
            value: 0,
        },


        sepia: {
            unit: "%",
            min: 0,
            max: 100,
            value: 0,
        },
        blur: {
            unit: "px",
            min: 0,
            max: 10,
            value: 0,
        },

        invert: {
            unit: "%",
            min: 0,
            max: 100,
            value: 0,
        },
        opacity: {
            unit: "%",
            min: 0,
            max: 100,
            value: 100,
        },
    };

    applyFilters()

    filtersContainer.innerHTML = "";

    createfilter();

  


});


downloadbtn.addEventListener("click", () => {

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imgcanvas.toDataURL();
    link.click();

})



