import Entry from "./Entry";

const EntryList = ({ entries, onClickEntry }) => {
  return (
    <div className="MainList list-group list-group-flush list-group-numbered">
      {entries.map((e) => (
        <Entry key={e.name} entry={e} onClickEntry={onClickEntry} />
      ))}
    </div>
  );
};

export default EntryList;
