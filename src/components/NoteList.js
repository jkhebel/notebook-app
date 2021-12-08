import { ListGroup } from "react-bootstrap";

const NoteList = ({ entries, onClickEntry }) => {
  return (
    <ListGroup as="ol" numbered variant="flush" className="NoteList">
      {entries.map((e, i) => (
        <ListGroup.Item
          action
          as="li"
          className="d-flex justify-content-between align-items-start"
          onClick={() => onClickEntry(e)}
          href={"#" + i}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">
              {e.name}
            </div>
            File contents here
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default NoteList;
