import React, { useState } from 'react';

function Editor() {
  // state vaariables
  const [buffer, setBuffer] = useState([""]); // store raw string in a buffer
  const [currentLine, setCurrentLine] = useState("lorem ipsum"); // only modify current line
  const [cursor, setCursor] = useState({ // store cursor position
    row: 0, //top-down
    col: 0, //left-right
  });
  const [editorSize, setEditorSize] = useState({ // store window size
    width: 0,
    height: 0,
  });

  function moveCursor(addRows, addCols) {
    // quick setter to move cursor
    let newRow = cursor.row + addRows
    let newCol = cursor.col + addCols

    // prevent cursor from leaving scope of buffer
    newCol = newCol > currentLine.length ? currentLine.length : newCol
    newCol = newCol < 0 ? 0 : newCol
    newRow = newRow > buffer.length ? buffer.length : newRow
    newRow = newRow < 0 ? 0 : newRow

    // set new cursor position
    setCursor({
      row: newRow,
      col: newCol,
    })
  }

  function addAtCursor(text) {
    // function to add text at cursor point on current line
    setCurrentLine(
      currentLine.slice(0,cursor.col)
        + text // insert text at cursor point
        + currentLine.slice(cursor.col)
    )
    // update cursor position
    moveCursor(0, text.length)
  }

  function deleteAtCursor() {
    // move cursor length of char first
    moveCursor(0, -currentLine[cursor.col-1].length)
    setCurrentLine( // slice out char
      currentLine.slice(0, cursor.col - 1)
      + currentLine.slice(cursor.col)
    )

  }

  async function processKeypress(event) {
    // reads keypress and decides what to do
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
      case "Delete":
      case "Backspace":
        deleteAtCursor()
        break
      case "Space":
        if (currentLine[cursor.col] === " "){
          addAtCursor("\u00A0") // TODO: this breaks normal overflow?
        } else {
          addAtCursor(event.key)
        }
        break
      case "Enter": // TODO: fix linebreaks and tabs in HTML (<p></p>)
        addAtCursor("\u000D")
        break
      case "Tab":
        addAtCursor("\u0009") // TODO: tabs are no bueno?
        break
      case "ArrowDown":
      case "ArrowUp":
        break
      case "ArrowRight":
        moveCursor(0, 1)
        break
      case "ArrowLeft":
        moveCursor(0, -1)
        break
      case "Escape":
        break
      default:
        addAtCursor(event.key)
    }

  }

  function getEditorSize() {
    // get the editor div and compute it's size
    var style = window.getComputedStyle(
      document.getElementById("Editor"), null
    );
    return {
      width: style.getPropertyValue("width"),
      height: style.getPropertyValue("height"),
    };
  }

  function updateBufferAtCurrentLine() {
    // update the buffer at the current line
    setBuffer(
      buffer.slice(0,cursor.row)
        .concat([currentLine], // replace old line with new line
          buffer.slice(cursor.row+1))
    )
  }

  function renderBuffer() {
    return ( // TODO: make it show multiple lines
      <>
        {currentLine.slice(0, cursor.col)}
        <span className="cursor"
          style={{ // temporary inline style
            background:"white",
            color: "white",
            width: "1em",
            zIndex: "-10", // TODO: make cursor blink in actual css
            }}>
          .
        </span>
        {currentLine.slice(cursor.col)}
      </>
    )
  }

  return (
    <div
      className="Editor" id="Editor"
      style={{ // temporary inline styles
        padding: "5vh 5vw",
        width: "90vw",
        height: "90vh",
        color: "white",
        overflowWrap: "normal"
      }}
      onKeyDown={(e) => { // run every time a key is pressed
        // refreshScreen -- I believe useState does this automagically? Maybe.
        //setEditorSize(getEditorSize())
        // restrict cursor position to screen
        processKeypress(e)
        updateBufferAtCurrentLine()
      }}
      tabIndex="0"
    >
      {renderBuffer()}
    </div>
  )
}

export default Editor
