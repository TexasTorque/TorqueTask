import {ReactElement, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TorqueLogo from "../imgs/TorqueLogo.png";
import { getAllTasks } from "../firebase";
// import { Task } from "../../../src/types";
import { Task } from "../data/Types";
import TaskLineItem from "./TaskLineItem";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    getAllTasks().then(tasks => setTasks(tasks));
  }, []);

  return (
    <div>
      <Table striped bordered hover variant="dark" size="sm">
        {/* <thead>
          <tr>
          </tr>
        </thead> */}
        <tbody>
          {
            tasks?.map(task => {
              return <TaskLineItem task={task}></TaskLineItem>
            })
          }
         
        </tbody>
      </Table>
    </div>
  );
}
export default TaskList;
