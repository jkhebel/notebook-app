import Entry from "./Entry";

const EntryList = ({ entries, onClickEntry }) => {
  return (
    <ul>
      {entries.map((e) => (
        <Entry key={e.name} entry={e} onClickEntry={onClickEntry} />
      ))}
    </ul>
  );
};

export default EntryList;
