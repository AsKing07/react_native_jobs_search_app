import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GlobalStateProvider } from '../utils/GlobalState'; // Importez le fournisseur de contexte global

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GlobalStateProvider>
      <Stack onLayout={onLayoutRootView} />
    </GlobalStateProvider>
  );
}

export default Layout;
