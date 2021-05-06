import React from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert
 } from 'react-native';
 import { useNavigation } from "@react-navigation/native";

 import { COLORS, SIZES, FONTS, icons } from "../constants";

 const BarreRetour = ({right, color}) => {

    const navigation = useNavigation();

     return (
        <View
            style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', marginTop: SIZES.padding * 2 }}
        >
            <View style={{ flex: 1, alignItems: 'flex-start'}}>
                <TouchableOpacity 
                    style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center' 
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image 
                        source={icons.retour}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: color === COLORS.white ? COLORS.white : COLORS.gray
                        }}
                    />
                    <Text style={{ marginLeft: SIZES.base, ...FONTS.h2, fontWeight: 'bold', color: color === COLORS.white ? COLORS.white : COLORS.black }}>Retour</Text>
                </TouchableOpacity>
            </View>

            {right &&
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                "Confirmation",
                                "Souhaitez-vous supprimer définitivement cet article ?",
                                [
                                    {
                                        text: "Annuler",
                                        onPress: () => console.log("Annulé"),
                                        style: "cancel"
                                    },
                                    { 
                                        text: "Confirmer", 
                                        onPress: () => console.log("Confirmé")
                                    }
                                ]
                            );
                        }}
                    >
                        <Image 
                            source={icons.suppression}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: COLORS.red
                            }}
                        />
                    </TouchableOpacity>
                </View>
            }
        </View>
     )
 }

 export default BarreRetour;