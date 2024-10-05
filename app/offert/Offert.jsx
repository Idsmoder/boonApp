import { TouchableOpacity, Pressable, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Pdf from "react-native-pdf";
import { useState } from 'react'
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { removePermisson, setPermission } from "../../store/Slicers/SwitchState";
import { removeToken } from "../../store/Slicers/LoginSlicer";

const source = {
  uri: "http://tehnoboon.uz/offer.pdf",
  cache: true,
};

export default function Offert() {
  const { isPermission } = useSelector(state => state.SwitchState)

  const { width, height } = useWindowDimensions();
  const { t } = useTranslation()
  const [numberOfLines, setNumberOfPage] = useState(null)
  const [isFinish, setIsFinish] = useState(false)
  const dispatch = useDispatch()
  const handleCancel = async () => {
    dispatch(removeToken());
    dispatch(removePermisson('permission'))
    router.replace('/login')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          setNumberOfPage(numberOfPages)
        }}
        onPageChanged={(page, numberOfPages) => {
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
            <TouchableOpacity
              onPress={() => {
                dispatch(setPermission(true));
                router.replace('/home');
              }
              }
            >
              <Text style={styles.text_color} > {t('give_permission')} </Text>
            </TouchableOpacity>
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
    borderRadius: 7,
    textAlign: 'center',
    backgroundColor: "#007FFF"
  },
  cencel: {
    backgroundColor: "#F8EAEF",
    color: '#FF5865',
  }
})