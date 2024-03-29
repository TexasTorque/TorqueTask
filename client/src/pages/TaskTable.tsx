import Header from "../components/Header";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, OverlayTrigger, Popover, Row, Table } from "react-bootstrap";
import { getAllTasks, updateTask } from "../firebase";
import { Priority, Status, Subteam, Task } from "../data/Types";
import SelectorDropdown from "../components/SelectorDropdown";
import CheckerDropdown, { all } from "../components/CheckerDropdown";
import SearchMenu, { SearchQuery, createSearchFilter, useSearch } from "../components/SearchMenu";
import { useTaskState } from "./TaskView";
import { useBeforeUnload } from "react-router-dom";
import EditableTableTextEntry, { stringConstrain } from "../components/EditableTextEntry";
import EditableToggle from "../components/EditableTableToggle";
import StringList from "../components/StringList";
import EditableRow from "../components/EditableRow";

export const listConvert = (l: string[], m: number): string => {
  m -= 3;
  if (l.length <= 0) return "";
  const full = l.join(", ");
  if (full.length <= m) return full;
  const part = full.substring(0, m + 1);
  const i = part.lastIndexOf(", ");
  return part.substring(0, i) + "...";
}

export default () => {
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => populateTable(), [setTasks]);

  const populateTable = () => { getAllTasks().then(setTasks) };
  useEffect(() => populateTable(), [setTasks]);

  const [lines, setLines] = useState<JSX.Element[]>([]);

  const [sort, setSort] = useState<string>("endDate");
  const [backwards, setBackwards] = useState<boolean>(false);

  const idInt = (t: Task): number => parseInt(t.identifier.replace("TORQ-", ""));

  const priorityLevels = {
    [Priority.HIGHEST]: 1,
    [Priority.HIGH]: 2,
    [Priority.MID]: 3,
    [Priority.LOW]: 4,
    [Priority.LOWEST]: 5,
  };

  const priorityLevel = (p: Priority) => priorityLevels[p ?? Priority.MID];

  // This would be better implemented as a function that returns a sorting function.
  // Each sorting function could be individually defined.
  const sortFunction = (a: Task, b: Task): number => {
    if (sort == "")
      return idInt(a) - idInt(b);
    const av = a[sort as keyof Task];
    const bv = b[sort as keyof Task];

    if (sort.includes("Date"))
      return (new Date(av as string)).getTime() - (new Date(bv as string)).getTime();

    if (sort == "priority")
      return priorityLevel(a.priority) - priorityLevel(b.priority);

    if (sort == "assignees")
      // return (av ?? []).length - (bv ?? []).length; 
      return (av ?? [""])[0].localeCompare((bv ?? [""])[0]);

    return (av as string).localeCompare(bv as string);
  }

  const sortFunctionBackwards = (a: Task, b: Task): number => backwards ? -sortFunction(a, b) : sortFunction(a, b);

  const updateTable = () =>
    setLines((tasks ?? []).filter(createSearchFilter(search)).sort(sortFunctionBackwards).map((task, id) => {
      return <TaskLineItem inputTask={task} key={id}></TaskLineItem>;
    }));

  const search = useSearch(updateTable);

  useEffect(() => updateTable(), [tasks, sort, backwards]);

  const replaceTask = (task: Task) => setTasks([
    ...(tasks ?? []).filter((t: Task) => t.identifier != task.identifier), task
  ]);

  const TaskLineItem = ({ inputTask }: { inputTask: Task }) => {

    const [task, setTask, modified, handleUpdateField, setModified] = useTaskState(inputTask);

    const [timeoutHandle, setTimeoutHandle] = useState<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
      if (modified) {
        replaceTask(task);
        if (timeoutHandle !== undefined) {
          clearTimeout(timeoutHandle);
        }
        setTimeoutHandle(setTimeout(async () => {
          const res = await updateTask(task);
        }, 5000));
      }
    }, [task]);

    useBeforeUnload(useCallback(async () => {
      if (modified) {
        const res = await updateTask(task);
      }
    }, [updateTask, task]));

    return (
      <tr>
        <td>
          <a className="text-tbl-entry" href={"/task/" + task.identifier}>{task.identifier}</a>
        </td>

        {/* <EditableTableTextEntry
          defaultValue={task.name ?? ""}
          size="sm"
          onChange={handleUpdateField}
          name="name"
          length={40}
        /> */}

        <EditableToggle
          editor={<Form.Control autoComplete="off" size="sm" type="text" 
            value={task.name ?? ""} className={"ete-left"}
            onChange={handleUpdateField} name="name" />}
          display={<span className="ete-left text-tbl-entry">{stringConstrain(task.name ?? "", 40)}</span>}
        />      
        
        {/* <EditableTableTextEntry
          defaultValue={task.project ?? ""}
          size="sm"
          onChange={handleUpdateField}
          name="project"
          length={25}
        /> */}

        <EditableToggle
          editor={<Form.Control autoComplete="off" size="sm" type="text" 
            value={task.project ?? ""} className={"ete-left"}
            onChange={handleUpdateField} name="project" />}
          display={<span className="ete-left text-tbl-entry">{stringConstrain(task.project ?? "", 25)}</span>}
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

        {/* <td className="text-tbl-entry">{listConvert(task.assignees ?? [], 25)}</td> */}

        <EditableToggle
          editor={<StringList defaultValue={task.assignees ?? []} onChange={handleUpdateField} name="assignees"/>}
          display={listConvert(task.assignees ?? [], 25)}
        />

        {/* <td>{dateConvert(task.startDate)}</td> */}
        {/* <td style={{color: new Date(task.endDate) < new Date() ? "#FF726B" : "#FFFFFF"}}>{dateConvert(task.endDate)}</td> */}
        <td className="date-col"><Form.Control autoComplete="off" size="sm" type="date" value={task.startDate}
          onChange={handleUpdateField} name="startDate" /></td>
        <td className="date-col"><Form.Control autoComplete="off" size="sm" type="date" value={task.endDate}
          onChange={handleUpdateField} name="endDate" 
          className={new Date(task.endDate) < new Date() ? "overtime" : ""}/></td>

        </tr>
    );
  };

  const updateSortField = (e: any) => {
    const f = e.target.name;
    if (f === sort) {
      setBackwards(!backwards);
    } else {
      setSort(e.target.name);
      setBackwards(false);
    }
  }

  const sortColor = (f: string) => f === sort ? (backwards ? "danger" : "success") : "secondary";
  const sortSymbol = (f: string) => backwards && f === sort ? "▼" : "▲";

  const ColHead = ({ name, field, width }: { name: string, field: string, width?: string }) => (
    <th style={{width: width}} className="col-head">
      <span className="flt-left">{name}</span>
      <Button variant={sortColor(field)} size="sm" className="sort-btn flt-right" onClick={updateSortField} name={field}>{sortSymbol(field)}</Button>
    </th>
  );

  return (
    <>
      <Header fluid/>
      <SearchMenu search={search}/>
      <br></br>
      <Container fluid>
        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <tr>
              <ColHead name={"Task ID"} field={"identifier"} width="8rem"/>
              <ColHead name={"Task Name"} field={"name"}/>
              <ColHead name={"Project"} field={"project"}/>
              <ColHead name={"Priority"} field={"priority"}/>
              <ColHead name={"Subteam"} field={"subteam"}/>
              <ColHead name={"Status"} field={"status"}/>
              <ColHead name={"Assignees"} field={"assignees"}/>
              <ColHead name={"Start"} field={"startDate"}/>
              <ColHead name={"End"} field={"endDate"}/>
            </tr>
          </thead>
          <tbody>
            <EditableRow setTasks={setTasks}/>
            {lines}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
