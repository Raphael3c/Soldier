import React from 'react';
import Todo from '../../utils/interfaceTodo';

export default function Span(props: any){

    let i = 0;

    props.arrayTodo.map((todo: Todo) => {if(todo.isComplete) i++; return 1});

    return(
        <div>
            {

                props.arrayTodo.length ? 
                    <span>

                        To do: {i}/{props.arrayTodo.length}

                    </span>
                :
                    <span>

                        Nothing Yet

                    </span>
                
            }

        </div>
    )
}