import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
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
  
  const populateTable = () => { getAllTasks().then(setTasks) };
  useEffect(() => populateTable(), [setTasks]);

  const [lines, setLines] = useState<JSX.Element[]>([]);

  const updateTable = () => setLines((tasks ?? []).filter(createSearchFilter(search)).map(
    (task, id) => <TaskLineItem task={task} key={id}></TaskLineItem>
  ));

  const search = useSearch(updateTable);

  useEffect(() => updateTable(), [tasks]);

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
      <SearchMenu search={search}/>
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
