import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
 
  Image,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "./AppButton";
import TaskLayout from "./TaskLayout";
import ModalPopUp from "./ModalPopUp";

export default function ActiveTask({completed,setCompleted,setTaskModal}) {
  //set task name from input
  const [taskName, setTaskName] = useState("");
  // console.log(completed);
  //for checking if the input field is blank or not
  const [emptyField, setEmptyField] = useState("Perfect");

  //to display and store data in storage
  const [task, setTask] = useState([]);

  //to render list
  // const [list, setList] = useState([]);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("TaskName", JSON.stringify(task));
      // console.log(JSON.stringify(task));
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    loadData();
    getDataFromCompleted();
  }, []);

  const loadData = async () => {
    try {
      let arr = await AsyncStorage.getItem("TaskName");

      //if array is empty this throw error
      if (arr != null) {
        setTask(JSON.parse(arr));
        // console.log(task);
      }
      //  console.log(task.toString());
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const setData = () => {
    if (taskName.length == 0) {
      setEmptyField("Please enter task name!");
    } else if (taskName.length > 54) {
      setEmptyField("Task Name Cannot be more than 54 characters!");
    } else {
      setEmptyField("Perfect");
      setTask((task) => [
        ...task,
        { title: taskName, key: Math.random().toString() },
      ]);
      setModalVisible(false);
    }
    setTaskName('');
  };
  useEffect(() => {
    saveData();
    // mapTasksToList();
  }, [task]);

  // const mapTasksToList = () =>{

  //   let rows = [];
  //   task.map((e,i)=> {
  //      //rows.push(<TaskLayout  key={i} taskTitle={e.toString()} />);
  //     rows.push({'id':i,'title':e.toString()});
  //   })

  //   setList(
  //     rows
  //   );
  // }
  const deleteTask = (key) => {
    setTask((task) => {
      return task.filter((obj) => obj.key != key);
    });
  };

  const viewTask = (title) => {
    setTaskModal(title);
  };
  // const [completed, setCompleted] = useState([]);
  const getDataFromCompleted = async () =>{
    try {
      let arr = await AsyncStorage.getItem("CompletedTaskName");
      // console.log(arr);
      //if array is empty this throw error
      // console.log(JSON.parse(arr));
      if (arr != null) {
        setCompleted(JSON.parse(arr));
      }
      
      
      //  console.log(task.toString());
    } catch (error) {
      Alert.alert(error.message);
    }
  }
  
  useEffect(()=>{
    completedTaskVar = completed;
  },[completed]);
  
  const addToCompleted=(key)=>{
    const obj = task.find(function(post) {
      if(post.key == key)
        return true;
    });
    // console.log(obj);
    // getDataFromCompleted();
    if(completed.length<1)
    {
      // saveDataToComplete([obj]);
      // console.log('completed is null');
      setCompleted([obj]);
    }
    else
    {
      setCompleted((comp) => [...comp,obj])
      // saveDataToComplete(completed);
      // console.log('completed is not null');
    }
    deleteTask(key);
    
  }
 
  

  const [ModalVisible, setModalVisible] = useState(false);

  return (
    //to keep content in the safer area of screen
    <SafeAreaView style={styles.container}>
      {/* <View style={{ flexDirection: "row", justifyContent: "space-evenly",height:40,marginTop:40 }}>
        <View style={{ width:'50%',alignItems:'center',justifyContent:'center'}}>
          <Text
            style={{
              fontSize: 17,
            
              fontWeight: "bold",
              color: "white",
            }}
          >
            Today's List
          </Text>
        </View>
        <View style={{width:'50%',alignItems:'center',justifyContent:'center'}}>
          <Text
            style={{
              fontSize: 17,
       
              fontWeight: "bold",

              color: "white",
            }}
          >
            Completed List
          </Text>
        </View>
      </View> */}
      {task.length != 0 ? (
        <View style={styles.flatView}>
          <FlatList
            data={task}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({ item }) => (
              <TaskLayout
                taskTitle={item}
                deleteTask={deleteTask}
                addToCompleted={addToCompleted}
                viewTask={viewTask}
              />
            )}
          />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={require("./assets/resting.png")}
            style={{ maxHeight: 300, maxWidth: 300, marginTop: 80 }}
          ></Image>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>
            Nothing To do!
          </Text>
        </View>
      )}

      <AppButton
        title="ADD TASK"
        style={styles.buttonStyle}
        textStyle={styles.btnText}
        opacity={0.9}
        onPress={() => setModalVisible(true)}
      />
      {/* <ModalPopUp styleCont={styles.taskView} visible={TaskModal != null}>
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
      </ModalPopUp> */}
      <ModalPopUp visible={ModalVisible}>
        <View style={{ alignItems: "center" }}>
          {/* <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image
                source={require("./assets/x.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View> */}
          <TextInput
            style={[
              styles.input,
              {
                borderColor: emptyField != "Perfect" ? "red" : "transparent",
                borderWidth: 2,
                borderRadius: 5,
              },
            ]}
            placeholder="Enter Task"
            value={taskName}
            onChangeText={(value) => {
              setTaskName(value);
            }}
            autoFocus={true}
          />
          <Text
            style={{ color: "#2A7D82", fontWeight: "bold", marginBottom: 10 }}
          >
            {emptyField != "Perfect" ? emptyField : " "}
          </Text>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <AppButton
              title="Add"
              style={styles.modalButton}
              opacity={0.8}
              onPress={() => setData()}
            />
            <AppButton
              title="Cancel"
              style={styles.modalButton}
              onPress={() => {
                setEmptyField(false);
                setTaskName("");
                setEmptyField("Perfect");
                setModalVisible(false);
              }}
              opacity={0.8}
            />
          </View>
        </View>
      </ModalPopUp>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#364F6B",
    flex: 1,
  },
  buttonStyle: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: "95%",
    height: 60,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  btnText: {
    color: "black",
  },
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
  },
  modalButton: {
    backgroundColor: "#2A7D82",
    width: 100,
    elevation: 0,
  },
  modalHeader: {
    width: "100%",
    height: 20,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    height: 50,
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
    margin: 12,
    padding: 10,
    marginBottom: 0,
  },
  flatView: {
    maxHeight: "78.5%",
    marginTop: 7,
  },
 
});



