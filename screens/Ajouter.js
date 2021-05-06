import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    FlatList
} from 'react-native';

import { ModifierDonnees } from '../components';
import { FONTS, SIZES, COLORS, images, icons, dummyData } from "../constants";

const Ajouter = ({ navigation }) => {

    const [categories, setCategories] = useState(dummyData.categories);
    const [sousCategories, setSousCategories] = useState(dummyData.sousCategories);
    const [marques, setMarques] = useState(dummyData.marques);
    const [utilisateurs, setUtilisateurs] = useState(dummyData.utilisateurs);

    function renderStats() {
        return (
            <View
                style={{
                    width: "100%",
                    height: 110,
                    ...styles.shadow
                }}
            >
                <ImageBackground
                    source={images.banniere}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}
                >
                    <View 
                        style={{
                            width: "100%",
                            flexDirection: 'row',
                            marginVertical: SIZES.base,
                            justifyContent: 'space-evenly'
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h15, fontWeight: 'bold' }}>102</Text>
                            <Text style={{ color: COLORS.white, ...FONTS.body5, }}>articles</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: COLORS.lightGray, ...FONTS.h15, fontWeight: 'bold' }}>14</Text>
                            <Text style={{ color: COLORS.lightGray, ...FONTS.body5, }}>catégories</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h15, fontWeight: 'bold' }}>23</Text>
                            <Text style={{ color: COLORS.white, ...FONTS.body5, }}>Sous-catégories</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: COLORS.lightGray, ...FONTS.h15, fontWeight: 'bold' }}>31</Text>
                            <Text style={{ color: COLORS.lightGray, ...FONTS.body5, }}>marques</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h15, fontWeight: 'bold' }}>3</Text>
                            <Text style={{ color: COLORS.white, ...FONTS.body5, }}>utilisateurs</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    function renderAjouterArticle() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding / 2,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    ...styles.shadow
                }}
                onPress={() => navigation.navigate("FicheArticle", {nouveau: true})}
            >
                <Image 
                    source={icons.article}
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.yellow
                    }}
                />

                <View
                    style={{ flex: 1, marginLeft: SIZES.radius }}
                >
                    <Text style={{ ...FONTS.h3, fontWeight: 'bold' }}>Ajouter un article</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.gray, lineHeight: 18 }}>Vous pourrez ensuite le modifier ou le supprimer depuis sa fiche article</Text>
                </View>

                <Image 
                    source={icons.aller}
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: COLORS.gray
                    }}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, paddingBottom: 90 }}>
            {renderStats()}

            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                {renderAjouterArticle()}

                <ModifierDonnees
                    customContainerStyle={{ 
                        ...styles.shadow, 
                        marginBottom: SIZES.padding, 
                        height: 350
                    }}
                    navigation={navigation}
                    donnees={categories}
                    logo={icons.categories}
                    nom="Catégories"
                />

                <ModifierDonnees
                    customContainerStyle={{ 
                        ...styles.shadow, 
                        marginBottom: SIZES.padding, 
                        height: 350
                    }}
                    navigation={navigation}
                    donnees={sousCategories}
                    logo={icons.sousCategories}
                    nom="Sous-catégorie"
                />

                <ModifierDonnees
                    customContainerStyle={{ 
                        ...styles.shadow, 
                        marginBottom: SIZES.padding, 
                        height: 350
                    }}
                    navigation={navigation}
                    donnees={marques}
                    logo={icons.marques}
                    nom="Marques"
                />

                <ModifierDonnees
                    customContainerStyle={{ 
                        ...styles.shadow, 
                        marginBottom: SIZES.padding, 
                        height: 350
                    }}
                    navigation={navigation}
                    donnees={utilisateurs}
                    logo={icons.utilisateurs}
                    nom="Utilisateurs"
                />
            </ScrollView>
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

export default Ajouter;