import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import Button from '../../../components/Button';
import { useSelector } from 'react-redux';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import { Token, URL } from '../../../api/const';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { TextInputMask } from 'react-native-masked-text';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../../api/api';
import { useTranslation } from 'react-i18next';
import themeContext from '../../../theme/themeContext';
function AddCard() {
  const navigation = useNavigation();
  const { t } = useTranslation()
  const [isLoading, setLoading] = useState(false)
  const { card } = useSelector(state => state.CardSlicer)
  const [isActiveTheme, setIsActiveTheme] = useState(0)
  const Th = useContext(themeContext)
  const [inputValue, setInputValue] = useState({
    card_number: '',
    card_expire: "",
    task_id: ""
  })

  const [cardTheme] = useState([
    require('../../../assets/cards/theme-3.png'),
    require('../../../assets/cards/theme-6.png'),
    require('../../../assets/cards/theme-4.png'),
    require('../../../assets/cards/theme-5.png'),
    require('../../../assets/cards/theme-1.png'),
    require('../../../assets/cards/theme-2.png'),
  ])
  const activeTheme = (param) => setIsActiveTheme(param)

  useEffect(() => {
    navigation.setOptions({
      headerTitle: card ? t('edit_card') : t('add_card'),
    });
  }, [navigation, card]);

  const getInputValue = (name, value) => {
    setInputValue({
      ...inputValue,
      [name]: value
    })
  }

  const submitCardinfo = async () => {
    setLoading(true);
    try {
      const res = await api(`/application/add_card`, {
        method: 'POST',
        data: inputValue
      })
      console.log(res);
      showMessage({
        message: "Successfully",
        type: "success",
      });
    } catch (error) {
      console.log(error?.message);
      showMessage({
        message: "Failed to add card",
        type: "warning",
      });
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <View className='p-2 h-full' style={{ backgroundColor: Th.backgroundColor }} >
      <FlashMessage position="top" duration={3000} />
      <ScrollView contentContainerStyle={{ borderRadius: 20, backgroundColor: Th.black_bg_Color, padding: 15, paddingBottom: 0 }} >
        <Text className='text-17' style={{ color: Th.color }} >
          {t('card_details')}
        </Text>
        <View className='my-4' >
          <View>
            <Text className='text-11 my-1' style={{ color: Th.color }}>
              {t('card_number')}
            </Text>
            <View>
              <TextInputMask
                value={inputValue.card_number}
                onChangeText={(vlaue) => getInputValue('card_number', vlaue)}
                type={'custom'}
                inputMode={'numeric'}
                options={{
                  mask: '9999 9999 9999 9999'
                }}
                className={' border border-border-1 bg-white rounded-md text-black  text-14 pr-10   h-11 pl-2'}
                keyboardType={'number-pad'}
                placeholder={'0000 0000 0000 0000'}
              />
              {inputValue.card_number.length > 0 &&
                <View className={'absolute right-2 top-1/4'}>
                  <TouchableOpacity onPress={() => setInputValue({ ...inputValue, card_number: "" })}>
                    <Ionicons name="close-circle" size={22} color="gray" />
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
          <View>
            <Text className='text-11 my-1' style={{ color: Th.color }}>
              {t('card_validity_period')}
            </Text>
            <View>
              <TextInputMask
                value={inputValue.card_expire}
                onChangeText={(vlaue) => getInputValue('card_expire', vlaue)}
                type={'custom'}
                inputMode={'numeric'}
                options={{
                  mask: '99 / 99'
                }}
                className={' border border-border-1 bg-white rounded-md text-black  text-14 pr-10   h-11 pl-2'}
                keyboardType={'number-pad'}
                placeholder={'dd / mm'}
              />
              {inputValue.card_expire.length > 0 &&
                <View className={'absolute right-2 top-1/4'}>
                  <TouchableOpacity onPress={() => setInputValue({ ...inputValue, card_expire: "" })}>
                    <Ionicons name="close-circle" size={22} color="gray" />
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
          <View>
            <Text className='text-11 my-1' style={{ color: Th.color }}>
              {t('card_name')}
            </Text>
            <View>
              <TextInputMask
                value={inputValue.task_id}
                onChangeText={(vlaue) => getInputValue('task_id', vlaue)}
                type={'custom'}
                inputMode={'numeric'}
                options={{
                  mask: '9999'
                }}
                className={' border border-border-1 bg-white rounded-md text-black  text-14 pr-10 h-11 pl-2'}
                keyboardType={'number-pad'}
                placeholder={'00000'}
              />
              {inputValue.task_id.length > 0 &&
                <View className={'absolute right-2 top-1/4'}>
                  <TouchableOpacity onPress={() => setInputValue({ ...inputValue, task_id: "" })}>
                    <Ionicons name="close-circle" size={22} color="gray" />
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
          <View>
            <Text className='text-17 my-3' style={{ color: Th.color }}>
              {t('appearance')}
            </Text>
            <View className='items-center justify-center flex-wrap gap-1 flex-row flex' >
              {
                cardTheme.map((item, index) => (
                  <View key={index} className={`w-12 h-12 overflow-hidden border-transparent border-2 p-0.5 rounded-full ${isActiveTheme === index && 'border-blue-300'} `} onTouchStart={() => activeTheme(index)} >
                    <Image source={item} className='w-full h-full' />
                  </View>
                ))
              }
            </View>
          </View>
        </View>
      </ScrollView>
      <View>
        <Button handle={submitCardinfo} text={card ? t('edit_card') : t('add_card')} loading={isLoading} />
      </View>
    </View>
  )
}
export default AddCard