import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCornerDownRight, FiXSquare } from 'react-icons/fi';

import pageTransitionUpDown from '../utils/pageTransitionUpDown';
import Todo from '../utils/interfaceTodo';
import Card from '../utils/interfaceCard';

import '../styles/components/todo_list.css';

export default function Todolist(){

    const [mensage, setMensage] = useState('');
    
    const [realCard, setRealCard] = useState<Card>();

    const victory_fanfare = new Audio(require('../assets/victory_fanfare.mp3'));

    const [controlState, setControlState] = useState(false);

    let getArrayURL = window.location.href.split("/"); 
    let takeItem = getArrayURL[getArrayURL.length-1]
    let item = localStorage.getItem(takeItem);

    useEffect(() => {

        if(item === null){
            return;
        }        

        setRealCard(JSON.parse(item));

    }, [item])

    function handleTodo(e: React.FormEvent){

        e.preventDefault() 
        
        let takeID = 0;

        let i = 0;

        if(realCard === undefined){
            return
        }

        while( i < realCard.arrayTodo.length){
            if(realCard.arrayTodo[i].id === takeID)
                takeID = realCard.arrayTodo.length + localStorage.length * randomIntFromInterval(1, 1000);

            i++;
        }

        const data : Todo = {
            id: takeID,
            mensage: mensage,
            isComplete: false
        }

        realCard.arrayTodo.push(data)

        setRealCard(realCard);

        localStorage.setItem(realCard.id,JSON.stringify(realCard));

        setMensage('');
    }

    function randomIntFromInterval(min: number, max: number) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function setCompleteOrNot(todo: Todo){

        todo.isComplete ? todo.isComplete = false : todo.isComplete = true;

        const id = realCard?.id.toString();

        if(id === undefined){
            return;
        }

        localStorage.setItem(id, JSON.stringify(realCard));

        //Changing State;
        !controlState ? setControlState(true) : setControlState(false);

        let aux = 0;


        // to know when play victory_fanfare

        if(realCard !== undefined){
            realCard.arrayTodo.map(todo => {
                if(todo.isComplete){
                    aux++
                }
                return 1; // just to make warning gone.
        })
            if(aux === realCard?.arrayTodo.length){ 
                victory_fanfare.play();
                victory_fanfare.volume = 0.25;
            }
        }
    }

    function deleteTodo(indexTodo: number){

        const firstHalf = realCard?.arrayTodo.slice(0,indexTodo);
        const lastHalf = realCard?.arrayTodo.slice(indexTodo+1, realCard.arrayTodo.length);

        if (firstHalf === undefined || lastHalf === undefined || realCard?.id === undefined){
            return;
        }

        const newListTodo = firstHalf.concat(lastHalf);

        realCard.arrayTodo = newListTodo;
        
        localStorage.setItem(realCard.id, JSON.stringify(realCard));

        !controlState ? setControlState(true) : setControlState(false);
    }

    return (

            <div className="wrapper">
                <motion.div
                    initial="out"
                    animate="in"
                    exit="out"
                    variants={pageTransitionUpDown}
                    className="list">

                    <div className="flex">
                        <form onSubmit={handleTodo}>
                            <input 
                                id="btnsubmit" 
                                type="text" placeholder="To do..." 
                                autoComplete="off" 
                                value={mensage} onChange={e => setMensage(e.target.value)}/>
                                
                            <button type="submit"><FiCornerDownRight className="enter"/></button>
                        </form>
                    </div>

                    {  
                     
                        realCard?.arrayTodo.map((todo, index) => {
                            return (

                                <div 
                                    className={todo.isComplete ? "card-complete" : "card" }
                                    key={todo.id}>
                                    
                                    <div className="todo">
                                        
                                        <input 
                                            type="checkbox" 
                                            checked={todo.isComplete}
                                            readOnly
                                            name="check" 
                                            onClick={() => setCompleteOrNot(todo)} id={todo.id.toString()}
                                        />

                                        <label htmlFor={todo.id.toString()}>{todo.mensage}</label>
                                        
                                    </div>


                                    <div className="buttons">

                                        <button className="delete-button" onClick={() => deleteTodo(index)}><FiXSquare size={15} className="delete-icon"/></button>
                                        
                                    </div>

                                </div>

                            )
                        })
                    }
                </motion.div>
            </div>
    )
}