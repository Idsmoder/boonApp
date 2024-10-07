import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import { SkypeIndicator } from 'react-native-indicators'

function Button({ text = null, handle = null, loading = false, icon = null, ...rest }) {
  return (
    <TouchableOpacity className='bg-blue-500 py-3 rounded-[8px] flex flex-row w-full justify-center' onPress={handle} {...rest}>
      <View className='rotate-180 mr-2' >
        {icon && <Ionicons size={22} color={'white'} name={'exit'} />}
      </View>
      <Text className='text-15 text-center text-white'>
        {loading ?
          <SkypeIndicator color={'white'} size={21} />
          : text}
      </Text>
    </TouchableOpacity>
  )
}

export default Button