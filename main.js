const cmdCursorSpan = document.createElement('span');
cmdCursorSpan.id = "cmdCursor";
const cmdCursorSymbol = document.createTextNode("_");

cmdCursorSpan.appendChild(cmdCursorSymbol);

const mostRecentText = document.getElementsByClassName("cmdTypeScreen")[0].lastElementChild;
mostRecentText.appendChild(cmdCursorSpan);

function cursorToggle() {
   
    setTimeout(() => {
        cmdCursorSpan.style.visibility = 'hidden'; 
        setTimeout(() => {
            cmdCursorSpan.style.visibility = 'visible';
            cursorToggle();
        }, 1000);
    }, 1000);    
};
cursorToggle();