import { Navbar } from "react-bootstrap";
import TorqueLogo from "../imgs/TorqueLogo.png";

const Header = () => {
  return (
    <Navbar className="black-bg">
      <Navbar.Brand className="" href="#home"><img className="torque-logo" src={TorqueLogo}></img></Navbar.Brand>
      <Navbar.Brand className="" href="#home"><h1 className="title">Torque Task</h1></Navbar.Brand>
        {/* <Nav className="me-auto"> */}
          {/* <Nav.Link href="#home"><p>Link</p></Nav.Link> */}
        {/* </Nav> */}
      </Navbar>
  );
}
export default Header;
