import { FC } from 'react'
import { ICustomButtonProps } from '../../utils'

const CustomButton: FC<ICustomButtonProps> = ({ text, color, hoverColor, handleClick, type }) =>
    <button className={`bg-${color} hover:bg-${hoverColor} text-white text-center px-5 py-2.5 rounded`} type={type} onClick={handleClick}>
        {text}
    </button>

export default CustomButton