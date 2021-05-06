import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    Alert
} from 'react-native';

import { COLORS, SIZES, FONTS, icons } from '../constants';

const ModifierDonnees = ({ navigation, customContainerStyle, donnees, logo, nom }) => {

    const [nomDonnee, setNomDonnee] = useState("Exemple de nom");

    function renderEnTete() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: SIZES.base
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source={logo}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.yellow
                        }}
                    />
                    <Text style={{ marginLeft: SIZES.base, ...FONTS.h2, fontWeight: 'bold' }}>{nom}</Text>
                </View>
                <TouchableOpacity>
                    <Image
                        source={icons.ajouter}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.green
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const renderItem = ({item}) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: SIZES.base / 3
                }}
            >
                <View
                    style={{
                        height: 45,
                        width: "90%",
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 20,
                        backgroundColor: COLORS.white,
                        paddingVertical: 5,
                        marginVertical: SIZES.base
                    }}
                >
                    <TextInput 
                        placeholder="Nom de la donnée"
                        placeholderTextColor={COLORS.gray}
                        value={item.nom}
                        onChangeText={(texte) => setNomDonnee(texte)}
                        style={{
                            flex: 1,
                            marginLeft: 15
                        }}
                    />
                    <TouchableOpacity 
                        style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center',
                            padding: SIZES.base,
                            marginRight: SIZES.base
                        }}
                        onPress={() => setNomDonnee("")}
                    >
                        <Image 
                            source={icons.croix}
                            resizeMode="contain"
                            style={{
                                width: 17,
                                height: 17,
                                tintColor: COLORS.gray,
                                paddingHorizontal: SIZES.base
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center',
                        padding: SIZES.base,
                        marginRight: SIZES.base
                    }}
                    onPress={() => {
                        Alert.alert(
                            "Confirmation",
                            "Souhaitez-vous supprimer définitivement cette donnée ?",
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
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.red
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View
            style={{
                marginHorizontal: SIZES.padding,
                padding: 20,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...customContainerStyle
            }}
        >
            {renderEnTete()}

            <ScrollView 
                showsVerticalScrollIndicator={false} 
                nestedScrollEnabled={true}
            >
                <FlatList 
                    contentContainerStyle={{ marginTop: SIZES.radius }}
                    scrollEnabled={false}
                    data={donnees}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ width: "100%", height: 1, backgroundColor: COLORS.lightGray }} />
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}

export default ModifierDonnees;