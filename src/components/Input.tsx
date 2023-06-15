import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}
export default function Input(props: InputProps) {
  return (
    <input className={`outline-none border border-slate-300 rounded-md px-3 p-2 text-sm ${props.className}`} {...props}/>
  )
}
