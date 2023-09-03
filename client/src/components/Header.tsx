import { Button, Col, Container, Form, Nav, NavDropdown, Navbar, Offcanvas, Row } from "react-bootstrap";
import TorqueLogo from "../imgs/TorqueLogo.png";

const Header = ({ fluid }: { fluid?: boolean }) => {

  return (
    // <Navbar className="med-gray-bg">

    //   <Navbar.Brand className="" href="/"><img className="torque-logo" src={TorqueLogo}></img></Navbar.Brand>

    //   <Navbar.Brand className="" href="/"><h1 className="title">Torque Task</h1></Navbar.Brand>

    //   <Navbar.
    //     {/* <Button variant="success" size={undefined} onClick={e => window.location.href = "/task/new"}>New Task</Button> */}
    //     <a href="/task/new">Create New Task</a>
    //   </Navbar.Text>

    //   {/* <Button variant="success" size={undefined} onClick={e => window.location.href = "/task/new"}>NEW TASK</Button> */}
    // </Navbar>

    <Navbar bg="dark" data-bs-theme="dark" className="header">
      <Container fluid>
        <Navbar.Brand href="/" className=".use-market-deco">Torque Task</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>

    
  );


}
export default Header;
