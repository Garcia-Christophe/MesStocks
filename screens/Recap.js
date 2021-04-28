import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';

import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants" 

const Recap = ({ navigation }) => {

    const [sousCategories, setSousCategories] = useState(dummyData.sousCategories)
    
    function renderHeader() {

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
                        <View style={{ height: 30 }}>
                            <ScrollView>
                                <Text style={{ ...FONTS.body2 }}>{item.nom}</Text>
                            </ScrollView>
                        </View>
                        <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>{item.nomCategorie}</Text>
                    </View>
                </View>

                <TouchableOpacity>
                    {/* Séparateur */}
                    <View 
                        style={{
                            width: 66,
                            height: 5,
                            backgroundColor: COLORS.yellow,
                            marginLeft: 33,
                            marginVertical: 5,
                            borderRadius: 10
                        }}
                    />

                    {/* Informations */}
                    <View>
                        <Text style={{ ...FONTS.h4 }}><Text style={{ fontWeight: 'bold' }}>{item.nbArticles}</Text> articles</Text>
                        <Text style={{ color: item.nbArticlesACommander == 0 ? COLORS.green : COLORS.red, ...FONTS.body5 }}>{item.nbArticlesACommander == 0 ? "Stocks à jour" : item.nbArticlesACommander + " à commander"}</Text>
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
                    {/* En-tête */}
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
                            onPress={() => console.log("Notification on pressed")}
                        >
                            <Image
                                source={icons.notification_blanc}
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
                        <Text style={{ color: COLORS.white, ...FONTS.h1, marginTop: SIZES.base, paddingTop: SIZES.base, fontWeight: 'bold' }}>102</Text>
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
    
    return (
        <ScrollView>
            <View style={{ flex: 1, paddingBottom: 130 }}>
                {renderHeader()}
            </View>
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

export default Recap;