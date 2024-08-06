import React, { useState, useEffect } from 'react';
import useStore from '../store/store';
import axios from 'axios';
import { Modal, Button, Input, Form } from 'antd';
import './Todo.css';

const Todo = () => {
  const { todos, fetchTodos, addTodo, updateTodo, deleteTodo } = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = () => {
    setEditingTodo(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    form.setFieldsValue(todo);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        if (editingTodo) {
          const updatedTodo = { ...editingTodo, ...values };
          updateTodo(updatedTodo); 
          axios.put(`http://localhost:3000/todos/${updatedTodo.id}`, updatedTodo)
            .then(() => {
              form.resetFields();
              setIsModalVisible(false); 
              fetchTodos(); 
            })
            .catch(error => {
              console.error("There was an error updating the todo!", error);
            });
        } else {
          const newTodo = { id: Date.now(), ...values, completed: false };
          addTodo(newTodo); 
          axios.post('http://localhost:3000/todos', newTodo)
            .then(() => {
              form.resetFields();
              setIsModalVisible(false); 
              fetchTodos(); 
            })
            .catch(error => {
              console.error("There was an error adding the todo!", error);
            });
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteTodo = (id) => {
    axios.delete(`http://localhost:3000/todos/${id}`)
      .then(() => {
        deleteTodo(id); 
        fetchTodos();
      })
      .catch(error => {
        console.error("There was an error deleting the todo!", error);
      });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <Button type="primary" onClick={handleAddTodo}>Add Todo</Button>
      <Modal
        title={editingTodo ? "Edit Todo" : "Add New Todo"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please input the first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please input the last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="group"
            label="Group"
            rules={[{ required: true, message: 'Please input the group!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="profession"
            label="Profession"
            rules={[{ required: true, message: 'Please input the profession!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Group</th>
            <th>Profession</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.firstName}</td>
              <td>{todo.lastName}</td>
              <td>{todo.group}</td>
              <td>{todo.profession}</td>
              <td>
                <Button onClick={() => handleEditTodo(todo)}>Edit</Button>
                <Button danger onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
