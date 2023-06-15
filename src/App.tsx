import { FormEvent, useState } from "react"
import { Outlet } from "react-router-dom"

function generateId() {
  return "id" + Math.random().toString(16).slice(2)
}

interface TodoItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  createdByUserId: string;
  createdDate: string;
  isDone: string | boolean;
}

function App() {

  return (
    <>
      <Home />
      <Outlet />
    </>
  )
}

function Home() {
  const [newTodoState, setNewTodoState] = useState<TodoItem>({
    id: "",
    title: "",
    description: "",
    deadline: "",
    createdByUserId: "",
    createdDate: '',
    isDone: false,
  })

  const [todoList, setTodoList] = useState<TodoItem[] | null>(null)

  function handleInputOnChange(key: keyof TodoItem, value: string) {
    setNewTodoState(state => {
      return { ...state, [`${key}`]: value }
    })
  }

  function handleDelete(id: string){
    setTodoList(state=> {
      if(state !== null){
        return state.filter(todo=> todo.id !== id)
      } 
      return state
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newId = generateId()

    setTodoList(state => {
      if (state) return [...state, { ...newTodoState, id: newId }]
      return [{ ...newTodoState, id: newId }]
    })

    setNewTodoState({
      id: "",
      title: "",
      description: "",
      deadline: "",
      createdByUserId: "",
      createdDate: '',
      isDone: false,
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" value={newTodoState.title} onChange={e => handleInputOnChange("title", e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input id="description" type="text" value={newTodoState.description} onChange={e => handleInputOnChange("description", e.target.value)} />
        </div>
        <div>
          <label htmlFor="deadline">Deadline</label>
          <input id="deadline" type="date" value={newTodoState.deadline} onChange={e => handleInputOnChange("deadline", e.target.value)} />
        </div>
        <button type="submit">Submit</button>

      </form>
      {todoList && todoList.map((todo, idx) => (
        <div key={idx}>
          <h1>{idx + 1}.</h1>
          <h1>{todo.title}</h1>
          <h1>{todo.createdDate}</h1>
          <button type="button">Edit</button>
          <button type="button" onClick={()=> handleDelete(todo.id)}>Delete</button>
        </div>
      ))}

    </div>
  )
}

export default App
