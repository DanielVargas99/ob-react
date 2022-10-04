import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Models
import { Task } from '../../../models/task.class';
import { levels } from '../../../models/levels.enum';

const TaskFormik = ({ add, length }) => {

    const initialValues = {
        name: '',
        description: '',
        completed: false,
        level: levels.NORMAL,
    }

    const addTaskSchema = Yup.object().shape(
        {
            name: Yup.string()
                .required('Task name is required'),
            description: Yup.string()
                .required('Task description is required'),
            level: Yup.string()
                .oneOf([levels.NORMAL, levels.URGENT, levels.BLOCKING], 'You must select a task level: NORMAL / URGENT / BLOCKING')
                .required('Task level is required')
        },
    );

    function addTask({ name, description, level }) {
        const newTask = new Task(name, description, false, level);
        add(newTask);
    }

    return (
        <div className='mt-4'>
            <h5>Add New Task</h5>
            <Formik
                initialValues={initialValues}
                validationSchema={addTaskSchema}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    addTask(values);
                }}
            >
            {({errors, touched, isSubmitting}) => (
                <Form>
                        <Field id="name" type="text" name="name" className='form-control form-control-lg' placeholder="Task Name" />
                        { /* Task Name Errors */
                            errors.name && touched.name &&
                            (<ErrorMessage name="name" component='div' />)
                        }

                        <Field id="description" type="text" name="description" className='form-control form-control-lg' placeholder="Task Description" />
                        { /* Task Description Errors */
                            errors.description && touched.description &&
                            (<ErrorMessage name="description" component='div' />)
                        }

                        <Field id="level" component="select" name="level" className='form-control form-control-lg'>
                            <option value={levels.NORMAL}>Normal</option>
                            <option value={levels.URGENT}>Urgent</option>
                            <option value={levels.BLOCKING}>Blocking</option>
                        </Field>
                        { /* Task Level Errors */
                            errors.level && touched.level &&
                            (<ErrorMessage name="level" component='div' />)
                        }

                        <button type="submit" className='btn-success btn-lg ms-2'>
                            {length > 0 ? 'Add New Task' : 'Create Your First Task'}
                        </button>
                        {isSubmitting ? (<p>Sending data of the new task...</p>) : null}
                </Form>
            )}
            </Formik>
        </div>
    );
};

TaskFormik.propTypes = {
    add: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
};

export default TaskFormik;
