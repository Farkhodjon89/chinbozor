import React from 'react'

const defaultStyle = 'block text-center py-14 px-20 text-17 leading-19 text-white-100 font-medium bg-f-red-500 rounded hover:bg-f-red-400 disabled:bg-white-300 disabled:cursor-default'
const borderedStyle = 'block text-center py-13 px-19 text-17 leading-19 text-f-red-500 font-medium bg-white-100 rounded hover:bg-f-red-400 border rounded border-f-red-500 hover:text-white-100'

export const LinkButton = React.forwardRef(({ onClick, href, className, style = 'default', children }, ref) => {
  return <a href={href} onClick={onClick} ref={ref} className={`${style === 'bordered' ? borderedStyle : defaultStyle} ${className}`}>{children}</a>
})

const Button = ({ children, className, style = 'default', onClick = null, disabled }) => {
  return <button onClick={onClick} className={`${style === 'bordered' ? borderedStyle : defaultStyle} ${className}`} disabled={disabled}>{children}</button>
}

export default Button
