import { Stack } from "expo-router";
import { View } from "react-native";

export default () => {
    return <Stack>
        <Stack.Screen name="index" options={{
            headerBackground: () => <View className={'bg-bg-default h-full'} />,
            headerTitle: 'Корзина',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: 'black', fontSize: 19 },
        }} />
    </Stack>
}