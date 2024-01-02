
import Header from "../components/Header";

import {ReactElement, useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
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

  const dateSortFunction  = (a: Task, b: Task): number => (new Date(a.startDate)).getTime() - (new Date(b.startDate)).getTime();

  useEffect(() => {
    const filteredTasks: Task[] = tasks.filter(createSearchFilter(search)).sort(dateSortFunction);
    const localGaantTasks: GaantTask[] = filteredTasks.map((task: Task): GaantTask => ({
      start: new Date(task.startDate),
      end: new Date(task.endDate),
      name: task.name + ' (' + task.project + ')',
      id: task.identifier,
      type: 'task',
      progress: 100,
      isDisabled: false,
      styles: { progressColor: subteamColors[task.subteam], progressSelectedColor: '#ff9e0d' },
    }));
    setGaantTasks(localGaantTasks);
  }, [tasks, search]);

  const defaultViewMode = ViewMode.Week;

  const colWidths = {
    [ViewMode.Hour]: 65,
    [ViewMode.QuarterDay]: 65,
    [ViewMode.HalfDay]: 65,
    [ViewMode.Day]: 50,
    [ViewMode.Week]: 200,
    [ViewMode.Month]: 300,
    [ViewMode.Year]: 350,
  }

  const [colWidth, setColWidth] = useState<number>(colWidths[defaultViewMode]);
  const [viewMode, setViewMode] = useState<ViewMode>(defaultViewMode);

  const updateViewMode = (e: any) => {
    setColWidth(colWidths[e.target.value as ViewMode]);
    setViewMode(e.target.value);
  }

  const clickOpenHandler = (task: GaantTask) => {
    window.location.href = '/task/' + task.id;
  }

  const selectHandler = (task: GaantTask, isSelected?: boolean) => {
    clickOpenHandler(task);
  };

  return (
    <>
      <Header fluid/>
      <SearchMenu search={search}/>
      <br></br>
      <Container fluid>
        <Card className="bg-dark text-white">
          {/* <Card.Header as="h6">Search Menu</Card.Header> */}
          <Card.Header as="p" className="gaant-head">
            <Row>
              <Col lg={1}> 
                <SelectorDropdown
                    options={[ViewMode.Day, ViewMode.Week, ViewMode.Month]}
                    defaultValue={defaultViewMode}
                    size="sm"
                    onChange={updateViewMode}
                    name="priority"
                  />
              </Col>
              <Col lg={3}>
                <p className="p-tip"><b>Tip:</b> click on a box to view its task</p>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body style={{backgroundColor: "white", padding: 0}}>
            {gaantTasks.length > 0 ? 
              <Gantt
                tasks={gaantTasks} 
                listCellWidth={""}
                viewMode={viewMode}
                columnWidth={colWidth}
                onDoubleClick={clickOpenHandler}
                onSelect={selectHandler}
              />
            : <></>}
          </Card.Body>
          <Card.Footer as="p">
          </Card.Footer>
        </Card>
        <br></br>
        <br></br>
      </Container>
    </>
  );
}

