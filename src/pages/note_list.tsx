import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion';
import {FiArrowDown, FiPlus, FiXCircle} from 'react-icons/fi';

import pageTransitionUpDown from '../utils/pageTransitionUpDown';
import pageTransitionLeftRight from '../utils/pageTransitionLeftRight';
import Card from '../utils/interfaceCard';

import Span from './components/span';

import '../styles/components/note_list.css';

export default function NoteList(){

  const [list, setList] = useState<Array<Card>>([])

  const [controlState] = useState(false);

  useEffect(()=>{

    setList(getCards());

  },[ controlState ])


  function getCards(){

    let cards: Array<Card> = []

    const keys = Object.keys(localStorage);

    let i = keys.length;
  
    while ( i-- ) {

      let item = localStorage.getItem(keys[i]) || '{}';

      cards.push( JSON.parse(item) );

    }

    cards.sort(function(a : Card, b : Card){
      let date1 = a.date.split("/");
      let date2 = b.date.split("/");

      let numberDateString0 = date1[2] + date1[1] + date1[0];
      let numberDateString1 = date2[2] + date2[1] + date2[0];

      let NumberDate0 = Number(numberDateString0);
      let NumberDate1 = Number(numberDateString1);

      return NumberDate0 - NumberDate1;
    })

    return cards
  }

  function deleteCard(card: Card){
    localStorage.removeItem(card.id);
    window.location.reload();
  }

  return(
    <div className="content">

      <ul>

        {

          list.map(card => {
            return(
              <li key={card.id} id={card.id}>

                <motion.div 
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransitionUpDown}
                  className="title-progress">
      
                  <div className='note'>

                    <motion.div 
                      initial="out"
                      animate="in"
                      exit="out"
                      variants={pageTransitionUpDown}
                      className="title-progress">
      
                      <h1>{card.date}</h1>

                      <Span arrayTodo={card.arrayTodo}></Span>

                      <Link to={`/todolist/${card.id}`} className='button'><FiArrowDown size={20}/></Link>

                      <button className="delete-button" onClick={() => deleteCard(card)}><FiXCircle size={28}/></button>
      
                    </motion.div>
      
                  </div>
      
                </motion.div>
    
              </li>
            )

          })

        }

    </ul>

      <motion.div
        initial="out"
        animate="in"
        exit="out"        
        variants={pageTransitionLeftRight}>
          
        <Link  to='/createNote'><FiPlus className='create-button' size={38}></FiPlus></Link>    

      </motion.div>
      
    </div>
  );
}