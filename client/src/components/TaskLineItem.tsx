import { Table } from "react-bootstrap";
import TorqueLogo from "../imgs/TorqueLogo.png";
import { Task } from '../data/Types'
import { ReactElement } from "react";

const TaskLineItem = ({ task }: {task: Task}) => {
  const mapCells = (task: Task): ReactElement[] => {
    const lines: ReactElement[] = [];
    for (const key in task) {
      const item = task[key as keyof Task];
      const rep: string = item instanceof Date ? item.toLocaleDateString() : item.toString();
      lines.push(<td>{rep}</td>);
    }
    return lines;
  }

  return (
    <tr>
      {mapCells(task).map(cell => cell)} 
    </tr>
  );
}
export default TaskLineItem;
