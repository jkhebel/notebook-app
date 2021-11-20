import React, { useState } from 'react';

function Editor() {
  const [buffer, setBuffer] = useState([""]);
  const [currentLine, setCurrentLine] = useState("");
  const [cursor, setCursor] = useState({
    row: 0, //top-down
    col: 0, //left-right
  });
  const [editorSize, setEditorSize] = useState({
    width: 0,
    height: 0,
  });

  function moveCursor(rows, cols) {
    setCursor({
      row: cursor.row + rows,
      col: cursor.col + cols,
    })
  }

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
        setCurrentLine(currentLine.slice(0,-1))
        break
      case "Delete":
        break
      case "Space":
        if (buffer.slice(-1) === " "){
          setCurrentLine(currentLine + "\u00A0") // this breaks normal overflow
        } else {
          setCurrentLine(currentLine + event.key)
        }
        break
      case "Enter": // TODO: fix linebreaks and tabs in HTML (<p></p>)
        setCurrentLine(currentLine + "\u000D")
        break
      case "Tab":
        setCurrentLine(currentLine + "\u0009")
        break
      case "ArrowDown":
      case "ArrowUp":
        break
      case "ArrowRight":
        moveCursor(1, 0)
        break
      case "ArrowLeft":
        moveCursor(-1, 0)
        break
      case "Escape":
        break
      default:
        setCurrentLine(currentLine + event.key)
        moveCursor(event.key.length, 0)
    }

  }

  function getEditorSize() {
    var style = window.getComputedStyle(document.getElementById("Editor"), null);
    return {
      width: style.getPropertyValue("width"),
      height: style.getPropertyValue("height"),
    };
  }

  function updateBuffer() {
    setBuffer(
      buffer.slice(0,cursor.row)
        .concat([currentLine],
          buffer.slice(cursor.row+1))
    )
  }

  function renderBuffer() {
    console.log(cursor)
    console.log(currentLine.length, buffer.length)
    return (
      <>
        {currentLine.slice(0, cursor.row)}
        <span className="cursor" style={{
          background:"white",
          color: "white",
          width: "1em",
          zIndex: "-10", // TODO: make cursor blink in actual css
          }}>
          .
        </span>
        {currentLine.slice(cursor.row)}
      </>
    )
  }

  return (
    <div
      className="Editor" id="Editor" style={{
        padding: "5vh 5vw",
        width: "90vw",
        height: "90vh",
        color: "white",
        overflowWrap: "normal"
      }}
      onKeyDown={(e) => {
        // refreshScreen -- I believe useState does this automagically? Maybe.
        //setEditorSize(getEditorSize())
        // restrict cursor position to screen
        processKeypress(e)
        updateBuffer()
      }}
      tabIndex="0"
    >
      {renderBuffer()}
    </div>
  )
}

export default Editor
