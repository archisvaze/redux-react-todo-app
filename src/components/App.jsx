import Todo from "./Todo";
import { useSelector, useDispatch } from 'react-redux';
import { save, add, toggle, showCompleted, showActive, showAll } from "../slices/todoSlice"
import { useEffect } from "react";


function App(props) {

    const dispatch = useDispatch();
    const state = useSelector(state => state.todoState)


    useEffect(() => {
        localStorage.setItem("redux-todo-state", JSON.stringify(state))
    }, [state])

    
    let completed = 0;
    let active = 0
    for (let obj of state.todos) {
        if (obj.completed) completed++
    }
    active = state.todos.length - completed;

    return (
        <div className={"main " + state.theme}>
            <div className="container">
                <button onClick={() => dispatch(toggle())} className="toggle">{state.theme}</button>
                <div className="input-container">
                    <input onChange={(e) => dispatch(save(e.target.value))} type="text" value={state.saved} />
                    <button onClick={(e) => dispatch(add(state.saved))}>add</button>
                </div>


                <div className="todos-container">
                    {state.flag === 'all' ? state.todos.map(obj => {
                        return (
                            <Todo key={obj.id} obj={obj} />
                        )
                    }) : state.flag === 'active' ? state.todos.map(obj => {
                        if (obj.completed === false) {
                            return (
                                <Todo key={obj.id} obj={obj} />
                            )
                        } else return (<></>)
                    }) : state.todos.map(obj => {
                        if (obj.completed === true) {
                            return (
                                <Todo key={obj.id} obj={obj} />
                            )
                        } else return (<></>)
                    })
                    }
                </div>

                <div className="actions">
                    <button onClick={() => dispatch(showAll())} className="all">all</button>
                    <button onClick={() => dispatch(showActive())} className="active">{active}active</button>
                    <button onClick={() => dispatch(showCompleted())} className="completed">{completed}completed</button>
                </div>
            </div>

        </div>
    )
}

export default App;