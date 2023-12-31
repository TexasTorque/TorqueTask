import { Button, Container, Nav, Navbar } from "react-bootstrap";
import npmPackage from "../../package.json";

const Header = ({fluid}: {fluid?: boolean}) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="header">
      <Container fluid>
        <Navbar.Brand href="/" className="branding">
          Torque Task
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/table">
            <Nav.Link href="/table">Table</Nav.Link>
          </Nav.Link>
          <Nav.Link href="/gantt">
            <Nav.Link href="/gantt">Gantt</Nav.Link>
          </Nav.Link>
          <Nav.Item className="nav-btn">
            <Button
              variant="success"
              size="sm"
              onClick={(e) => (window.location.href = "/new")}
            >
              New Task
            </Button>
          </Nav.Item>
        </Nav>
        <Navbar.Text className="npm-version">{`v. ${npmPackage.version}`}</Navbar.Text>
      </Container>
    </Navbar>
  );
};
export default Header;
