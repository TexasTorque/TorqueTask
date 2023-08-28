import { Table } from "react-bootstrap";
import TorqueLogo from "../imgs/TorqueLogo.png";
import { Task } from '../../../src/types'
import { ReactElement } from "react";

const TaskLineItem = ({ task }: {task: Task}) => {

  const mapCells = (task: Task): ReactElement[] => {
    const lines: ReactElement[] = [];
    for (const key in task) {
      lines.push(<td>task[key as keyof Task]</td>);
    }
    return lines;
  }

  return (
    <div className="header-border-box">
      <tr>
        {mapCells(task).map(cell => cell)} 
      </tr>
    </div>


  );
}
export default TaskLineItem;
