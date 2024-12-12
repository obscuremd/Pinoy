import { Stack } from "expo-router";
import "../../global.css";
import GeneralProvider from "@/Providers/GeneralProvider";
import AuthProvider from "@/Providers/AuthProvider";
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'



export default function RootLayout() {

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file')
  }
  
  return (

    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        <GeneralProvider>
          <AuthProvider>
            <Stack >
              <Stack.Screen name="(tabs)" options={{ headerShown: false, statusBarHidden:true }} />
              <Stack.Screen name="+not-found" options={{ headerShown:false}}/>
            </Stack>
          </AuthProvider>
        </GeneralProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
