import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActiveTask from "./ActiveTask";
import CompletedTask from "./CompletedTask";
// import { ActiveTask,CompletedTask } from "./Tasks";
import { NavigationContainer } from "@react-navigation/native";
import { Platform, StatusBar } from "react-native";
import { useState } from "react";
import ModalPopUp from "./ModalPopUp";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "./AppButton";
const Tab = createMaterialTopTabNavigator();

export default function App() {
const [completed, setCompleted] = useState([]);
const [TaskModal, setTaskModal] = useState(null);
const saveDataToComplete = async () => {
  try {
   
    await AsyncStorage.setItem("CompletedTaskName", JSON.stringify(completed));
    
    // console.log(JSON.stringify(task));
  } catch (error) {
    Alert.alert('Error',error.message);
  }
};

useEffect(()=>{
  saveDataToComplete();
},[completed]);
  return (
    <>
    <NavigationContainer>
      <Tab.Navigator
        style={styles.container}
        screenOptions={{
          tabBarLabelStyle: { fontWeight:'bold', color:'white'},
          tabBarStyle: { backgroundColor: "#101c29" },
          tabBarIndicatorStyle: {backgroundColor:'white'},
          
        }}
      >
        <Tab.Screen name="Today's List">
        {()=><ActiveTask completed={completed} setCompleted={setCompleted} TaskModal={TaskModal}  setTaskModal={setTaskModal}/>}
        </Tab.Screen>
        <Tab.Screen name="Completed List">
        {()=><CompletedTask completed={completed} TaskModal={TaskModal}  setTaskModal={setTaskModal} setCompleted={setCompleted}/>}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
    <ModalPopUp styleCont={styles.taskView} visible={TaskModal != null}>
    <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
      {TaskModal}
    </Text>
    <View
      style={{
        borderBottomWidth: 0.5,
        borderColor: "black",
        width: "100%",
        marginVertical: 10,
      }}
    />
    <AppButton
      title="Close"
      style={[
        styles.modalButton,
        {
          backgroundColor: "#364F6B",
          paddingVertical: 8,
          paddingHorizontal: 0,
        },
      ]}
      textStyle={{ fontSize: 16 }}
      onPress={() => {
        setTaskModal(null);
      }}
      opacity={0.8}
    />
  </ModalPopUp>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  flatView: {
    maxHeight: "78.5%",
    marginTop: 7,
  },
  taskView: {
    backgroundColor: "#f05b88",
    alignItems: "center",
  },
  modalButton: {
    backgroundColor: "#2A7D82",
    width: 100,
    elevation: 0,
  },
});
