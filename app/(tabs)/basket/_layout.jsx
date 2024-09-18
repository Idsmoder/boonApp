import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default () => {
    const { t } = useTranslation()
    return <Stack>
        <Stack.Screen name="index" options={{
            headerBackground: () => <View className={'bg-bg-default h-full'} />,
            headerTitle: t('basket'),
            headerTitleAlign: 'center',
            headerTitleStyle: { color: 'black', fontSize: 19 },
        }} />
    </Stack>
}