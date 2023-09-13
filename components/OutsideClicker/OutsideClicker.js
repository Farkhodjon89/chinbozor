import { useEffect, useRef } from 'react'

const useOutsideAlerter = (ref, callBack) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callBack()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

const OutsideClicker = ({ children, callback }) => {
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, callback)

  return <div ref={wrapperRef}>{children}</div>
}

export default OutsideClicker
