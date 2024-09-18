import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default () => {
    const { t } = useTranslation()
    return (
        <Stack>
            <Stack.Screen name={'index'} options={{
                headerBackground: () => <View className={'bg-bg-default h-full'} />,
                headerTitleAlign: 'center',
                headerTitle: t('home'),
                headerTitleStyle: { color: 'black', fontSize: 19 },
            }} />
        </Stack>
    )
}