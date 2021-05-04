import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    ImageBackground
} from 'react-native';

import { BarreRetour } from '../components';
import { COLORS, SIZES, FONTS, icons, images } from '../constants';

const DerniersEvenements = ({ navigation }) => {

    function renderEvenement({ idArticle, icon, iconColor, titre, description, personne, date }) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: SIZES.base,
                    marginHorizontal: SIZES.padding / 2,
                    paddingVertical: SIZES.padding / 2,
                    paddingHorizontal: SIZES.padding / 2,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius
                }}
            >
                <Image 
                    source={icon}
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: iconColor
                    }}
                />

                <View
                    style={{ flex: 1, marginLeft: SIZES.radius }}
                >
                    <Text style={{ ...FONTS.h3, fontWeight: 'bold' }}>{titre}</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.gray, lineHeight: 18 }}>{description} par {personne}{'\n' + date}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={{ height: "100%" }}>
            <View style={{ width: "100%", height: 130 }}>
                <ImageBackground
                        source={images.banniere}
                        resizeMode="cover"
                        style={{
                            flex: 1,
                            alignItems: 'center'
                        }}
                    >
                        <BarreRetour 
                            right={false}
                            color={COLORS.white}
                        />

                        <Text 
                            style={{ 
                                marginVertical: SIZES.base,
                                ...FONTS.h2,
                                color: COLORS.white
                            }}
                        >
                            Derniers évènements
                        </Text>
                    </ImageBackground>
            </View>

            <ScrollView>
                <View style={{ flex: 1 }}>
                    {renderEvenement({
                        idArticle: 1, 
                        icon: icons.entree_sortie, 
                        iconColor: COLORS.primary,
                        titre: "Ampoules Halogènes Culot GU5.3 - 12V - 35/50W",
                        description: "+5",
                        personne: "Frédéric",
                        date: "15/04/2021 10:53"
                    })}
                    {renderEvenement({
                        idArticle: 1, 
                        icon: icons.entree_sortie, 
                        iconColor: COLORS.primary,
                        titre: "Hublot Led Limaro",
                        description: "-2",
                        personne: "Romain",
                        date: "11/04/2021 11:02"
                    })}
                    {renderEvenement({
                        idArticle: 1, 
                        icon: icons.ajouter, 
                        iconColor: COLORS.green,
                        titre: "Ampoules",
                        description: "Catégorie créée",
                        personne: "Romain",
                        date: "11/04/2021 09:47"
                    })}
                    {renderEvenement({
                        idArticle: 1, 
                        icon: icons.modifier, 
                        iconColor: COLORS.yellow,
                        titre: "Philips",
                        description: "Marque modifiée",
                        personne: "Louis",
                        date: "08/04/2021 16:24"
                    })}
                    {renderEvenement({
                        idArticle: 1, 
                        icon: icons.suppression, 
                        iconColor: COLORS.red,
                        titre: "Coffret IP65 12 MOD",
                        description: "Article supprimé",
                        personne: "Frédéric",
                        date: "05/04/2021 12:35"
                    })}
                    {renderEvenement({
                        idArticle: 1, 
                        icon: icons.ajouter, 
                        iconColor: COLORS.green,
                        titre: "Plafonniers",
                        description: "Sous-catégorie ajoutée",
                        personne: "Frédéric",
                        date: "02/04/2021 08:03"
                    })}
                    {renderEvenement({
                        idArticle: 1, 
                        icon: icons.entree_sortie, 
                        iconColor: COLORS.primary,
                        titre: "Détecteur 180° Motion Detector White",
                        description: "-5",
                        personne: "Louis",
                        date: "02/04/2021 07:59"
                    })}
                    {renderEvenement({
                        idArticle: 1, 
                        icon: icons.entree_sortie, 
                        iconColor: COLORS.primary,
                        titre: "Griffes pour Appareillage Niloe",
                        description: "-1",
                        personne: "Romain",
                        date: "02/04/2021 07:59"
                    })}
                    {renderEvenement({
                        idArticle: 1, 
                        icon: icons.entree_sortie, 
                        iconColor: COLORS.primary,
                        titre: "Ampoules B22",
                        description: "+20",
                        personne: "Frédéric",
                        date: "01/04/2021 17:22"
                    })}
                    {renderEvenement({
                        idArticle: 1, 
                        icon: icons.modifier, 
                        iconColor: COLORS.yellow,
                        titre: "Détecteurs de mouvement",
                        description: "Catégorie modifiée",
                        personne: "Romain",
                        date: "31/03/2021 16:36"
                    })}
                    {renderEvenement({
                        idArticle: 1, 
                        icon: icons.entree_sortie, 
                        iconColor: COLORS.primary,
                        titre: "Tube 18W T5",
                        description: "Article ajouté",
                        personne: "Romain",
                        date: "31/03/2021 14:23"
                    })}
                    {renderEvenement({
                        idArticle: 1, 
                        icon: icons.suppression, 
                        iconColor: COLORS.red,
                        titre: "Appliques",
                        description: "Sous-catégorie supprimée",
                        personne: "Frédéric",
                        date: "29/03/2021 15:01"
                    })}
                </View>
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

export default DerniersEvenements;