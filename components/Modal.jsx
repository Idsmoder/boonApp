import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
const Modal = ({ visible, onClose }) => {
  const translateY = useRef(new Animated.Value(height)).current;
  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.modal,
        { transform: [{ translateY }] }
      ]}
    >
      <View style={styles.modalContent}>
        <Text> hali to'liq qilinmadi </Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}> modal ni yoping </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 100
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default Modal;
