import * as React from 'react'
import { Alert, Modal, StyleSheet, Pressable, View, Text } from 'react-native';
import { Icon, Input } from 'react-native-elements';

function ModalComponent({ todos, handleAddTodo, modalVisible, setModalVisible }) {

    const [text, setText] = React.useState("")



    const handleSubmit = () => {
        if (text !== "") {
            handleAddTodo({
                title: text,
                key: `${todos[todos.length - 1] && parseInt(todos[todos.length - 1].key) + 1} || 1`
            })

            setText("")
            setModalVisible(false)
        }
    }


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Input
                            style={{ height: 50, padding: 10 }}
                            placeholder='add your Todos...'
                            onChangeText={(newText) => {
                                setText(newText)
                            }}
                            value={text}
                        />
                        <View style={styles.between}>
                            <Pressable
                                onPress={handleSubmit}>
                                <Icon
                                    raised
                                    name='check'
                                    type='font-awesome'
                                    color='#086AFF' />
                            </Pressable>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Icon
                                    raised
                                    name='close'
                                    type='font-awesome'
                                    color='#086AFF' />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: "80%",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    between: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },

});


export default ModalComponent;