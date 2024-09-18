import { useState } from "react";
import { SafeAreaView, ScrollView, SectionList, StyleSheet, Text, View } from "react-native";
import Octicons from '@expo/vector-icons/Octicons';
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { formatSum } from "../../../utils/formatSum";
import ItemProduct from "../../../components/itemProduct";
const History = () => {
	const [history, setHistory] = useState([
		{
			id: 1,
			title: '01-09-2024',
			data: [
				{
					product: 'Кондиционер Artel 18HS Shahrisabz',
					product_unique_id: 'a1fdd1c2-f836-11e6-8020-00e0090691df',
					count: 1,
					purchase_price: '7910000',
					sale_price: '10757600',
					purchase: null,
					product_category_name: 'Кондиционеры'
				},
				{
					product: 'Телевизор Samsung UHD',
					product_unique_id: 'b2e5f6d3-g937-12e7-9134-11f1140792ec',
					count: 2,
					purchase_price: '1590000',
					sale_price: '2450000',
					purchase: null,
					product_category_name: 'Телевизоры'
				}
			]
		},
		{
			id: 2,
			title: '05-09-2024',
			data: [
				{
					product: 'Смартфон Xiaomi Mi 11',
					product_unique_id: 'c3g7h8e4-h048-13e8-0245-22g2250903dd',
					count: 3,
					purchase_price: '1240000',
					sale_price: '1695000',
					purchase: null,
					product_category_name: 'Смартфоны'
				},
				{
					product: 'Ноутбук HP Pavilion',
					product_unique_id: 'd4i8j9f5-i159-14e9-1356-33h3362014ee',
					count: 1,
					purchase_price: '755000',
					sale_price: '999000',
					purchase: null,
					product_category_name: 'Ноутбуки'
				}
			]
		},
		{
			id: 3,
			title: '10-09-2024',
			data: [
				{
					product: 'Планшет Apple iPad',
					product_unique_id: 'e5j9k0g6-j260-15f0-2467-44i4473125ff',
					count: 5,
					purchase_price: '650000',
					sale_price: '899000',
					purchase: null,
					product_category_name: 'Планшеты'
				},
				{
					product: 'Наушники Bose QuietComfort',
					product_unique_id: 'f6k0l1h7-k371-16g1-3578-55j5584236gg',
					count: 4,
					purchase_price: '350000',
					sale_price: '489000',
					purchase: null,
					product_category_name: 'Наушники'
				}
			]
		},
		{
			id: 4,
			title: '15-09-2024',
			data: [
				{
					product: 'Кофемашина DeLonghi',
					product_unique_id: 'g7l1m2n8-l482-17h2-4689-66k6695347hh',
					count: 2,
					purchase_price: '450000',
					sale_price: '620000',
					purchase: null,
					product_category_name: 'Кофемашины'
				},
				{
					product: 'Холодильник LG',
					product_unique_id: 'h8m2n3o9-m593-18i3-5790-77l7706458ii',
					count: 1,
					purchase_price: '1200000',
					sale_price: '1590000',
					purchase: null,
					product_category_name: 'Холодильники'
				}
			]
		},
		{
			id: 5,
			title: '20-09-2024',
			data: [
				{
					product: 'Стиральная машина Bosch',
					product_unique_id: 'i9n3o4p0-n604-19j4-6801-88m8817569jj',
					count: 3,
					purchase_price: '700000',
					sale_price: '950000',
					purchase: null,
					product_category_name: 'Стиральные машины'
				},
				{
					product: 'Микроволновка Samsung',
					product_unique_id: 'j0o4p5q1-o715-20k5-7912-99n9928670kk',
					count: 6,
					purchase_price: '150000',
					sale_price: '199000',
					purchase: null,
					product_category_name: 'Микроволновки'
				}
			]
		},
		{
			id: 6,
			title: '25-09-2024',
			data: [
				{
					product: 'Пылесос Philips',
					product_unique_id: 'k1p5q6r2-p826-21l6-8023-00o1039781ll',
					count: 4,
					purchase_price: '300000',
					sale_price: '420000',
					purchase: null,
					product_category_name: 'Пылесосы'
				},
				{
					product: 'Утюг Tefal',
					product_unique_id: 'l2q6r7s3-q937-22m7-9134-11p2140892mm',
					count: 7,
					purchase_price: '90000',
					sale_price: '120000',
					purchase: null,
					product_category_name: 'Утюги'
				}
			]
		},
		{
			id: 7,
			title: '30-09-2024',
			data: [
				{
					product: 'Массажер для тела Xiaomi',
					product_unique_id: 'm3r7s8t4-r048-23n8-0245-22q3251903nn',
					count: 5,
					purchase_price: '220000',
					sale_price: '290000',
					purchase: null,
					product_category_name: 'Массажеры'
				},
				{
					product: 'Электрочайник Braun',
					product_unique_id: 'n4s8t9u5-s159-24o9-1356-33r4363014oo',
					count: 8,
					purchase_price: '70000',
					sale_price: '95000',
					purchase: null,
					product_category_name: 'Электрочайники'
				}
			]
		},
		{
			id: 8,
			title: '05-10-2024',
			data: [
				{
					product: 'Фен для волос Philips',
					product_unique_id: 'o5t9u0v6-t260-25p0-2467-44s5474125pp',
					count: 6,
					purchase_price: '150000',
					sale_price: '200000',
					purchase: null,
					product_category_name: 'Фены'
				},
				{
					product: 'Кулер для воды Aqua',
					product_unique_id: 'p6u0v1w7-u371-26q1-3578-55t6585236qq',
					count: 3,
					purchase_price: '600000',
					sale_price: '800000',
					purchase: null,
					product_category_name: 'Кулеры для воды'
				}
			]
		},
		{
			id: 9,
			title: '10-10-2024',
			data: [
				{
					product: 'Кондиционер LG',
					product_unique_id: 'q7v1w2x8-v482-27r2-4689-66u7696347rr',
					count: 1,
					purchase_price: '9000000',
					sale_price: '11500000',
					purchase: null,
					product_category_name: 'Кондиционеры'
				},
				{
					product: 'Сушилка для белья',
					product_unique_id: 'r8w2x3y9-w593-28s3-5790-77v8807458ss',
					count: 2,
					purchase_price: '300000',
					sale_price: '400000',
					purchase: null,
					product_category_name: 'Сушилки'
				}
			]
		},
		{
			id: 10,
			title: '15-10-2024',
			data: [
				{
					product: 'Кофеварка Philips',
					product_unique_id: 's9x3y4z0-x604-29t4-6801-88w9918569tt',
					count: 3,
					purchase_price: '350000',
					sale_price: '500000',
					purchase: null,
					product_category_name: 'Кофеварки'
				},
				{
					product: 'Плита газовая Samsung',
					product_unique_id: 't0y4z5a1-y715-30u5-7912-99x1029670uu',
					count: 1,
					purchase_price: '1800000',
					sale_price: '2200000',
					purchase: null,
					product_category_name: 'Плиты'
				}
			]
		}
	]);

	let sections = history.map(section => ({
		title: section.title,
		data: section.data,
	}));


	return (
		<SafeAreaView className={'px-3 bg-bg-default h-full'} >
			{/* <ScrollView> */}
			<View>
				<SectionList
					sections={sections}
					keyExtractor={(_, index) => index}
					renderItem={({ item, index }) => (
						<TouchableOpacity key={item.id} 
							onPress={() => router.push(`/product/${item.id}`)}
						>
							<ItemProduct page={'home'} prop={item} />
						</TouchableOpacity>
					)}
					stickySectionHeadersEnabled={true}
					renderSectionHeader={({ section }) => (
						<Text className={'text-17 px-3 pt-3 bg-[#F7F6FB]'}>
							{section.title} <Text className={'text-sm text-slate-500'}> <Octicons name="dot-fill" size={8} /> {section.data.length}  продукта  </Text>
						</Text>
					)}
				/>
			</View>
			{/* </ScrollView> */}
		</SafeAreaView>
	)
}
export default History;

const styles = StyleSheet.create({
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'black',
		paddingTop: 20,
		paddingBottom: 10,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderColor: 'lightgray'
	}
})