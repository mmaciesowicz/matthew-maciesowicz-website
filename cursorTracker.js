// const cmdCursorSpan = document.createElement('span');
// cmdCursorSpan.id = "cmdCursor";
// const cmdCursorSymbol = document.createTextNode("_");

// cmdCursorSpan.appendChild(cmdCursorSymbol);

// const mostRecentText = document.getElementsByClassName("cmdTypeScreen")[0].lastElementChild;
// mostRecentText.appendChild(cmdCursorSpan);

// function cursorToggle() {
   
//     setTimeout(() => {
//         cmdCursorSpan.style.visibility = 'hidden'; 
//         setTimeout(() => {
//             cmdCursorSpan.style.visibility = 'visible';
//             cursorToggle();
//         }, 1000);
//     }, 1000);    
// };
// cursorToggle();

function updateCursor(event) {
const mouseCursor = document.querySelector(".cursor");
mouseCursor.style.left = event.x + scrollX + "px";
mouseCursor.style.top = event.y + scrollY + "px";
};

document.addEventListener("mousemove", function (event) {
    updateCursor(event);
});
document.addEventListener("scroll", function (event) {
  updateCursor(event);
});

// document.addEventListener("scroll",function (event) {
//     const mouseCursor = document.querySelector(".cursor");
//     mouseCursor.style.top = scrollY + "px";
//     console.log(scrollY);
//     });
