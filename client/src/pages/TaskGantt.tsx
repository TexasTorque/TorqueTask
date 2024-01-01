
import Header from "../components/Header";

import {ReactElement, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import TorqueLogo from "../imgs/TorqueLogo.png";
import { getAllTasks } from "../firebase";
// import { Task } from "../../../src/types";
import { Status, Subteam, Task } from "../data/Types";
import SelectorDropdown from "../components/SelectorDropdown";

import SearchMenu, { createSearchFilter, useSearch } from "../components/SearchMenu";

import { Gantt, Task as GaantTask, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

export default () => {

  // Reference:
  // https://github.com/MaTeMaTuK/gantt-task-react/blob/main/example/src/App.tsx
  // https://matematuk.github.io/gantt-task-react/

  const [tasks, setTasks] = useState<Task[]>([]);
  const [gaantTasks, setGaantTasks] = useState<GaantTask[]>([]);

  const search = useSearch(() => {});

  useEffect(() => {
    getAllTasks().then(tasks => {
      setTasks(tasks);
    });
  }, [setTasks]);

  const subteamColors = {
    [Subteam.PROG]: "#dc3545",
    [Subteam.MECH]: "#0d6efd",
    [Subteam.BIZ]: "#198754",
    [Subteam.CAD]: "#0dcaf0",
    [Subteam.MANUF]: "#6c757d",
    [Subteam.ELEC]: "#ffc107",
  }

  useEffect(() => {
    const filteredTasks: Task[] = tasks.filter(createSearchFilter(search));
    const localGaantTasks: GaantTask[] = filteredTasks.map((task: Task): GaantTask => ({
      start: new Date(task.startDate),
      end: new Date(task.endDate),
      name: task.name,
      id: task.identifier,
      type: 'task',
      progress: 100,
      isDisabled: false,
      styles: { progressColor: subteamColors[task.subteam], progressSelectedColor: '#ff9e0d' },
    }));
    setGaantTasks(localGaantTasks);
  }, [tasks]);

  return (
    <>
      <Header fluid/>
      <SearchMenu search={search}/>
      <br></br>
      <Container fluid>
        {gaantTasks.length > 0 ? 
          <Gantt 
            tasks={gaantTasks} 
            listCellWidth={""}
          />
         : <></>}
      </Container>
    </>
  );
}
