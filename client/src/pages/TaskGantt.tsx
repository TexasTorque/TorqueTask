
import Header from "../components/Header";

import {ReactElement, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import TorqueLogo from "../imgs/TorqueLogo.png";
import { getAllTasks } from "../firebase";
// import { Task } from "../../../src/types";
import { Status, Subteam, Task } from "../data/Types";
import SelectorDropdown from "../components/SelectorDropdown";

import Gantt from "frappe-gantt";

export default () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [height, setHeight] = useState<string>();

  // Alternative libraries
  // https://jscharting.com/examples/chart-types/gantt/rounded/#
  // https://developers.google.com/chart/interactive/docs/gallery/ganttchart

  useEffect(() => {
    getAllTasks().then(tasks => {
      setTasks(tasks);
      
      var gantt = new Gantt("#gantt", formatForGantt(tasks), {
        header_height: 45,
        step: 2,
        bar_height: 40,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 16,
        view_mode: 'Day',
        date_format: 'MM/DD/YYYY',
        language: 'en',
        on_date_change: t => t.progress= 100,
        custom_popup_html: t => `<div class="popup"><p>${t.id}</p></div>`,
        on_click: t => window.location.href = "/task/" + t.id,
      });
    });
  }, [setTasks]);

  const progressLevels = {
    [Status.NOT_STARTED]: 5,
    [Status.IN_PROGRESS]: -1,
    [Status.BLOCKED]: 0,
    [Status.COMPLETED]: 100,
  }

  const calcProgressBar = (t: Task): number => {
    const p = progressLevels[t.status];
    if (p != -1) return p;

    const s = new Date(t.startDate).getTime();
    const e = new Date(t.endDate).getTime();
    const n = Date.now()
    const o = 0 * 60 * 60 * 1000;
    return (n - o - s) / (e - s) * 100;
  }

  const formatForGantt = (tasks: Task[]): any[] => {
    var tasksForGantt: any[] = [];
    setHeight(`${56 * tasks.length + 50}px`);
    tasks.map(task => {
      tasksForGantt.push({
        id: task.identifier,
        name: task.name,
        start: task.startDate,
        end: task.endDate,
        dependencies: "",
        progress: calcProgressBar(task)
      });
    });
    return tasksForGantt;
  }

  return (
    <>
      <Header fluid/>
      <Container fluid>
        <p>Double click on a cell to go to that tasks. We are already working on an improved GANTT chart system.</p>
        <svg style={{height: height}} id="gantt"></svg>
      </Container>
    </>
  );
}
