import { Col, Container, Form, FormControlProps, Nav, Navbar, Row, Table } from "react-bootstrap";

import TorqueLogo from "../imgs/TorqueLogo.png";

import Header from "../components/Header";
import { Task, dateFromStrISO, dateToStrISO, defaultTask } from "../data/Types";
import { useEffect, useState } from "react";
import React from "react";
import StatusDropdown from "../components/StatusDropdown";

export default ({taskProvider}: {taskProvider: Promise<Task>}) => {

  const [task, setTask] = useState<Task>(defaultTask());

  useEffect(() => {
    taskProvider.then(setTask);
  }, [task]);

  const updateField = (key: string, modifier: CallableFunction = (e: any) => e): React.ChangeEventHandler<any> => {
    return e => {
      const t = task as any;
      t[key] = modifier(e.target.value);
      setTask(t as Task);
      console.log(task);
    }
  };

  const SIZE = undefined;

  return (
    <div className="main">
      <Header/>
      <Container>
        <Form>
          <Row>
            <Col lg={2}>      
              <Form.Group className="mb-3" controlId="taskForm.identifier">
                <Form.Label>Task Number</Form.Label>
                <Form.Control size={SIZE} type="text" placeholder="" disabled value={task?.identifier}/>
              </Form.Group>
            </Col>
            <Col lg={5}>      
              <Form.Group className="mb-3" controlId="taskForm.name">
                <Form.Label>Task Name</Form.Label>
                <Form.Control size={SIZE} type="text"  defaultValue={task?.name} onChange={updateField("name")}/>
              </Form.Group>
            </Col>
            <Col lg={5}>      
              <Form.Group className="mb-3" controlId="taskForm.project">
                <Form.Label>Task Name</Form.Label>
                <Form.Control size={SIZE} type="text"  defaultValue={task?.project} onChange={updateField("project")}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="taskForm.details">
                <Form.Label>Details</Form.Label>
                <Form.Control size={SIZE} as="textarea"  defaultValue={task?.details} onChange={updateField("details")}/>
              </Form.Group> 
            </Col>
          </Row>
          <Row>
            <Col lg={3}> 
              <Form.Group className="mb-3" controlId="taskForm.status">
                <Form.Label>Status</Form.Label>
                <StatusDropdown defaultValue={task?.status} size={SIZE} onChange={updateField("status")}/>
              </Form.Group> 
            </Col>

          <Col lg={3}> 
              <Form.Group className="mb-3" controlId="taskForm.startDate">
                <Form.Label>Created On</Form.Label>
                <Form.Control size={SIZE} type="date" disabled value={dateToStrISO(task?.createdOn)}
                />
              </Form.Group> 
            </Col>

            <Col lg={3}> 
              <Form.Group className="mb-3" controlId="taskForm.startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control size={SIZE} type="date" defaultValue={dateToStrISO(task?.startDate)}
                  onChange={updateField("startDate", dateFromStrISO)}
                />
              </Form.Group> 
            </Col>

            <Col lg={3}> 
              <Form.Group className="mb-3" controlId="taskForm.endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control size={SIZE} type="date" defaultValue={dateToStrISO(task?.endDate)}
                  onChange={updateField("endDate", dateFromStrISO)}
                />
              </Form.Group> 
            </Col>

          </Row>
        </Form>
      </Container>
    </div>
  );
};
