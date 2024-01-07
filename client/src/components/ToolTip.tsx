import { Gantt, Task as GaantTask, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import { Task } from "../data/Types";

type ToolTipComponent = React.FC<{
    task: GaantTask;
    fontFamily: string;
}>;

export const createToolTip = (taskSupplier: (arg: string) =>  Task | null): ToolTipComponent => {;
    const ttc: ToolTipComponent = ({ task, fontFamily}) => {
        const fontSize = 12;
        const style = {
            fontSize,
            fontFamily,
        };
        const trqTask = taskSupplier(task.id);
        return (
            <div className={"tooltip-bg"} style={style}>
                <p className={"tooltip-text"}>
                <b style={{ fontSize: fontSize + 8 }}>{trqTask?.priority}</b>
                     <b style={{ fontSize: fontSize + 2 }}> {trqTask?.name}</b>
                <br></br>
                Project: {trqTask?.project}
                <br></br>
                Status: {trqTask?.status}
                <br></br>
                Subteam: {trqTask?.subteam}
                <br></br>
                {task.end.getTime() - task.start.getTime() !== 0 &&
                `Duration: ${~~(
                    (task.end.getTime() - task.start.getTime()) /
                    (1000 * 60 * 60 * 24)
                )} day(s)`}
                </p>
            </div>
            );
    };
    return ttc;
}
