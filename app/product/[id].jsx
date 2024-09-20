import { Image, Pressable, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../api/api";
import createDashedLine from "../../utils/createDashedLine";
import ImageView from "react-native-image-viewing";
import { useTranslation } from "react-i18next";
import themeContext from "../../theme/themeContext";
const id = () => {
	const Th = useContext(themeContext)
	const [isLoading, setLoading] = useState(false)
	const [visible, setIsVisible] = useState(false);
	const [singleInfo, setSingleInfo] = useState(null)
	const { params } = useRoute();
	const { t } = useTranslation()
	const link = "https://gateway.texnomart.uz/api/common/v1/stock/product-characters?unique_id="
	const getSingleProduct = async () => {
		setLoading(true)
		const _id = params.id?.split('==')[0];
		const show = params.id?.split('==')[1];
		if (_id) {
			try {
				if (show) {
					const res = await api(`${link}${_id}`);
					setSingleInfo(res.data?.data?.data)
				}
				else {
					const res = await api(`/application/product_info/${_id}`);
					setSingleInfo(res.data?.info)
				}
			} catch (error) {
				console.log(error);
			}
			finally {
				setLoading(false)
			}
		}
	}
	useEffect(() => {
		getSingleProduct()
	}, [params.id])

	if (isLoading) {
		return <Loading loading={isLoading} />
	}
	sections = singleInfo?.map(section => ({
		title: section.name,
		data: section.characters,
	}));
	return (
		<SafeAreaView style={[styles.container, { backgroundColor: Th.backgroundColor }]}>
			{singleInfo ? (
				<View style={styles.wrapper}>
					<Text style={[styles.headerText, { color: Th.color }]}  >
						{singleInfo?.name}
					</Text>
					<ImageView
						imageIndex={0}
						visible={visible}
						onRequestClose={() => setIsVisible(false)}
						images={[{ uri: singleInfo?.image }]}
					/>
					{singleInfo?.image ?
						<Pressable onPress={() => setIsVisible(true)} >
							<Image
								source={{ uri: singleInfo?.image }}
								style={{ margin: "auto" }}
								onError={(error) => console.error('Rasm yuklanmadi', error)}
								width={300}
								height={150}
								resizeMode='contain'
							/>
						</Pressable>
						: null}
					<SectionList
						sections={sections}
						keyExtractor={(item, index) => item + index}
						renderItem={({ item }) => (
							<View style={styles.character}>
								<Text style={[styles.characterName, { color: Th.color }]}
								>{item.name}: </Text>
								<Text style={styles.characterName} >
									{createDashedLine(item?.name, item.value, 45)}
								</Text>
								<Text style={[styles.characterValue, { color: Th.color }]}>{item.value}</Text>
							</View>
						)}
						renderSectionHeader={({ section: { title } }) => (
							<Text style={[styles.sectionTitle, { color: Th.color, backgroundColor: Th.backgroundColor }]} >{title}</Text>
						)}
						stickySectionHeadersEnabled={true}
						contentContainerStyle={styles.scrollViewContent}
					/>
					<TouchableOpacity style={styles.button}>
						<Text style={[styles.buttonText, { color: Th.color }]}> {t('add_cart')} </Text>
					</TouchableOpacity>
				</View>
			) : (
				<View style={[styles.emptyState, { backgroundColor: Th.backgroundColor }]} >
					<Text style={[styles.emptyStateText, { color: Th.color }]}>
						{t('no_data')}
					</Text>
				</View>
			)
			}
		</SafeAreaView >
	)
}
export default id;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
	},
	scrollViewContent: {
		paddingHorizontal: 20,
	},
	headerText: {
		fontSize: 19,
		paddingHorizontal: 20,
	},
	section: {
		marginVertical: 10,
	},
	sectionTitle: {
		fontSize: 19,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	character: {
		flexDirection: 'row',
		paddingVertical: 3,
		flexWrap: "wrap",
		justifyContent: "space-between"
	},
	characterName: {
		fontSize: 13,
		color: 'gray',
	},
	characterValue: {
		fontSize: 13,
		color: 'black',
	},
	button: {
		backgroundColor: '#007bff',
		height: 50,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
	},
	buttonText: {
		color: 'white',
		fontSize: 15,
	},
	emptyState: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyStateText: {
		fontSize: 19,
		fontWeight: 'bold',
	},
});