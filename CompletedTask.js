import { View, Text,StyleSheet,Image,FlatList} from 'react-native';
import React from 'react';
import TaskLayout from './TaskLayout';

export default function CompletedTask({completed,setCompleted,setTaskModal}) {
  const viewTask = (title) => {
    setTaskModal(title);
  };


  const deleteCompletedTask = (key) => {
    setCompleted((comp) => {
      return comp.filter((obj) => obj.key != key);
    });
  }  
  return (
    <View style={styles.container}>
      {completed.length != 0 ? (
        <View style={styles.flatView}>
          <FlatList
            data={completed}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({ item }) => (
              <TaskLayout
                taskTitle={item}
                viewTask={viewTask}
                deleteTask={deleteCompletedTask}
              />
            )}
          />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={require("./assets/blob-dog.png")}
            style={{ maxHeight: 300, maxWidth: 300, marginTop: 80 }}
          ></Image>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>
            Smells Like You Did Nothing!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3f5770",
        flex: 1,
      },
});
  
