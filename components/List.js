import {Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import * as React from "react";

const ListStack = createStackNavigator();

function ListStackScreen() {
    return (
        <ListStack.Navigator>
            <ListStack.Screen name="List" component={ListScreen} />
        </ListStack.Navigator>
    );
}

function ListScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Cette option n'est pas disponible dans votre pays</Text>
        </View>
    );
}

export default ListScreen
