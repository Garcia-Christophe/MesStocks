import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

const Scan = () => {
    return (
        <View style={styles.container}>
            <Text>Scan</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default Scan;