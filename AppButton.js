import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function AppButton({ onPress, title, style, textStyle, opacity }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer, style]} activeOpacity={opacity}>
      <Text style={[styles.appButtonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    appButtonContainer: {
        //to add drop shadow behind button
        elevation: 10,
        backgroundColor: "#009688",
        borderRadius: 17,
        // to give size to the button
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    
      }
});
