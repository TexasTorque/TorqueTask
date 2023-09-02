import { useState } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import { Status, Subteam } from "../data/Types";

type Size = "sm" | "lg" | undefined;

export const itemColors = {
  [Status.NOT_STARTED]: "secondary",
  [Status.IN_PROGRESS]: "warning",
  [Status.BLOCKED]: "danger",
  [Status.COMPLETED]: "success",
  [Subteam.CAD]: "warning",
  [Subteam.MANUF]: "secondary",
  [Subteam.MECH]: "danger",
  [Subteam.ELEC]: "primary",
  [Subteam.PROG]: "success",
  [Subteam.BIZ]: "info"
};

const SelectorDropdown = ({options, defaultValue, onChange, disabled, size}: 
      {options: any, defaultValue: string, onChange: any, disabled?: boolean, size: Size}) => {
  const [selected, setSelected] = useState<string>(defaultValue);

  return (
    <DropdownButton id="" title={selected} 
    variant={itemColors[selected as Status]} 
    size={size} disabled={disabled ?? false}>
      {
        Object.values(options).map(v => <Dropdown.Item as="button" onClick={e => {
          e.preventDefault();
          setSelected(v as string);
          const t = e.target as any;
          t.value = v;
          e.target = t;
          onChange(e);
        }}>{v as string}</Dropdown.Item>)
      }
    </DropdownButton>
  );
};

export default SelectorDropdown;