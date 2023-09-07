import { useState } from "react";
import { Button, Dropdown, DropdownButton, Form, InputGroup, Table } from "react-bootstrap";
import { Status, Subteam } from "../data/Types";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownContext from "react-bootstrap/esm/DropdownContext";

type Size = "sm" | "lg" | undefined;

const StringList = ({defaultValue, onChange, name}: {defaultValue: string[], onChange: any, name: string}) => {

  const [values, setValues] = useState<string[]>(defaultValue);
  const [newEntry, setNewEntry] = useState<string>("");

  const add = (e: any) => {
    if (!values.includes(newEntry) && newEntry.trim() !== "")
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
        <div className="string-list">
          <InputGroup className="">
            <Form.Control autoComplete="off" size="sm" type="text" onChange={e => setNewEntry(e.target.value)} name="name" value={newEntry}/> 
            <Button variant="success" size="sm" onClick={add}>{"+"}</Button>
          </InputGroup>
          <div className="string-list-table">
            <table className="">
                {
                  values.map((v, i) => (
                    <tr className="string-list-row">
                      <td>
                        <InputGroup className="">
                          <Form.Control autoComplete="off" size="sm" type="text" value={v} name="name" disabled/> 
                            <Button variant="danger" size="sm" name={v} onClick={remove}>{"x"}</Button>
                        </InputGroup>
                      </td>
                    </tr>
                  ))
                }
            </table>
          </div>
        </div>
  );
};

export default StringList;