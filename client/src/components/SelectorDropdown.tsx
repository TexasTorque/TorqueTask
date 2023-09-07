import { useState } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import { Priority, Status, Subteam } from "../data/Types";

type Size = "sm" | "lg" | undefined;

export const itemColors = {
  [Status.NOT_STARTED]: "secondary",
  [Status.IN_PROGRESS]: "warning",
  [Status.BLOCKED]: "danger",
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

const SelectorDropdown = ({options, defaultValue, onChange, disabled, size, name, noArrow}: 
      {options: any, defaultValue: string, onChange: any, disabled?: boolean, size: Size, name: string, noArrow?: boolean}) => {
  const [selected, setSelected] = useState<string>(defaultValue);

  const handle = (e: any) => {
    e.preventDefault();
    setSelected(e.target.name);
    onChange({
      target: {
        name: name,
        value: e.target.name
      }});
  };

  return (
    <DropdownButton id={name} title={selected} variant={itemColors[selected as Status]} size={size} disabled={disabled ?? false} 
        className={(disabled ?? false) || (noArrow ?? false) ? "no-arrow" : ""}>
      {
        Object.values(options).map((v, i) => <Dropdown.Item as="button" name={"" + v} onClick={handle}>{v as string}</Dropdown.Item>)
      }
    </DropdownButton>
  );
};

export default SelectorDropdown;