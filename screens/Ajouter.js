import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    FlatList,
    TextInput,
    Alert,
    Modal
} from 'react-native';

import { FONTS, SIZES, COLORS, images, icons, dummyData } from "../constants";

const Ajouter = ({ navigation }) => {

    const [categories, setCategories] = useState(dummyData.categories);
    const [sousCategories, setSousCategories] = useState(dummyData.sousCategories);
    const [marques, setMarques] = useState(dummyData.marques);
    const [utilisateurs, setUtilisateurs] = useState(dummyData.utilisateurs);

    const [modalCategorieOuverte, setModalCategorieOuverte] = useState(false);
    const [modalSousCategorieOuverte, setModalSousCategorieOuverte] = useState(false);
    const [modalMarqueOuverte, setModalMarqueOuverte] = useState(false);
    const [modalUtilisateurOuverte, setModalUtilisateurOuverte] = useState(false);

    const [nouvelleCategorie, setNouvelleCategorie] = useState("");
    const [nouvelleSousCategorie, setNouvelleSousCategorie] = useState("");
    const [nouvelleMarque, setNouvelleMarque] = useState("");
    const [nouvelUtilisateur, setNouvelUtilisateur] = useState("");

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
                    marginTop: SIZES.padding,
                    marginBottom: SIZES.padding / 2,
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

    function renderModifierDonnees({ donnees, logo, nom }) {

        const renderEnTete = () => (
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
                <TouchableOpacity
                    onPress={() => {
                        if (nom === "Catégories") {
                            setModalCategorieOuverte(true)
                        } else if (nom === "Sous-catégories") {
                            setModalSousCategorieOuverte(true)
                        } else if (nom === "Marques") {
                            setModalMarqueOuverte(true)
                        } else if (nom === "Utilisateurs") {
                            setModalUtilisateurOuverte(true)
                        }
                    }}
                >
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

        const renderItem = ({item}) => (
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
                        onChangeText={(texte) => console.log(texte)}
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
                        onPress={() => console.log("")}
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

        return (
            <View
                style={{
                    height: 350,
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.padding,
                    padding: 20,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                    ...styles.shadow
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

    function renderModal({ visible, nom }) {
        return (
            <Modal
                visible={visible}
                transparent
                hardwareAccelerated
                onRequestClose={() => {
                    if (nom === "Catégorie") {
                        setModalCategorieOuverte(false)
                    } else if (nom === "Sous-catégorie") {
                        setModalSousCategorieOuverte(false)
                    } else if (nom === "Marque") {
                        setModalMarqueOuverte(false)
                    } else if (nom === "Utilisateur") {
                        setModalUtilisateurOuverte(false)
                    }
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.black + "99"
                    }}
                >
                    <View
                        style={{
                            width: 300,
                            height: 200,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            justifyContent: 'space-between'
                        }}
                    >
                        <Text style={{ ...FONTS.h15, marginTop: SIZES.padding / 2, marginLeft: SIZES.padding }}>{nom}</Text>
                        
                        <View style={{ alignItems: 'center' }}>
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
                                    borderWidth: 1,
                                    borderColor: COLORS.gray
                                }}
                            >
                                <TextInput 
                                    placeholder="Nom de la donnée"
                                    placeholderTextColor={COLORS.gray}
                                    value={
                                        nom === "Catégorie" ? nouvelleCategorie :
                                        nom === "Sous-catégorie" ? nouvelleSousCategorie :
                                        nom === "Marque" ? nouvelleMarque : nouvelUtilisateur
                                    }
                                    onChangeText={(texte) => {
                                        if (nom === "Catégorie") {
                                            setNouvelleCategorie(texte)
                                        } else if (nom === "Sous-catégorie") {
                                            setNouvelleSousCategorie(texte)
                                        } else if (nom === "Marque") {
                                            setNouvelleMarque(texte)
                                        } else if (nom === "Utilisateur") {
                                            setNouvelUtilisateur(texte)
                                        }
                                    }}
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
                                        if (nom === "Catégorie") {
                                            setNouvelleCategorie("")
                                        } else if (nom === "Sous-catégorie") {
                                            setNouvelleSousCategorie("")
                                        } else if (nom === "Marque") {
                                            setNouvelleMarque("")
                                        } else if (nom === "Utilisateur") {
                                            setNouvelUtilisateur("")
                                        }
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

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                marginBottom: SIZES.padding
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    if (nom === "Catégorie") {
                                        setModalCategorieOuverte(false)
                                    } else if (nom === "Sous-catégorie") {
                                        setModalSousCategorieOuverte(false)
                                    } else if (nom === "Marque") {
                                        setModalMarqueOuverte(false)
                                    } else if (nom === "Utilisateur") {
                                        setModalUtilisateurOuverte(false)
                                    }
                                }}
                            >
                                <Text style={{ ...FONTS.h2, color: COLORS.gray }}>Annuler</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    if (nom === "Catégorie") {
                                        setModalCategorieOuverte(false)
                                    } else if (nom === "Sous-catégorie") {
                                        setModalSousCategorieOuverte(false)
                                    } else if (nom === "Marque") {
                                        setModalMarqueOuverte(false)
                                    } else if (nom === "Utilisateur") {
                                        setModalUtilisateurOuverte(false)
                                    }
                                }}
                            >
                                <Text style={{ ...FONTS.h2, color: COLORS.primary }}>Enregistrer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <View style={{ flex: 1, paddingBottom: 90 }}>
            {renderModal({ visible: modalCategorieOuverte, nom: "Catégorie" })}
            {renderModal({ visible: modalSousCategorieOuverte, nom: "Sous-catégorie" })}
            {renderModal({ visible: modalMarqueOuverte, nom: "Marque" })}
            {renderModal({ visible: modalUtilisateurOuverte, nom: "Utilisateur" })}

            {renderStats()}

            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                {renderAjouterArticle()}

                {renderModifierDonnees({ donnees: categories, logo: icons.categories, nom: "Catégories" })}
                {renderModifierDonnees({ donnees: sousCategories, logo: icons.sousCategories, nom: "Sous-catégories" })}
                {renderModifierDonnees({ donnees: marques, logo: icons.marques, nom: "Marques" })}
                {renderModifierDonnees({ donnees: utilisateurs, logo: icons.utilisateurs, nom: "Utilisateurs" })}
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