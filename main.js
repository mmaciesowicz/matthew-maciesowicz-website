(cmdTyper = function() {
    (flashCmdCursor = function () {
        function cursorToggle() {
            if (typeof document.querySelector("#cmdCursor") != "undefined" && typeof document.querySelector("#cmdCursor") != "null") {
                setTimeout(() => {
                    document.querySelector("#cmdCursor").style.visibility = 'hidden'; 
                    setTimeout(() => {
                        document.querySelector("#cmdCursor").style.visibility = 'visible';
                        cursorToggle();
                    }, 520);
                }, 520);    
            }
        };
        const cmdCursorSpan = document.createElement('span');
        cmdCursorSpan.id = "cmdCursor";
        const cmdCursorSymbol = document.createTextNode("_");
        
        cmdCursorSpan.appendChild(cmdCursorSymbol);

        const mostRecentText = document.getElementsByClassName("cmdTypeScreen")[0].lastElementChild;
        mostRecentText.appendChild(cmdCursorSpan);
        cursorToggle();
        
        
    })();
    (cmdTextAppear = function () {
        animateIntroText(showInitialCmdPath);


        function getNewestP() {
           return document.querySelector(".cmdTypeScreen").lastChild;
           //return document.querySelector("")
        };

        function moveCursorToNewestP() {
            const cmdCursorSpan = document.querySelector("#cmdCursor").outerHTML;
            const p = getNewestP();
            document.querySelector("#cmdCursor").remove();
            p.innerHTML = (getNewestP().innerHTML.concat(cmdCursorSpan));
        };

        

        function writeTextToCmd(text, animate=false, pTag = getNewestP()) {
            text = text.split("");
            const cmdCursorSpan = document.querySelector("#cmdCursor").outerHTML;
            text.forEach((letter, index) => {
                setTimeout(() => {
                    document.querySelector("#cmdCursor").remove();
                    pTag.innerHTML = (pTag.innerHTML.concat(letter).concat(cmdCursorSpan));
                }, animate ? 40 * (index + 1) : 0);
            });

            
        };

        function createNewCmdEntry(text="C:\\Users\\Matthew>") {
            const p = document.createElement('p');
            p.className = "cmdText";
            p.appendChild(document.createTextNode(text));
            const element = document.querySelector(".cmdTypeScreen");
            element.appendChild(p);
            // move blinking cursor to new text
            moveCursorToNewestP();
        };

        // function animateText(text, pTag = getNewestP()) {
        //     text = text.split("");
        //     const cmdCursorSpan = document.querySelector("#cmdCursor").outerHTML;
        //     text.forEach((letter, index) => {
        //         setTimeout(() => {
        //             document.querySelector("#cmdCursor").remove();
        //             pTag.innerHTML = (pTag.innerHTML.concat(letter).concat(cmdCursorSpan));
        //         }, 40 * (index + 1));
        //     });
        // };

        // direction == lef
        function deleteNextCharInDir(revDirection = 0) {
            const pTag = getNewestP();
            const cmdCursorSpan = document.querySelector("#cmdCursor").outerHTML;
            if (typeof document.querySelector("#cmdCursor") != "undefined" && typeof document.querySelector("#cmdCursor") != "null") {
             
                document.querySelector("#cmdCursor").remove();
            }
            
            pTag.innerHTML = pTag.innerHTML.slice(0,-1);
            if (typeof document.querySelector("#cmdCursor") != "undefined" && typeof document.querySelector("#cmdCursor") != "null") {
                pTag.innerHTML = (getNewestP().innerHTML.concat(cmdCursorSpan));
            }
            

        }

        function animateIntroText(_callback) {
            const greetingText = "Hello. My name is Matthew Maciesowicz.\nScroll to join me on my programming adventure!\n";
            const pTag = document.getElementById("cmdIntroText");
            writeTextToCmd(greetingText, true, pTag);
            
            _callback();
        };
        
        function watchKeyboardInput() {
            document.addEventListener("keydown", (element) => {

                const key = element.key;
                const pTag = getNewestP();
                // Stop page from scrolling on space press
                if (element.key === " " && element.target == document.body) {
                  element.preventDefault();
                  //writeTextToCmd(" ", true);
                }
                if (key === "Enter") {
                    const cdText = "\"cd about\" (go to about page)\n\"cd projects\" (go to projects page)";
                    if (getNewestP().innerHTML.includes("help")) {
                        createNewCmdEntry(`\nCommands:\ncd: To change page section:\nExamples:\n${cdText} \n\n`);
                        moveCursorToNewestP();
                    }
                    else if (getNewestP().innerHTML.includes("cd")) {
                        if (getNewestP().innerHTML.includes("cd about")) {
                            document.getElementById('about').scrollIntoView({
                                behavior: 'smooth'
                            });
                            moveCursorToNewestP();
                        }
                        else if (getNewestP().innerHTML.includes("cd projects")) {
                            document.getElementById('projects').scrollIntoView({
                                behavior: 'smooth'
                            });
                            moveCursorToNewestP();
                        }
                        else {
                            let text = pTag.innerText;
                            text.trim();
                            console.log(text);
                            if (text == "C:\\Users\\Matthew>cd" || text == "C:\\Users\\Matthew>cd\n_") {
                                createNewCmdEntry("Invalid arguments.");
                            }
                            else {
                                createNewCmdEntry(`Invalid page section: \"${text.endsWith("_") ? (text.split('cd ').pop()).slice(0,-2) : text.split('cd ').pop()}\"`);
                            }
                        }
                        
                        moveCursorToNewestP();
                    }
                    else {
                        createNewCmdEntry("Invalid Command");
                    }
                    createNewCmdEntry();
                }
                else if (key == "Backspace" || key == "Delete") {
                    deleteNextCharInDir();
                }
                else if (key.length > 1) { // avoid buttons such as "Home", "Tab", etc.
                    return;
                } 
                else {
                    writeTextToCmd(key,true);
                }                
            }, false);
        };

        /* Startup for cmd prompt */
        function showInitialCmdPath() {
            setTimeout(() => {      
                const pTag = document.getElementById("cmdIntroText");
               // pTag.innerHTML = pTag.innerHTML.concat("Tip: Type \"help\" for more details.\n");
                createNewCmdEntry("Tip: Type \"help\" for more details.\n");
                createNewCmdEntry();
                moveCursorToNewestP();

                watchKeyboardInput();
            }, 3600);
        };
        
    })();
})();

