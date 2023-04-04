
import { StyleSheet, View,Modal } from 'react-native'
import React from 'react'
export default function ModalPopUp ({ visible, children, styleBack, styleCont }){
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <View style={[styles.modalBackground, styleBack]}>
        <View style={[styles.modalContainer, styleCont]}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
      },
      modalContainer: {
        width: "80%",
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#3FC1C9",
        borderRadius: 12,
        elevation: 10,
      }
})