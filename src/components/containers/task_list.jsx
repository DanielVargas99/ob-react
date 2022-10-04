import React, { useState } from 'react';
import { levels } from '../../models/levels.enum';
import { Task } from '../../models/task.class';
import TaskComponent from '../pure/task';
import TaskFormik from '../pure/forms/taskFormik';

// Importamos la hoja de estilos de task.scss
import '../../styles/task.scss';

const TaskListComponent = () => {
    
    const defaultTask1 = new Task('Example1', 'Description1', false, levels.NORMAL);
    const defaultTask2 = new Task('Example2', 'Description2', true, levels.URGENT);
    const defaultTask3 = new Task('Example3', 'Description3', false, levels.BLOCKING);

    // Estado inicial de componente
    const [tasks, setTasks] = useState([defaultTask1, defaultTask2, defaultTask3]);

    function completeTask(task) {
        // Get the current task index of the list
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks[index].completed = !tempTasks[index].completed;
        // We update the state of the component with the new list of tasks and it will update the
        // iteration of the tasks in order to show the task updated
        setTasks(tempTasks);
    }

    function deleteTask(task) {
        // Get the current task index of the list
        const index = tasks.indexOf(task);
        const tempTasks = [...tasks];
        tempTasks.splice(index, 1);
        setTasks(tempTasks);
    }

    function addTask(task) {
        // Get the current task index of the list
        const tempTasks = [...tasks];
        tempTasks.push(task);
        setTasks(tempTasks);
    }

    const Table = () => {
        return(
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Title</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Priority</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { tasks.map((task, index) => {
                        return (
                        <TaskComponent 
                            key={index} 
                            task={task} 
                            complete={completeTask}
                            remove={deleteTask}
                        />)
                        })
                    }
                </tbody>
            </table>
        )
    }

    let taskTable;
    if (tasks.length > 0) {
        taskTable = <Table />;
    } else {
        taskTable = (
          <div>
            <h3>There are no tasks to show</h3>
            <h4>Please, create one</h4>
          </div>
        );
    }

    return (
      <div>
        <div className='col-12 mt-4'>
          <div className='card'>
            {/* Card Header {title} */}
            <div className='card-header p-3'>
              <h5>Your Tasks:</h5>
            </div>
            {/* Card Body {content} */}
            <div className='card-body' data-mdb-perfect-scrollbar='true' style={{ position: 'relative', height: '400px' }}>
              {/* TODO: Add loading Spinner */}
              {taskTable}
            </div>
          </div>
        </div>
        <TaskFormik add={addTask} length={tasks.length} />
      </div>
    );
};

export default TaskListComponent;
