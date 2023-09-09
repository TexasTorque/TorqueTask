import { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import { Status, Subteam } from "../data/Types";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { listConvert } from "../pages/TaskTable";

type Size = "sm" | "lg" | undefined;

export const all = (o: any) => Object.values(o).map(v => v as string)

const CheckerDropdown = ({ options, onChange, disabled, size, name, defaults, variant}:
  { options: any, onChange: any, disabled?: boolean, size: Size, name: string, defaults?: string[], variant?: string }) => {
  const [selected, setSelected] = useState<string[]>(defaults ?? []);
  const [title, setTitle] = useState<string>("");

  const handle = (e: any) => {
    if (!selected.includes(e.target.name)) {
      setSelected([...selected, e.target.name]);
    } else {
      setSelected(selected.filter((item) => item !== e.target.name));
    }
  };

  useEffect(() => {
    setTitle("" + selected.length + " selected");

    onChange({
      target: {
        name: name,
        value: selected.length <= 0 ? /*all(options)*/ [] : selected
      },
    });
  }, [selected]);
  
  const selectAll = (e: any) => {
    setSelected(e.target.checked ? all(options): [])
  }

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id={name} variant={variant ?? "secondary"} size={size} disabled={disabled ?? false}>
          {title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
              
          <Dropdown.ItemText>
            <Form.Check name="all"
              type="checkbox" label={"Select All"}
              onChange={selectAll}
              checked={all(options).length == selected.length}
                />
          </Dropdown.ItemText>

          <Dropdown.Divider></Dropdown.Divider>

          {
            Object.values(options).map((v, i) => (
              <Dropdown.ItemText>
                <Form.Check name={"" + v} id={`check-${name}-${v}`}
                  type="checkbox" label={"" + v}
                  defaultChecked={(defaults ?? []).includes("" + v)}
                  onChange={handle}
                  checked={selected.includes("" + v)}
                   />
              </Dropdown.ItemText>
            ))
          }
        </Dropdown.Menu>

      </Dropdown>
    </>
  );
};

export default CheckerDropdown;