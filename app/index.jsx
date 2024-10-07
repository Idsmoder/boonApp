import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import {  getToken } from "../store/Slicers/LoginSlicer";
import { getTheme } from "../store/Slicers/SwitchState";
import api from "../api/api";

export default function Index() {
  const { access_token } = useSelector(state => state.LoginSlicer)
  const [progress, setProgress] = useState(0);
  const navigations = useNavigation()
  const dispatch = useDispatch()

  const checkPermission = async () => {
    try {
      const res = await api('/client/get')
      if (res.status === 200) {
        router.replace('/home');
      }
      else {
        router.replace('offert/Offert');
      }
    } catch (error) {
      router.replace('/login');
    }
  }
  useEffect(() => {
    navigations.setOptions({
      title: "",
      headerShown: false,
    })
    dispatch(getToken())
    dispatch(getTheme());
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    });
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (progress === 100) {
      if (access_token) {
        checkPermission()
      } else {
        router.replace('/login');
      }
    }
  }, [progress, access_token, router]);
  const [loaded, error] = useFonts({
    "syne": require('../assets/fonts/Syne-Bold.ttf'),
  })

  SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.boonText} >
        Tehno {'\n'}BOON
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#007FFF"
  },
  boonText: {
    color: 'white',
    fontSize: 50,
    fontFamily: "syne",
    lineHeight: 45,
  },
});
