import { useState } from "react";
import { Button, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import { Priority, Status, Subteam } from "../data/Types";

type Size = "sm" | "lg" | undefined;

export const itemColors = {
  [Status.CANCELED]: "danger",
  [Status.NOT_STARTED]: "secondary",
  [Status.IN_PROGRESS]: "info",
  [Status.BLOCKED]: "warning",
  [Status.COMPLETED]: "success",

  [Subteam.CAD]: "info",
  [Subteam.MANUF]: "secondary",
  [Subteam.MECH]: "primary",
  [Subteam.ELEC]: "warning",
  [Subteam.PROG]: "danger",
  [Subteam.BIZ]: "success",

  [Priority.HIGHEST]: "danger",
  [Priority.HIGH]: "warning",
  [Priority.MID]: "secondary",
  [Priority.LOW]: "info",
  [Priority.LOWEST]: "primary",
};

export const stringConstrain = (s: string, l: number): string => {
  if (s.length < l) return s;
  const words: string[] = s.substring(0, l).split(" ");
  words.pop();
  return words.join(" ") + "...";
}

const EditableTableTextEntry = ({defaultValue, onChange, size, name, length}: 
      {defaultValue: string, onChange: any, size: Size, name: string, length: number}) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [content, setContent] = useState<string>(defaultValue);
  const [hover, setHover] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setContent(e.target.value);
  }

  const handleButton = (e: any) => {
    e.preventDefault();
    if (edit && e.target.value !== defaultValue)
        onChange({
          target: {
            name: name,
            value: content 
          }});
    setEdit(!edit);
  }

  const buttonSymbol = (): string => edit ? "✓" : "✎";
  const buttonColor = (): string => edit ? "success" : "secondary";

  return (<td onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

        { edit ? (
            <Form.Control autoComplete="off" size={size} type="text" value={content} className={"ete-left"} 
                onChange={e => handleChange(e)} name={name} />
          ) : (<>
            <span className="ete-left text-tbl-entry">{stringConstrain(content, length )}</span>
            </>
          )
        }
        { hover || edit ? (
          <Button variant={buttonColor()} size="sm" className="ete-btn ete-right" 
                onClick={handleButton}>{buttonSymbol()}</Button>
          ) : (<span className="ete-plhldr"></span>)
        }
  </td>);
};

export default EditableTableTextEntry;