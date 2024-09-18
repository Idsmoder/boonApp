import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeLangue, getLanguage, getTheme, toggleTheme } from "../../../store/Slicers/SwitchState";

import Loading from "../../../components/Loading";
const Decor = () => {
	const { theme, language, langLoad, themeLoad } = useSelector(state => state.SwitchState);
	const dispatch = useDispatch()
	const { t } = useTranslation();
	useEffect(() => {
		dispatch(getTheme());
		dispatch(getLanguage())
	}, [])

	const icons = [
		require('../../../assets/icons/1.png'),
		require('../../../assets/icons/2.png'),
		require('../../../assets/icons/3.png'),
		require('../../../assets/icons/4.png'),
	]
	const langData = [
		{
			id: 1,
			lang: "ru",
			name: 'Русский язык',
			icon: require('../../../assets/icons/ru.png')
		},
		{
			id: 2,
			lang: "uz",
			name: "O`zbek tili",
			icon: require('../../../assets/icons/uz.png'),
		},
	]
	const themeData = [
		{
			id: 1,
			name: 'dark',
			bg: require('../../../assets/icons/dark.png'),
		},
		{
			id: 2,
			name: 'light',
			bg: require('../../../assets/icons/white.png'),
		},
	]
	return (
		<View className={`flex justify-start h-full items-center bg-bg-default `} >
			<Loading loading={langLoad || themeLoad} />
			<View className={'mt-7 w-11/12 '}>
				<View>
					<Text className={'text-19'}>{t('theme_apk')}</Text>
				</View>
				<View className={'w-full my-4'}>
					<Text className={'text-13'}>{t('icon_apk')}</Text>
				</View>
				<View className={'flex flex-row'}>
					<View className={'rounded-lg'}>
						<Image source={icons[0]} className={'w-16 h-16'} />
					</View>
					<View className={' ml-4  '}>
						<Image source={icons[1]} className={'w-16 h-16'} />
					</View>
					<View className={' ml-4'}>
						<Image source={icons[2]} className={'w-16 h-16'} />
					</View>
					<View className={' ml-4'}>
						<Image source={icons[3]} className={'w-16 h-16'} />
					</View>
				</View>
				<View className={'w-full my-4'}>
					<Text className={'text-13'}> {t('color_scheme')} </Text>
				</View>
				<View className={'flex flex-row gap-4'}>
					{
						themeData.map((item) => {
							return (
								<Pressable className={'justify-center items-center'}
									key={item.id}
									onPress={() => {
										dispatch(toggleTheme(item.name))
									}}
								>
									<View className={`border  rounded-md overflow-hidden ${item.name === theme ? 'border-blue-400' : 'border-transparent'} `} >
										<Image source={item.bg} className={'w-16 h-28'} />
									</View>
									<View className={'mt-2 items-center'}>
										<Text className={'text-13'}> {t(item.name)} </Text>
										<View className={'mt-1'}>
											<Ionicons size={22} name={item.name === theme ? "radio-button-on" : "radio-button-off"} color={item.name === theme ? "#007FFF" : "gray"} />
										</View>
									</View>
								</Pressable>
							)
						})
					}
				</View>
				<View className={'w-full my-4'}>
					<Text className={'text-13'}> {t('lang_scheme')} </Text>
				</View>
				<View className='felx flex-col gap-2'>
					{
						langData.map((item) => (
							<Pressable
								onPress={() => {
									dispatch(changeLangue(item.lang))
								}}
								key={item.id} className={'border border-gray-200 flex flex-row rounded-lg bg-white py-2 px-4 items-center justify-between'}>
								<View className={'flex flex-row items-center gap-2'}>
									<View>
										<Image source={item.icon} className={'w-8 h-8'} />
									</View>
									<View>
										<Text className={`text-15 ${item.lang === language ? 'font-medium tracking-wider' : ''} `}>{item.name}</Text>
									</View>
								</View>
								<View>
									<Ionicons size={22} name={item.lang === language ? "radio-button-on" : "radio-button-off"} color={item.lang === language ? "#007FFF" : "gray"} />
								</View>
							</Pressable>
						))
					}
				</View>
			</View>
			<View className={'h-12 rounded-lg bg-btn-primary justify-center absolute bottom-5  w-11/12'}>
				<Text className={'text-center text-white'}> {t('change_design')} </Text>
			</View>
		</View>
	)
}
export default Decor;