import { Button, Form} from "react-bootstrap";
import SelectorDropdown from "./SelectorDropdown";
import { Priority, Subteam, Status, Task, defaultTask } from "../data/Types";
import { useEffect, useState } from "react";
import { updateTask, getNextIdentifier, getAllTasks } from "../firebase";
import EditableToggle from "../components/EditableTableToggle";
import StringList from "./StringList";
import { listConvert } from "../pages/TaskTable";
import { useTaskState } from "../pages/TaskView";
import { stringConstrain } from "./EditableTextEntry";

const DefaultRow = ({setTasks}: {setTasks: Function}) => {
    const [task, setTask, modified, handleUpdateField, setModified] = useTaskState(defaultTask);

    useEffect(() => {
      getNextIdentifier().then(id => setTask({...task, identifier: id}));
    }, []);

    const saveTask = async () => {
      if (modified) {
        const res = await updateTask(task);

        getAllTasks().then(tasks => setTasks(tasks));
        setTask(defaultTask);
        setModified(false);
      }
    }

    return (
        <tr>
          <td>
            <Button className="btn btn-sm" style={{width: "30%", marginLeft: "1rem"}} variant={modified ? "success" : "secondary"} onClick={saveTask}>+</Button>
          </td>

          <EditableToggle
            editor={<Form.Control autoComplete="off" size="sm" type="text" 
              value={task.name ?? ""} className={"ete-left"}
              onChange={handleUpdateField} name="name" />}
            display={<span className="ete-left text-tbl-entry">{task.name == "New Task" ? <i>{stringConstrain(task.name ?? "", 40)}</i> : stringConstrain(task.name ?? "", 40)}</span>}
          />   
  
          <EditableToggle
            editor={<Form.Control autoComplete="off" size="sm" type="text" 
              value={task.project ?? ""} className={"ete-left"}
              onChange={handleUpdateField} name="project" />}
            display={<span className="ete-left text-tbl-entry">{task.project == "Project" ? <i>{stringConstrain(task.project ?? "", 40)}</i> : stringConstrain(task.project ?? "", 40)}</span>}
          />   
  
          <td>
            <SelectorDropdown
              options={Priority}
              defaultValue={task.priority ?? Priority.MID}
              size="sm"
              onChange={handleUpdateField}
              name="priority"
              noArrow
            />
          </td>
          <td>
            <SelectorDropdown
              options={Subteam}
              defaultValue={task.subteam}
              size="sm"
              onChange={handleUpdateField}
              name="subteam"
              noArrow
            />
          </td>
          <td>
            <SelectorDropdown
              options={Status}
              defaultValue={task.status}
              size="sm"
              onChange={handleUpdateField}
              name="status"
              noArrow
            />
          </td>
  
          <EditableToggle
            editor={<StringList defaultValue={task.assignees ?? []} onChange={handleUpdateField} name="assignees"/>}
            display={listConvert(task.assignees ?? [], 25)}
          />
  
          <td className="date-col"><Form.Control autoComplete="off" size="sm" type="date" value={task.startDate}
            onChange={handleUpdateField} name="startDate" />
          </td>
          <td className="date-col"><Form.Control autoComplete="off" size="sm" type="date" value={task.endDate}
            onChange={handleUpdateField} name="endDate" 
            className={new Date(task.endDate) < new Date() ? "overtime" : ""}/>
          </td>
        </tr>
      )
};
export default DefaultRow;
