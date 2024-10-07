import { TouchableOpacity, Pressable, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Pdf from "react-native-pdf";
import { useState } from 'react'
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { removeToken } from "../../store/Slicers/LoginSlicer";
import api from "../../api/api";
import { SkypeIndicator } from "react-native-indicators";

const source = {
  uri: "http://tehnoboon.uz/offer.pdf",
  cache: true,
};

export default function Offert() {
  const [permission_load, setPermission_load] = useState(false)
  const { width, height } = useWindowDimensions();
  const { t } = useTranslation()
  const [numberOfLines, setNumberOfPage] = useState(null)
  const [isFinish, setIsFinish] = useState(false)
  const dispatch = useDispatch()
  const handleCancel = async () => {
    dispatch(removeToken());
    router.replace('/login')
  }
  const handlePermission = async () => {
    setPermission_load(true);
    try {
      const res = await api('/client/accept', { method: 'POST' })
      if (res.status === 200) {
        router.replace('/home');
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setPermission_load(false);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages) => {
          setNumberOfPage(numberOfPages)
        }}
        onPageChanged={(page) => {
          if (!isFinish) {
            setIsFinish(page === numberOfLines)
          }
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={{ flex: 1, width, height }}
        trustAllCerts={false}
      />
      {
        isFinish ? (
          <View style={styles.button_box}>
            {permission_load &&
              <View className={'animate-spin bg-btn-primary h-11 mt-5 rounded-md items-center justify-center'}>
                <SkypeIndicator color={'white'} size={30} />
              </View>
            }
            {!permission_load &&
              <TouchableOpacity onPress={handlePermission}>
                 <Text style={styles.text_color}> {t('give_permission')} </Text>
              </TouchableOpacity>
            }
            <TouchableOpacity
              onPress={handleCancel}
            >
              <Text style={[styles.text_color, styles.cencel]}> {t('cancellation')} </Text>
            </TouchableOpacity>
          </View>
        )
          : null
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button_box: {
    backgroundColor: "white",
    display: "flex",
    gap: 10,
    padding: 20
  },
  text_color: {
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: "#007FFF"
  },
  cencel: {
    backgroundColor: "#F8EAEF",
    color: '#FF5865',
  }
})