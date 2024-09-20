import React from 'react'
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Dialog from "react-native-dialog";
export default function DialogComponent({ isAlert, setAlert, description = '', title = "", handle, handleTitle = '' }) {
  const { t } = useTranslation()
  return (
    <Dialog.Container visible={isAlert}
      onBackdropPress={() => setAlert(false)}
      contentStyle={styles.dialog_container}
    >
      <Dialog.Description>
        {description}
      </Dialog.Description>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Button label={t('cancel')} onPress={() => setAlert(false)} />
      <Dialog.Button label={handleTitle} onPress={() => {
        setAlert(false)
        handle()
      }} />
    </Dialog.Container>
  )
}

const styles = StyleSheet.create({
  dialog_container: {
    borderRadius: 15,
  },
})