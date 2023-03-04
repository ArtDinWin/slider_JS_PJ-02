const sliderData = [];
let sliderActive = 0;

function sliderProjects(name, area, time, cost, img) {
  this.name = name;
  this.city = this.name.replace(",", "<br> LCD");
  this.area = area;
  this.time = time;
  this.cost = cost;
  this.img = img;
}

sliderData.push(
  new sliderProjects(
    "Rostov-On-Don, Admiral",
    // "Rostov-on-Don<br> LCD Admiral",
    81,
    3.5,
    "Upon request",
    "./images/slider-01.jpg"
  )
);
sliderData.push(
  new sliderProjects(
    "Sochi, Thieves",
    // "Sochi<br> LCD Thieves",
    105,
    4,
    "0.5 M",
    "./images/slider-02.jpg"
  )
);
sliderData.push(
  new sliderProjects(
    "Rostov-On-Don, Patriotic",
    // "Rostov-on-Don<br> LCD Patriotic",
    93,
    3,
    "1 M",
    "./images/slider-03.jpg"
  )
);

function activateSlider(sliderData) {
  if (!sliderData || sliderData.length == 0)
    return console.error("Ошибка активации слайдера. Ошибка данных слайдера.");

  let sliderImage = document.querySelector(".slider__image");
  let sliderArrows = document.querySelectorAll(
    ".slider-control__prev, .slider-control__next"
  );
  let sliderDots = document.querySelector(".slider-control__dots");
  let sliderList = document.querySelector(".slider__list");
  let sliderDataList = document.querySelectorAll(
    "[data-slider-city], [data-slider-area], [data-slider-time], [data-slider-cost]"
  );

  initSlider(sliderActive);

  function initSlider(sliderActive) {
    renderLinks(sliderActive);
    renderDots(sliderActive);
    initArrows();
    displaySliderElements(sliderActive);
  }

  function renderLinks(sliderActive) {
    sliderList.innerHTML = ``;
    sliderData.forEach((slider, index) => {
      sliderList.innerHTML += `<li class="list-projects__item ${
        index === sliderActive ? "list-projects__item--active" : ""
      }" data-index="${index}">
                  <a class="list-projects__link" href="#" >
                    ${slider.name}
                  </a>
                </li>`;
    });

    let linkSliderList = sliderList.querySelectorAll(".list-projects__item");
    linkSliderList.forEach((linkSlider) => {
      linkSlider.addEventListener("click", () => {
        playAnimation();
        displayActiveSlider(linkSlider.dataset.index);
      });
    });
  }

  function renderDots(sliderActive) {
    sliderDots.innerHTML = ``;
    sliderData.forEach((slider, index) => {
      sliderDots.innerHTML += `<div class="slider-control__dot ${
        index === sliderActive ? "slider-control__dot--active" : ""
      }" data-index="${index}"></div>`;
    });

    let dots = sliderDots.querySelectorAll(".slider-control__dot");
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        playAnimation();
        displayActiveSlider(dot.dataset.index);
      });
    });
  }

  function initArrows() {
    sliderArrows.forEach((arrow) => {
      arrow.addEventListener("click", function () {
        playAnimation();
        let nextNumber;

        if (arrow.classList.contains("slider-control__prev")) {
          nextNumber =
            sliderActive === 0 ? sliderData.length - 1 : sliderActive - 1;
        } else {
          nextNumber =
            sliderActive === sliderData.length - 1 ? 0 : sliderActive + 1;
        }

        sliderActive = nextNumber;
        displayActiveSlider(sliderActive);
      });
    });
  }

  function displayActiveSlider(sliderActive) {
    displaySliderElements(sliderActive);
    let dots = sliderDots.querySelectorAll(".slider-control__dot");

    dots.forEach((dot, index) => {
      if (index == sliderActive) {
        dot.classList.add("slider-control__dot--active");
      } else {
        if (dot.classList.contains("slider-control__dot--active")) {
          dot.classList.remove("slider-control__dot--active");
        }
      }
    });

    let linkSliderList = sliderList.querySelectorAll(".list-projects__item");
    linkSliderList.forEach((linkSlider, index) => {
      if (index == sliderActive) {
        linkSlider.classList.add("list-projects__item--active");
      } else {
        if (linkSlider.classList.contains("list-projects__item--active")) {
          linkSlider.classList.remove("list-projects__item--active");
        }
      }
    });
  }

  function displaySliderElements(sliderActive) {
    sliderImage.setAttribute("src", sliderData[sliderActive].img);

    sliderDataList.forEach((dataItem) => {
      if (dataItem.dataset.sliderCity == "1") {
        dataItem.innerHTML = sliderData[sliderActive].city;
      } else if (dataItem.dataset.sliderArea == "1") {
        dataItem.innerHTML = sliderData[sliderActive].area + ` m<sup>2</sup>`;
      } else if (dataItem.dataset.sliderTime == "1") {
        dataItem.innerHTML = sliderData[sliderActive].time + " months";
      } else if (dataItem.dataset.sliderCost == "1") {
        dataItem.innerHTML = sliderData[sliderActive].cost;
      }
    });
  }

  function playAnimation() {
    sliderImage.classList.add("anime");
    setTimeout(() => {
      sliderImage.classList.remove("anime");
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  activateSlider(sliderData);
});
