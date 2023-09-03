import { Button, Container, Nav, Navbar } from "react-bootstrap";

const Header = ({
  fluid,
  setSearchQuery,
}: {
  fluid?: boolean;
  setSearchQuery?: (searchQuery: string) => void;
}) => {
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
          <Nav.Link href="/docs">
            <Nav.Link href="/docs">Help</Nav.Link>
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
        {typeof setSearchQuery === "function" ? (
          <div className="">
            <input
              type="text"
              placeholder="Search"
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
            />
          </div>
        ) : (
          <></>
        )}
      </Container>
    </Navbar>
  );
};
export default Header;
