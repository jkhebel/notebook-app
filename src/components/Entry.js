function Entry({ entry, onClickEntry }) {
  return (
    <li
      onClick={async () => {
        onClickEntry(entry);
      }}
    >
      {entry.name}
    </li>
  );
}

export default Entry;
