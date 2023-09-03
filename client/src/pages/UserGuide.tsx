import { Button, Col, Container, Form, FormControlProps, Nav, Navbar, Row, Table } from "react-bootstrap";

import TorqueLogo from "../imgs/TorqueLogo.png";

import Header from "../components/Header";
import { Task, dateFromStrISO, dateToStrISO, defaultTask, Subteam, Status} from "../data/Types";
import { useEffect, useState } from "react";
import React from "react";
import SelectorDropdown from "../components/SelectorDropdown";
import { getNextIdentifier, getTaskByID, updateTask } from "../firebase";
import { useParams } from "react-router-dom";

export default () => {

  
  useEffect(() => {
    
  }, []);

  return (
    <div className="main">
      <Header/>
      <Container>
        <Row>
          <Col lg={12}>
            <br></br>
            <h1>Torque Task User Guide</h1>
            <br></br>
            <p>Coming soon...</p>
          </Col>
        </Row> 
      </Container>
    </div>
  );
};
