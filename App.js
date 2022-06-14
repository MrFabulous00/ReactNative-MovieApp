import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, useColorScheme } from "react-native";
import Apploading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";
import { Asset, useAssets } from "expo-asset";
import {
  NavigationContainer,
  // DarkTheme,
  // defaultTheme,
} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styled";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const [assets] = useAssets([require("./image1.jpeg")]);
  const [loaded] = Font.useFonts(Ionicons.font);
  const isDark = useColorScheme() === "dark";
  // const [ready, setReady] = useState(false);
  // const onFinish = () => setReady(true);
  // const startLoading = async () => {
  //   // await new Promise((resolve) => setTimeout(resolve, 1000));
  //   const fonts = loadFonts([Ionicons.font]);
  //   const images = loadImages([
  //     require("./image1.jpeg"),
  //     "https://d33wubrfki0l68.cloudfront.net/b152eb4214943f96e83c4babde026b12221e68f1/a20c2/img/oss_logo.png",
  //   ]);
  //   console.log("images", images);
  //   await Promise.all([...fonts, ...images]);
  // };
  // if (!assets || !loaded) {
  //   return <Apploading />;
  // }
  // const isDark = useColorScheme() === "dark";
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {/* <NavigationContainer theme={isDark ? DarkTheme : defaultTheme}> */}
        <NavigationContainer>
          <Root />
          {/* <Tabs /> */}
          {/* <Stack /> */}
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
