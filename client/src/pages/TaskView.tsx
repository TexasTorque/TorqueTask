import { Button, Col, Container, Form, FormControlProps, Nav, Navbar, Row, Table } from "react-bootstrap";

import TorqueLogo from "../imgs/TorqueLogo.png";

import Header from "../components/Header";
import { Task, dateFromStrISO, dateToStrISO, defaultTask, Subteam, Status, Priority, dateAdd, oneDay, timeDiff} from "../data/Types";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import SelectorDropdown from "../components/SelectorDropdown";
import { getNextIdentifier, getTaskByID, updateTask } from "../firebase";
import { useParams, useBeforeUnload } from "react-router-dom";
import StringList from "../components/StringList";

export const useTaskState = (inputTask: Task): [Task, React.Dispatch<React.SetStateAction<Task>>, boolean, (e: any)=>void, Function] => {
  const [task, setTask] = useState<Task>(inputTask);
  const [modified, setModified] = useState<boolean>(false);

  const handleUpdateField = (e: any) => {
    setModified(true);

    const localTask = {...task, [e.target.name]: e.target.value};

    if (timeDiff(localTask) < 0) {
      alert("Start date cannot be after end date");

      if (e.target.name === "startDate") {
        localTask.startDate = dateAdd(localTask.endDate, -oneDay);
      } else if (e.target.name === "endDate") {
        localTask.endDate = dateAdd(localTask.startDate, oneDay);
      }
    }

    // Only can have A-Z, a-z, 0-9, space, and hyphens in project name.
    if (e.target.name == "project") {
      const formattedProject = localTask.project.replace(/[^\w\s\-]/gi, '');
      if (localTask.project !== formattedProject) {
        alert("You may only use alphanumeric characters and spaces in project names");
      }
      localTask.project = formattedProject;
    }

    setTask(localTask);
  }
  return [task, setTask, modified, handleUpdateField, setModified];
}


export default ({create}: {create: boolean}) => {

  const [loaded, setLoaded] = useState<boolean>(false);
  const [task, setTask, modified, handleUpdateField, setModified] = useTaskState(defaultTask);

  const id = useParams().id;

  useEffect(() => {
    if (create) {
      getNextIdentifier().then(id => setTask({...task, identifier: id}))
          .then(_ => setLoaded(true));
    } else {
      getTaskByID(id ?? "").then(setTask)
          .then(_ => setLoaded(true));
    }
  }, [setTask, setLoaded]);

  useBeforeUnload(useCallback(async () => {
    if (modified) {
     
      const res = await updateTask(task);
    }
  }, [updateTask, task]));

  const SIZE = undefined;

  if (!loaded) return <div></div>;

  return (
    <div className="main">
      <Header/>
      <Container className="roomfac">
        <Form>
          <Row>
            <Col lg={1}></Col>
            
            <Col lg={2}>      
              <Form.Group className="mb-3" controlId="taskForm.identifier">
                <Form.Label>Task Number</Form.Label>
                <Form.Control autoComplete="off" size={SIZE} type="text" placeholder="" disabled value={task?.identifier}/>
              </Form.Group>
            </Col>
            <Col lg={5}>      
              <Form.Group className="mb-3" controlId="taskForm.name">
                <Form.Label>Task Name</Form.Label>
                <Form.Control autoComplete="off" size={SIZE} type="text" value={task.name} 
                    onChange={e => handleUpdateField(e)} name="name" />
              </Form.Group>
            </Col>
            <Col lg={3}>      
              <Form.Group className="mb-3" controlId="taskForm.project">
                <Form.Label>Project Name</Form.Label>
                <Form.Control autoComplete="off" size={SIZE} type="text"  value={task.project} 
                    onChange={handleUpdateField} name="project" />
              </Form.Group>

              <Col lg={1}></Col>
            </Col>
          </Row>
        
          <Row>
            <Col lg={1}></Col>

            <Col lg={2}> 
              <Form.Group className="mb-3" controlId="taskForm.priority">
                <Form.Label>Priority</Form.Label>
                <SelectorDropdown options={Priority} defaultValue={task.priority ?? Priority.MID} size={SIZE} noArrow
                    onChange={handleUpdateField} name="priority"/>
              </Form.Group> 
            </Col>
            <Col lg={2}> 
              <Form.Group className="mb-3" controlId="taskForm.subteam">
                <Form.Label>Subteam</Form.Label>
                <SelectorDropdown options={Subteam} defaultValue={task.subteam} size={SIZE} 
                    onChange={handleUpdateField} name="subteam" />
              </Form.Group> 
            </Col>
            <Col lg={2}> 
              <Form.Group className="mb-3" controlId="taskForm.status">
                <Form.Label>Status</Form.Label>
                <SelectorDropdown options={Status} defaultValue={task.status} size={SIZE} 
                    onChange={handleUpdateField} name="status"/>
              </Form.Group> 
            </Col>
            <Col lg={2}> 
              <Form.Group className="mb-3" controlId="taskForm.startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control autoComplete="off" size={SIZE} type="date" value={task.startDate}
                  onChange={handleUpdateField} name="startDate" />
              </Form.Group> 
            </Col>
            <Col lg={2}> 
              <Form.Group className="mb-3" controlId="taskForm.endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control autoComplete="off" size={SIZE} type="date" value={task.endDate}
                  onChange={handleUpdateField} name="endDate" />
              </Form.Group> 

              <Col lg={1}></Col>
            </Col>
          </Row>

          <Row>
            <Col lg={1}></Col>

            <Col lg={7}>
              <Form.Group className="mb-3" controlId="taskForm.details">
                <Form.Label>Details</Form.Label>
                <Form.Control className="details-view" autoComplete="off" size={SIZE} as="textarea"  value={task.details} 
                    onChange={handleUpdateField} name="details" />
              </Form.Group> 
            </Col>
            <Col lg={3}>
              <Form.Group className="mb-3" controlId="taskForm.assignees">
                <Form.Label>Assignees</Form.Label>
                <StringList defaultValue={task.assignees ?? []} onChange={handleUpdateField} name="assignees"/>
              </Form.Group> 
            </Col>

            <Col lg={1}></Col>
          </Row>

        </Form>
      </Container>
    </div>
  );
};
