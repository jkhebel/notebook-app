import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

async function openLibrary(setDirectory) {
  try {
    setDirectory(await window.showDirectoryPicker());
  } catch (e) {
    console.log(e);
  }
}

function Menubar({ setDirectory }) {
  return (
    <Navbar expand={true} className="Nav" bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="File" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => openLibrary(setDirectory)}>
                Open Library
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menubar;
