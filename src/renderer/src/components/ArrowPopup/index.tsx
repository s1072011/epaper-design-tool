import React from 'react'

interface ArrowPopupProps {
  content: React.ReactNode
  visible: boolean
  position?: 'top' | 'right' | 'bottom' | 'left'
  offset?: number
  bgColor?: string
  textColor?: string
}

/**
 * Renders an arrow popup component with customizable position, offset, background color, text color, and arrow size.
 *
 * @param content - The content to be displayed inside the popup.
 * @param visible - Determines whether the popup is visible or hidden.
 * @param position - The position of the popup relative to its parent. Can be 'top', 'right', 'bottom', or 'left'.
 * @param offset - The offset distance from the parent element. Available offsets: {mt-0, mr-0, mb-0, ml-0}, {mt-1, mr-1, mb-1, ml-1}, {mt-2, mr-2, mb-2, ml-2}, {mt-3, mr-3, mb-3, ml-3}, {mt-4, mr-4, mb-4, ml-4}, {mt-5, mr-5, mb-5, ml-5}
 * @param bgColor - The background color of the popup. Available background colors: bg-yellow-500, bg-white
 * @param textColor - The text color of the popup. Available text colors: text-black, text-white
 * @return The rendered arrow popup component.
 */
const ArrowPopup: React.FC<ArrowPopupProps> = ({
  content,
  visible,
  position = 'right',
  offset = 2,
  bgColor = 'bg-yellow-500',
  textColor = 'text-black'
}) => {
  const positionYClasses = `left-1/2 -translate-x-1/2`
  const positionXClasses = `top-1/2 -translate-y-1/2`

  let positionClasses = ''
  let arrowPositionClasses = ''

  switch (position) {
    case 'top':
      positionClasses = `bottom-full mb-${offset} ${positionYClasses}`
      arrowPositionClasses = `top-full -translate-y-2 ${positionYClasses}`
      break
    case 'right':
      positionClasses = `left-full ml-${offset} ${positionXClasses}`
      arrowPositionClasses = `right-full translate-x-2 ${positionXClasses}`
      break
    case 'bottom':
      positionClasses = `top-full mt-${offset} ${positionYClasses}`
      arrowPositionClasses = `bottom-full translate-y-2 ${positionYClasses}`
      break
    case 'left':
      positionClasses = `right-full mr-${offset} ${positionXClasses}`
      arrowPositionClasses = `left-full -translate-x-2 ${positionXClasses}`
      break
  }

  return (
    <div
      className={`absolute ml-${offset} ${bgColor} ${textColor} text-xs text-nowrap rounded select-none p-1 z-10 ${visible ? 'block' : 'hidden'} ${positionClasses}`}
    >
      {content}
      <div
        className={`aspect-square w-3 ${bgColor} rotate-45 absolute -z-10 ${arrowPositionClasses}`}
      ></div>
    </div>
  )
}

export default ArrowPopup
