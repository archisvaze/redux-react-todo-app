import Todo from "./Todo";
import { useSelector, useDispatch } from 'react-redux';
import { save, add, toggle, showCompleted, showActive, showAll, clear } from "../slices/todoSlice"
import { useEffect } from "react";
import sun from "../sun.svg"
import moon from "../moon.svg"
import trash_light from "../trash-light.svg"
import trash_dark from "../trash-dark.svg";
import light from "../light.jpg";
import dark from "../dark.jpg";


function App(props) {

    const dispatch = useDispatch();
    const state = useSelector(state => state.todoState)


    useEffect(() => {
        localStorage.setItem("redux-todo-state", JSON.stringify(state))
    }, [state])


    //get date
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let date = new Date()


    let completed = 0;
    let active = 0
    for (let obj of state.todos) {
        if (obj.completed) completed++
    }
    active = state.todos.length - completed;

    return (
        <div className={"main " + state.theme} style={{ backgroundImage: state.theme === "light" ? `url(${light})` : `url(${dark})` }}>

            <div className="container">

                <div className="header">TODOs</div>

                <div className="date">{` ${days[date.getDay()]}  ${months[date.getMonth()]} ${date.getDate()}`}</div>

                <img src={state.theme === "light" ? sun : moon} onClick={() => dispatch(toggle())} className="toggle" alt=""></img>
                <div className="input-container">
                    <input onChange={(e) => dispatch(save(e.target.value))} type="text" onKeyDown={(e) => e.key === "Enter" ? dispatch(add(state.saved)) : ""} value={state.saved} placeholder ="Add a new Todo" />
                    <button onClick={(e) => dispatch(add(state.saved))}>+</button>
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
                    <button onClick={() => dispatch(showAll())} className="all">All</button>
                    <button onClick={() => dispatch(showActive())} className="active">{active} Active</button>
                    <button onClick={() => dispatch(showCompleted())} className="completed">{completed} Completed</button>
                </div>

                <img onClick={() => dispatch(clear())} className="trash" src={state.theme === "light" ? trash_light : trash_dark} alt="" />
            </div>

        </div>
    )
}

export default App;