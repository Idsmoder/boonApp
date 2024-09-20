import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import formatPhone from "../../../utils/formatPhone";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../../store/Slicers/LoginSlicer";
import { useContext, useState } from "react";
import { CommonActions } from '@react-navigation/native';
import Loading from "../../../components/Loading";
import themeContext from "../../../theme/themeContext";
import Button from "../../../components/Button";
import Dialog from "react-native-dialog";
import DialogComponent from "../../../components/Dialog";

const SettingPage = () => {
    const { logOut_load } = useSelector(state => state.LoginSlicer)
    const [isAlert, setAlert] = useState(false)
    const { t } = useTranslation()
    const navigation = useNavigation()
    const Th = useContext(themeContext)
    const account = {
        name: 'Idsmoder',
        phone: 998913452724,
        id: 1
    }
    const dispatch = useDispatch()
    const logOut = () => {
        dispatch(removeToken());
        router.push('/login')
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'login' }]
            })
        );
    }
    return (
        <ScrollView className='h-full' style={{ backgroundColor: Th.backgroundColor }}  >
            <Loading loading={logOut_load} />
            <View className={'flex justify-center items-center h-full px-5'}>
                <View className={'mt-5 justify-center items-center '}>
                    <View>
                        <Image source={require('../../../assets/profile/user.jpg')} className={'w-28 h-28 rounded-full'} />
                    </View>
                    <View className={'mt-3 '}>
                        <Text className={'text-19'} style={{ color: Th.color }} >Idsmoder</Text>
                    </View>
                    <View className={'mt-2 '}>
                        <Text className={'text-15 text-gray'}>{formatPhone(998913452724)}</Text>
                    </View>
                </View>
                <View className={'mt-5 justify-center items-center w-full'}>
                    <View className={'flex w-full flex-row rounded-t-2xl h-16 px-5 justify-between items-center'} style={{ backgroundColor: Th.black_bg_Color }}  >
                        <View className={'flex-row'}>
                            <View className={'w-10 h-10  justify-center items-center rounded-full bg-bg-icon'}>
                                <FontAwesome name={'user'} size={24} color={'#007FFF'} />
                            </View>
                            <View className={'justify-center items-center ml-3'}>
                                <Text className={'text-15'} style={{ color: Th.color }}> {t('account_setting')} </Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => router.push(`/setting/account/${account.id}`)}>
                                <Entypo name={'chevron-right'} size={24} color={'gray'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ backgroundColor: Th.black_bg_Color }} className={'flex w-full flex-row h-16 justify-between p-5 items-center '}>
                        <View className={'flex-row'}>
                            <View className={'w-10 h-10  justify-center items-center rounded-full bg-bg-icon'}>
                                <Ionicons name={'card'} size={24} color={'#007FFF'} />
                            </View>
                            <View className={'justify-center items-center ml-3'}>
                                <Text className={'text-15'} style={{ color: Th.color }}> {t('payment_methods')} </Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => router.push(`/setting/payments/[id]`)}>
                                <Entypo name={'chevron-right'} size={24} color={'gray'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ backgroundColor: Th.black_bg_Color }} className={'flex w-full flex-row  h-16 justify-between px-5 items-center '}>
                        <View className={'flex-row'}>
                            <View className={'w-10 h-10  justify-center items-center rounded-full bg-bg-icon'}>
                                <MaterialCommunityIcons name={'security'} size={24} color={'#007FFF'} />
                            </View>
                            <View className={'justify-center items-center ml-3'}>
                                <Text className={'text-15 text-black'} style={{ color: Th.color }}> {t('security')} </Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => router.push(`/setting/security/${account.id}`)}>
                                <Entypo name={'chevron-right'} size={24} color={'gray'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ backgroundColor: Th.black_bg_Color }} className={'flex w-full flex-row rounded-b-2xl  h-16 justify-between px-5 items-center '}>
                        <View className={'flex-row'}>
                            <View className={'w-10 h-10  justify-center items-center rounded-full bg-bg-icon'}>
                                <MaterialCommunityIcons name={'palette-swatch-variant'} size={24} color={'#007FFF'} />
                            </View>
                            <View className={'justify-center items-center ml-3'}>
                                <Text className={'text-15 text-black'} style={{ color: Th.color }}> {t('system_setting')} </Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => router.push(`/setting/decor/${account.id}`)}>
                                <Entypo name={'chevron-right'} size={24} color={'gray'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className={'w-full mt-5'} >
                        <Button text={t('logout')} className={'bg-red-400'} handle={() => setAlert(true)} icon={'exit'} />
                    </View>
                </View>
            </View>
            <DialogComponent isAlert={isAlert} setAlert={setAlert} description={t('alertQuestion')} title={t('logoutHeading')}
                handle={logOut}
                handleTitle={t('yes')}
            />
        </ScrollView>
    )
}
export default SettingPage;
const styles = StyleSheet.create({
    dialog_container: {
        borderRadius: 15,
    },
})