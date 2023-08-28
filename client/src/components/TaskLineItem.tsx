import { Table } from "react-bootstrap";
import TorqueLogo from "../imgs/TorqueLogo.png";
import { Task } from '../data/Types'
import { ReactElement } from "react";

const getWidthForRow = (task: Task): string => {
    var i: number = 0;
    for (const key in task) i++;
    return "" + (100 / i) + "%";
};;

const TaskLineItem = ({ task }: {task: Task}) => {
  const mapCells = (task: Task): ReactElement[] => {
    const lines: ReactElement[] = [];
    const w: string = getWidthForRow(task);
    for (const key in task) {
      lines.push(<td width={w}>{task[key as keyof Task].toString()}</td>);
    }
    return lines;
  }

  return (
    <div>
      <tr>
        {mapCells(task).map(cell => cell)} 
      </tr>
    </div>


  );
}
export default TaskLineItem;
