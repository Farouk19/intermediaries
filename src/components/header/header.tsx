import { FC } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { routes } from '../../utils'

const Header: FC = () => (
    <header className="bg-white h-20 flex items-center space-x-40">
        <img src={logo} alt="logo" className="max-h-10 max-w-4xl ml-10" />
        <ul className="flex">
            {
                routes.map(({ path, name }, index) => (
                    <li key={`route-${index}`} className="mr-6">
                        <Link className="text-lg text-blue hover:text-pink active:text-pink" to={path}>{name}</Link>
                    </li>
                ))
            }
        </ul>
    </header>
)

export default Header