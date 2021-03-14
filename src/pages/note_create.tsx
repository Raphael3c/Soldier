import React, {FormEvent, useState} from 'react';
import { motion } from 'framer-motion';
import pageTransitionUpDown from '../utils/pageTransitionUpDown';
import { FiPlus } from 'react-icons/fi';
import DatePicker from 'react-datepicker';

import {useHistory} from 'react-router-dom'

import "react-datepicker/dist/react-datepicker.css";
import '../styles/components/note_create.css';
import Card from '../utils/interfaceCard';
import randomIntFromInterval from "../utils/randomIntFromInterval";

export default function NoteCreate(){

  const history = useHistory();

  const [startDate, setStartDate] = useState(new Date());

  function saveCardTodo(e: FormEvent){
    e.preventDefault();

    const dateNote = startDate.toLocaleDateString()

    let id = localStorage.length + 1;

    // Verifies if ID is already in use. If is, then take another ID. 
    if(localStorage.getItem(id.toString()) !== null){
      id = localStorage.length * randomIntFromInterval(1, 1000) + localStorage.length;
    }
    
    const data: Card = {
      id: id.toString(),
      date: dateNote,
      arrayTodo: []
    }

    localStorage.setItem(data.id, JSON.stringify(data));

    history.push("/")

  }

  return(

    <div className="organize"> 

      <motion.div 
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransitionUpDown}>

        <div className="create-note">

          <form onSubmit={saveCardTodo}>

            <label htmlFor="date">When?</label>

            <DatePicker 
              id="date" 
              dateFormat="dd/MM/yyyy" 
              selected={startDate} onChange={(date: Date) => setStartDate(date)}
              minDate={new Date()}> 
            </DatePicker>
            
            <button type="submit" className="button-send"><FiPlus size={25}></FiPlus></button>

          </form>

        </div>

    </motion.div>

    </div>

  );

}