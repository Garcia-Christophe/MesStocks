import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    ScrollView,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';

import { BoutonTexte } from '../components';
import { FONTS, SIZES, COLORS, images, icons, dummyData } from "../constants";

const Rechercher = ({ navigation }) => {

    const [recherche, setRecherche] = useState(null)
    const [voirFiltres, setVoirFiltres] = useState(false)

    const [categories, setCategories] = useState(dummyData.categoriesFiltresRecherche)
    const [sousCategories, setSousCategories] = useState(dummyData.sousCategoriesFiltresRecherche)
    const [marques, setMarques] = useState(dummyData.marquesFiltresRecherche)
    const [types, setTypes] = useState(dummyData.typesFiltresRecherche)
    const [articles, setArticles] = useState(dummyData.articles)

    const [categorieSelectionnee, setCategorieSelectionnee] = useState(dummyData.categoriesFiltresRecherche[0])
    const [sousCategorieSelectionnee, setSousCategorieSelectionnee] = useState(dummyData.sousCategoriesFiltresRecherche[0])
    const [marqueSelectionnee, setMarqueSelectionnee] = useState(dummyData.marquesFiltresRecherche[0])
    const [typeSelectionne, setTypeSelectionne] = useState(dummyData.typesFiltresRecherche[0])

    function renderBarreRecherche() {

        const filtrerLesArticles = (texte) => {
            setRecherche(texte)

            if (texte.length > 0)  {
                var articles = dummyData.articles.filter(article => 
                    article.nom.toLowerCase().match(texte.toLowerCase()))
                
                setArticles(articles)
            } else {
                setArticles(dummyData.articles)
            }
        }

        return (
            <View
                style={{
                    width: "100%",
                    height: 100,
                    ...styles.shadow,
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
                            justifyContent: 'center',
                            marginTop: SIZES.base
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
                                placeholder="Rechercher..."
                                placeholderTextColor={COLORS.gray}
                                value={recherche}
                                onChangeText={(texte) => filtrerLesArticles(texte)}
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
                                onPress={() => {
                                    setRecherche("")
                                    setArticles(dummyData.articles)
                                }}
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
                    </View>
                </ImageBackground>
            </View>
        )
    }

    function renderFiltres() {

        const renderItemCategorie = ({ item, index }) => (
            <BoutonTexte
                key={`categorie-${item.id}`}
                nom={item.nom}
                customContainerStyle={{
                    height: 30,
                    paddingHorizontal: SIZES.radius,
                    marginHorizontal: SIZES.radius,
                    borderRadius: 15,
                    backgroundColor: categorieSelectionnee.id === item.id ? COLORS.primary : COLORS.lightGray
                }}
                customLabelStyle={{
                    color: categorieSelectionnee.id === item.id ? COLORS.white : COLORS.gray
                }}
                onPress={() => setCategorieSelectionnee(item)}
            />
        )
    
        const renderItemSousCategorie = ({ item, index }) => (
            <BoutonTexte
                key={`sousCategorie-${item.id}`}
                nom={item.nom}
                customContainerStyle={{
                    height: 30,
                    paddingHorizontal: SIZES.radius,
                    marginHorizontal: SIZES.radius,
                    borderRadius: 15,
                    backgroundColor: sousCategorieSelectionnee.id === item.id ? COLORS.primary : COLORS.lightGray
                }}
                customLabelStyle={{
                    color: sousCategorieSelectionnee.id === item.id ? COLORS.white : COLORS.gray
                }}
                onPress={() => setSousCategorieSelectionnee(item)}
            />
        )
    
        const renderItemMarque = ({ item, index }) => (
            <BoutonTexte
                key={`marque-${item.id}`}
                nom={item.nom}
                customContainerStyle={{
                    height: 30,
                    paddingHorizontal: SIZES.radius,
                    marginHorizontal: SIZES.radius,
                    borderRadius: 15,
                    backgroundColor: marqueSelectionnee.id === item.id ? COLORS.primary : COLORS.lightGray
                }}
                customLabelStyle={{
                    color: marqueSelectionnee.id === item.id ? COLORS.white : COLORS.gray
                }}
                onPress={() => setMarqueSelectionnee(item)}
            />
        )
    
        const renderItemType = ({ item, index }) => (
            <BoutonTexte
                key={`type-${item.id}`}
                nom={item.nom}
                customContainerStyle={{
                    height: 30,
                    paddingHorizontal: SIZES.radius,
                    marginHorizontal: SIZES.radius,
                    borderRadius: 15,
                    backgroundColor: typeSelectionne.id === item.id ? COLORS.primary : COLORS.lightGray
                }}
                customLabelStyle={{
                    color: typeSelectionne.id === item.id ? COLORS.white : COLORS.gray
                }}
                onPress={() => setTypeSelectionne(item)}
            />
        )

        return (
            <View
                style={{ 
                    flexDirection: 'column',
                    justifyContent: 'center',
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
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: SIZES.padding,
                        paddingVertical: SIZES.base
                    }}
                >
                    <Text style={{ color: COLORS.black, fontWeight: 'bold', ...FONTS.h2 }}>
                        Filtres
                    </Text>
                    <TouchableOpacity 
                        onPress={() => setVoirFiltres(!voirFiltres)}
                    >
                        <Image 
                            source={icons.aller}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.gray,
                                transform: voirFiltres ? [{ rotate: '270deg' }] : [{ rotate: '90deg' }]
                            }}
                        />
                    </TouchableOpacity>
                </View>

                {voirFiltres &&
                    <View>
                        <View
                            style={{
                                flexDirection: 'column',
                                marginBottom: SIZES.base
                            }}
                        >
                            <Text 
                                style={{ 
                                    marginLeft: SIZES.padding + SIZES.base, 
                                    ...FONTS.h3, 
                                    marginBottom: SIZES.base / 2
                                }}
                            >
                                Catégories
                            </Text>
                            <FlatList
                                data={categories}
                                renderItem={renderItemCategorie}
                                keyExtractor={item => `${item.id}`}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: 'column',
                                marginBottom: SIZES.base
                            }}
                        >
                            <Text 
                                style={{ 
                                    marginLeft: SIZES.padding + SIZES.base, 
                                    ...FONTS.h3, 
                                    marginBottom: SIZES.base / 2
                                }}
                            >
                                Sous-catégories
                            </Text>
                            <FlatList
                                data={sousCategories}
                                renderItem={renderItemSousCategorie}
                                keyExtractor={item => `${item.id}`}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: 'column',
                                marginBottom: SIZES.base
                            }}
                        >
                            <Text 
                                style={{ 
                                    marginLeft: SIZES.padding + SIZES.base, 
                                    ...FONTS.h3, 
                                    marginBottom: SIZES.base / 2
                                }}
                            >
                                Marques
                            </Text>
                            <FlatList
                                data={marques}
                                renderItem={renderItemMarque}
                                keyExtractor={item => `${item.id}`}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: 'column',
                                marginBottom: SIZES.base
                            }}
                        >
                            <Text 
                                style={{ 
                                    marginLeft: SIZES.padding + SIZES.base, 
                                    ...FONTS.h3, 
                                    marginBottom: SIZES.base / 2
                                }}
                            >
                                Types
                            </Text>
                            <FlatList
                                data={types}
                                renderItem={renderItemType}
                                keyExtractor={item => `${item.id}`}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>
                }
            </View>
        )
    }

    function renderListeArticles() {

        const renderItemArticle = ({ item, index }) => (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: SIZES.base
                }}
                onPress={() => navigation.navigate("FicheArticle", {idArticle: item.id})}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h3, flexWrap: 'wrap' }}>{item.nom}</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.gray }}>Éclairage {">"} Ampoules {">"} Philips</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 10
                    }}
                >
                    <Text 
                        style={{ color: item.stocks >= item.stockMini ? COLORS.green : COLORS.red, fontWeight: 'bold', ...FONTS.body4 }}
                    >
                        {item.stocks}
                    </Text>
                    <View 
                        style={{
                            width: 10,
                            height: 1,
                            backgroundColor: COLORS.black,
                            borderRadius: 10
                        }}
                    />
                    <Text 
                        style={{ color: COLORS.black, ...FONTS.body5 }}
                    >
                        {item.stockMini}
                    </Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <View
                style={{
                    marginBottom: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 20,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                    height: voirFiltres ? SIZES.height - 150 - SIZES.padding * 16 : SIZES.height - 150 - SIZES.padding * 5,
                    ...styles.shadow
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={{ ...FONTS.h2, fontWeight: 'bold'}}>Liste des articles</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Image 
                            source={icons.article}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.yellow
                            }}
                        />
                        <Text style={{ marginLeft: SIZES.base, ...FONTS.h2, fontWeight: 'bold' }}>102</Text>
                    </View>
                </View>
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    nestedScrollEnabled={true}
                >
                    <FlatList 
                        contentContainerStyle={{ marginTop: SIZES.radius }}
                        scrollEnabled={false}
                        data={articles}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderItemArticle}
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

    return (
        <View style={{ flex: 1 }}>
            {renderBarreRecherche()}
            
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                {renderFiltres()}
                {renderListeArticles()}
            </ScrollView>
        </View>
    )
}

export default Rechercher;

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