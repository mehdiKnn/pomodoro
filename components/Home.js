import React from 'react';
import {
    KeyboardAvoidingView,
    TextInput,
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {
    faTrash,
    faCheckCircle,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'


const HomeStack = createStackNavigator();

let myTextInput = React.createRef();

let DATA = [
    {
        id: "1",
        title: 'First Item',
        checked: false,
        update: false,
    },
    {
        id: "2",
        title: 'Second Item',
        checked: false,
        update: false
    },
    {
        id: "3",
        title: 'Third Item',
        checked: false,
        update: false
    },
];

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen options={{title: 'Home'}} name="Home"
                              component={Home}/>
        </HomeStack.Navigator>
    );
}

const Home = () => {
    const [todos, setTodos] = React.useState(DATA)

    const changeState = (id, value) => {
        setTodos(todos.map(item => item.id === id ? {
            ...item,
            update: value
        } : item))
    }
    const handleChecked = (id, check) => {
        setTodos(todos.map(item => item.id === id ? {
            ...item,
            checked: check
        } : item))
    }

    const handleUpdate = (id, title) => {
        setTodos(todos.map(item => item.id === id ? {
            ...item,
            title: title
        } : item))
    }

    console.log(todos)
    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleDone = (e) => {
        let obj = {
            id: Math.random().toString(36).substring(2, 15),
            title: e.nativeEvent.text,
            checked: false,
            update: false
        }
        setTodos(todos => [...todos, obj])
        myTextInput.current.clear();
    }

    const renderItem = ({item}) => (
        <View style={item.checked ? styles.checked : styles.item}>
            {item.checked ?
                <FontAwesomeIcon onPress={() => handleChecked(item.id, false)}
                                 size={28}
                                 color="#A3CA97"
                                 icon={faCheckCircle}/> :
                <FontAwesomeIcon onPress={() => handleChecked(item.id, true)}
                                 size={28}
                                 color="#F09D6C"
                                 icon={faTimesCircle}/>}

            {
                item.update ?
                    <TextInput style={{
                        padding: 5,
                        width: '50%',
                        borderColor: '#D3D3D3',
                        borderWidth: 1,
                        borderRadius: 3
                    }} value={item.title}
                               onSubmitEditing={() => changeState(item.id, false)}
                               onChangeText={(title) => handleUpdate(item.id, title)}
                               returnKeyType="done"

                    />
                    : <Text style={{ width: '50%'}}
                             onLongPress={item.checked ? null :() => changeState(item.id, true)}>{item.title}</Text>

            }

            <FontAwesomeIcon onPress={() =>
                handleDelete(item.id)
            } size={26} icon={faTrash} color
                                 ="#F7665E"/>
        </View>
    );

    const title = "Home"
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <TextInput style={{
                        alignSelf: 'center',
                        margin: 10,
                        padding: 15,
                        width: '95%',
                        borderColor: '#D3D3D3',
                        borderWidth: 1,
                        borderRadius: 3
                    }} ref={myTextInput}
                               onSubmitEditing={text => handleDone(text)}
                               returnKeyType="done"
                               placeholder="New Task"/>
                    <FlatList style={styles.list}
                              data={todos}
                              removeClippedSubViews={true}
                              renderItem={renderItem}
                              keyExtractor={item => item.id}
                    />

                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 50,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 2,
        shadowOpacity: 0.5,
        shadowRadius: 0,
        shadowColor: '#E3BDE1',
        shadowOffset: {width: -5, height: 5},
        elevation: 3
    },
    checked:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 50,
        backgroundColor: '#DAD9D7',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 2,
        shadowOpacity: 0.5,
        shadowRadius: 0,
        shadowColor: '#C2D5EC',
        shadowOffset: {width: -5, height: 5},
        elevation: 3
    }
});

export default Home;
