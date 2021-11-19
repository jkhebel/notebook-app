import Header from "./components/Header";
import FileList from "./components/EntryList";
import React, { useEffect, useState } from 'react';


function check_file_APIs() { // function to check if browser can handle local file API
  if (window.File && window.FileReader && window.FileList && window.Blob && window.showDirectoryPicker) {
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

async function updateFileList(directoryHandle, setFileList) {
  try {
    const arr = []
    for await(const e of directoryHandle.values()) arr.push(e);
    setFileList(arr)
  } catch(e) {
    if (directoryHandle) {
      console.log(e);
    }
  }
}


check_file_APIs()

function App() {
  const [directoryHandle, setDirectory] = useState(null);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {updateFileList(directoryHandle, setFileList)}, [directoryHandle])

  return (
    <div className="container">
      <Header title="Notebook"/>
      <button id='addToFolder' onClick={() => openLibrary(setDirectory)}>
        Choose Notebook Folder
      </button>
      <FileList entries={fileList}/>
    </div>
  );
}

export default App;
