const FileList = ({entries}) => {
  return (
    <ul id="fileList">
      {entries.map((e) => (
        <li key={e.name}>{e.name}</li>
      ))}
    </ul>
  );
};

export default FileList;
