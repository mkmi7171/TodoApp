import * as React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Pressable } from 'react-native';
import ModalComponent from './src/components/modal'
// import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements'
import { Icon, Input } from 'react-native-elements';


function App() {
  // const [ready, setReady] = useState(false)
  const [check, setCheck] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false)
  const initialTodos = [{
    title: "hello",
    key: "1"
  },
  {
    title: "hi",
    key: "2"
  }]

  const [todos, setTodos] = React.useState(initialTodos)


  const loadTodos = () => {
    AsyncStorage.getItem("storedTodos").then(data => {
      if (data !== null) {
        setTodos(JSON.parse(data))
      }
    }).catch((error) => console.log(error))
  }

  const handleAddTodo = (todo) => {
    const newTodos = [...todos, todo]
    console.log(newTodos)
    AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos)).then(() => {
      setTodos(newTodos)
    }).catch(error => console.log(error))
  }

  // if (!ready) {
  //   return (
  //     <AppLoading startAsync={loadTodos} onFinish={() => {
  //       setReady(true)
  //     }} onError={console.warn} />
  //   )
  // }

  React.useEffect(() => {
    loadTodos
  })




  const renderItem = ({ item, index }) => {
    return (
      <Pressable key={index} style={styles.box}>
        <CheckBox
          checked={check}
          onPress={() => {
            const newTodos = [...todos]
            newTodos.splice(index, 1)

            AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos)).then(() => {
              setTodos(newTodos)
            }).catch(error => console.log(error))
          }}
        />
        <Text style={{ fontSize: 17 }}>{item.title}</Text>
      </Pressable>
    )
  }


  return (
    <SafeAreaView style={styles.master}>
      <Text style={styles.text}>TO DO LIST</Text>
      <View style={{ marginTop: 10, width: "100%" }}>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </View>
      <ModalComponent todos={todos} modalVisible={modalVisible} setModalVisible={setModalVisible} handleAddTodo={handleAddTodo} />
      <Pressable
        style={[styles.button]}
        onPress={() => setModalVisible(true)}>
        <Icon
          reverse
          name='plus'
          type='font-awesome'
          color='#086AFF' />
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  master: {
    flex: 1,
    alignItems: 'center',
    marginTop: 35,
    justifyContent: "space-between",
    padding: 35,
  },
  text: {
    fontSize: 24
  },
  box: {
    width: "100%",
    padding: 10,
    marginTop: 15,
    shadowColor: '#000',
    backgroundColor: "#F9FAFF",
    elevation: 5,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    right: 5,
    bottom: 10,
  }
})
export default App;

