import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { getAllTasks } from "../firebase";
import { Task } from "../data/Types";
import SelectorDropdown from "../components/SelectorDropdown";

const TaskLineItem = ({ task }: { task: Task }) => {
  return (
    <tr>
      <td>
        <a href={"/task/" + task.identifier}>{task.identifier}</a>
      </td>
      <td>{task.name}</td>
      <td>{task.project}</td>
      <td>{task.details}</td>
      <td>
        <SelectorDropdown
          options={{}}
          defaultValue={task.status}
          size="sm"
          onChange={(_: any) => _}
          name="subteam"
          disabled
        />
      </td>
      <td>
        <SelectorDropdown
          options={{}}
          defaultValue={task.subteam}
          size="sm"
          onChange={(_: any) => _}
          disabled
          name="subteam"
        />
      </td>
      <td>{task.startDate}</td>
      <td>{task.endDate}</td>
    </tr>
  );
};

export default () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    getAllTasks().then(setTasks);
  }, [setTasks]);

  return (
    <>
      <Header fluid setSearchQuery={setSearchQuery} />
      <Container fluid>
        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Project</th>
              <th>Details</th>
              <th>Status</th>
              <th>Subteam</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              ?.filter((task) =>
                task.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((task, id) => {
                return <TaskLineItem task={task} key={id}></TaskLineItem>;
              })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
