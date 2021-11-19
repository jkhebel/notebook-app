import Entry from "./Entry";

const EntryList = ({ entries }) => {
  return (
    <ul>
      {entries.map((e) => (
        <Entry key={e.name} entry_name={e.name} />
      ))}
    </ul>
  );
};

export default EntryList;
