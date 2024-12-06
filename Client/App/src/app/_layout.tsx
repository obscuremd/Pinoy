import { Stack } from "expo-router";
import "../../global.css";
import { StatusBar } from "react-native";
import GeneralProvider from "@/Providers/GeneralProvider";



export default function RootLayout() {
  
  return (
    <GeneralProvider>
      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false, statusBarHidden:true }} />
        <Stack.Screen name="+not-found" options={{ headerShown:false}}/>
      </Stack>
    </GeneralProvider>
  );
}
