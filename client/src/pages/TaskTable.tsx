import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { getAllTasks, updateTask } from "../firebase";
import { Priority, Status, Subteam, Task } from "../data/Types";
import SelectorDropdown from "../components/SelectorDropdown";
import CheckerDropdown, { all } from "../components/CheckerDropdown";

const dateConvert = (s: string): string => {
  const d = new Date(s);
  return "" + (d.getMonth() + 1) + "/" + d.getDate() + "/" + ("" + d.getFullYear()).substring(2);
}

export const listConvert = (l: string[], m: number): string => {
  m -= 3;
  if (l.length <= 0) return "";
  const full = l.join(", ");
  if (full.length <= m) return full;
  const part = full.substring(0, m + 1);
  const i = part.lastIndexOf(", ");
  return part.substring(0, i) + "...";
}

interface SearchQuery {
  name: string;
  project: string;
  status: string[];
  subteam: string[];
  assignee: string;
  priority: string[];
}

export default () => {
  const [tasks, setTasks] = useState<Task[]>();

  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    name: "", 
    project: "", 
    status: [Status.NOT_STARTED, Status.IN_PROGRESS, Status.BLOCKED], 
    subteam: all(Subteam),
    assignee: "",
    priority: all(Priority),
  });

  const updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery({...searchQuery, [e.target.name]: e.target.value});
  };

  const searchFilter = (task: Task) => true
    && task.name.toLowerCase().includes(searchQuery.name.toLowerCase())
    && task.project.toLowerCase().includes(searchQuery.project.toLowerCase())
    && (searchQuery.status.includes(task.status) 
    && searchQuery.subteam.includes(task.subteam))
    && (task.assignees ?? []).join("|").toLowerCase().includes(searchQuery.assignee.toLowerCase())
    && searchQuery.priority.includes(task.priority ?? Priority.MID);

  useEffect(() => populateTable(), [setTasks]);
    
  const populateTable = () => { getAllTasks().then(setTasks) };

  const [lines, setLines] = useState<JSX.Element[]>([]);

  useEffect(() =>  updateTable() , [tasks]);
  useEffect(() =>  updateTable() , [searchQuery]);

  const updateTable = () => setLines((tasks ?? []).filter(searchFilter).map((task, id) => {
    return <TaskLineItem task={task} key={id}></TaskLineItem>;
  }));

  const replaceTask = (task: Task) => {
    setTasks([
      ...(tasks ?? []).filter((t: Task) => t.identifier != task.identifier), task
    ]);
  }

  const TaskLineItem = ({ task }: { task: Task }) => {
    return (
      <tr>
        <td>
          <a href={"/task/" + task.identifier}>{task.identifier}</a>
        </td>
        <td>{task.name}</td>
        <td>{task.project}</td>
        <td>
          <SelectorDropdown
            options={{}}
            defaultValue={task.priority ?? Priority.MID}
            size="sm"
            onChange={(_: any) => _}
            disabled
            name="priority"
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
        <td>
          <SelectorDropdown
            options={{0: Status.NOT_STARTED, 1: Status.IN_PROGRESS, 2: Status.BLOCKED, 3: Status.COMPLETED}}
            defaultValue={task.status}
            noArrow
            size="sm"
            onChange={(e: any) => {
              task.status = e.target.value;
              updateTask(task);
              replaceTask(task);
              // populateTable();
            }}
            name="status"
          />
        </td>
    
        <td>{listConvert(task.assignees ?? [], 25)}</td>
        <td>{dateConvert(task.startDate)}</td>
        <td>{dateConvert(task.endDate)}</td>
      </tr>
    );
  };


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
              <th>Priority</th>
              <th>Subteam</th>
              <th>Status</th>
              <th>Assignees</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>{lines}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
