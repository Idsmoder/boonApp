import { Stack } from "expo-router";
import { View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { Store } from "../store/Store";
import { useTranslation } from "react-i18next";
import themeContext from './../theme/themeContext'
import Theme from "../theme/theme";
import { useContext } from "react";
const IndexStact = () => {
	return (
		<Provider store={Store}>
			<ThemeProvider />
		</Provider>
	)
}

export default IndexStact;
export const ThemeProvider = () => {
	const theme = useSelector(state => state.SwitchState.theme);
	return (
		<themeContext.Provider value={theme === 'dark' ? Theme.dark : Theme.light}>
			<Layout />
		</themeContext.Provider>
	)
}

export const Layout = () => {
	const { t } = useTranslation();
	const Th = useContext(themeContext)
	return (
		<Stack>
			<Stack.Screen name="login" options={{ headerShown: false }} />
			<Stack.Screen name="offert/Offert" options={{ headerShown: false }}  />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="product/[id]" options={{
				headerBackTitleVisible: false,
				headerBackground: () => <View className={'bg-bg-default h-full'} style={{ backgroundColor: Th.backgroundColor }} />,
				headerTitle: t('product_info'),
				headerTintColor: Th.color,
			}} />
			<Stack.Screen name="setting/account/[id]" options={{
				headerBackTitleVisible: false,
				headerBackground: () => <View className={'bg-bg-default h-full'} style={{ backgroundColor: Th.backgroundColor }} />,
				headerTitle: t('account_setting'),
				headerTintColor: Th.color,
				headerTitleAlign: 'center'
			}} />
			<Stack.Screen name="setting/payments/[id]" options={{
				headerBackTitleVisible: false,
				headerBackground: () => <View className={'bg-bg-default h-full'} style={{ backgroundColor: Th.backgroundColor }} />,
				headerTitle: t('payment_methods'),
				headerTintColor: Th.color,
				headerTitleAlign: 'center',
			}} />
			<Stack.Screen name="setting/security/[id]" options={{
				headerBackTitleVisible: false,
				headerBackground: () => <View className={'bg-bg-default h-full'} style={{ backgroundColor: Th.backgroundColor }} />,
				headerTitle: t('security'),
				headerTintColor: Th.color,
				headerTitleAlign: 'center'
			}} />
			<Stack.Screen
				name="setting/addCard/add"
				options={{
					headerBackTitleVisible: false,
					headerBackground: () => <View className={'bg-bg-default h-full'} style={{ backgroundColor: Th.backgroundColor }} />,
					headerTitleAlign: 'center',
					headerTintColor: Th.color

				}} />
			<Stack.Screen name="setting/decor/[id]" options={{
				headerBackTitleVisible: false,
				headerBackground: () => <View className={'bg-bg-default h-full'} style={{ backgroundColor: Th.backgroundColor }} />,
				headerTitle: t('design'),
				headerTitleAlign: 'center',
				headerTintColor: Th.color
			}} />
			<Stack.Screen name="order/Order" options={{
				headerBackTitleVisible: false,
				headerBackground: () => <View className={'bg-bg-default h-full'} style={{ backgroundColor: Th.backgroundColor }} />,
				headerTitle: t('an_order'),
				headerTitleAlign: 'center',
				headerTintColor: Th.color

			}} />
		</Stack>
	)
}