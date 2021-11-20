import React, { useState } from 'react';

function Editor() {
  const [buffer, setBuffer] = useState("");
  const [cursor, setCursor] = useState(-1);

  async function processKeypress(event) {
    if (!event.metaKey){
      event.preventDefault()
    }
    switch (event.code) {
      // TODO: put control keys up here
      // use event.ctrlKey, event.metaKey, event.altKey etc
      // to check what is all held down
      case "CapsLock":
      case 'ShiftLeft':
      case 'ShiftRight':
        break
      case 'ControlLeft':
      case 'ControlRight':
        break
      case "AltLeft":
      case "AltRight":
        break
      case "MetaLeft":
      case "MetaRight":
        break
      case "Backspace":
        setBuffer(buffer.slice(0,-1))
        break
      case "Delete":
        break
      case "Space":
        if (buffer.slice(-1) === " "){
          setBuffer(buffer + "\u00A0") // this breaks normal overflow
        } else {
          setBuffer(buffer + event.key)
        }
        break
      case "Enter": // TODO: fix linebreaks and tabs in HTML (<p></p>)
        setBuffer(buffer + "\u000D")
        break
      case "Tab":
        setBuffer(buffer + "\u0009")
        break
      case "ArrowDown":
      case "ArrowUp":
        break
      case "ArrowRight":
        setCursor(cursor + 1)
        break
      case "ArrowLeft":
        setCursor(cursor - 1)
        console.log("LEFT")
        break
      default:
        setBuffer(buffer + event.key)
    }

  }

  function renderBuffer() {
    console.log(cursor)
    console.log(buffer.length)
    return (
      <>
        {cursor === -1 ? buffer : buffer.slice(0, cursor + 1)}
        <span className="cursor" style={{
          background:"white",
          color: "white",
          width: "1em",
          zIndex: "-10"
          }}>
          .
        </span>
        {cursor === -1 ? "" : buffer.slice(cursor + 1)}
      </>
    )
  }

  return (
    <div
      className="Editor" style={{
        padding: "5vh 5vw",
        width: "90vw",
        height: "90vh",
        color: "white",
        overflowWrap: "normal"
      }}
      onKeyDown={(e) => {
        // refreshScreen -- I believe useState does this automagically? Maybe.
        processKeypress(e)
      }}
      tabIndex="0"
    >
      {renderBuffer()}
    </div>
  )
}

export default Editor

// TODO: FIGURE OUT HOW TO DRAW A CURSOR. THEN MOVE CURSOR.
