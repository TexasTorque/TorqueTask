import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { getAllTasks, updateTask } from "../firebase";
import { Priority, Status, Subteam, Task } from "../data/Types";
import SelectorDropdown from "../components/SelectorDropdown";
import CheckerDropdown, { all } from "../components/CheckerDropdown";
import SearchMenu, { SearchQuery, createSearchFilter, useSearch } from "../components/SearchMenu";

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

export default () => {
  const [tasks, setTasks] = useState<Task[]>();


 
  useEffect(() => populateTable(), [setTasks]);

  const populateTable = () => { getAllTasks().then(setTasks) };
  useEffect(() => populateTable(), [setTasks]);

  const [lines, setLines] = useState<JSX.Element[]>([]);


  const [sort, setSort] = useState<string>("identifier");
  const [backwards, setBackwards] = useState<boolean>(false);

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
    setLines((tasks ?? []).filter(createSearchFilter(search)).sort(sortFunctionBackwards).map((task, id) => {
      return <TaskLineItem task={task} key={id}></TaskLineItem>;
    }));

  const search = useSearch(updateTable);

  useEffect(() => updateTable(), [tasks, sort, backwards]);

  const replaceTask = (task: Task) => setTasks([
    ...(tasks ?? []).filter((t: Task) => t.identifier != task.identifier), task
  ]);

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
        <td style={{color: new Date(task.endDate) < new Date() ? "#FF726B" : "#FFFFFF"}}>{dateConvert(task.endDate)}</td>
      </tr>
    );
  };

  const updateSortField = (e: any) => {
    console.log(e);
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
      <Header fluid/>
      <SearchMenu search={search}/>
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
