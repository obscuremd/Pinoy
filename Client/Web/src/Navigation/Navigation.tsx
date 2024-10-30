import { Suspense } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { menuItems } from '../Exports/Constatants'
import { Button, Drivers, Menu, Order, Overview, UserReviews } from '../Exports/Exports'

const Navigation = () => {
  return (
    <Suspense fallback={ 
        <div className="flex flex-col gap-10 justify-center items-center min-h-screen">
          {/* <img src={Logo} alt="" className='md:w-[25%] w-[40%]' /> */}
          loading
        </div> }>
        
        <div className='w-full flex gap-8'>
          <BrowserRouter>
                <Menu menuItems={menuItems}/>
                <Content/>
          </BrowserRouter>
        </div>
    
    </Suspense>
  )
}

const Content = () => {
    const currentPath = useLocation().pathname
    const Path = menuItems.filter(item => item.link === currentPath)


    return (
        <div className='w-full flex flex-col gap-8'>
            <Button color='primary' hover='false' text={Path[0].name} icon_left={Path[0].icon} outline size='lg' rounded='medium' position='start' stretch gap='gap-[32px]' />
            <div className='h-screen overflow-y-scroll'>
              <Routes>
                  <Route path='/' element={<Overview />} />
                  <Route path='/drivers' element={<Drivers />} />
                  <Route path='/orders' element={<Order />} />
                  <Route path='/user-reviews' element={<UserReviews />} />
              </Routes>
            </div>
        </div>
    );
};

export default Navigation