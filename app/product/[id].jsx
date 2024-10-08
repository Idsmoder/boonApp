import { Image, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { URL } from "../../api/const";
import Loading from "../../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../api/api";
const id = () => {
	const [isLoading, setLoading] = useState(false)

	const [singleInfo, setSingleInfo] = useState(null)
	const { params } = useRoute();

	const getSingleProduct = async () => {
		setLoading(true)
		if (params.id) {
			try {
				const res = await api(`application/product_info/${params?.id}`);
				// console.log('single prod`uct', JSON.stringify(res.data, null, 2));
				setSingleInfo(res.data)
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
	let sections = singleInfo?.info.map(section => ({
		title: section.name,
		data: section.characters,
	}));
	return (
		<SafeAreaView style={styles.container}>
			{singleInfo ? (
				<View style={styles.wrapper}>
					<Text style={styles.headerText}>
						{singleInfo?.name}
					</Text>
					<Image
						source={{ uri: singleInfo?.image }}
						style={{ margin: "auto" }}
						onError={(error) => console.error('Rasm yuklanmadi', error)}
						width={350}
						height={150}
						resizeMode='contain'
					/>
					<SectionList
						sections={sections}
						keyExtractor={(item, index) => item + index}
						renderItem={({ item }) => (
							<View style={styles.character}>
								<Text style={styles.characterName}
								>{item.name}: </Text>
								<Text style={styles.characterValue}>{item.value}</Text>
							</View>
						)}
						renderSectionHeader={({ section: { title } }) => (
							<Text style={styles.sectionTitle}>{title}</Text>
						)}
						stickySectionHeadersEnabled={true}
						contentContainerStyle={styles.scrollViewContent}
					/>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Добавить в корзину</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View style={styles.emptyState}>
					<Text style={styles.emptyStateText}>
						Malumot topilmadi
					</Text>
				</View>
			)}
		</SafeAreaView>
	)
}
export default id;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white"
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
		textAlign: 'center',
	},
	image: {
		width: '100%',
		height: 150,
		resizeMode: 'contain',
	},
	section: {
		marginVertical: 10,
	},
	sectionTitle: {
		fontSize: 19,
		fontWeight: 'bold',
		color: 'black',
		marginBottom: 5,
		backgroundColor: "white"
	},
	character: {
		flexDirection: 'row',
		paddingVertical: 3,
		flexWrap: "wrap",
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