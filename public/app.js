//navbar
const btn = document.querySelector("nav ul li:nth-child(1)");
const page1 = document.querySelector(".page1");
let p1height = page1.offsetHeight;
window.addEventListener("scroll", () => {
  if (window.pageYOffset >= p1height) {
    btn.style = "display:block";
  } else {
    btn.style = "";
  }
});

//常見問題解答按鈕
function display(number) {
  let answer = document.querySelector(`.answer-${number}`);
  let item = document.querySelector(`.item-${number}`);
  item.classList.toggle("fa-plus");
  item.classList.toggle("fa-minus");
  answer.classList.toggle("none");
}

//carousal

const ul = document.querySelector(".view ul");
const li = document.querySelectorAll(".view ul li");
const a = document.querySelector(".view ul li img");
let width = a.offsetWidth;
const indexButton = document.querySelector(".indexButton");

let index = 0;
let timer = setInterval(() => run(1), 2000);

ul.addEventListener("transitionend", () => {
  if (index >= li.length - 2) {
    index = 0;
    ul.style.transition = "";
    let translatex = -1 * index * width;
    ul.style.transform = `translateX(${translatex}px)`;
  } else if (index < 0) {
    index = li.length - 3;
    ul.style.transition = "";
    let translatex = -1 * index * width;
    ul.style.transform = `translateX(${translatex}px)`;
  }

  indexButton.querySelector(".active").classList.remove("active");
  indexButton.children[index].classList.add("active");
});

for (let i = 0; i < li.length - 2; i++) {
  let span = document.createElement("span");
  if (indexButton.children.length === 0) {
    span.classList.add("button", "active");
  } else {
    span.classList.add("button");
  }
  span.innerText = "o";
  indexButton.appendChild(span);
}

for (let i = 0; i < indexButton.children.length; i++) {
  indexButton.children[i].addEventListener("click", () => {
    index = i;
    ul.style.transition = "all 0.3s ease";
    let translatex = -1 * index * width;
    ul.style.transform = `translateX(${translatex}px)`;
  });
}

function run(number) {
  index += number;
  ul.style.transition = "all 0.3s ease";
  let translatex = -1 * index * width;
  ul.style.transform = `translateX(${translatex}px)`;
}

function stop() {
  clearInterval(timer);
}

function start() {
  timer = setInterval(() => run(1), 2000);
}
