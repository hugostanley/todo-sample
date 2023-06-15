import { LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: any;
}
export const Label = (props: LabelProps) => {
  return (
    <label {...props} className={`text-gray-700 text-sm ${props.className}`}>{props.children}</label>
  )
}
