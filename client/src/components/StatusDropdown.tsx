import { useState } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import { Status, statusColors } from "../data/Types";


const StatusDropdown = ({defaultValue, onChange, disabled, size}: 
      {defaultValue: Status, onChange: any, disabled?: boolean, size: "sm" | "lg" | undefined}) => {
  const [selected, setSelected] = useState<string>(defaultValue);

  return (
    <DropdownButton id="" title={selected} variant={statusColors[selected as Status]} size={size} disabled={disabled ?? false}>
      {
        Object.values(Status).map(v => <Dropdown.Item as="button" onClick={e => {
          e.preventDefault();
          setSelected(v);
          const t = e.target as any;
          t.value = v;
          e.target = t;
          onChange(e);
        }}>{v}</Dropdown.Item>)
      }
    </DropdownButton>
  );
};
export default StatusDropdown;