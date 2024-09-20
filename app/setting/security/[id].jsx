import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import themeContext from "../../../theme/themeContext";

const Security = () => {
    const { t } = useTranslation()
    const [showPasswordOld, setShowPasswordOld] = useState(true)
    const [showPasswordNew, setShowPasswordNew] = useState(true)
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(true)
    const Th = useContext(themeContext)
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className={'flex-1'}
            style={{ backgroundColor: Th.backgroundColor }}
        >
            <View className={'flex justify-start items-center h-full'} style={{ backgroundColor: Th.backgroundColor }} >
                <View className={'mt-5  justify-center items-center w-full '}>
                    <View className={' w-11/12'}>
                        <Text className={'text-17'} style={{ color: Th.color }}> {t('update_password')} </Text>
                    </View>
                    <View className={'w-11/12 pt-5 '}>
                        <View>
                            <Text className={'text-13'} style={{ color: Th.color }}> {t('old_password')} </Text>
                        </View>
                        <View className={'border border-gray-200 rounded-lg w-full h-12 justify-center pl-1 bg-white mt-1'}>
                            <TextInput
                                className={'ml-5 text-17'}
                                secureTextEntry={showPasswordOld}
                            />
                            <View className={'absolute right-5 '}>
                                <TouchableOpacity onPress={() => setShowPasswordOld(!showPasswordOld)}>
                                    <Ionicons name={showPasswordOld ? 'eye' : 'eye-off'} size={22} color="gray" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View className={'w-11/12 pt-5 '}>
                        <View>
                            <Text className={'text-13'} style={{ color: Th.color }}> {t('new_password')} </Text>
                        </View>
                        <View className={'border border-gray-200 rounded-lg w-full h-12 justify-center pl-1 bg-white mt-1'}>
                            <TextInput
                                className={'ml-5 text-17'}
                                secureTextEntry={showPasswordNew}
                            />
                            <View className={'absolute right-5 '}>
                                <TouchableOpacity onPress={() => setShowPasswordNew(!showPasswordNew)}>
                                    <Ionicons name={showPasswordNew ? 'eye' : 'eye-off'} size={22} color="gray" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View className={'w-11/12 pt-5 '}>
                        <View>
                            <Text className={'text-13'} style={{ color: Th.color }}> {t('repeat_new_password')} </Text>
                        </View>
                        <View className={'border border-gray-200 rounded-lg w-full h-12 justify-center pl-1 bg-white mt-1'}>
                            <TextInput
                                className={'ml-5 text-17'}
                                secureTextEntry={showPasswordRepeat}
                            />
                            <View className={'absolute right-5 '}>
                                <TouchableOpacity onPress={() => setShowPasswordRepeat(!showPasswordRepeat)}>
                                    <Ionicons name={showPasswordRepeat ? 'eye' : 'eye-off'} size={22} color="gray" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View className={'h-12 rounded-lg bg-btn-primary justify-center absolute bottom-5  w-11/12'}>
                    <Text className={'text-center text-white'}> {t('save_data')} </Text>
                </View>

            </View>
        </KeyboardAvoidingView>
    )
}
export default Security;