import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import TorqueLogo from "../imgs/TorqueLogo.png";

const Header = ({fluid}: {fluid?: boolean}) => {
  return (
      <Navbar className="med-gray-bg">
        <Container fluid={fluid ?? false}>
        <Row>
          <Col sm={1}>
            <br></br>
            <Navbar.Brand className="" href="/"><img className="torque-logo" src={TorqueLogo}></img></Navbar.Brand>
          </Col>
          <Col sm={6}>
            <br></br>
            <Navbar.Brand className="" href="/"><h1 className="title">Torque Task</h1></Navbar.Brand>
          </Col>
          <Col sm={5}>
            <br></br>
            <Navbar.Brand>
              <Button variant="success" size="lg" onClick={e => window.location.href = "/task/new"}>NEW TASK</Button>
            </Navbar.Brand>
          </Col>
        </Row>
        </Container>
      </Navbar>
  );
}
export default Header;
