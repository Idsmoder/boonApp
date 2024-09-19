import AsyncStorage from '@react-native-async-storage/async-storage';
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('storage ga qo`yishda xato:', error);
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('storagedan olishda xato:', error);
    return null;
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('storage da bir keyni o`chirishda xato:', error);
  }
};

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('storage ni tozalashda xato:', error);
  }
};
