import React from 'react';
import dismissKeyboard, {
    KeyboardAvoidingView,
    TextInput,
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Button,
    Modal
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
        check: false,
        update: false,
    },
    {
        id: "2",
        title: 'Second Item',
        check: false,
        update: false
    },
    {
        id: "3",
        title: 'Third Item',
        check: false,
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


    const Item = ({title, id, check, update}) => (
        <View style={styles.item}>
            {check ?
                <FontAwesomeIcon onPress={() => handleChecked(id, false)}
                                 size={28}
                                 color="#A3CA97"
                                 icon={faCheckCircle}/> :
                <FontAwesomeIcon onPress={() => handleChecked(id, true)}
                                 size={28}
                                 color="#F09D6C"
                                 icon={faTimesCircle}/>}

            {
                update ?
                    <TextInput  style={{ padding: 5, width:'50%' , borderColor: '#D3D3D3', borderWidth: 1, borderRadius: 3 }} value={title}
                               onChangeText={(title) => handleUpdate(id, title)}
                                onSubmitEditing={() => changeState(id,false)}
                                returnKeyType="done"

                    />
                     : <Text style={{width: '50%'}} onLongPress={() => changeState(id,true)}>{title}</Text>

            }

            <FontAwesomeIcon onPress={() =>
                handleDelete(id)
            } size={26} icon={faTrash} color
                ="#F7665E"/>
        </View>
    );
    const changeState = (id, value) =>{
        setTodos(todos.map(item => item.id === id ? {
            ...item,
            update: value
        } : item))
    }
    const handleChecked = (id, check) => {
        setTodos(todos.map(item => item.id === id ? {
            ...item,
            check: check
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
        <Item update={item.update} check={item.check} title={item.title} id={item.id}/>
    );

    const title = "Home"
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <TextInput style={{ alignSelf:'center' ,margin:10 , padding: 15, width:'95%' , borderColor: '#D3D3D3', borderWidth: 1, borderRadius: 3 }} ref={myTextInput}
                               onSubmitEditing={text => handleDone(text)}
                               returnKeyType="done"
                               placeholder="New Task"/>
                    <FlatList style={styles.list}
                              data={todos}
                              removeClippedSubViews={false}
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
        marginTop: StatusBar.currentHeight || 0,
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
    },
});

export default Home;
