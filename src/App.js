import "./App.css";
import Header from "./components/Header";
import EntryList from "./components/EntryList";
import Note from "./components/Note";
import React, { useEffect, useState } from 'react';


function check_file_APIs() { // function to check if browser can handle local file API
  if (window.File && window.FileReader && window.EntryList && window.Blob && window.showDirectoryPicker) {
    // Great success! All the File APIs are supported.
    console.log("File APIs are supported!")
  } else {
    console.log('The File APIs are not fully supported in this browser.');
  }
}

async function openLibrary(setDirectory) {
        try {
            setDirectory(await window.showDirectoryPicker());
        } catch(e) {
            console.log(e);
        }
    };

async function updateEntryList(directoryHandle, setEntryList) {
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
  const [noteContent, setNoteContent] = useState();

  useEffect(() => {updateEntryList(directoryHandle, setEntryList)}, [directoryHandle])

  return (
    <div className="App">
      <Header title="Notebook"/>
      <button id='addToFolder' onClick={() => openLibrary(setDirectory)}>
        Choose Notebook Folder
      </button>
      <div className="Main">
        <EntryList entries={entryList} onClickEntry={setNoteContent} />
        <Note text={noteContent} />
      </div>
    </div>
  );
}

export default App;
