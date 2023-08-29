import { Container, Nav, Navbar, Table } from "react-bootstrap";

import TorqueLogo from "../imgs/TorqueLogo.png";

import TaskList from "../components/TaskList";
export default () => {
  return (
    <div className="main">
      <Navbar className="black-bg">
        <Navbar.Brand className="" href="#home"><img className="torque-logo" src={TorqueLogo}></img></Navbar.Brand>
        <Navbar.Brand className="" href="#home"><h1 className="title">Torque Task</h1></Navbar.Brand>
          {/* <Nav className="me-auto"> */}
            {/* <Nav.Link href="#home"><p>Link</p></Nav.Link> */}
          {/* </Nav> */}
      </Navbar>
      <TaskList/>
    </div>
  );
};
