import React from 'react';
import './Todo.scss';

const todos = [
  {
    name: 'Limpar a casa',
    isDone: true,
  },
  {
    name: 'Fazer compras',
    isDone: false,
  },
  {
    name: 'Fazer compras...',
    isDone: false,
  },
];

export default function TodoList() {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <div className="todo">
          <input type="checkbox" />
          <span className={todo.isDone ? 'done' : ''}>{todo.name}</span>
        </div>
      ))}
    </div>
  );
}
