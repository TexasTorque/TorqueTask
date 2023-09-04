import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { getAllTasks } from "../firebase";
import { Task } from "../data/Types";
import SelectorDropdown from "../components/SelectorDropdown";

const TaskLineItem = ({ task }: { task: Task }) => {
  return (
    <tr>
      <td>
        <a href={"/task/" + task.identifier}>{task.identifier}</a>
      </td>
      <td>{task.name}</td>
      <td>{task.project}</td>
      <td>{task.details}</td>
      <td>
        <SelectorDropdown
          options={{}}
          defaultValue={task.status}
          size="sm"
          onChange={(_: any) => _}
          name="subteam"
          disabled
        />
      </td>
      <td>
        <SelectorDropdown
          options={{}}
          defaultValue={task.subteam}
          size="sm"
          onChange={(_: any) => _}
          disabled
          name="subteam"
        />
      </td>
      <td>{task.startDate}</td>
      <td>{task.endDate}</td>
    </tr>
  );
};

interface SearchQuery {
  name: string;
  project: string;
}

export default () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({name: "", project: ""});
  
  const updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setSearchQuery({...searchQuery, [e.target.name]: e.target.value});
  }

  const searchFilter = (task: Task) => task.name.toLowerCase().includes(searchQuery.name.toLowerCase())
    && task.project.toLowerCase().includes(searchQuery.project.toLowerCase());

  useEffect(() => {
    getAllTasks().then(setTasks);
  }, [setTasks]);

  return (
    <>
      <Header fluid/>

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
              <Col sm={2}>      
                <Form.Group className="mb-3" controlId="search.project">
                  <Form.Label>Project</Form.Label>
                  <Form.Control autoComplete="off" size="sm" type="text" onChange={updateSearchQuery} name="project" />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

      </Container>
      <br></br>
      <Container fluid>
        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <tr>
              <th style={{minWidth: "5rem"}}>Task ID</th>
              <th>Task Name</th>
              <th>Project</th>
              <th style={{maxWidth: "10rem"}}>Details</th>
              <th>Status</th>
              <th>Subteam</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.filter(searchFilter).map((task, id) => {
              return <TaskLineItem task={task} key={id}></TaskLineItem>;
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
