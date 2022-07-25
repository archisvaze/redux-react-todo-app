import React from 'react'
import { complete } from "../slices/todoSlice"
import { useDispatch } from 'react-redux';

export default function Todo(props) {
    // console.log(complete)
    // console.log(complete())
    const dispatch = useDispatch();
    let obj = props.obj;
    let tick = ""
    if (obj.completed) tick = "✔"
    return (
        <div className="todo">
            <button type="checkbox" onClick={() => dispatch(complete(obj.id))} className="complete">{tick}</button>
            <div className={`${obj.completed} content`}>{obj.content}</div>
        </div>


    )
}
