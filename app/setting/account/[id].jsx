import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import formatPhone from "../../../utils/formatPhone";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import { TextInputMask } from "react-native-masked-text";
import { useTranslation } from "react-i18next";
import themeContext from "../../../theme/themeContext";
import Button from "../../../components/Button";

const Account = () => {
    const { t } = useTranslation()
    const Th = useContext(themeContext)
    const [account, setAccount] = useState({
        name: 'John',
        surname: 'Doe',
        phone: '998999999999',
        image: 'https://randomuser.me/api/portraits/men/75.jpg'
    })
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        // console.log('pickImage', JSON.stringify(result, null, 2));
        if (!result.canceled) {
            setAccount({ ...account, image: result.assets[0].uri });
        }
    };
    return (
        <View className={'flex justify-start items-center h-full'} style={{ backgroundColor: Th.backgroundColor }} >
            <TouchableOpacity onPress={pickImage}>
                <View className={'mt-10 justify-center items-center'}>
                    <View>
                        <Image source={{ uri: account.image }} className={'w-20 h-20 rounded-full'} />
                    </View>
                    <View className={'absolute'}>
                        <View className={'w-10  h-10  justify-center items-center bg-btn-primary rounded-full mt-10  ml-12'}>
                            <Entypo name={'pencil'} size={18} color={'white'} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View className={'mt-10 p-3 justify-center items-center w-full'}>
                <View className={'w-full'}>
                    <Text className={'text-17'} style={{ color: Th.color }}> {t('basic_data')} </Text>
                </View>
                <View className={'w-full pt-5 '}>
                    <View>
                        <Text className={'text-13'} style={{ color: Th.color }} > {t('name')} </Text>
                    </View>
                    <View className={'border border-gray-200 rounded-lg w-full h-12 justify-center pl-1 bg-white mt-1'}>
                        <TextInput
                            className={'p-3 text-15'}
                            placeholder={'John'}
                            value={account.name}
                            onChange={(e) => setAccount({ ...account, name: e.nativeEvent.text })}
                        />
                    </View>
                </View>
                <View className={'w-full pt-3 '}>
                    <View>
                        <Text className={'text-13'} style={{ color: Th.color }}> {t('surname')} </Text>
                    </View>
                    <View className={'border border-gray-200 rounded-lg w-full h-12 justify-center pl-1 bg-white mt-1'}>
                        <TextInput
                            className={'p-3 text-15'}
                            placeholder={'Doe'}
                            value={account.surname}
                            onChange={(e) => setAccount({ ...account, surname: e.nativeEvent.text })}
                        />
                    </View>
                </View>
                <View className={'w-full pt-3 '}>
                    <View>
                        <Text className={'text-13'} style={{ color: Th.color }}> {t('phone')} </Text>
                    </View>
                    <View className={'border border-gray-200 rounded-lg w-full h-12 justify-center pl-1 bg-white mt-1'}>
                        <TextInputMask
                            keyboardType={'numeric'}
                            type={'custom'}
                            options={{
                                mask: '+998 (99) 999 99 99'
                            }}
                            className={'p-3 text-15'}
                            placeholder={'998999999'}
                            value={formatPhone(account.phone)}
                            onChange={(e) => setAccount({ ...account, phone: e.nativeEvent.text })}
                        />
                    </View>
                </View>
            </View>
            <View className={'absolute bottom-5 w-full px-3'}>
                <Button className={'text-center text-white'} text={t('save_data')} />
            </View>

        </View>
    )
}
export default Account;