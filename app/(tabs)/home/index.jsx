import { Alert, BackHandler, FlatList, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import ItemProduct from "../../../components/itemProduct";
import Limit from "../../../components/limit";
import ProgressLimit from "../../../components/progressLimit";
import Loading from "../../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getLimitData } from "../../../store/Slicers/Products";
import { useTranslation } from "react-i18next";
import { useFocusEffect, useNavigation } from "expo-router";

const home = () => {
    const platform = Platform.OS;
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const navigation = useNavigation();
    const [isModal, setModal] = useState(false);
    const [chooseCard, setChooseCard] = useState(null);
    const { limitData, isLoading } = useSelector(state => state.ProductSlicer)

    useEffect(() => {
        dispatch(getLimitData())
    }, [])

    const hanldeChooseCard = (prop) => {
        Alert.alert(t('alertHeading'), t('alertQuestion'), [
            {
                text: t('cancel'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    const findItem = limitData?.limit_list?.data.find(c => c.guidFinProduct === prop)
                    setChooseCard(findItem)
                    setModal(false)
                }
            },
        ]);
    }

    useEffect(() => {
        const backAction = () => {
            if (isModal) {
                setModal(false);
                return true;
            }
            return false;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, [isModal]);
    useFocusEffect(
        useCallback(() => {
            const backAction = () => {
                Alert.alert(t('close'), t('closeQuestion'), [
                    {
                        text: t('no'),
                        onPress: () => null,
                        style: 'cancel',
                    },
                    {
                        text: t('yes'),
                        onPress: () => BackHandler.exitApp(),
                    },
                ]);
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', backAction);
            return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
        }, [navigation])
    );

    if (isLoading) {
        return <Loading loading={isLoading} />
    }

    return (
        <SafeAreaView className={'h-full pt-3 items-center bg-bg-default'}>
            <Modal
                animationType="slide"
                visible={isModal}
                onRequestClose={() => setModal(false)}
            >
                <Pressable onPress={() => setModal(false)} style={styles.closeBox} >
                    <Ionicons name="close" style={styles.closebtn} />
                </Pressable>
                <View>
                    <Text className={'text-xl font-bold px-5 pb-3 text-center text-black'}> {t('limit_select')}  </Text>
                    <ScrollView>
                        {
                            limitData.limit_list?.data ? (
                                limitData.limit_list?.data.map((item, index) => (
                                    <Pressable className={'w-full'} key={index.toString()}
                                        onPress={() => hanldeChooseCard(item?.guidFinProduct)}
                                    >
                                        <View className={'w-full mb-5 justify-center items-center overflow-visible h-22'}>
                                            <Limit limit={item.limit} title={item.month_text} index={index} />
                                        </View>
                                    </Pressable>
                                ))
                            ) : (
                                <Text className='text-center'>
                                    {t('no_limit')}
                                </Text>
                            )
                        }
                    </ScrollView>
                </View>
            </Modal>
            <Pressable onPress={() => setModal(true)} className={'w-full'}>
                {
                    chooseCard ?
                        <View className={'w-full justify-center items-center overflow-visible h-22'}>
                            <Limit limit={chooseCard?.limit} title={chooseCard?.month_text} />
                            <ProgressLimit used={15489} limit={chooseCard?.limit} page={'home'} />
                        </View>
                        :
                        <View className="w-full justify-center items-center overflow-visible h-22">
                            <View className={'w-11/12 z-10 rounded-2xl m-auto justify-center items-center overflow-hidden h-20 bg-blue-500'}>
                                <View className={`absolute w-40 h-40 rounded-full left-1 -top-4 -mt-16 -ml-24 bg-blue-400 `} >
                                </View>
                                <View className='flex flex-row items-center justify-center' >
                                    <Ionicons name="information-outline" size={25} color={'white'} />
                                    <Text className='text-white text-19 ml-1'>
                                        {t('choose_limit')}
                                    </Text>
                                </View>
                            </View>
                            <ProgressLimit used={0} limit={0} page={'home'} />
                        </View>
                }
            </Pressable>
            <View className={' justify-start items-start w-11/12 flex-1 py-2'}>
                <View className={' flex flex-row'}>
                    <View>
                        <Text className={'text-black text-17 font-bold'}> {t('previously_scanned')} </Text>
                    </View>
                    <View className={'mt-1 -ml-2 flex flex-row'}>
                        <Entypo name={'dot-single'} size={16} color={'gray'} />
                        <Text className={'text-gray -mt-0.5 -ml-1  text-13'}>{limitData.products?.length} {t('goods')} </Text>
                    </View>
                </View>
                {limitData.products?.length == 0 &&
                    <View className={'mr-3 mt-1'}>
                        <Text className={'text-gray text-15 text-center'}>Scan the QR code to add the product to the list</Text>
                    </View>
                }
                {limitData.products?.length > 0 ?
                    <ScrollView>
                        <View className={platform === 'ios' ? 'w-full' : ' w-full h-full'}>
                            <FlatList
                                className='mt-2'
                                data={limitData?.products} renderItem={
                                    ({ item }) => (<ItemProduct prop={item} page={'home'} />)
                                } keyExtractor={(_, index) => index}
                                scrollEnabled={false}

                            />
                        </View>
                    </ScrollView>
                    : (
                        <View className='items-center justify-center flex-1 flex-col w-full'>
                            <Text>
                                {t('no_data')}
                            </Text>
                        </View>
                    )
                }
            </View>
        </SafeAreaView>
    )
}
export default home;

const styles = StyleSheet.create({
    modalHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    closebtn: {
        fontSize: 30,
        color: 'gray'
    },
    closeBox: {
        display: "flex",
        alignItems: "flex-end",
        paddingRight: 5,
        paddingTop: 5
    }
})