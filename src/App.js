import "./App.css";
import Menubar from "./components/Menubar";
import NoteList from "./components/NoteList";
import ReactEditor from "./components/ReactEditor"
import React, { useEffect, useState } from 'react';


import { Container} from "react-bootstrap";


function check_file_APIs() { // function to check if browser can handle local file API
  if (window.File && window.FileReader && window.EntryList && window.Blob && window.showDirectoryPicker) {
    // Great success! All the File APIs are supported.
    console.log("File APIs are supported!")
  } else {
    console.log('The File APIs are not fully supported in this browser.');
  }
}

async function updateNoteList(directoryHandle, setEntryList) {
  try {
    const arr = []
    for await(const e of directoryHandle.values()) arr.push(e);
    setEntryList(arr)
  } catch(e) {
    if (directoryHandle) {
      console.log(e);
    }
  }
}


check_file_APIs()

function App() {
  const [directoryHandle, setDirectory] = useState(null);
  const [entryList, setEntryList] = useState([]);
  const [fileHandler, setFileHandler] = useState();
  const [content, setContent] = useState("");

  useEffect(() => {
    updateNoteList(directoryHandle, setEntryList)
  }, [directoryHandle])
  useEffect(() => {
    async function getText(handler) {
      try {
        const file = await handler.getFile()
        const text = await file.text()
        setContent(text)
      } catch (err) {
        setContent("")
      }
    }
    getText(fileHandler)
  }, [fileHandler])

  return (
    <div className="App">
      <Menubar
        setDirectory={setDirectory}
      />
      <Container fluid className="Main">
        <NoteList
          entries={entryList}
          onClickEntry={setFileHandler}
        />
        <ReactEditor input={fileHandler}/>
      </Container>
    </div>
  );
}

export default App;
