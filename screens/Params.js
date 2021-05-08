import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';

import { FONTS, SIZES, COLORS, icons, images } from "../constants";

const Params = ({ navigation }) => {

    function renderBoutons() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    paddingBottom: SIZES.base,
                    justifyContent: 'space-between'
                }}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 150,
                        marginVertical: SIZES.base * 2,
                        paddingVertical: SIZES.padding / 2,
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.radius,
                        ...styles.shadow
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Text
                        style={{
                            color: COLORS.gray,
                            ...FONTS.h2,
                            fontWeight: 'bold'
                        }}
                    >
                        Annuler
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 150,
                        marginVertical: SIZES.base * 2,
                        paddingVertical: SIZES.padding / 2,
                        backgroundColor: COLORS.secondary,
                        borderRadius: SIZES.radius,
                        ...styles.shadow
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2,
                            fontWeight: 'bold'
                        }}
                    >
                        Enregistrer
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, paddingBottom: 90 }}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                {renderBoutons()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default Params;