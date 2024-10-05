import * as SecureStore from 'expo-secure-store';

export const getToken = async () => {
    return await SecureStore.getItemAsync('access_token');
}
export const setToken = async (token) => {
    return await SecureStore.setItemAsync('access_token', token);
}
export const removeToken = async () => {
    return await SecureStore.deleteItemAsync('access_token');
}