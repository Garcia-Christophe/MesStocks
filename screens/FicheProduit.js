import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView
} from 'react-native';

import { BarreRetour } from '../components';
import { COLORS, SIZES, FONTS, icons } from '../constants';

const FicheProduit = () => {
    return (
        <ScrollView>
            <BarreRetour 
                right={true}
            />
        </ScrollView>
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

export default FicheProduit;