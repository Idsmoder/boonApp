import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatSum } from "../utils/formatSum";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import themeContext from "../theme/themeContext";
import { useContext, useState } from "react";
import Dialog from "react-native-dialog";
const ItemProduct = ({ prop, page }) => {
	const [isAlert, setAlert] = useState(false)
	const { t } = useTranslation()
	const Th = useContext(themeContext)
	const deleteProduct = (_id) => {
		console.log(_id, "OK Pressed");
		setAlert(false)
	}
	return (
		<View className={'w-full p-2 py-3 rounded-2xl mb-2 mt-1'} style={{ backgroundColor: Th.black_bg_Color }} >
			<View className={'flex flex-row '}>
				<View className={'w-10/12 p-1'}>
					<View className={' pl-2 '}>
						<Text className={'text-15 font-bold'} style={{ color: Th.color }} >{prop?.product_category_name}</Text>
					</View>
					<View className={' pl-2 pt-1'}>
						<Text className={'text-13 text-gray '}>{prop?.product}</Text>
					</View>
					<View className={' pl-2 pt-2'}>
						<View className={'flex flex-row'}>
							<Text className={'text-15'} style={{ color: Th.color }} > {t('purchase')}: {formatSum(prop?.purchase_price)}</Text>
							<Text className={'text-15 text-gray'}> {t('Uzs')} </Text>
						</View>
						<View className={'flex flex-row'}>
							<Text className={'text-15'} style={{ color: Th.color }} > {t('sale_price')}: {formatSum(prop?.sale_price)}</Text>
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
						<TouchableOpacity onPress={() => setAlert(true)} >
							<Entypo name={'cross'} size={20} color={'gray'} />
						</TouchableOpacity>
					}
				</View>
			</View>
			<Dialog.Container visible={isAlert}
				onBackdropPress={() => setAlert(false)}
				contentStyle={styles.dialog_container}
			>
				<Dialog.Title>{t('removing_product')}</Dialog.Title>
				<Dialog.Description>
					{t('product_delete_question')}
				</Dialog.Description>
				<Dialog.Button label={t('cancel')} onPress={() => setAlert(false)} />
				<Dialog.Button label={t('delete')} onPress={() => deleteProduct(prop?.product_unique_id)} />
			</Dialog.Container>
		</View>
	);
}
export default ItemProduct;

const styles = StyleSheet.create({
	dialog_container: {
		borderRadius: 15,
	},
})