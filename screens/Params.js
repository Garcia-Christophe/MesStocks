import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';

import { FONTS, SIZES, COLORS, icons, images, dummyData } from "../constants";

const Params = ({ navigation }) => {

    const [toast, setToast] = useState();
    const [email, setEmail] = useState("");

    const [themes, setThemes] = useState(dummyData.themes);
    const [notifications, setNotifications] = useState(dummyData.notifications);

    const [themeOriginal, setThemeOriginal] = useState(dummyData.themes[0]);
    const [notificationEntreesSortiesOriginale, setNotificationEntreesSortiesOriginale] = useState(dummyData.notifications[0]);
    const [notificationACommanderOriginale, setNotificationACommanderOriginale] = useState(dummyData.notifications[0]);
    const [notificationDonneesOriginale, setNotificationDonneesOriginale] = useState(dummyData.notifications[0]);
    const [notificationCreationOriginale, setNotificationCreationOriginale] = useState(dummyData.notifications[0]);
    const [notificationModificationOriginale, setNotificationModificationOriginale] = useState(dummyData.notifications[0]);
    const [notificationSuppressionOriginale, setNotificationSuppressionOriginale] = useState(dummyData.notifications[0]);

    const [themeChoisi, setThemeChoisi] = useState(themeOriginal);
    const [notificationEntreesSortiesChoisie, setNotificationEntreesSortiesChoisie] = useState(notificationEntreesSortiesOriginale);
    const [notificationACommanderChoisie, setNotificationACommanderChoisie] = useState(notificationACommanderOriginale);
    const [notificationDonneesChoisie, setNotificationDonneesChoisie] = useState(notificationDonneesOriginale);
    const [notificationCreationChoisie, setNotificationCreationChoisie] = useState(notificationCreationOriginale);
    const [notificationModificationChoisie, setNotificationModificationChoisie] = useState(notificationModificationOriginale);
    const [notificationSuppressionChoisie, setNotificationSuppressionChoisie] = useState(notificationSuppressionOriginale);

    function renderEnTete() {
        return (
            <View
                style={{
                    width: "100%",
                    height: 90,
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
                    <Text style={{ color: COLORS.white, ...FONTS.h15, marginBottom: SIZES.base }}>Paramètres</Text>
                </ImageBackground>
            </View>
        )
    }

    function renderMessage() {
        return (
            <Text
                style={{
                    marginHorizontal: SIZES.padding,
                    marginTop: SIZES.padding / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                Attention ! Ces paramètres sont les mêmes pour tous les utilisateurs
            </Text>
        )
    }

    function renderTheme() {
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
                        Thème
                    </Text>
                </View>

                {/* Boutons */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingBottom: SIZES.base,
                        justifyContent: 'space-evenly'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 120,
                            marginTop: SIZES.base * 2,
                            paddingVertical: SIZES.base,
                            backgroundColor: themeChoisi.id === themes[0].id ? COLORS.primary : COLORS.lightGray,
                            borderRadius: 20
                        }}
                        onPress={() => setThemeChoisi(themes[0])}
                    >
                        <Text
                            style={{
                                color: themeChoisi.id === themes[0].id ? COLORS.white : COLORS.gray,
                                ...FONTS.h3
                            }}
                        >
                            Clair
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 120,
                            marginTop: SIZES.base * 2,
                            paddingVertical: SIZES.base,
                            backgroundColor: themeChoisi.id === themes[1].id ? COLORS.primary : COLORS.lightGray,
                            borderRadius: 20
                        }}
                        onPress={() => setThemeChoisi(themes[1])}
                    >
                        <Text
                            style={{
                                color: themeChoisi.id === themes[1].id ? COLORS.white : COLORS.gray,
                                ...FONTS.h3
                            }}
                        >
                            Sombre
                        </Text>
                    </TouchableOpacity>
                </View>
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
                    marginVertical: SIZES.padding / 2,
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

                {/* Entrées / Sorties */}
                <Text style={{ ...FONTS.h3, marginLeft: SIZES.padding, marginTop: SIZES.base, fontWeight: 'bold' }}>Entrées / Sorties</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        paddingBottom: SIZES.base,
                        justifyContent: 'space-evenly'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 120,
                            marginTop: SIZES.base,
                            paddingVertical: SIZES.base,
                            backgroundColor: notificationEntreesSortiesChoisie.id === notifications[0].id ? COLORS.primary : COLORS.lightGray,
                            borderRadius: 20
                        }}
                        onPress={() => setNotificationEntreesSortiesChoisie(notifications[0])}
                    >
                        <Text
                            style={{
                                color: notificationEntreesSortiesChoisie.id === notifications[0].id ? COLORS.white : COLORS.gray,
                                ...FONTS.h3
                            }}
                        >
                            Activées
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 120,
                            marginTop: SIZES.base,
                            paddingVertical: SIZES.base,
                            backgroundColor: notificationEntreesSortiesChoisie.id === notifications[1].id ? COLORS.primary : COLORS.lightGray,
                            borderRadius: 20
                        }}
                        onPress={() => setNotificationEntreesSortiesChoisie(notifications[1])}
                    >
                        <Text
                            style={{
                                color: notificationEntreesSortiesChoisie.id === notifications[1].id ? COLORS.white : COLORS.gray,
                                ...FONTS.h3
                            }}
                        >
                            Désactivées
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* À Commander */}
                <Text style={{ ...FONTS.h3, marginLeft: SIZES.padding, marginTop: SIZES.base, fontWeight: 'bold' }}>À Commander</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        paddingBottom: SIZES.base,
                        justifyContent: 'space-evenly'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 120,
                            marginTop: SIZES.base,
                            paddingVertical: SIZES.base,
                            backgroundColor: notificationACommanderChoisie.id === notifications[0].id ? COLORS.primary : COLORS.lightGray,
                            borderRadius: 20
                        }}
                        onPress={() => setNotificationACommanderChoisie(notifications[0])}
                    >
                        <Text
                            style={{
                                color: notificationACommanderChoisie.id === notifications[0].id ? COLORS.white : COLORS.gray,
                                ...FONTS.h3
                            }}
                        >
                            Activées
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 120,
                            marginTop: SIZES.base,
                            paddingVertical: SIZES.base,
                            backgroundColor: notificationACommanderChoisie.id === notifications[1].id ? COLORS.primary : COLORS.lightGray,
                            borderRadius: 20
                        }}
                        onPress={() => setNotificationACommanderChoisie(notifications[1])}
                    >
                        <Text
                            style={{
                                color: notificationACommanderChoisie.id === notifications[1].id ? COLORS.white : COLORS.gray,
                                ...FONTS.h3
                            }}
                        >
                            Désactivées
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Données */}
                <Text style={{ ...FONTS.h3, marginLeft: SIZES.padding, marginTop: SIZES.base, fontWeight: 'bold' }}>Données</Text>

                <View
                    style={{
                        flexDirection: 'column',
                        paddingBottom: SIZES.base,
                        justifyContent: 'space-evenly'
                    }}
                >
                    {/* Créations */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: SIZES.padding + SIZES.base,
                            marginTop: SIZES.base
                        }}
                    >
                        <Text style={{ flex: 0.5, ...FONTS.h4, marginHorizontal: SIZES.base }}>Créations</Text>

                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: "space-evenly"
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 75,
                                    paddingVertical: SIZES.base,
                                    backgroundColor: notificationCreationChoisie.id === notifications[0].id ? COLORS.primary : COLORS.lightGray,
                                    borderRadius: 20
                                }}
                                onPress={() => setNotificationCreationChoisie(notifications[0])}
                            >
                                <Text
                                    style={{
                                        color: notificationCreationChoisie.id === notifications[0].id ? COLORS.white : COLORS.gray,
                                        ...FONTS.body5
                                    }}
                                >
                                    Activées
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 75,
                                    paddingVertical: SIZES.base,
                                    backgroundColor: notificationCreationChoisie.id === notifications[1].id ? COLORS.primary : COLORS.lightGray,
                                    borderRadius: 20
                                }}
                                onPress={() => setNotificationCreationChoisie(notifications[1])}
                            >
                                <Text
                                    style={{
                                        color: notificationCreationChoisie.id === notifications[1].id ? COLORS.white : COLORS.gray,
                                        ...FONTS.body5
                                    }}
                                >
                                    Désactivées
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Modifications */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: SIZES.padding + SIZES.base,
                            marginTop: SIZES.base
                        }}
                    >
                        <Text style={{ flex: 0.5, ...FONTS.h4, marginHorizontal: SIZES.base }}>Modifications</Text>

                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: "space-evenly"
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 75,
                                    paddingVertical: SIZES.base,
                                    backgroundColor: notificationModificationChoisie.id === notifications[0].id ? COLORS.primary : COLORS.lightGray,
                                    borderRadius: 20
                                }}
                                onPress={() => setNotificationModificationChoisie(notifications[0])}
                            >
                                <Text
                                    style={{
                                        color: notificationModificationChoisie.id === notifications[0].id ? COLORS.white : COLORS.gray,
                                        ...FONTS.body5
                                    }}
                                >
                                    Activées
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 75,
                                    paddingVertical: SIZES.base,
                                    backgroundColor: notificationModificationChoisie.id === notifications[1].id ? COLORS.primary : COLORS.lightGray,
                                    borderRadius: 20
                                }}
                                onPress={() => setNotificationModificationChoisie(notifications[1])}
                            >
                                <Text
                                    style={{
                                        color: notificationModificationChoisie.id === notifications[1].id ? COLORS.white : COLORS.gray,
                                        ...FONTS.body5
                                    }}
                                >
                                    Désactivées
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Suppressions */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: SIZES.padding + SIZES.base,
                            marginTop: SIZES.base
                        }}
                    >
                        <Text style={{ flex: 0.5, ...FONTS.h4, marginHorizontal: SIZES.base }}>Suppressions</Text>

                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: "space-evenly"
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 75,
                                    paddingVertical: SIZES.base,
                                    backgroundColor: notificationSuppressionChoisie.id === notifications[0].id ? COLORS.primary : COLORS.lightGray,
                                    borderRadius: 20
                                }}
                                onPress={() => setNotificationSuppressionChoisie(notifications[0])}
                            >
                                <Text
                                    style={{
                                        color: notificationSuppressionChoisie.id === notifications[0].id ? COLORS.white : COLORS.gray,
                                        ...FONTS.body5
                                    }}
                                >
                                    Activées
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 75,
                                    paddingVertical: SIZES.base,
                                    backgroundColor: notificationSuppressionChoisie.id === notifications[1].id ? COLORS.primary : COLORS.lightGray,
                                    borderRadius: 20
                                }}
                                onPress={() => setNotificationSuppressionChoisie(notifications[1])}
                            >
                                <Text
                                    style={{
                                        color: notificationSuppressionChoisie.id === notifications[1].id ? COLORS.white : COLORS.gray,
                                        ...FONTS.body5
                                    }}
                                >
                                    Désactivées
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function renderBoutonsPersonnalisation() {
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
                        if (themeOriginal != themeChoisi
                            || notificationEntreesSortiesOriginale != notificationEntreesSortiesChoisie
                            || notificationACommanderOriginale != notificationACommanderChoisie
                            || notificationDonneesOriginale != notificationDonneesChoisie
                            || notificationCreationOriginale != notificationCreationChoisie
                            || notificationModificationOriginale != notificationModificationChoisie
                            || notificationSuppressionOriginale != notificationSuppressionChoisie) {

                                setThemeChoisi(themeOriginal)
                                setNotificationEntreesSortiesChoisie(notificationEntreesSortiesOriginale)
                                setNotificationACommanderChoisie(notificationACommanderOriginale)
                                setNotificationDonneesChoisie(notificationDonneesOriginale)
                                setNotificationCreationChoisie(notificationCreationOriginale)
                                setNotificationModificationChoisie(notificationModificationOriginale)
                                setNotificationSuppressionChoisie(notificationSuppressionOriginale)
                                toast.show('Changements annulés.', 1000);
                        } else {
                            toast.show("Aucun changement n'a été fait.", 1000);
                        }
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
                        if (themeOriginal != themeChoisi
                            || notificationEntreesSortiesOriginale != notificationEntreesSortiesChoisie
                            || notificationACommanderOriginale != notificationACommanderChoisie
                            || notificationDonneesOriginale != notificationDonneesChoisie
                            || notificationCreationOriginale != notificationCreationChoisie
                            || notificationModificationOriginale != notificationModificationChoisie
                            || notificationSuppressionOriginale != notificationSuppressionChoisie) {

                                setThemeOriginal(themeChoisi)
                                setNotificationEntreesSortiesOriginale(notificationEntreesSortiesChoisie)
                                setNotificationACommanderOriginale(notificationACommanderChoisie)
                                setNotificationDonneesOriginale(notificationDonneesChoisie)
                                setNotificationCreationOriginale(notificationCreationChoisie)
                                setNotificationModificationOriginale(notificationModificationChoisie)
                                setNotificationSuppressionOriginale(notificationSuppressionChoisie)
                                toast.show('Changements enregistrés !', 1000);
                        } else {
                            toast.show("Aucun changement n'a été fait.", 1000);
                        }
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

    function renderExportation() {
        return (
            <View
                style={{ 
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingVertical: SIZES.padding / 2,
                    marginHorizontal: SIZES.padding,
                    marginTop: SIZES.padding / 2,
                    marginBottom : SIZES.padding,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    ...styles.shadow 
                }}
            >
                {/* Titre */}
                <View 
                    style={{ 
                        width: "100%",
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: SIZES.padding
                    }}>
                    <Image 
                        source={icons.exportation}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.yellow
                        }}
                    />
                    <Text style={{ ...FONTS.h2, fontWeight: 'bold', marginLeft: SIZES.padding / 2 + 5 }}>Exportation</Text>
                </View>

                {/* Email */}
                <View
                    style={{
                        height: 45,
                        width: "90%",
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: COLORS.gray,
                        backgroundColor: COLORS.white,
                        paddingVertical: 5,
                        marginTop: SIZES.padding,
                        marginBottom: SIZES.base
                    }}
                >
                    <TextInput 
                        placeholder="Email"
                        placeholderTextColor={COLORS.gray}
                        value={email}
                        onChangeText={(texte) => setEmail(texte)}
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
                        onPress={() => setEmail("")}
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

                {/* Boutons */}
                <View
                    style={{
                        flexDirection: 'row',
                        width: "100%",
                        paddingBottom: SIZES.base,
                        justifyContent: 'space-evenly'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 150,
                            marginTop: SIZES.base,
                            paddingVertical: SIZES.padding / 2,
                            backgroundColor: COLORS.red,
                            borderRadius: SIZES.radius
                        }}
                        onPress={() => {
                            if (email.length > 0) {
                                setEmail("")
                                toast.show('Exportation réussie !', 1000)
                            } else {
                                toast.show("Veuillez saisir l'email.", 1000)
                            }
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.h2,
                                fontWeight: 'bold'
                            }}
                        >
                            PDF
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 150,
                            marginTop: SIZES.base,
                            paddingVertical: SIZES.padding / 2,
                            backgroundColor: COLORS.green,
                            borderRadius: SIZES.radius
                        }}
                        onPress={() => {
                            if (email.length > 0) {
                                setEmail("")
                                toast.show('Exportation réussie !', 1000)
                            } else {
                                toast.show("Veuillez saisir l'email.", 1000)
                            }
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.h2,
                                fontWeight: 'bold'
                            }}
                        >
                            XLSX
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
 
    return (
        <View style={{ flex: 1, paddingBottom: 90 }}>
            {renderEnTete()}

            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                {renderMessage()}
                {renderTheme()}
                {renderNotifications()}
                {renderBoutonsPersonnalisation()}

                {/* Séparateur */}
                <View
                    style={{
                        width: "100%",
                        alignItems: 'center',
                        marginBottom: SIZES.padding / 2
                    }}
                >
                    <View 
                        style={{
                            height: 1,
                            width: "90%",
                            backgroundColor: COLORS.gray
                        }}
                    />
                </View>

                {renderExportation()}
            </ScrollView>

            {/* Toast */}
            <Toast 
                ref={(toast) => setToast(toast)} 
                position={"bottom"}
                fadeInDuration={500}
                fadeOutDuration={750}
                opacity={0.8}
                style={{
                    backgroundColor: COLORS.gray, 
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