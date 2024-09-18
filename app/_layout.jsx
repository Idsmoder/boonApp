import { Stack } from "expo-router";
import { View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { Store } from "../store/Store";
import { useTranslation } from "react-i18next";
const IndexStact = () => {
	return (
		<Provider store={Store}>
			<Layout />
		</Provider>
	)
}

export default IndexStact;

export const Layout = () => {
	const { t } = useTranslation();
	//  const theme = useSelector(state => state.SwitchState.theme);
	return (
		<Stack>
			<Stack.Screen name="login" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="product/[id]" options={{
				headerBackTitleVisible: false,
				headerBackground: () => <View className={'bg-bg-default h-full'} />,
				headerTitle: t('product_info'),
			}} />
			<Stack.Screen name="setting/account/[id]" options={{
				headerBackTitleVisible: false,
				headerBackground: () => <View className={'bg-bg-default h-full'} />,
				headerTitle: t('account_setting'),
				headerTitleAlign: 'center'
			}} />
			<Stack.Screen name="setting/payments/[id]" options={{
				headerBackTitleVisible: false,
				headerBackground: () => <View className={'bg-bg-default h-full'} />,
				headerTitle: t('payment_methods'),
				headerTitleAlign: 'center',
			}} />
			<Stack.Screen name="setting/security/[id]" options={{
				headerBackTitleVisible: false,
				headerBackground: () => <View className={'bg-bg-default h-full'} />,
				headerTitle: t('security'),
				headerTitleAlign: 'center'
			}} />
			<Stack.Screen
				name="setting/addCard/add"
				options={{
					headerBackTitleVisible: false,
					headerBackground: () => <View className={'bg-bg-default h-full'} />,
					headerTitleAlign: 'center',
				}} />
			<Stack.Screen name="setting/decor/[id]" options={{
				headerBackTitleVisible: false,
				headerBackground: () => <View className={'bg-bg-default h-full'} />,
				headerTitle: t('design'),
				headerTitleAlign: 'center',
			}} />
			<Stack.Screen name="order/Order" options={{
				headerBackTitleVisible: false,
				headerBackground: () => <View className={'bg-bg-default h-full'} />,
				headerTitle: t('an_order'),
				headerTitleAlign: 'center',
			}} />
		</Stack>
	)
}
