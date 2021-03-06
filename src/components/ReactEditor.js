/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from "react";

function Line({ text }) {
  // line component
  return <p className="line">{text}</p>;
}

function CurrentLine({ text, pos, focused }) {
  return (
    <p className="line cursorLine">
      {text.slice(0, pos)}
      {focused ? <span className="cursor"> </span> : ""}
      {text.slice(pos)}
    </p>
  );
}

function ReactEditor({ input = null }) {
  // state vaariables
  const [fileHandler, setFileHandler] = useState(input); // store file handler
  const [file, setFile] = useState(null); // store file in a buffer
  const [buffer, setBuffer] = useState([]); // store raw string in a buffer
  const [currentLine, setCurrentLine] = useState(""); // only modify current line
  const [cursor, setCursor] = useState({
    // store cursor position
    row: 0, //top->down
    col: 0, //left->right
  });
  const [editorSize, setEditorSize] = useState({
    // store window size
    width: 0,
    height: 0,
  });

  const [focused, setFocused] = React.useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  function moveCursor(addRows, addCols, maxRows, maxCols) {
    // quick setter to move cursor
    maxRows = maxRows || buffer.length - 1;
    maxCols = maxCols || currentLine.length;
    // calculate new cursor positions
    let newRow = cursor.row + addRows;
    let newCol = cursor.col + addCols;
    // prevent cursor from exceeding scope of buffer
    newCol = newCol > maxCols ? maxCols : newCol;
    newRow = newRow > maxRows ? maxRows : newRow;
    // prevent cursor from moving below scope of buffer
    newCol = newCol < 0 ? 0 : newCol;
    newRow = newRow < 0 ? 0 : newRow;
    // set new cursor position
    setCursor({ row: newRow, col: newCol });
  }

  function addAtCursor(text) {
    // function to add text at cursor point on current line
    setCurrentLine(
      currentLine.slice(0, cursor.col) +
        text + // insert text at cursor point
        currentLine.slice(cursor.col)
    );
    // update cursor position
    moveCursor(0, text.length, buffer.length - 1, currentLine.length + 1);
  }

  function deleteAtCursor() {
    if (currentLine === "" || cursor.col === 0) {
      // delete line break if not first line
      if (cursor.row > 0) {
        const lineAbove = buffer[cursor.row - 1];
        const newLine = lineAbove + currentLine;
        setBuffer(
          buffer
            .slice(0, cursor.row - 1)
            .concat([newLine], buffer.slice(cursor.row + 1))
        );
        moveCursor(-1, lineAbove.length);
      }
    } else {
      const len = currentLine[cursor.col - 1].length; // get length of char
      setCurrentLine(
        // slice out char
        currentLine.slice(0, cursor.col - 1) + currentLine.slice(cursor.col)
      );
      moveCursor(0, -len); //update cursor
    }
  }

  function insertLineBreakAtCursor() {
    const lineAbove = currentLine.slice(0, cursor.col);
    const newLine = currentLine.slice(cursor.col);
    setBuffer(
      buffer
        .slice(0, cursor.row)
        .concat([lineAbove], [newLine], buffer.slice(cursor.row + 1))
    );
    setCurrentLine(newLine);
    moveCursor(1, -cursor.col, buffer.length);
  }

  async function processKeypress(event) {
    // reads keypress and decides what to do
    if (!event.metaKey) {
      event.preventDefault();
    }
    switch (event.code) {
      // TODO: put control keys up here
      // use event.ctrlKey, event.metaKey, event.altKey etc
      // to check what is all held down
      case "CapsLock":
      case "ShiftLeft":
      case "ShiftRight":
        break;
      case "ControlLeft":
      case "ControlRight":
        break;
      case "AltLeft":
      case "AltRight":
        break;
      case "MetaLeft":
      case "MetaRight":
        break;
      case "Delete":
      case "Backspace":
        deleteAtCursor();
        break;
      case "Space":
        if (currentLine[cursor.col] === " ") {
          addAtCursor("\u00A0"); // TODO: this breaks normal overflow?
        } else {
          addAtCursor(event.key);
        }
        break;
      case "Enter":
        insertLineBreakAtCursor();
        break;
      case "Tab":
        addAtCursor("\u0009"); // TODO: tabs are no bueno?
        break;
      case "ArrowDown":
        moveCursor(1, 0);
        break;
      case "ArrowUp":
        moveCursor(-1, 0);
        break;
      case "ArrowRight":
        moveCursor(0, 1);
        break;
      case "ArrowLeft":
        moveCursor(0, -1);
        break;
      case "Escape":
        break;
      default:
        addAtCursor(event.key);
    }
  }

  function updateBufferAtCurrentLine() {
    // update the buffer at the current line
    setBuffer(
      buffer.map((line, idx) => {
        if (idx === cursor.row) {
          return currentLine;
        } else return line;
      })
    );
  }

  function renderBuffer() {
    return (
      <>
        {buffer.map((line, idx) => {
          if (idx === cursor.row) {
            return <CurrentLine
              key={idx} text={line} pos={cursor.col} focused={focused}
            />;
          } else {
            return <Line key={idx} text={line} />;
          }
        })}
      </>
    );
  }

  // when current line state changes, update buffer state
  useEffect(() => {
    setFileHandler(input);
  }, [input]);
  // load file from props on start
  useEffect(async () => {
    try {
      setFile(await fileHandler.getFile());
    } catch (e) {
      console.log(e);
    }
  }, [fileHandler]);
  // update the buffer when the file changes
  useEffect(async () => {
    try {
      setBuffer((await file.text()).split("\n"));
    } catch (err) {
      console.log(err);
    }
  }, [file]);

  useEffect(updateBufferAtCurrentLine, [currentLine]);
  // when cursor row changes, switch current line
  useEffect(() => {
    setCurrentLine(buffer[cursor.row]);
  }, [cursor.row, buffer]);

  // update editorSize state on resize
  useLayoutEffect(() => {
    function updateSize() {
      setEditorSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <pre
      className="Editor"
      id="Editor"
      onKeyDown={(e) => {
        processKeypress(e);
      }}
      tabIndex="0"
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {renderBuffer()}
    </pre>
  );
}

export default ReactEditor;

// TODO: State is getting effed up. Buffer is behind, so it's updating itself with an older version of itself.
