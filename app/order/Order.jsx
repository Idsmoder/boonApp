import React, { useState } from 'react'
import { Image, ScrollView, TextInput, RadioNodeList, Text, View, Pressable } from 'react-native'
import Button from '../../components/Button'
import { formatSum } from '../../utils/formatSum'
import { useTranslation } from 'react-i18next'
const Order = () => {
  const { t } = useTranslation()
  const homeImg = require('../../assets/order/home.png');
  const office = require('../../assets/order/bag.png');
  const [radioBtn, setRadioBtn] = useState(0)
  const [paymentType, setPaymentType] = useState(0)

  const cardImgType = [
    {
      img: require('../../assets/paymentType/cash.png'), type: 'cash'
    },
    {
      img: require('../../assets/paymentType/uzcard.png'), type: 'uzcard'
    },
    {
      img: require('../../assets/paymentType/masterCards.png'), type: 'mastercard'
    }
  ]

  const radioData = [
    { label: t('delivery'), img: homeImg },
    { label: t('pick_up_point'), img: office },
  ]

  const cardData = [
    {
      id: 1, cardNumber: "5477330021997675", cardType: "uzcard",
    },
    {
      id: 2, cardNumber: "4111111111111111", cardType: "mastercard",
    },
    {
      id: 4, cardNumber: t('cash'), cardType: "cash",
    }
  ]

  return (
    <View className='flex flex-col items-stretch justify-between bg-bg-default h-full' >
      <ScrollView className=' px-5 py-2' >
        <View className='flex flex-row justify-between mb-2' >
          {
            radioData.map((item, index) => {
              return (
                <Pressable
                  onPress={() => setRadioBtn(index)}
                  key={index} className='flex rounded-2xl overflow-hidden justify-between p-3 items-end w-[48%] h-28 bg-white py-3 relative'
                >
                  <Text className='text-15 font-medium text-slate-500 text-right w-4/5' >
                    {item.label}
                  </Text>
                  <View className={`p-1 flex justify-center items-center border-slate-400 border-2 rounded-full ${radioBtn === index && 'bg-blue-600 border-blue-600 '}`} >
                    <View className='w-2.5 h-2.5 rounded-full bg-white'></View>
                  </View>
                  <View className='absolute bottom-0 w-16 h-20 left-0'>
                    <Image source={item.img} className='w-full h-full object-fill' />
                  </View>
                </Pressable>
              )
            })
          }
        </View>

        <Text className='text-17 font-medium my-5' >
          {t('delivery_address')}
        </Text>
        <View>
          <Text className='text-11 font-medium mb-1' >
            {t('address')}
          </Text>
          <TextInput placeholder='0000 0000 0000 0000' inputMode='numeric' className='bg-white mb-3 py-2 px-3 border-slate-200 border rounded-lg' />
        </View>
        <View className='flex flex-row flex-wrap justify-between'>
          <View className='w-[48%]'>
            <Text className='text-11 font-medium mb-1' >
              {t('house')}
            </Text>
            <TextInput inputMode='numeric' className='bg-white mb-3 py-2 px-3 border-slate-200 border rounded-lg' />
          </View>
          {
            radioBtn === 0 ?
              <View className='w-[48%]'>
                <Text className='text-11 font-medium mb-1' >
                  {t('apartment')}
                </Text>
                <TextInput inputMode='numeric' className='bg-white mb-3 py-2 px-3 border-slate-200 border rounded-lg' />
              </View>
              : null
          }
          <View className='w-[48%]'>
            <Text className='text-11 font-medium mb-1' >
              {t('entrance')}
            </Text>
            <TextInput inputMode='numeric' className='bg-white mb-3 py-2 px-3 border-slate-200 border rounded-lg' />
          </View>
          {
            radioBtn === 0 ?
              <View className='w-[48%]'>
                <Text className='text-11 font-medium mb-1' >
                  {t('floor')}
                </Text>
                <TextInput inputMode='numeric' className='bg-white mb-3 py-2 px-3 border-slate-200 border rounded-lg' />
              </View> : null
          }
        </View>
        <View>
          <Text className='text-11 font-medium mb-1'>
            {t('comment')}
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={3} placeholder={t('comment')} inputMode='text'
            style={{ textAlignVertical: 'top', textAlign: 'left', resize: 'none' }}
            className='bg-white mb-3 py-2 px-3 border-slate-200 border rounded-lg'
          />
        </View>
        <View className='mb-10' >
          <Text className='text-17 mb-4' >
            {t('payment_methods')}
          </Text>
          {
            cardData.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => setPaymentType(index)}
                  className='border border-slate-200 rounded-lg flex flex-row justify-between p-3 mb-4'
                >
                  <View className='flex gap-5 flex-row' >
                    {
                      cardImgType.map((imgs, index) => (
                        imgs.type === item.cardType &&
                        <Image key={index} source={imgs.img} style={{ height: 25, width: 50, resizeMode: 'contain' }} />
                      ))
                    }
                    <Text className='font-medium text-15'>
                      {item.cardNumber}
                    </Text>
                  </View>
                  <View className={`w-6 h-6 flex justify-center items-center border-slate-400 border-2 rounded-full ${paymentType === index && 'bg-blue-600 border-blue-600 '}`} >
                    <View className='w-3 h-3 rounded-full bg-white'></View>
                  </View>
                </Pressable>
              )
            })
          }
        </View>
      </ScrollView>
      <View className='bg-white  px-5 py-7 rounded-t-3xl ' >
        <View className='flex justify-between items-center flex-row border-b border-b-slate-400 mb-3 pb-3' >
          <Text className='text-14 font-medium text-slate-500' >
            {t('every')}:
          </Text>
          <Text className='text-15 font-medium' >
            8 {t('goods')}
          </Text>
        </View>
        <View className='flex justify-between items-center flex-row mb-5' >
          <Text className='text-15 font-medium text-slate-500' >
            {t('total')}:
          </Text>
          <Text className='text-15 font-medium' >
            {formatSum('111530000')} <Text className='text-slate-500'> {t('Uzs')} </Text>
          </Text>
        </View>
        <Button text={t('an_order')} />
      </View>
    </View>
  )
}

export default Order