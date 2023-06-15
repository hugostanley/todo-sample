import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
}

export default function Button(props: ButtonProps) {
  return (
    <button {...props} className={`inline-flex items-center justify-center bg-gray-900 px-3 py-2 rounded-md text-white shadow-lg font-semibold ${props.className}`}>{props.children}</button>
  )
}
