import { useState } from "react";
import { Button, Dropdown, DropdownButton, Form, InputGroup, Table } from "react-bootstrap";
import { Status, Subteam } from "../data/Types";

type Size = "sm" | "lg" | undefined;

const StringList = ({defaultValue, onChange, name}: {defaultValue: string[], onChange: any, name: string}) => {

  const [values, setValues] = useState<string[]>(["Omar", "Justus"]);
  const [newEntry, setNewEntry] = useState<string>("");

  // const handle = (e: any) => {
  //   e.preventDefault();
  //   setSelected(e.target.name);
  //   onChange({
  //     target: {
  //       name: name,
  //       value: e.target.name
  //     }});
  // };

  const add = (e: any) => {

  };

  const remove = (e: any) => {

  };

  return (
        <Table striped bordered hover variant="light" size="sm" className="fixed-header">
          <thead>
            <tr>
              {/* <th>Task ID</th> */}
              <td>
                <Form.Control autoComplete="off" size="sm" type="text" value={newEntry} 
                    onChange={e => e} name="name" />
              </td>
              <td>
                <Button variant="success" size="sm" onClick={add}>{"+"}</Button>
              </td>
            </tr>
          </thead>
          <tbody>
          {
              values.map((v, i) => (
                <tr>
                  <td>
                    {/* {v} 
                    <Form.Control autoComplete="off" size="sm" type="text" value={v} 
                    onChange={e => e} name="name" disabled/> */}

          <InputGroup className="">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" placeholder="Username" />
          </InputGroup>
                  </td>
                  {/* <td>
                    <Button variant="danger" size="sm" name={v} onClick={add}>{"x"}</Button>
                  </td> */}
                  
                </tr>
              ))
          }

            {/* {
              tasks?.map(task => {
                return <TaskLineItem task={task}></TaskLineItem>
              }) */}
            {/* } */}
             
          </tbody>
        </Table>
    // <DropdownButton id={name} title={selected}
    // variant={itemColors[selected as Status]} 
    // size={size} disabled={disabled ?? false}>
    //   {
    //     Object.values(options).map((v, i) => <Dropdown.Item as="button" name={"" + v} onClick={handle}>{v as string}</Dropdown.Item>)
    //   }
    // </DropdownButton>
  );
};

export default StringList;