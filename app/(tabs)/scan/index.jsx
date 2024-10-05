import { View, Text, Button, StyleSheet, AppState, ActivityIndicator } from "react-native";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef } from "react";
import { requestCameraPermissionsAsync } from "expo-camera/legacy";
import { SafeAreaView } from "react-native-safe-area-context";
import extractDynamicPart from "../../../utils/extractDynamicPart";
import { router } from "expo-router";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import api from "../../../api/api";

export default function Scan() {
    const { t } = useTranslation()
    const [hasPermission, setHasPermission] = useCameraPermissions()
    const qrLock = useRef(false)
    const appState = useRef(AppState.currentState)
    const successCode = async (barcode) => {
        if (barcode.data && extractDynamicPart(barcode.data)) {
            router.push(`/product/${extractDynamicPart(barcode.data)}`)

            // try {
            //     const result = await api({
            //         url: `application/product_parse`, method: "POST",
            //         data: {
            //             product_url: barcode.data,
            //             task_id: 20
            //         }
            //     })
            //     if (result.status === 200) {
            //         showMessage({
            //             message: t('add_product'),
            //             type: "success",
            //             duration: 3000,
            //             style: { top: 30 }
            //         });
            //         // router.push(`/product/${extractDynamicPart(barcode.data)}`)
            //         router.replace('home')
            //     }

            // } catch (error) {
            //     console.log(error);
            // }
        }
        else {
            showMessage({
                message: t('scannError'),
                type: "danger",
                duration: 3000,
                style: { top: 30 }
            });
        }
    }
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                qrLock.current = false;
            }
            appState.current = nextAppState;
        });
        return () => {
            subscription.remove();
        };
    }, []);

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loadingText}> {t('requesting_permission...')} </Text>
            </View>
        )
    }

    if (!hasPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.cameraText}>
                    {t('permission')}
                </Text>
                <Button title={t('allow_camera')} onPress={async () => {
                    const { status } = await requestCameraPermissionsAsync();
                    if (status !== 'granted') {
                        Linking.openSettings();
                    } else {
                        setHasPermission(true);
                    }
                }} />
            </View>
        );
    }

    return (
        <SafeAreaView>
            <FlashMessage position="top" />
            <CameraView
                facing="back"
                onBarcodeScanned={(barcode) => {
                    if (barcode && !qrLock.current) {
                        qrLock.current = true;
                        successCode(barcode)
                        setTimeout(async () => {
                            qrLock.current = false;
                        }, 1000);
                    }
                }}
                className={'w-full, h-full'}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    cameraText: {
        color: 'white',
        paddingHorizontal: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    loadingText: {
        color: 'white',
        marginTop: 10,
    },
})