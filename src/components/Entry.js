function Entry({ entry, onClickEntry }) {
  return (
    <li
      id={entry.name}
      onClick={async () => {
        onClickEntry(entry);
        document.querySelectorAll(".file-item").forEach((el) => {
          el.classList.remove("active");
          if (entry.name === el.id) {
            el.classList.add("active");
          }
        });
      }}
      className="list-group-item list-group-item-action file-item"
    >
      {entry.name}
    </li>
  );
}

export default Entry;
