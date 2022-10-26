//navbar漢堡登出
function none() {
  let accountbox = document.querySelector(".accountbox");
  accountbox.classList.toggle("none");
}

window.addEventListener("click", (e) => {
  let accountbox = document.querySelector(".accountbox");
  if (
    !e.target.classList.contains("picc") &&
    !e.target.classList.contains("picc1")
  ) {
    accountbox.classList.add("none");
  }
});

//navbar漢堡搜尋選單
function none1() {
  let hamburgerlist = document.querySelector(".hamburgerlist");
  hamburgerlist.classList.toggle("none");
}

//跳轉到最新訊息
const btn = document.querySelector("main .right .goBottom ");
let content = document.querySelector(".content");
btn.addEventListener("click", () => {
  content.scrollTo(0, content.scrollHeight);
});
