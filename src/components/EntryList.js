import Entry from "./Entry";

const EntryList = ({ entries, onClickEntry }) => {
  return (
    <div className="MainList">
      <ul>
        {entries.map((e) => (
          <Entry key={e.name} entry={e} onClickEntry={onClickEntry} />
        ))}
      </ul>
    </div>
  );
};

export default EntryList;
