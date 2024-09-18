import { Tabs } from "expo-router";
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, TouchableOpacity, View } from "react-native";

export default () => {
	const platform = Platform.OS;
	return <Tabs
		screenOptions={{
			tabBarStyle: {
				backgroundColor: 'white',
				height: platform === 'ios' ? 90 : 60,
				borderTopWidth: 0,
				borderTopColor: 'transparent',
				shadowColor: "#000",
				shadowOpacity: 0,
				shadowRadius: 0,
				elevation: 0,
			}
		}}
	>
		<Tabs.Screen name="home" options={{
			headerShown: false,
			tabBarIcon: ({ color }) => <Ionicons name="home" size={22} color={color} />,
			tabBarShowLabel: false

		}} />
		<Tabs.Screen name="basket" options={{
			headerShown: false,
			tabBarIcon: ({ color }) => <FontAwesome6 name="basket-shopping" size={22} color={color} />,
			tabBarShowLabel: false
		}} />
		<Tabs.Screen name="scan" options={{
			headerShown: false,
			tabBarButton: (props) => (
				<TouchableOpacity onPress={props.onPress} className={'pt-0.5'}>
					<View className={'rounded-full bg-btn-primary p-3'}>
						<MaterialCommunityIcons name={'line-scan'} size={24} color={'white'} />
					</View>
				</TouchableOpacity>
			),
			tabBarShowLabel: false
		}} />
		<Tabs.Screen name='history' options={{
			headerShown: false,
			tabBarIcon: ({ color }) => <Ionicons name="clipboard" size={22} color={color} />,
			tabBarShowLabel: false
		}} />
		<Tabs.Screen name="setting" options={{
			headerShown: false,
			tabBarIcon: ({ color }) => <Ionicons name="person" size={22} color={color} />,
			tabBarShowLabel: false
		}} />
	</Tabs>

}