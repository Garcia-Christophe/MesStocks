import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    LogBox
} from 'react-native';

import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
import { HistoriqueEntreesSorties } from "../components";

const Recap = ({ navigation }) => {

    const [sousCategories, setSousCategories] = useState(dummyData.sousCategories)
    const [historiquePremieresEntreesSorties, setHistoriqueEntreesSorties] = useState(dummyData.historiquePremieresEntreesSorties)

    // Enlever les warnings inutiles
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }, [])
    
    function renderEntete() {

        const renderItem = ({ item, index }) => (
            <View
                style={{
                    width: 180,
                    paddingVertical: 10,
                    paddingHorizontal: SIZES.padding,
                    marginLeft: index == 0 ? SIZES.padding : 0,
                    marginRight: SIZES.radius,
                    marginBottom: 15,
                    borderRadius: 10,
                    backgroundColor: COLORS.white,
                    ...styles.shadow
                }}
            >
                {/* Titres */}
                <View
                    style={{ flexDirection: 'column' }}
                >
                    <View style={{ marginleft: SIZES.base }}>
                        <View style={{ height: 31 }}>
                            <ScrollView
                                nestedScrollEnabled={true}
                            >
                                <Text style={{ ...FONTS.body2, flexWrap: 'wrap' }}>{item.nom}</Text>
                            </ScrollView>
                        </View>
                        <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>{item.nomCategorie}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Rechercher", {sousCategorie: item})}
                >
                    
                    {/* Séparateur */}
                    <View 
                        style={{
                            width: 75,
                            height: 2,
                            backgroundColor: COLORS.yellow,
                            marginLeft: 29,
                            marginVertical: 5,
                            borderRadius: 10
                        }}
                    />

                    {/* Informations */}
                    <View>
                        <Text style={{ ...FONTS.h4 }}><Text style={{ fontWeight: 'bold' }}>{item.nbArticles}</Text> articles</Text>
                        <Text style={{ color: item.nbArticlesACommander == 0 ? COLORS.green : COLORS.red, ...FONTS.body5 }}>
                            {item.nbArticlesACommander == 0 ? "Stocks à jour" : item.nbArticlesACommander + " à commander"}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )

        return (
            <View
                style={{
                    width: "100%",
                    height: 380, // 290,
                    ...styles.shadow
                }}
            >
                <ImageBackground
                    source={images.banniere}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        alignItems: 'center'
                    }}
                >
                    {/* Bouton Derniers évènements */}
                    <View
                        style={{
                            marginTop: SIZES.padding * 2,
                            width: "100%",
                            alignItems: "flex-end",
                            paddingHorizontal: SIZES.padding
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 35,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => navigation.navigate("DerniersEvenements")}
                        >
                            <Image
                                source={icons.notification}
                                resizeMode="contain"
                                style={{ flex: 1 }}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Titres */}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Récapitulation générale</Text>
                        <Text style={{ 
                            color: COLORS.white, 
                            ...FONTS.h1, 
                            marginTop: SIZES.base, 
                            paddingTop: SIZES.base, 
                            fontWeight: 'bold' }}
                        >
                            102
                        </Text>
                        <Text style={{ color: COLORS.white, ...FONTS.body5 }}>articles dans l'inventaire</Text>
                    </View>

                    {/* Sous-catégories */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0 // "-30%"
                        }}
                    >
                        <Text style={{ marginLeft: SIZES.padding, color: COLORS.white, fontWeight: 'bold', ...FONTS.h2 }}>
                            Sous-catégories
                        </Text>
                        <FlatList
                            contentContainerStyle={{ marginTop: SIZES.base }}
                            data={sousCategories}
                            renderItem={renderItem}
                            keyExtractor={item => `${item.id}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </ImageBackground>
            </View>
        )
    }

    function renderACommander() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    ...styles.shadow
                }}
                onPress={() => navigation.navigate("Rechercher", {aCommander: true})}
            >
                <Image 
                    source={icons.reapprovisionnement}
                    style={{
                        width: 30,
                        height: 30
                    }}
                />

                <View
                    style={{ flex: 1, marginLeft: SIZES.radius }}
                >
                    <Text style={{ ...FONTS.h3, fontWeight: 'bold' }}>À commander</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.gray }}>Voir les articles en manque de stock</Text>
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

    function renderAjouterUnProduit() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection:'row',
                    alignItems: 'center',
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 20,
                    backgroundColor: COLORS.secondary,
                    borderRadius: SIZES.radius,
                    ...styles.shadow
                }}
                onPress={() => navigation.navigate("Ajouter", {produit: true})}
            >
                <View
                    style={{ flex: 1, paddingRight: 10 }}
                >
                    <Text style={{ ...FONTS.h3, fontWeight: 'bold', color: COLORS.white }}>Ajouter un article</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.white, lineHeight: 18, marginTop: SIZES.base }}>
                    Il est également possible d'ajouter une catégorie, une sous-catégorie, une marque, un utilisateur...
                    </Text>
                </View>

                <Image 
                    source={icons.plus}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.primary
                    }}
                />
            </TouchableOpacity>
        )
    }

    function renderHistoriqueEntreesSorties() {
        return (
            <HistoriqueEntreesSorties
                customContainerStyle={{ ...styles.shadow }}
                navigation={navigation}
                history={historiquePremieresEntreesSorties}
                number={5}
                personne="Tous"
                type="Tous"
            />
        )
    }
    
    return (
        <ScrollView>
            <View style={{ flex: 1, paddingBottom: 130 }}>
                {renderEntete()}
                {renderACommander()}
                {renderAjouterUnProduit()}
                {renderHistoriqueEntreesSorties()}
            </View>
        </ScrollView>
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

export default Recap;