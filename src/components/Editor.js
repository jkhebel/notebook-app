import React, { useState } from 'react';

function Editor() {
  const [buffer, setBuffer] = useState("");

  async function main(event) {
    event.preventDefault()
    switch (event.code) {
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
      case "Enter":
        setBuffer(buffer + "\u000D")
        break
      case "Tab":
        setBuffer(buffer + "\u0009")
        break
      case "ArrowDown":
      case "ArrowUp":
      case "ArrowRight":
      case "ArrowLeft":
        break
      default:
        setBuffer(buffer + event.key)
    }
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
      onKeyDown={(e) => main(e)}
      tabIndex="0"
    >
      {buffer}
    </div>
  )
}

export default Editor
