import { FormEvent, useEffect, useState } from "react"
import generateId from "../utils/generateId";
import { UserDetails } from "./Login";
import { useNavigate } from "react-router-dom";
import { globals } from "../config/globals";
import { Edit, LogOut, PlusCircle, Trash, User, XCircle } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Label } from "../components/Label";

interface TodoItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  createdByUserId: string;
  createdDate: string;
  isDone: string | boolean;
}

interface CommentItem {
  id: string;
  todoId: string;
  createdByUserId: string;
  text: string;
  createdDate: string;
}

export default function Home() {
  const currentUser: UserDetails = JSON.parse(localStorage.getItem("currentUser") || "null")
  const [isNewTodoModalOpen, setIsNewTodoModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isEditCommentOpen, setIsEditCommentOpen] = useState(false)
  const [editingCommentItem, setEditingCommentItem] = useState<CommentItem>({
    createdByUserId: '',
    id: '',
    todoId: '',
    createdDate: '',
    text: ""
  })
  const [editingTodoItem, setEditingTodoItem] = useState<TodoItem>({
    id: "",
    title: "",
    description: "",
    deadline: "",
    createdByUserId: "",
    createdDate: '',
    isDone: false,
  })
  const users: UserDetails[] = JSON.parse(localStorage.getItem("users") || "null")
  const [newTodoState, setNewTodoState] = useState<TodoItem>({
    id: "",
    title: "",
    description: "",
    deadline: "",
    createdByUserId: "",
    createdDate: '',
    isDone: false,
  })
  const [focusedTodo, setFocusedTodo] = useState<TodoItem>()

  const [todoList, setTodoList] = useState<TodoItem[] | null>(JSON.parse(localStorage.getItem("list") || "null"))
  const [comments, setComments] = useState<CommentItem[] | null>(JSON.parse(localStorage.getItem('comments') || "null"))
  const [newCommentState, setNewCommentState] = useState<CommentItem>({
    createdByUserId: '',
    id: '',
    todoId: '',
    createdDate: '',
    text: ""
  })
  const navigate = useNavigate()

  function handleCommentInputOnChange(key: keyof CommentItem, value: string) {
    setNewCommentState(state => {
      return { ...state, [`${key}`]: value }
    })
  }

  function handleInputOnChange(key: keyof TodoItem, value: string) {
    setNewTodoState(state => {
      return { ...state, [`${key}`]: value }
    })
  }

  function handleEditInputOnChange(key: keyof TodoItem, value: string) {
    setEditingTodoItem(state => {
      return { ...state, [`${key}`]: value }
    })
  }

  function handleCommentEditChange(key: keyof CommentItem, value: string) {
    setEditingCommentItem(state => {
      return { ...state, [`${key}`]: value }
    })
  }

  function handleDelete(id: string) {
    setTodoList(state => {
      if (state !== null) {
        return state.filter(todo => todo.id !== id)
      }
      return state
    })
  }

  function handleCommentDelete(id: string) {
    setComments(state => {
      if (state) {
        return state.filter(comment => comment.id !== id)
      }
      return state
    })
  }

  function handleCommentSubmit(e: FormEvent<HTMLFormElement>, todoId: string) {
    e.preventDefault()
    if (currentUser) {
      const newId = generateId("comment")
      const comment: CommentItem = {
        ...newCommentState,
        createdDate: Date.now().toString(),
        createdByUserId: currentUser.id,
        todoId,
        id: newId
      }

      setComments(state => {
        if (state) {
          return [...state, comment]
        } else {
          return [comment]
        }
      })

    } else {
      alert('User not logged in')
      navigate(globals.FE_ENDPOINTS.LOGIN)
    }

    setNewCommentState({
      createdByUserId: '',
      id: '',
      todoId: '',
      createdDate: '',
      text: ""
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (currentUser) {
      const newId = generateId("todo")

      const newTodo: TodoItem = {
        ...newTodoState,
        id: newId,
        createdDate: Date.now().toString(),
        createdByUserId: currentUser.id
      }

      setTodoList(state => {
        if (state) {
          return [...state, newTodo]
        }
        return [newTodo]
      })
    } else {
      alert('User not logged in')
      navigate(globals.FE_ENDPOINTS.LOGIN)
    }

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

  function handleSignout() {
    localStorage.setItem('isLoggedIn', "false")
    localStorage.setItem('currentUser', '{}')
    navigate(globals.FE_ENDPOINTS.LOGIN)
  }

  function handleEditModalClose() {
    setIsEditModalOpen(false)
    setEditingTodoItem({
      id: "",
      title: "",
      description: "",
      deadline: "",
      createdByUserId: "",
      createdDate: '',
      isDone: false,
    })
  }
  function handleNewTodoModalClose() {
    setIsNewTodoModalOpen(false)
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

  function handleEditClick(todo: TodoItem) {
    setEditingTodoItem(todo)
    setIsEditModalOpen(true)
  }

  function handleEditSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTodoList(state => {
      if (state) {
        return state.map(todo => {
          if (todo.id === editingTodoItem.id) {
            return editingTodoItem
          } else {
            return todo
          }
        })
      } else {
        return state
      }
    })

    setIsEditModalOpen(false)
    setEditingTodoItem({
      id: "",
      title: "",
      description: "",
      deadline: "",
      createdByUserId: "",
      createdDate: '',
      isDone: false,
    })
  }

  function handleEditCommentClick(comment: CommentItem) {
    setEditingCommentItem(comment)
    setIsEditCommentOpen(true)
  }

  function handleEditCommentSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (currentUser) {
      setComments(state => {
        if (state) {
          return state.map(comment => {
            if (comment.id === editingCommentItem.id) {
              return editingCommentItem
            } else {
              return comment
            }
          })
        } else {
          return state
        }
      })
    }

    setIsEditCommentOpen(false)
    setEditingCommentItem({
      createdByUserId: '',
      id: '',
      todoId: '',
      createdDate: '',
      text: ""
    })
  }

  useEffect(() => {
    if (todoList) {
      localStorage.setItem('list', JSON.stringify(todoList))
    }
  }, [todoList])

  useEffect(() => {
    if (comments) {
      localStorage.setItem('comments', JSON.stringify(comments))
    }

  }, [comments])

  return (
    <div className="w-screen h-screen flex justify-center relative">
      <section className="w-[375px]">
        {!todoList || todoList.length < 1 && (
          <div className="p-6">
            <p className="text-2xl">Please click the add button below and add new todo tasks.</p>
          </div>
        )}
        {todoList && todoList.map((todo, idx) => {
          const user = users.find(user => user.id === todo.createdByUserId)
          return (
            <div key={idx} className="w-full p-4 h-fit border-b border-b-slate-300">
              <div className="flex items-center gap-1">
                <User />
                {user && (
                  <h1 className="font-bold text-sm">@{user.username}</h1>
                )}
              </div>
              <div className="">
                <h1 className="font-bold text-xl">{todo.title}</h1>
                <p>{todo.description}</p>
              </div>
              <div className="flex w-full justify-end gap-2 ">
                <Button className="text-xs" onClick={() => handleEditClick(todo)}>
                  <Edit size={15} />
                </Button>
                <Button className="text-xs bg-red-700" onClick={() => handleDelete(todo.id)}>
                  <Trash size={15} />
                </Button>
              </div>
              <form onSubmit={e => handleCommentSubmit(e, todo.id)} className="w-full my-2">
                <Input placeholder="Add a comment" type="text" value={focusedTodo && focusedTodo.id === todo.id ? newCommentState.text : ''} onChange={e => handleCommentInputOnChange("text", e.target.value)} onFocus={() => setFocusedTodo(todo)} />
              </form>
              <p className="text-sm text-slate-700 italic">Comments</p>
              {comments && comments.map(comment => {
                if (comment.todoId === todo.id) {
                  const byCurrentUser = comment.createdByUserId === currentUser.id
                  return (
                    <div className="flex flex-col border border-b-slate-300 m-1 rounded-md p-2 leading-[0.5]">
                      <div className="text-sm ">
                        <div className="flex">
                          <User size={15} />
                          <p className="font-bold ">@{users && users.find(user => user.id === comment.createdByUserId)?.username}</p>
                        </div>
                        <div>
                          {isEditCommentOpen && editingCommentItem && editingCommentItem.id === comment.id ? (
                            <form onSubmit={handleEditCommentSubmit}>
                              <input className="border border-slate-200" defaultValue={editingCommentItem.text} onChange={e => handleCommentEditChange("text", e.target.value)} />
                            </form>
                          ) : (
                            <p>{comment.text}</p>
                          )}
                        </div>
                      </div>
                      {byCurrentUser && (
                        <div className="flex gap-2">
                          <button className="text-xs underline italic text-slate-700" onClick={() => handleEditCommentClick(comment)}>Edit</button>
                          <button onClick={() => handleCommentDelete(comment.id)} className="text-xs underline italic text-slate-700">Delete</button>
                        </div>
                      )}
                    </div>
                  )
                }
              })}
            </div>
          )
        })}
      </section>
      <LogOut className="fixed bottom-3 cursor-pointer right-4 lg:right-[35%]" onClick={handleSignout} size={30} />
      <Modal title={"New"} isOpen={isNewTodoModalOpen} handleClose={handleNewTodoModalClose} >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" value={newTodoState.title} onChange={e => handleInputOnChange("title", e.target.value)} />
          </div>
          <div className="flex flex-col py-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" type="text" value={newTodoState.description} onChange={e => handleInputOnChange("description", e.target.value)} />
          </div>
          <div className="flex flex-col py-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input id="deadline" type="date" value={newTodoState.deadline} onChange={e => handleInputOnChange("deadline", e.target.value)} />
          </div>
          <Button type="submit" className="w-full">Add</Button>
        </form>
      </Modal>
      <Modal title={"Edit"} isOpen={isEditModalOpen} handleClose={handleEditModalClose} >
        <form onSubmit={handleEditSubmit}>
          <div className="flex flex-col py-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" defaultValue={editingTodoItem.title} onChange={e => handleEditInputOnChange("title", e.target.value)} />
          </div>
          <div className="flex flex-col py-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" type="text" defaultValue={editingTodoItem.description} onChange={e => handleEditInputOnChange("description", e.target.value)} />
          </div>
          <div className="flex flex-col py-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input id="deadline" type="date" defaultValue={editingTodoItem.deadline} onChange={e => handleEditInputOnChange("deadline", e.target.value)} />
          </div>
          <Button type="submit" className="w-full">Edit</Button>
        </form>
      </Modal>
      {!isNewTodoModalOpen && (
        <PlusCircle onClick={() => setIsNewTodoModalOpen(true)} className=" cursor-pointer fixed bottom-2 fill-gray-900 text-white left-[46%]" size={40} />
      )}
    </div>
  )
}

interface ModalProps {
  isOpen: boolean;
  children: any;
  title: string;
  handleClose: () => void;
}


function Modal({ isOpen, children, title, handleClose }: ModalProps) {
  return (
    <>
      {isOpen && (
        <div className="z-10 fixed inset-0 bg-gray-500 bg-opacity-75 h-screen w-screen flex justify-center items-center">
          <div className="w-[80%] h-fit p-4 pb-6 bg-white border-slate-200 border rounded-md shadow-lg">
            <div className="flex justify-between">
              <h1 className='text-2xl font-bold'>{title}</h1>
              <XCircle className="cursor-pointer" onClick={handleClose} />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  )
}

