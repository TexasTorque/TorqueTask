import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import { Status, Subteam } from "../data/Types";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownContext from "react-bootstrap/esm/DropdownContext";

type Size = "sm" | "lg" | undefined;

const StringList = ({
  defaultValue,
  onChange,
  name,
}: {
  defaultValue: string[];
  onChange: any;
  name: string;
}) => {
  const [values, setValues] = useState<string[]>(defaultValue);
  const [newEntry, setNewEntry] = useState<string>("");

  const add = (e: any) => {
    if (!values.includes(newEntry) && newEntry.trim() !== "")
      setValues([...values, newEntry]);
    setNewEntry("");
  };

  useEffect(() => {
    onChange({
      target: {
        name: name,
        value: values,
      },
    });
  }, [values]);

  const remove = (e: any) => {
    setValues(values.filter((item) => item !== e.target.name));
  };

  return (
    <div className="string-list">
      <InputGroup className="string-list-search">
        <Form.Control
          autoComplete="off"
          className="string-list-search-input"
          size="sm"
          type="text"
          onChange={(e) => setNewEntry(e.target.value)}
          name="name"
          value={newEntry}
        />
        <Button variant="success" size="sm" onClick={add} className="string-list-add-button">
          {"+"}
        </Button>
      </InputGroup>
      <div className="string-list-table">
        <table className="string-table">
          {values.map((v, i) => (
            <tr className="string-list-row">
              <td className="string-list-cell">
                <InputGroup className="">
                  <Button variant="danger" size="sm" name={v} onClick={remove}>
                    {"x"}
                  </Button>

                  <Form.Control
                    autoComplete="off"
                    size="sm"
                    type="text"
                    value={v}
                    name="name"
                    disabled
                  />
                </InputGroup>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default StringList;
