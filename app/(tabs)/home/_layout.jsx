import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import themeContext from "../../../theme/themeContext";
import { useContext } from "react";

export default () => {
    const { t } = useTranslation()
    const Th = useContext(themeContext)
    return (
        <Stack>
            <Stack.Screen name={'index'} options={{
                headerBackground: () => <View className={'bg-bg-default h-full'} style={{ backgroundColor: Th.backgroundColor }} />,
                headerTitleAlign: 'center',
                headerTitle: t('home'),
                headerTitleStyle: { fontSize: 19 },
                headerTintColor: Th.color

            }} />
        </Stack>
    )
}