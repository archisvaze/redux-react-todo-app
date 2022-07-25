import { createSlice } from "@reduxjs/toolkit";
let initialState = {};
if (localStorage.getItem("redux-todo-state") === null) {
    initialState = { todos: [], saved: "", flag: 'all', theme: "light" };
}
else {
    initialState = JSON.parse(localStorage.getItem("redux-todo-state"))
}

const todoSlice = createSlice({
    name: "todoList",
    initialState: initialState,
    reducers: {
        save: (state, action) => {
            state.saved = action.payload;
        },
        add: (state, action) => {
            if (state.saved !== "") {
                let newTodo = { id: new Date().getTime(), content: state.saved, completed: false }
                state.todos = [newTodo, ...state.todos];
                state.saved = ""
            }
        },
        toggle: (state, action) => {
            if (state.theme === "light") state.theme = "dark";
            else state.theme = "light"
        },
        complete: (state, action) => {
            for (let obj of state.todos) {
                if (obj.id === action.payload) {
                    obj.completed = !obj.completed;
                }
            }
        },
        showCompleted: (state, action) => {
            state.flag = "completed"
        },
        showActive: (state, action) => {
            state.flag = "active"
        },
        showAll: (state, action) => {
            state.flag = "all"
        },
        clear: (state, action) => {
            for (let i = 0; i < state.todos.length; i++) {
                if (state.todos[i].completed) {
                    state.todos.splice(i, 1);
                    i--;
                }
            }
        }

    }

})


export const { save, add, toggle, complete, showCompleted, showAll, showActive, clear } = todoSlice.actions;
export default todoSlice.reducer;