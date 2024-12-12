import { useGen } from "@/Providers/GeneralProvider"
import { menuItems } from "@/src/Exports/Constatants"
import { Menu, Navbar } from "@/src/Exports/Exports"
import { useAuth } from "@clerk/clerk-expo"
import { Redirect, Slot } from "expo-router"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const CustomLayout =()=>{

    // const {navbar} = useGen()
    // const { isSignedIn } = useAuth()

    // if (!isSignedIn) {
    //     return <Redirect href={'/auth'} />
    //   }
      
    return(
        <SafeAreaView style={{flex:1}} className="relative bg-background-500 items-center pt-5 px-4 text-grayscale-500 gap-">
                <View className="relative bg-background-500 items-center pt-5 px-4 text-grayscale-500 gap-">
                    {/* navbar */}
                    <View className="p-3">
                        <Navbar/>
                    </View>

                    {/* Sidebar */}
                    {/* {navbar && <View className="absolute z-50 top-[7%] w-full flex-col items-center p-10 bg-background-500 backdrop-blur-0 self-start">
                        <Menu menuItems={menuItems} logo mode='vertical'/>
                    </View>} */}
                
                    {/* pages */}
                    <ScrollView style={{ flex: 1 }}>
                        <Slot />
                    </ScrollView>
                    
                    {/* menu */}
                    <View className="p-3">
                        <Menu between menuItems={menuItems} collapsed mode='horizontal'/>
                    </View>
                </View>
        </SafeAreaView>
    )
}

export default CustomLayout