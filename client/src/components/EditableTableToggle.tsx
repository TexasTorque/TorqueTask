import { useState } from "react";
import { Button, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import { Priority, Status, Subteam } from "../data/Types";

const EditableTableToggle = ({editor, display}: 
      {editor: React.ReactNode, display: React.ReactNode}) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const handleButton = (e: any) => {
    e.preventDefault();
    setEdit(!edit);
  }

  const buttonSymbol = (): string => edit ? "✓" : "✎";
  const buttonColor = (): string => edit ? "success" : "secondary";

  return (<td onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        { edit ? editor : display }
        { hover || edit ? (
          <Button variant={buttonColor()} size="sm" className="ete-btn ete-right" 
                onClick={handleButton}>{buttonSymbol()}</Button>
          ) : (<span className="ete-plhldr"></span>)
        }
  </td>);
};

export default EditableTableToggle;