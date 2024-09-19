import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, Image, ImageBackground, Pressable } from "react-native";
import { useSelector } from "react-redux";

const Payments = () => {
    const navigation = useNavigation()
    const { t } = useTranslation()
    const { card } = useSelector(state => state.CardSlicer)
    const bg_backg = require("../../../assets/cards/card_background.png")
    const cardImg = [
        {
            title: "Humo",
            img: require('../../../assets/cards/HUMO.jpg')
        },
        {
            title: "MasterCard",
            img: require('../../../assets/cards/Master.png')
        },
        {
            title: "Uzcard",
            img: require('../../../assets/cards/Uzcard.png')
        },
        {
            title: "JCB",
            img: require('../../../assets/cards/JCB.jpg')
        },
    ]

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={() => router.push(`/setting/addCard/add`)}
                >
                    <Ionicons onPress={() => router.push(`/setting/addCard/add`)} name={`${card ? 'create-outline' : 'add-sharp'}`} size={24} color="#0080ff" />
                </Pressable>
            )
        })
    }, [navigation, card])


    return (
        <ScrollView className={'bg-bg-default h-full'}>
            <View className='px-5 ' >
                <View>
                    <Text className='font-normal text-lg mb-3'> {t('info_your_card')} </Text>
                    <Pressable
                        onPress={() => router.push(`/setting/addCard/add`)}
                    >
                        <ImageBackground source={bg_backg} resizeMode="cover" className='mb-3 p-5 py-8 rounded-xl overflow-hidden'>
                            <View>
                                <Text className='text-[#EBEBEB] font-semibold'>{card.cardType}</Text>
                                <Text className='text-[#EBEBEB] my-1 text-15 font-bold'>{card.cardNumber}</Text>
                                <Text className='text-[#EBEBEB] my-1 text-xl font-bold'>{card.owner}</Text>
                                <View className='flex flex-row  justify-between items-end mt-5'>
                                    <Text className='text-[#EBEBEB]  font-semibold'>{card.validThru}</Text>
                                    <View className='w-11 h-11'>
                                        {
                                            cardImg.map(({ title, img }, index) => (
                                                card.cardType === title &&
                                                <Image key={index} source={img} className='w-full h-full' resizeMode="contain" />
                                            ))
                                        }
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}
export default Payments;