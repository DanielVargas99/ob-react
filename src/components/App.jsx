import React from 'react';
import TaskListComponent from './containers/task_list';
import '../styles/App.css';

/**
 * Función Anónima para crear un Componente principal
 * @returns {React.Component} Componente principal de nuestra aplicación
 */
const App = () => {
    return (
      <div className="App">
        <TaskListComponent />
      </div>
    );
};

export default App;
