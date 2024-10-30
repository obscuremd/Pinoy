import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Logo, Text } from '../Exports/Exports'

interface menuItems {
    icon: React.ReactNode, 
    name: string, 
    link: string
}

interface MenuProps{
    menuItems : Array<menuItems>
}

const MenuComponent:React.FC<MenuProps> = ({menuItems}) => {

    const [active, setActive] = useState(0)

  return (
    <div className='w-[250px]'>
        <div className='p-5 flex items-center gap-2'>
            <img src={Logo} className='w-6'/>
            <Text text='Pinoy' fontSize='h5' fontWeight='bold'/>
        </div>

        <div className='flex flex-col gap-2'>
            {
                menuItems.map(({icon, link, name}, index)=>(
                    <Link to={link} key={index}>
                        <Button onclick={()=>setActive(index)} icon_left={icon} color={active === index ?'primary': 'text'} text={name} size='sm' rounded='medium'  stretch position='start'/>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default MenuComponent