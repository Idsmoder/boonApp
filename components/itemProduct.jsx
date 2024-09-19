import { Alert, Text, TouchableOpacity, View } from "react-native";
import { formatSum } from "../utils/formatSum";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

const ItemProduct = ({ prop, page }) => {
    const { t } = useTranslation()
    const deleteProduct = () => {
        Alert.alert(
            t('removing_product'),
            t('product_delete_question'),
            [
                {
                    text: t('cancel'),
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: t('delete'), onPress: () => console.log("OK Pressed") }
            ]
        );
    }
    return (
        <View className={'w-full p-2 py-3 last:hidden rounded-2xl mb-2 bg-white'}>
            <View className={'flex flex-row '}>
                <View className={'w-10/12 p-1'}>
                    <View className={' pl-2 '}>
                        <Text className={'text-15 text-black font-bold'}>{prop?.product_category_name}</Text>
                    </View>
                    <View className={' pl-2 pt-1'}>
                        <Text className={'text-13 text-gray '}>{prop?.product}</Text>
                    </View>
                    <View className={' pl-2 pt-2'}>
                        <View className={'flex flex-row'}>
                            <Text className={'text-15 text-black'}> {t('purchase')}: {formatSum(prop?.purchase_price)}</Text>
                            <Text className={'text-15 text-gray'}> {t('Uzs')} </Text>
                        </View>
                        <View className={'flex flex-row'}>
                            <Text className={'text-15'}> {t('sale_price')}: {formatSum(prop?.sale_price)}</Text>
                            <Text className={'text-15 text-gray'}> {t('Uzs')} </Text>
                        </View>
                    </View>
                </View>
                <View className={'w-2/12 items-center justify-center'}>
                    {page === 'home' ?
                        <TouchableOpacity onPress={() => router.push(`/product/${prop?.product_unique_id}`)} >
                            <MaterialIcons name={'navigate-next'} size={28} color={'gray'} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={deleteProduct} >
                            <Entypo name={'cross'} size={20} color={'gray'} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
}
export default ItemProduct;