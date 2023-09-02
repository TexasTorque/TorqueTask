import { useState } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import { Status, statusColors } from "../data/Types";


const StatusDropdown = ({defaultValue, onChange, disabled}: {defaultValue: Status, onChange: any, disabled?: boolean}) => {
  const [selected, setSelected] = useState<string>(defaultValue);

  return (
    <DropdownButton id="" title={selected} variant={statusColors[selected as Status]} size="lg" disabled={disabled ?? false}>
      {
        Object.values(Status).map(v => <Dropdown.Item as="button" onClick={e => {
          e.preventDefault();
          setSelected(v);
        }}>{v}</Dropdown.Item>)
      }
    </DropdownButton>
  );
};
export default StatusDropdown;