import { useState } from "react";
import "./App.css";

import checkIcon from "./assets/icon-check.svg";
import crossIcon from "./assets/icon-cross.svg";
import moonIcon from "./assets/icon-moon.svg";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [filter, setFilter] = useState("all");

  function handleAddTodo(e) {
    if (e.key === "Enter" && todoText.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: todoText,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setTodoText("");
    }
  }

  function handleCompleteTodo(id) {
    const updatedTodos = todos.map(function (todo) {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function handleDeleteTodo(id) {
    const updatedTodos = todos.filter(function (todo) {
      return todo.id !== id;
    });

    setTodos(updatedTodos);
  }

  function handleClearCompleted() {
    const activeTodos = todos.filter(function (todo) {
      return todo.completed === false;
    });

    setTodos(activeTodos);
  }

  function getFilteredTodos() {
    if (filter === "active") {
      return todos.filter(function (todo) {
        return todo.completed === false;
      });
    }

    if (filter === "completed") {
      return todos.filter(function (todo) {
        return todo.completed === true;
      });
    }

    return todos;
  }

  const filteredTodos = getFilteredTodos();

  const itemsLeft = todos.filter(function (todo) {
    return todo.completed === false;
  }).length;

  return (
    <div className="app">

      <div className="container">

        <div className="header">
          <h1>TODO</h1>

          <button className="theme-button">
            <img src={moonIcon} alt="theme" />
          </button>
        </div>

        <div className="input-container">

          <span className="empty-circle"></span>

          <input
            type="text"
            placeholder="Create a new todo..."
            value={todoText}
            onChange={function (e) {
              setTodoText(e.target.value);
            }}
            onKeyDown={handleAddTodo}
          />

        </div>

        <div className="todo-container">

          {filteredTodos.map(function (todo) {
            return (
              <div className="todo-item" key={todo.id}>

                <button
                  className={
                    todo.completed
                      ? "check-button completed"
                      : "check-button"
                  }
                  onClick={function () {
                    handleCompleteTodo(todo.id);
                  }}
                >
                  {todo.completed && (
                    <img
                      src={checkIcon}
                      alt="check"
                    />
                  )}
                </button>

                <span
                  className={
                    todo.completed
                      ? "todo-text completed-text"
                      : "todo-text"
                  }
                >
                  {todo.text}
                </span>

                <button
                  className="delete-button"
                  onClick={function () {
                    handleDeleteTodo(todo.id);
                  }}
                >
                  <img
                    src={crossIcon}
                    alt="delete"
                  />
                </button>

              </div>
            );
          })}

          <div className="todo-footer">

            <span>
              {itemsLeft} items left
            </span>

            <div className="filters">

              <button
                className={filter === "all" ? "active-filter" : ""}
                onClick={function () {
                  setFilter("all");
                }}
              >
                All
              </button>

              <button
                className={filter === "active" ? "active-filter" : ""}
                onClick={function () {
                  setFilter("active");
                }}
              >
                Active
              </button>

              <button
                className={filter === "completed" ? "active-filter" : ""}
                onClick={function () {
                  setFilter("completed");
                }}
              >
                Completed
              </button>

            </div>

            <button
              className="clear-button"
              onClick={handleClearCompleted}
            >
              Clear Completed
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;