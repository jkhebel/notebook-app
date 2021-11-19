import Header from "./components/Header";
import React, { useEffect } from 'react';


function check_file_APIs() { // function to check if browser can handle local file API
  if (window.File && window.FileReader && window.FileList && window.Blob && window.showDirectoryPicker) {
    // Great success! All the File APIs are supported.
    console.log("File APIs are supported!")
  } else {
    console.log('The File APIs are not fully supported in this browser.');
  }
}

check_file_APIs()

function App() {
  useEffect(() => {
    let directory; // window.showDirectoryPicker must be attached to a user event
    document.getElementById('addToFolder').addEventListener('click', async () => {
        try {
            directory = await window.showDirectoryPicker();
            let fileList = document.getElementById('fileList');
            fileList.innerHTML = '';
            for await (const entry of directory.values()) {
                console.log(entry);
                let item = document.createElement('li');
                item.innerHTML = `<strong>${entry.name}</strong> - ${entry.kind}`;
                fileList.append(item);
            }
        } catch(e) {
            console.log(e);
        }
    });
  });
  return (
    <div className="container">
      <Header title="Notebook"/>
      <button id='addToFolder'>
        Choose Notebook Folder
      </button>
      <ul id="fileList"></ul>
    </div>
  );
}

export default App;
