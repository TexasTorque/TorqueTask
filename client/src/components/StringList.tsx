import { useState } from "react";
import { Button, Dropdown, DropdownButton, Form, InputGroup, Table } from "react-bootstrap";
import { Status, Subteam } from "../data/Types";

type Size = "sm" | "lg" | undefined;

const StringList = ({defaultValue, onChange, name}: {defaultValue: string[], onChange: any, name: string}) => {

  const [values, setValues] = useState<string[]>(defaultValue);
  const [newEntry, setNewEntry] = useState<string>("");

  const add = (e: any) => {
    if (!values.includes(newEntry))
      setValues([...values, newEntry]);
    setNewEntry("");
    const v = values;
    onChange({
      target: {
        name: name,
        value: v
      }});
  };

  const remove = (e: any) => {
    setValues(values.filter(item => item !== e.target.name));
  };

  return (
        <Table striped bordered hover variant="light" size="sm" className="fixed-header">
          <thead>
            <tr>
              <th>
                <InputGroup className="">
                  <Form.Control autoComplete="off" size="sm" type="text" onChange={e => setNewEntry(e.target.value)} name="name"/> 
                  <InputGroup.Text>
                    <Button variant="success" size="sm" onClick={add}>{"+"}</Button>
                  </InputGroup.Text>
                </InputGroup>
              </th>
            </tr>
          </thead>
          <tbody>
          {
              values.map((v, i) => (
                <tr>
                  <td>
                    <InputGroup className="">
                      <Form.Control autoComplete="off" size="sm" type="text" value={v} name="name" disabled/> 
                      <InputGroup.Text>
                        <Button variant="danger" size="sm" name={v} onClick={remove}>{"x"}</Button>
                      </InputGroup.Text>
                    </InputGroup>
                  </td>
                </tr>
              ))
          }
          </tbody>
        </Table>
  );
};

export default StringList;