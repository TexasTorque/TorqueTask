import {useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TorqueLogo from "../imgs/TorqueLogo.png";
import { getTasks } from "../firebase";
// import { Task } from "../../../src/types";
import { Task } from "../../../src/types";
import TaskLineItem from "./TaskLineItem";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    getTasks().then(tasks => setTasks(tasks));
  });
  
  return (
    <div className="header-border-box">
      <Table striped>
        <thead>
          <tr>
           
          </tr>
        </thead>
        <tbody>
          {
            tasks.map(task => {
              return <TaskLineItem task={task}></TaskLineItem>
            })
          }
         
        </tbody>
      </Table>
    </div>


  );
}
export default TaskList;
