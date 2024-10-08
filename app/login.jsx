import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { useState } from "react";
import { loadingIcon } from "../assets/loading.svg";
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator, SkypeIndicator
} from "react-native-indicators";
import { Redirect, router } from "expo-router";
import { cleanPhoneNumber } from "../utils/formatPhone";
import axios from "axios";
import { URL } from "../api/const";


const Login = () => {
    const [user, setUser] = useState({
        phone: '',
        password: '',
    });
    const getInputValue = (name, value) => {
        setUser({
            ...user,
            [name]: value
        });
    }

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

    const login = async () => {
        setLoading(true);
        try {
            const res = await axios(`${URL}/client/auth/login`, {
                method: 'post',
                data: { ...user, phone: cleanPhoneNumber(user.phone) },
            })
            console.log('login', res);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    if (!loading) {
        <Redirect href={'home'} />
    }
    return (
        <View className={'flex-1 justify-center w-full items-center bg-bg-default'}>
            <View className={'w-11/12'}>
                <Text className={'text-2xl  text-black text-19'}>Добро пожаловать!</Text>
            </View>
            <View className={'w-11/12'}>
                <Text className={'text-base text-gray text-17'}>Введите номер телефона и пароль, чтобы войти</Text>
            </View>
            <View className={'w-11/12   '}>
                <TextInputMask
                    value={user.phone}
                    onChangeText={(vlaue) => getInputValue('phone', vlaue)}
                    type={'custom'}
                    inputMode={'numeric'}
                    options={{
                        mask: '+998 (99) 999 99 99'
                    }}
                    className={' border border-border-1 bg-white rounded-md text-black font-bold  text-15  h-11 mt-5 pl-5'}
                    keyboardType={'phone-pad'}
                    placeholder={'+998'}
                />
                {user.phone.length > 0 &&
                    <View className={'absolute right-5 top-2/4'}>
                        <TouchableOpacity onPress={() => setUser({ ...user, phone: '' })}>
                            <Ionicons name="close-circle" size={22} color="gray" />
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <View className={'w-11/12'}>
                <TextInput
                    onChangeText={(vlaue) => getInputValue('password', vlaue)}
                    className={'border border-border-1 bg-white rounded-md text-gray text-15  h-11 mt-5 pl-5 pr-12'}
                    placeholder={'Пароль'}
                    secureTextEntry={showPassword}
                />
                <View className={'absolute right-5 top-2/4'}>
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={22} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className={'w-11/12'}>
                <Text className={'text-blue-500 text-15 mt-2'}>Забыли пароль?</Text>
            </View>
            <View className={'w-11/12 absolute bottom-4'}>
                {loading &&
                    <View className={'animate-spin bg-btn-primary h-12 mt-5 rounded-md items-center justify-center'}>
                        <SkypeIndicator color={'white'} size={30} />
                    </View>
                }
                {!loading &&
                    <TouchableOpacity disabled={loading} className={'bg-btn-primary h-12 mt-5 rounded-md items-center justify-center'} onPress={login}>
                        <Text className={'text-white text-15 '}>Войти</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
export default Login;