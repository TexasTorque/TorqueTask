import { Button, Col, Container, Form, FormControlProps, Nav, Navbar, Row, Table } from "react-bootstrap";

import TorqueLogo from "../imgs/TorqueLogo.png";

import Header from "../components/Header";
import { Task, dateFromStrISO, dateToStrISO, defaultTask, Subteam, Status} from "../data/Types";
import { useEffect, useState } from "react";
import React from "react";
import SelectorDropdown from "../components/SelectorDropdown";
import { getNextIdentifier, getTaskByID, updateTask } from "../firebase";
import { useParams } from "react-router-dom";

export default ({create}: {create: boolean}) => {

  const [task, setTask] = useState<Task>(defaultTask);
  const [loaded, setLoaded] = useState<boolean>(false);

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

  const handleUpdateTask = async (e: any) => {
    e.preventDefault();
    console.log(task);
    const res = await updateTask(task);
    window.location.href = "/";
  }

  const handleUpdateField = (e: any) => {
    setTask({...task, [e.target.name]: e.target.value});
  }

  const SIZE = undefined;

  if (!loaded) return <div></div>;

  return (
    <div className="main">
      <Header/>
      <Container>
        <Form>
          <Row>
            <Col lg={2}>      
              <Form.Group className="mb-3" controlId="taskForm.identifier">
                <Form.Label>Task Number</Form.Label>
                <Form.Control autoComplete="off" size={SIZE} type="text" placeholder="" disabled value={task?.identifier}/>
              </Form.Group>
            </Col>
            <Col lg={4}>      
              <Form.Group className="mb-3" controlId="taskForm.name">
                <Form.Label>Task Name</Form.Label>
                <Form.Control autoComplete="off" size={SIZE} type="text" value={task.name} 
                    onChange={e => handleUpdateField(e)} name="name" />
              </Form.Group>
            </Col>
            <Col lg={4}>      
              <Form.Group className="mb-3" controlId="taskForm.project">
                <Form.Label>Project Name</Form.Label>
                <Form.Control autoComplete="off" size={SIZE} type="text"  value={task.project} 
                    onChange={handleUpdateField} name="project" />
              </Form.Group>
            </Col>

            <Col lg={2}>      
              <Form.Group className="mb-3" controlId="taskForm.project">
                <Form.Label className="invisible">{"Update task"}</Form.Label>
                <Button className="w-100" variant="success" size={SIZE} onClick={handleUpdateTask}>Update Task</Button>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="taskForm.details">
                <Form.Label>Details</Form.Label>
                <Form.Control autoComplete="off" size={SIZE} as="textarea"  value={task.details} 
                    onChange={handleUpdateField} name="details" />
              </Form.Group> 
            </Col>
          </Row>
          <Row>
            <Col lg={3}> 
              <Form.Group className="mb-3" controlId="taskForm.status">
                <Form.Label>Status</Form.Label>
                <SelectorDropdown options={Status} defaultValue={task.status} size={SIZE} 
                    onChange={handleUpdateField} name="status"/>
              </Form.Group> 
            </Col>
            <Col lg={3}> 
              <Form.Group className="mb-3" controlId="taskForm.subteam">
                <Form.Label>Subteam</Form.Label>
                <SelectorDropdown options={Subteam} defaultValue={task.subteam} size={SIZE} 
                    onChange={handleUpdateField} name="subteam" />

              </Form.Group> 
            </Col>
            <Col lg={3}> 
              <Form.Group className="mb-3" controlId="taskForm.startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control autoComplete="off" size={SIZE} type="date" value={task.startDate}
                  onChange={handleUpdateField} name="startDate" />
              </Form.Group> 
            </Col>

            <Col lg={3}> 
              <Form.Group className="mb-3" controlId="taskForm.endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control autoComplete="off" size={SIZE} type="date" value={task.endDate}
                  onChange={handleUpdateField} name="endDate" />
              </Form.Group> 
            </Col>

          </Row>
        </Form>
      </Container>
    </div>
  );
};
