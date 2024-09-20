import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, BackHandler, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { useCallback, useContext, useEffect, useState } from "react";
import { SkypeIndicator } from "react-native-indicators";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { cleanPhoneNumber } from "../utils/formatPhone";
import axios from "axios";
import { URL } from "../api/const";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";
import { setToken } from "../store/Slicers/LoginSlicer";
import { useDispatch } from "react-redux";
import DialogComponent from "../components/Dialog";
import themeContext from "../theme/themeContext";
const Login = () => {
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const Th = useContext(themeContext)
    const navigation = useNavigation();
    const [quit, setQuit] = useState(false)
    const [user, setUser] = useState({
        phone: '+998',
        password: '',
    });
    const getInputValue = (name, value) => {
        setUser({
            ...user,
            [name]: value
        });

    }
    const login = async () => {
        validateForm()
        setSubmitted(true)
        if (isFormValid) {
            setLoading(true);
            try {
                const res = await axios(`${URL}/client/auth/login`, {
                    method: 'post',
                    data: { ...user, phone: cleanPhoneNumber(user.phone) },
                })
                if (res.status === 200) {
                    dispatch(setToken(res.data?.access_token))
                    router.replace('/home')
                }
            }
            catch (error) {
                console.log(error.message, 'error');
                showMessage({
                    message: t('response_error'),
                    type: "danger",
                });
            }
            finally {
                setLoading(false);
                setSubmitted(false)
            }
        } else {
            showMessage({
                message: t('invalid_inputs'),
                type: "danger",
            });
        }
    }
    useEffect(() => {
        validateForm();
    }, [user.password, user.phone]);

    const validateForm = () => {
        let errors = {};
        if (!user.phone) {
            errors.phone = t('phone_empty');
        } else {
            const cleanedPhone = user.phone.replace(/[\s()-]/g, '');
            if (!/^\+998\d{9}$/.test(cleanedPhone)) {
                errors.phone = t('phone_error');
            }
        }
        if (!user.password) {
            errors.password = t('password_empty');
        } else if (user.password.length < 6) {
            errors.password = t('password_error');
        }
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    useFocusEffect(
        useCallback(() => {
            const backAction = () => {
                setQuit(true)
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', backAction);
            return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
        }, [navigation])
    );

    return (
        <View className={'flex-1 justify-center w-full items-center'} style={{ backgroundColor: Th.black_bg_Color }} >
            <FlashMessage position="top" duration={3000} style={{ top: 30 }} />
            <StatusBar
                backgroundColor={Th.black_bg_Color}
                barStyle={Th.barStyle}
            />
            <DialogComponent isAlert={quit} setAlert={setQuit} title={t('close_text')}
                handle={BackHandler.exitApp}
                description={t('closeQuestion')}
                handleTitle={t('close')}
            />
            <View className={'w-11/12'}>
                <Text className={'text-2xl text-19'} style={{ color: Th.color }}  >{t('welcome')}  </Text>
            </View>
            <View className={'w-11/12'}>
                <Text className={'text-base text-gray text-17'}>{t('enter_text')} </Text>
            </View>
            <View className={'w-full px-4'}>
                <TextInputMask
                    value={user.phone}
                    onChangeText={(vlaue) => getInputValue('phone', vlaue)}
                    type={'custom'}
                    inputMode={'numeric'}
                    options={{
                        mask: '+998 (99) 999 99 99'
                    }}
                    className={`border border-border-1 bg-white rounded-md text-black font-bold  text-15  h-11 mt-5 mb-3 pl-5  ${errors.phone && submitted && 'border-red-600'} `}
                    keyboardType={'phone-pad'}
                    placeholder={'+998'}
                />
                {user.phone.length !== 4 &&
                    <View className={'absolute right-7 top-[30px]'}>
                        <TouchableOpacity onPress={() => setUser({ ...user, phone: '+998' })}>
                            <Ionicons name="refresh-circle-outline" size={22} color={errors.phone && submitted ? 'red' : 'gray'} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
            {
                (submitted && errors.phone) &&
                <View className={'w-full px-5'} >
                    <Text style={styles.errorText}>
                        {errors.phone}
                    </Text>
                </View>
            }
            <View className={'w-full px-4'}>
                <TextInput
                    onChangeText={(vlaue) => getInputValue('password', vlaue)}
                    className={`border border-gray-200 bg-white rounded-md text-gray text-15  h-11 mt-2 pl-5 pr-12 ${errors.password && submitted && 'border-red-600'}`}
                    placeholder={t('password')}
                    secureTextEntry={showPassword}
                />
                <View className={'absolute right-7 top-1/3'}>
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={22} color={errors.password && submitted ? '#FF2E2E' : 'gray'} />
                    </TouchableOpacity>
                </View>
            </View>
            {
                (submitted && errors.password) &&
                <View className={'w-full px-5 mt-2'}>
                    <Text style={styles.errorText}>
                        {errors.password}
                    </Text>
                </View>
            }
            <TouchableOpacity className={'w-full px-4 mt-2'} >
                <Text className={'text-blue-500 text-15 mt-2'}> {t('forget_password')} </Text>
            </TouchableOpacity>
            <View className={'w-11/12 absolute bottom-4'}>
                {loading &&
                    <View className={'animate-spin bg-btn-primary h-12 mt-5 rounded-md items-center justify-center'}>
                        <SkypeIndicator color={'white'} size={30} />
                    </View>
                }
                {!loading &&
                    <TouchableOpacity disabled={loading} className={'bg-btn-primary h-12 mt-5 rounded-md items-center justify-center'} onPress={login}>
                        <Text className={'text-white text-15 '}> {t('login')} </Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
export default Login;

const styles = StyleSheet.create({
    errorElem: {
        borderColor: 'red',
        color: "red"
    },
    errorText: {
        color: 'red',
    }
})