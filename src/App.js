import "./App.css";
import Header from "./components/Header";
import EntryList from "./components/EntryList";
//import Note from "./components/Note";
import ReactEditor from "./components/ReactEditor"
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
  const [fileHandler, setFileHandler] = useState();
  const [content, setContent] = useState("");

  useEffect(() => {updateEntryList(directoryHandle, setEntryList)}, [directoryHandle])
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

  // return (
  //   <div className="App">
  //     <Editor text={""}/>
  //   </div>
  // );

  return (
    <div className="App">

      {/* bootstrap navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  File
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#" onClick={() => openLibrary(setDirectory)}>Open Library</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <Header title="Notable"/>
      {/* <button id='addToFolder' onClick={() => openLibrary(setDirectory)}>
        Choose Notebook Folder
      </button> */}
      <div className="Main">
        <EntryList entries={entryList} onClickEntry={setFileHandler} />
        {(() => {
          if (false) {
            return <ReactEditor input={fileHandler}/>;
          } else {
            return <textarea className="txtEditor MainSelected" defaultValue={content} />
          }
        })()}
      </div>
    </div>
  );
}

export default App;
