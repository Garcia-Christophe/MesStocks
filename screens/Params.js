import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';

import { FONTS, SIZES, COLORS, icons, images } from "../constants";

const Params = ({ navigation }) => {

    var [toastAnnule, setToastOk] = useState();
    var [toastOk, setToastOk] = useState();

    function renderThemes() {
        return (
            <View
                style={{ 
                    flexDirection: 'column',
                    paddingVertical: SIZES.padding / 2,
                    marginHorizontal: SIZES.padding,
                    marginTop: SIZES.padding,
                    marginBottom : SIZES.padding / 2,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    ...styles.shadow 
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    <Image
                        source={icons.theme}
                        resizeMode= "contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.yellow
                        }}
                    />
                    <Text style={{ marginLeft: SIZES.padding / 2, color: COLORS.black, fontWeight: 'bold', ...FONTS.h2 }}>
                        Thèmes
                    </Text>
                </View>

                <View></View>
            </View>
        )
    }

    function renderNotifications() {
        return (
            <View
                style={{ 
                    flexDirection: 'column',
                    paddingVertical: SIZES.padding / 2,
                    marginHorizontal: SIZES.padding,
                    marginTop: SIZES.padding / 2,
                    marginBottom : SIZES.padding / 2,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    ...styles.shadow 
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    <Image
                        source={icons.notification}
                        resizeMode= "contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.yellow
                        }}
                    />
                    <Text style={{ marginLeft: SIZES.padding / 2, color: COLORS.black, fontWeight: 'bold', ...FONTS.h2 }}>
                        Notifications
                    </Text>
                </View>

                <View></View>
            </View>
        )
    }

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
                    onPress={() => {
                        toastAnnule.show('Changements annulés', 1000);
                    }}
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
                    onPress={() => {
                        toastOk.show('Changements enregistrés', 1000);
                    }}
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
                {renderThemes()}
                {renderNotifications()}
                {renderBoutons()}
            </ScrollView>

            {/* Toasts */}
            <Toast 
                ref={(toast) => toastAnnule = toast} 
                position={"bottom"}
                fadeInDuration={500}
                fadeOutDuration={750}
                opacity={0.8}
                style={{
                    backgroundColor: COLORS.red, 
                    borderRadius: 20,
                    padding: SIZES.padding / 2
                }}
            />
            <Toast 
                ref={(toast) => toastOk = toast} 
                position={"bottom"}
                fadeInDuration={500}
                fadeOutDuration={750}
                opacity={0.8}
                style={{
                    backgroundColor: COLORS.green,
                    borderRadius: 20,
                    padding: SIZES.padding / 2
                }}
            />
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