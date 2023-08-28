import { Container, Nav, Navbar, Table } from "react-bootstrap";

import Header from "../components/Header";
import TaskList from "../components/TaskList";
export default () => {
  return (
    <div className="main">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home"><p>Link</p></Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <TaskList/>
    </div>
  );
};
