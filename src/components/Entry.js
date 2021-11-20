function Entry({ entry, onClickEntry }) {
  async function getText(entry) {
    const file = await entry.getFile();
    const text = await file.text();
    return text;
  }
  return (
    <li
      onClick={async () => {
        const text = await getText(entry);
        onClickEntry(text);
      }}
    >
      {entry.name}
    </li>
  );
}

export default Entry;
