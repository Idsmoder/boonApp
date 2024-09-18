import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default () => {
    const { t } = useTranslation()
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerBackground: () => <View className={'bg-bg-default h-full' } />,
                headerTitle: t('history'),
                headerTitleAlign: 'center',
                headerTitleStyle: { color: 'black', fontSize: 19 }, 
            }} />
        </Stack>
    )
}