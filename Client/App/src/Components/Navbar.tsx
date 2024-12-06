import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar, Button, Text } from '../Exports/Exports'
import { Menu } from 'iconoir-react-native'
import { useGen } from '@/Providers/GeneralProvider'

const NavbarComponent = () => {

  const {setNavbar, navbar} = useGen()

  return (
    <View className='flex-row w-full justify-between'>
        <Avatar size='md' vertical image='https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg' primary_text='Hi, Danny'/>
        <Button icon_right={<Menu/>} onclick={()=>setNavbar(!navbar)} color='text' size='sm'/>
    </View>
  )
}

export default NavbarComponent

const styles = StyleSheet.create({})