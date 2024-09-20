import { FlatList, Platform, SafeAreaView, ScrollView, Text, View } from "react-native";
import ProgressLimit from "../../../components/progressLimit";
import ItemProduct from "../../../components/itemProduct";
import { useContext, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { formatSum } from "../../../utils/formatSum";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import themeContext from "../../../theme/themeContext";

const Basket = () => {
    const { t } = useTranslation()
    const Th = useContext(themeContext)
    const { basket } = useSelector(state => state.ProductSlicer)
    const platform = Platform.OS;

    return (
        <SafeAreaView className={'items-center h-full'} style={{ backgroundColor: Th.backgroundColor }} >
            <ProgressLimit used={7020000} limit={10000000} page={'basket'} />
            
            <View className={' justify-start items-start w-11/12 flex-1 py-2 '}>
                <View className={' flex flex-row'}>
                    <View>
                        <Text className={'text-17 font-bold'} style={{ color: Th.color }} > {t('basket')} </Text>
                    </View>
                    <View className={'mt-1 -ml-2 flex flex-row'}>
                        <Entypo name={'dot-single'} size={16} color={'gray'} />
                        <Text className={'text-gray -mt-0.5 -ml-1  text-13'}>{basket.length} {t('goods')}</Text>
                    </View>
                </View>
                {basket.length == 0 &&
                    <View className={'flex-1 items-center justify-center'}>
                        <Text className={'text-gray text-15 text-center'} style={{ color: Th.color }}> {t('scan_to_add')} </Text>
                    </View>
                }
                {basket.length > 0 &&
                    <ScrollView>
                        <View className={platform === 'ios' ? ' w-full' : 'w-full h-full   '}>
                            <FlatList
                                data={basket} renderItem={
                                    ({ item }) => (<ItemProduct prop={item} page={'basket'} />)
                                } keyExtractor={(_, index) => index.toString()}
                                scrollEnabled={false}
                            />
                        </View>
                    </ScrollView>
                }
            </View>
            <View className={'w-full  sticky rounded-t-3xl h-28 z-10  bottom-0'} style={{ backgroundColor: Th.black_bg_Color }} >
                <View className={'flex flex-row  m-3'}>
                    <View className={'flex-1'}>
                        <Text className={'text-15 text-gray'}>{t('total')}:</Text>
                    </View>
                    <View className={'flex-1 items-end'}>
                        <View className={'flex flex-row'}>
                            <Text className={'text-15 font-bold'} style={{ color: Th.color }} >{formatSum(basket.reduce((a, b) => a + parseFloat(b?.sale_price), 0))}</Text>
                            <Text className={'ml-1 text-gray'}>{t('Uzs')} </Text>
                        </View>

                    </View>
                </View>
                <View className={'flex flex-row  h-20 m-3 '}>
                    <View className={'flex-1'}>
                        <View className={'rounded-lg bg-btn-primary p-3 items-center'} onTouchStart={() => router.push('order/Order')} >
                            <Text className={'text-15 text-white '} > {t('proceed_to_checkout')} </Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default Basket;