import { Button, Card, Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap";
import npmPackage from "../../package.json";
import CheckerDropdown, { all } from "./CheckerDropdown";
import { Priority, Status, Subteam, Task } from "../data/Types";
import { useState, useEffect} from "react";

export interface SearchQuery {
  name: string;
  project: string;
  status: string[];
  subteam: string[];
  assignee: string;
  priority: string[];
}

export const createSearchFilter = (search: Search) => {
  const searchQuery = search[0];
  return (task: Task) => (task.name.toLowerCase().includes(searchQuery.name.toLowerCase())
    && task.project.toLowerCase().includes(searchQuery.project.toLowerCase())
    && (searchQuery.status.includes(task.status) 
    && searchQuery.subteam.includes(task.subteam))
    && (task.assignees ?? []).join("|").toLowerCase().includes(searchQuery.assignee.toLowerCase())
    && searchQuery.priority.includes(task.priority ?? Priority.MID));
};

type SearchSetter = React.Dispatch<React.SetStateAction<SearchQuery>>;
type Search = [SearchQuery, SearchSetter];

const defaultSearch = (): SearchQuery => {
  return {
    name: "", 
    project: "", 
    status: [Status.NOT_STARTED, Status.IN_PROGRESS, Status.BLOCKED],
    subteam: all(Subteam),
    assignee: "",
    priority: all(Priority),
  }
};

export const useSearch = (update?: Function): Search => {
  const storedQueryJSON = localStorage.getItem("searchQuery");
  const storedQuery = storedQueryJSON === null ? defaultSearch() : JSON.parse(storedQueryJSON);
  const search = useState<SearchQuery>(storedQuery);

  useEffect(update ? () => update() : () => {}, [search[0]]);
  return search;
};

const SearchMenu = ({search}: {search: Search}) => {

  const [searchQuery, setSearchQuery] = search;

  const updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery({...searchQuery, [e.target.name]: e.target.value});
  };

  const setToDefault = (e: any) => {
    setSearchQuery(defaultSearch());
  }

  useEffect(() => {
    const storedSearchQuery = defaultSearch();
    storedSearchQuery.priority = searchQuery.priority;
    storedSearchQuery.subteam = searchQuery.subteam;
    storedSearchQuery.status = searchQuery.status;

    localStorage.setItem("searchQuery", JSON.stringify(storedSearchQuery));
  }, [searchQuery])

  return (
      <Container fluid>
        <Card className="bg-dark text-white">
          <Card.Header as="h6">Search Menu</Card.Header>
          <Card.Body>
            <Row>
              <Col sm={2}>      
                <Form.Group className="mb-3" controlId="search.name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control autoComplete="off" size="sm" type="text" onChange={updateSearchQuery} name="name" />
                </Form.Group>
              </Col>
              <Col sm={1}>      
                <Form.Group className="mb-3" controlId="search.project">
                  <Form.Label>Project</Form.Label>
                  <Form.Control autoComplete="off" size="sm" type="text" onChange={updateSearchQuery} name="project" />
                </Form.Group>
              </Col>

              <Col sm={1}> 
                <Form.Group className="" controlId="search.priority">
                  <Form.Label>Priority</Form.Label>
                  <CheckerDropdown options={Priority} size="sm" defaults={searchQuery.priority}
                      onChange={updateSearchQuery} name="priority" />
                </Form.Group> 
              </Col>

              <Col sm={1}> 
                <Form.Group className="" controlId="search.subteam">
                  <Form.Label>Subteam</Form.Label>
                  <CheckerDropdown options={Subteam} size="sm" defaults={searchQuery.subteam}
                      onChange={updateSearchQuery} name="subteam" />
                </Form.Group> 
              </Col>
              <Col sm={1}> 
                <Form.Group className="" controlId="search.status">
                  <Form.Label>Status</Form.Label>
                  <CheckerDropdown options={Status} size="sm"  defaults={searchQuery.status}
                      onChange={updateSearchQuery} name="status"/>
                </Form.Group> 
              </Col>
              <Col sm={1}>      
                <Form.Group className="mb-3" controlId="search.assignee">
                  <Form.Label>Assignee</Form.Label>
                  <Form.Control autoComplete="off" size="sm" type="text" onChange={updateSearchQuery} name="assignee" />
                </Form.Group>
              </Col>
              { true  ?
                (<Col sm={1}>      
                  <Form.Group className="mb-3" controlId="search.assignee">
                    <Form.Label className="invisible">12345678</Form.Label>
                    <Button className="w-60" variant="warning" size="sm" onClick={setToDefault}>Reset</Button>
                  </Form.Group>
                </Col>) : (<></>)
              }
            </Row>
          </Card.Body>
        </Card>

      </Container>

  );
};
export default SearchMenu;
