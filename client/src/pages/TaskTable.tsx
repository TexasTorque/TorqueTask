import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
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

  const [sort, setSort] = useState<string>("identifier");
  const [backwards, setBackwards] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    name: "",
    project: "",
    status: [Status.NOT_STARTED, Status.IN_PROGRESS, Status.BLOCKED],
    subteam: all(Subteam),
    assignee: "",
    priority: all(Priority),
  });

  const updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
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

  useEffect(() => updateTable(), [tasks, searchQuery, sort, backwards]);

  const idInt = (t: Task): number => parseInt(t.identifier.replace("TORQ-", ""));

  const priorityLevels = {
    [Priority.HIGHEST]: 1,
    [Priority.HIGH]: 2,
    [Priority.MID]: 3,
    [Priority.LOW]: 4,
    [Priority.LOWEST]: 5,
  };

  const priorityLevel = (p: Priority) => priorityLevels[p ?? Priority.MID];

  const sortFunction = (a: Task, b: Task): number => {
    if (sort == "identifier")
      return idInt(a) - idInt(b);
    const av = a[sort as keyof Task];
    const bv = b[sort as keyof Task];

    if (sort.includes("Date"))
      return (new Date(av as string)).getTime() - (new Date(bv as string)).getTime();

    if (sort == "priority")
      return priorityLevel(a.priority) - priorityLevel(b.priority);

    if (sort == "assignees")
      // return (av ?? []).length - (bv ?? []).length; 
      return (av ?? [""])[0].localeCompare((bv ?? [""])[0]);


    return (av as string).localeCompare(bv as string);
  }

  const sortFunctionBackwards = (a: Task, b: Task): number => backwards ? -sortFunction(a, b) : sortFunction(a, b);

  const updateTable = () =>
    setLines((tasks ?? []).filter(searchFilter).sort(sortFunctionBackwards).map((task, id) => {
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
            options={{ 0: Status.NOT_STARTED, 1: Status.IN_PROGRESS, 2: Status.BLOCKED, 3: Status.COMPLETED }}
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

  const updateSortField = (e: any) => {
    const f = e.target.name;
    if (f === sort) {
      setBackwards(!backwards);
    } else {
      setSort(e.target.name);
      setBackwards(false);
    }
  }

  const sortColor = (f: string) => f === sort ? (backwards ? "danger" : "success") : "secondary";
  const sortSymbol = (f: string) => backwards && f === sort ? "▼" : "▲";

  const ColHead = ({ name, field, width }: { name: string, field: string, width?: string }) => (
    <th style={{width: width}} className="col-head">
      {name} &nbsp; &nbsp;
      <Button variant={sortColor(field)} size="sm" className="sort-btn" onClick={updateSortField} name={field}>{sortSymbol(field)}</Button>
    </th>
    );

  return (
    <>
      <Header fluid />
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
                  <CheckerDropdown options={Status} size="sm" defaults={searchQuery.status}
                    onChange={updateSearchQuery} name="status" />
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
              <ColHead name={"Task ID"} field={"identifier"} width="8rem"/>
              <ColHead name={"Task Name"} field={"name"}/>
              <ColHead name={"Project"} field={"project"}/>
              <ColHead name={"Priority"} field={"priority"}/>
              <ColHead name={"Subteam"} field={"subteam"}/>
              <ColHead name={"Status"} field={"status"}/>
              <ColHead name={"Assignees"} field={"assignees"}/>
              <ColHead name={"Start"} field={"startDate"}/>
              <ColHead name={"End"} field={"endDate"}/>
            </tr>
          </thead>
          <tbody>{lines}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
