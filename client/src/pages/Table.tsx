import { Container, Nav, Navbar, Table } from "react-bootstrap";

import TorqueLogo from "../imgs/TorqueLogo.png";

import TaskList from "../components/TaskList";
import Header from "../components/Header";
export default () => {
  return (
    <div className="main">
      <Header fluid/>
      <TaskList/>
    </div>
  );
};
