import Todo from "./interfaceTodo";

interface Card{
    id: string,
    date: string,
    arrayTodo: Array<Todo>;
}

export default Card