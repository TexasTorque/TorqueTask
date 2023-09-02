
import Header from "../components/Header";

import {ReactElement, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import TorqueLogo from "../imgs/TorqueLogo.png";
import { getAllTasks } from "../firebase";
// import { Task } from "../../../src/types";
import { Status, Subteam, Task } from "../data/Types";
import SelectorDropdown from "../components/SelectorDropdown";

const TaskLineItem = ({ task }: {task: Task}) => {
  return (
    <tr>
      <td><a href={"/task/" + task.identifier}>{task.identifier}</a></td>
      <td>{task.name}</td>
      <td>{task.project}</td>
      <td>{task.details}</td>
      <td>
        <SelectorDropdown options={{}} defaultValue={task.status} size="sm" 
                    onChange={(_: any) => _} name="subteam" disabled/>
      </td>
      <td>
        <SelectorDropdown options={{}} defaultValue={task.subteam} size="sm" 
                    onChange={(_: any) => _} disabled name="subteam"/>
      </td>
      <td>{task.startDate}</td>
      <td>{task.endDate}</td>
    </tr>
  );
};

export default () => {
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    getAllTasks().then(setTasks);
  }, [setTasks]);

  return (
    <>
      <Header fluid/>
      <Container fluid >
        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Project</th>
              <th>Details</th>
              <th>Status</th>
              <th>Subteam</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {
              tasks?.map(task => {
                return <TaskLineItem task={task}></TaskLineItem>
              })
            }
          
          </tbody>
        </Table>
      </Container>
    </>
  );
}
