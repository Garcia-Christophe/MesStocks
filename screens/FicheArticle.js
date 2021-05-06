import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput
} from 'react-native';

import { BarreRetour, BoutonTexte } from '../components';
import { COLORS, SIZES, FONTS, icons, dummyData } from '../constants';

const FicheArticle = ({ navigation, route }) => {

    const { nouveau, idArticle } = route.params;
    const article = nouveau ? null : dummyData.articles[idArticle - 1];

    const [designation, setDesignation] = useState(nouveau ? "" : article.nom)
    const [stocks, setStocks] = useState(nouveau ? 0 : article.stocks)
    const [stocksMini, setStocksMini] = useState(nouveau ? 0 : article.stockMini)

    const [categories, setCategories] = useState(dummyData.categoriesParentsArticle)
    const [sousCategories, setSousCategories] = useState(dummyData.sousCategoriesParentsArticle)
    const [marques, setMarques] = useState(dummyData.marquesParentsArticle)

    const [categorieSelectionnee, setCategorieSelectionnee] = useState(nouveau ? dummyData.categoriesParentsArticle[0] : dummyData.categoriesParentsArticle[article.idCategorie])
    const [sousCategorieSelectionnee, setSousCategorieSelectionnee] = useState(nouveau ? dummyData.categoriesParentsArticle[0] : dummyData.sousCategoriesParentsArticle[article.idCategorie])
    const [marqueSelectionnee, setMarqueSelectionnee] = useState(nouveau ? dummyData.categoriesParentsArticle[0] : dummyData.marquesParentsArticle[article.idCategorie])

    function renderDesignation() {
        return (
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
                        marginVertical: SIZES.base,
                        ...styles.shadow
                    }}
                >
                    <TextInput 
                        placeholder="Désignation de l'article..."
                        placeholderTextColor={COLORS.gray}
                        value={designation}
                        onChangeText={(texte) => setDesignation(texte)}
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
                        onPress={() => setDesignation("")}
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
        )
    }

    function renderStocks() {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    marginVertical: SIZES.base * 2,
                    marginHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding / 2,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    ...styles.shadow
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            width: "40%"
                        }}
                    >
                        <Image 
                            source={icons.reapprovisionnement}
                            style={{
                                height: 25,
                                width: 25
                            }}
                        />

                        <Text style={{ marginLeft: SIZES.base, ...FONTS.h3, fontWeight: 'bold' }}>Stocks</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            width: "40%" 
                        }}
                    >
                        <Image 
                            source={icons.stocksMini}
                            style={{
                                height: 25,
                                width: 25
                            }}
                        />

                        <Text style={{ marginLeft: SIZES.base, ...FONTS.h3, fontWeight: 'bold' }}>Stocks mini</Text>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'
                    }}
                >
                    <View
                        style={{
                            height: 45,
                            width: "40%",
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 25,
                            borderWidth: 1,
                            borderColor: COLORS.primary,
                            backgroundColor: COLORS.white,
                            paddingVertical: 5,
                            marginVertical: SIZES.base
                        }}
                    >
                        {/* Moins */}
                        <TouchableOpacity 
                            style={{ 
                                flexDirection: 'row', 
                                alignItems: 'center',
                                padding: SIZES.base,
                                marginRight: SIZES.base
                            }}
                            onPress={() => {
                                if (stocks > 0) {
                                    setStocks(stocks - 1)
                                }
                            }}
                        >
                            <Image 
                                source={icons.moins}
                                resizeMode="contain"
                                style={{
                                    width: 17,
                                    height: 17,
                                    tintColor: COLORS.gray,
                                    paddingHorizontal: SIZES.base
                                }}
                            />
                        </TouchableOpacity>

                        {/* Stocks */}
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <TextInput 
                                placeholderTextColor={COLORS.gray}
                                value={`${stocks}`}
                                onChangeText={(texte) => {
                                    if (texte === "") {
                                        setStocks(0)
                                    } else {
                                        setStocks(parseInt(texte))
                                    }
                                }}
                            />
                        </View>

                        {/* Plus */}
                        <TouchableOpacity 
                            style={{ 
                                flexDirection: 'row', 
                                alignItems: 'center',
                                padding: SIZES.base,
                                marginRight: SIZES.base
                            }}
                            onPress={() => setStocks(stocks + 1)}
                        >
                            <Image 
                                source={icons.plus}
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
                    
                    <View
                        style={{
                            height: 45,
                            width: "40%",
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 25,
                            borderWidth: 1,
                            borderColor: COLORS.primary,
                            backgroundColor: COLORS.white,
                            paddingVertical: 5,
                            marginVertical: SIZES.base
                        }}
                    >
                        {/* Moins */}
                        <TouchableOpacity 
                            style={{ 
                                flexDirection: 'row', 
                                alignItems: 'center',
                                padding: SIZES.base,
                                marginRight: SIZES.base
                            }}
                            onPress={() => {
                                if (stocksMini > 0) {
                                    setStocksMini(stocksMini - 1)
                                }
                            }}
                        >
                            <Image 
                                source={icons.moins}
                                resizeMode="contain"
                                style={{
                                    width: 17,
                                    height: 17,
                                    tintColor: COLORS.gray,
                                    paddingHorizontal: SIZES.base
                                }}
                            />
                        </TouchableOpacity>

                        {/* Stocks mini */}
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <TextInput 
                                placeholderTextColor={COLORS.gray}
                                value={`${stocksMini}`}
                                onChangeText={(texte) => {
                                    if (texte === "") {
                                        setStocksMini(0)
                                    } else {
                                        setStocksMini(parseInt(texte))
                                    }
                                }}
                            />
                        </View>

                        {/* Plus */}
                        <TouchableOpacity 
                            style={{ 
                                flexDirection: 'row', 
                                alignItems: 'center',
                                padding: SIZES.base,
                                marginRight: SIZES.base
                            }}
                            onPress={() => setStocksMini(stocksMini + 1)}
                        >
                            <Image 
                                source={icons.plus}
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
            </View>
        )
    }

    function renderParents() {

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

        return (
            <View
                style={{
                    flexDirection: 'column',
                    marginVertical: SIZES.base * 2,
                    marginHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding / 2,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    ...styles.shadow
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        marginLeft: SIZES.padding,
                        marginBottom: SIZES.base,
                        alignItems: 'center'
                    }}
                >
                    <Image 
                        source={icons.parents}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.yellow
                        }}
                    />

                    <Text
                        style={{
                            marginLeft: SIZES.padding / 2,
                            ...FONTS.h2,
                            fontWeight: 'bold',
                            alignItems: 'center'
                        }}
                    >
                        Parents
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'column',
                        marginBottom: SIZES.base,
                    }}
                >
                    <Text 
                        style={{ 
                            marginLeft: SIZES.padding + SIZES.base, 
                            ...FONTS.h3, 
                            marginBottom: SIZES.base / 2
                        }}
                    >
                        Catégorie
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
                        Sous-catégorie
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
                        Marque
                    </Text>
                    <FlatList
                        data={marques}
                        renderItem={renderItemMarque}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }

    function renderBoutonHistorique() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: SIZES.base * 2,
                    marginHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding / 2,
                    paddingHorizontal: SIZES.padding,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    ...styles.shadow
                }}
                onPress={() => navigation.navigate("Historique", {idArticle: idArticle})}
            >
                <Image 
                    source={icons.entree_sortie}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.yellow
                    }}
                />

                <View
                    style={{ flex: 1, marginLeft: SIZES.radius }}
                >
                    <Text style={{ ...FONTS.h3, fontWeight: 'bold' }}>Historique</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.gray, lineHeight: 18 }}>Voir l'historique des entrées/sorties de cet article</Text>
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
        <View>
            <View style={{ paddingBottom: SIZES.padding, backgroundColor: COLORS.white }}>
                <BarreRetour 
                    right={true}
                    color={COLORS.black}
                />
            </View>

            <ScrollView>
                <View style={{ flex: 1 }}>
                    {renderDesignation()}
                    {renderStocks()}
                    {renderParents()}
                    {renderBoutonHistorique()}
                    {renderBoutons()}
                </View>
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

export default FicheArticle;