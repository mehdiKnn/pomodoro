import {SafeAreaView, StatusBar, StyleSheet, TextInput} from "react-native";
import React from "react";

const Form = () => {
    return (<SafeAreaView styles={styles.container}>
        <TextInput ref={myTextInput}
                   onSubmitEditing={text => handleDone(text)}
                   returnKeyType="done"
                   placeholder="New Task"/>
    </SafeAreaView>)
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#F8F9FA'
    }
});

export default Form