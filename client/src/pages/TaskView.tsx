import { Button, Col, Container, Form, FormControlProps, Nav, Navbar, Row, Table } from "react-bootstrap";

import TorqueLogo from "../imgs/TorqueLogo.png";

import Header from "../components/Header";
import { Task, dateFromStrISO, dateToStrISO, defaultTask, Subteam, Status} from "../data/Types";
import { useEffect, useState } from "react";
import React from "react";
import SelectorDropdown from "../components/SelectorDropdown";
import { getTaskByID, taskTemplate, updateTask } from "../firebase";
import { useParams } from "react-router-dom";

export default ({create}: {create: boolean}) => {

  const [task, setTask] = useState<Task>(defaultTask());

  const id = useParams().id;

  useEffect(() => {
    (create ? taskTemplate() : getTaskByID(id ?? "")).then(setTask);
  }, [task]);

  const updateField = (key: string, modifier: CallableFunction = (e: any) => e): React.ChangeEventHandler<any> => {
    return e => {
      const t = task as any;
      t[key] = modifier(e.target.value);
      setTask(t as Task);
    }
  };

  const handleUpdateTask = async (e: any) => {
    e.preventDefault();
    console.log(task);
    const res = await updateTask(task);
    window.location.href = "/task/" + task.identifier;
  }

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
            <Col lg={4}>      
              <Form.Group className="mb-3" controlId="taskForm.name">
                <Form.Label>Task Name</Form.Label>
                <Form.Control size={SIZE} type="text"  defaultValue={task?.name} onChange={updateField("name")}/>
              </Form.Group>
            </Col>
            <Col lg={4}>      
              <Form.Group className="mb-3" controlId="taskForm.project">
                <Form.Label>Project Name</Form.Label>
                <Form.Control size={SIZE} type="text"  defaultValue={task?.project} onChange={updateField("project")}/>
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
                <Form.Control size={SIZE} as="textarea"  defaultValue={task?.details} onChange={updateField("details")}/>
              </Form.Group> 
            </Col>
          </Row>
          <Row>
            <Col lg={3}> 
              <Form.Group className="mb-3" controlId="taskForm.status">
                <Form.Label>Status</Form.Label>
                <SelectorDropdown options={Status} defaultValue={task?.status} size={SIZE} onChange={updateField("status")}/>
              </Form.Group> 
            </Col>

            {/* <Col lg={3}> 
              <Form.Group className="mb-3" controlId="taskForm.createdOn">
                <Form.Label>Created On</Form.Label>
                <Form.Control size={SIZE} type="date" disabled value={dateToStrISO(task?.createdOn)}
                />
              </Form.Group> 
            </Col> */}

            <Col lg={3}> 
              <Form.Group className="mb-3" controlId="taskForm.subteam">
                <Form.Label>Subteam</Form.Label>
                <SelectorDropdown options={Subteam} defaultValue={task?.subteam} size={SIZE} onChange={updateField("subteam")}/>

              </Form.Group> 
            </Col>

            <Col lg={3}> 
              <Form.Group className="mb-3" controlId="taskForm.startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control size={SIZE} type="date" defaultValue={task?.startDate}
                  onChange={updateField("startDate")}
                />
              </Form.Group> 
            </Col>

            <Col lg={3}> 
              <Form.Group className="mb-3" controlId="taskForm.endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control size={SIZE} type="date" defaultValue={task?.endDate}
                  onChange={updateField("endDate")}
                />
              </Form.Group> 
            </Col>

          </Row>
        </Form>
      </Container>
    </div>
  );
};
