import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Image,
    Animated
} from 'react-native';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';

import { BarreRetour, HistoriqueEntreesSorties, BoutonTexte } from '../components';
import { COLORS, SIZES, FONTS, icons, images, dummyData } from '../constants';

const Historique = ({ navigation }) => {

    const scrollX = new Animated.Value(0);
    const nombreDeFiltres = [1, 2, 3];
    
    const [historiqueEntreesSorties, setHistoriqueEntreesSorties] = useState(dummyData.historiqueEntreesSorties)
    const [types, setTypes] = useState(dummyData.types)
    const [typeSelectionne, setTypeSelectionne] = useState(dummyData.types[0])
    const [personnes, setPersonnes] = useState(dummyData.personnes)
    const [personneSelectionnee, setPersonneSelectionnee] = useState(dummyData.personnes[0])
    const [periodes, setPeriodes] = useState(dummyData.periodes)
    const [periodeSelectionnee, setPeriodeSelectionnee] = useState(dummyData.periodes[0])

    function typeOnClickHandler(type) {
        setTypeSelectionne(type)
    }

    function personneOnClickHandler(personne) {
        setPersonneSelectionnee(personne)
    }

    function periodeOnClickHandler(periode) {
        setPeriodeSelectionnee(periode)
    }

    function renderPetitsPoints() {
        const positionPoint = Animated.divide(scrollX, SIZES.width)

        return (
            <View style={{ height: 10, justifyContent: 'center'}}>
                <View 
                    style={{ 
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center' 
                    }}
                >
                    {nombreDeFiltres.map((item, index) => {
                        const opacity = positionPoint.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })

                        const taillePoint = positionPoint.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate: 'clamp'
                        })

                        const couleurPoint = positionPoint.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
                            extrapolate: 'clamp'
                        })

                        return (
                            <Animated.View
                                key={`point-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 6,
                                    width: taillePoint,
                                    height: taillePoint,
                                    backgroundColor: couleurPoint
                                }}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }

    function renderEntete() {
        return (
            <View
                style={{
                    width: "100%",
                    height: 150,
                    ...styles.shadow,
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
                    <BarreRetour 
                        right={false}
                        color={COLORS.white}
                    />

                    {/* Nombres entrées/sorties */}
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
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{ 
                                color: COLORS.green, 
                                ...FONTS.h1, 
                                paddingHorizontal: SIZES.padding,
                                paddingTop: SIZES.base,
                                fontWeight: 'bold' }}
                            >
                                156
                            </Text>
                            <Text style={{ color: COLORS.white, ...FONTS.body5, top: -10 }}>entrées</Text>
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{ 
                                color: COLORS.red, 
                                ...FONTS.h1, 
                                paddingHorizontal: SIZES.padding,
                                paddingTop: SIZES.base,
                                fontWeight: 'bold' }}
                            >
                                201
                            </Text>
                            <Text style={{ color: COLORS.white, ...FONTS.body5, top: -10 }}>sorties</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    function renderFiltres() {
        return (
            <View>
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    scrollEventThrottle={16}
                    snapToAlignment={SIZES.width - 40}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX
                        } } }
                    ], { useNativeDriver: false })}
                >
                    {
                        nombreDeFiltres.map((item, index) => (
                            <View
                                key={`option-${index}`}
                                style={{
                                    width: SIZES.width
                                }}
                            >
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
                                            source={index === 0 ? icons.entree_sortie_disque : (index === 1 ? icons.qui : icons.chrono)}
                                            style={{
                                                width: 25,
                                                height: 25,
                                                tintColor: COLORS.yellow
                                            }}
                                        />
                                        <Text style={{ marginLeft: SIZES.padding / 2, color: COLORS.black, fontWeight: 'bold', ...FONTS.h2 }}>
                                            {index === 0 && "Type"}
                                            {index === 1 && "Personne"}
                                            {index === 2 && "Période"}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            width: "100%",
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                            paddingVertical: SIZES.padding / 2
                                        }}
                                    >
                                        {index === 0 &&
                                            types.map((type) => {
                                                return (
                                                    <BoutonTexte
                                                        key={`option-${type.id}`}
                                                        nom={type.nom}
                                                        customContainerStyle={{
                                                            height: 30,
                                                            paddingHorizontal: SIZES.radius,
                                                            borderRadius: 15,
                                                            backgroundColor: typeSelectionne.id === type.id ? COLORS.primary : COLORS.lightGray
                                                        }}
                                                        customLabelStyle={{
                                                            color: typeSelectionne.id === type.id ? COLORS.white : COLORS.gray
                                                        }}
                                                        onPress={() => typeOnClickHandler(type)}
                                                    />
                                                )
                                            })
                                        }
                                        {index === 1 && 
                                            personnes.map((personne) => {
                                                return (
                                                    <BoutonTexte
                                                        key={`option-${personne.id}`}
                                                        nom={personne.nom}
                                                        customContainerStyle={{
                                                            height: 30,
                                                            paddingHorizontal: SIZES.radius,
                                                            borderRadius: 15,
                                                            backgroundColor: personneSelectionnee.id === personne.id ? COLORS.primary : COLORS.lightGray
                                                        }}
                                                        customLabelStyle={{
                                                            color: personneSelectionnee.id === personne.id ? COLORS.white : COLORS.gray
                                                        }}
                                                        onPress={() => personneOnClickHandler(personne)}
                                                    />
                                                )
                                            })
                                        }
                                        {index === 2 && 
                                            periodes.map((periode) => {
                                                return (
                                                    <BoutonTexte
                                                        key={`option-${periode.id}`}
                                                        nom={periode.nom}
                                                        customContainerStyle={{
                                                            height: 30,
                                                            paddingHorizontal: SIZES.radius,
                                                            borderRadius: 15,
                                                            backgroundColor: periodeSelectionnee.id === periode.id ? COLORS.primary : COLORS.lightGray
                                                        }}
                                                        customLabelStyle={{
                                                            color: periodeSelectionnee.id === periode.id ? COLORS.white : COLORS.gray
                                                        }}
                                                        onPress={() => periodeOnClickHandler(periode)}
                                                    />
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </Animated.ScrollView>
                
                {renderPetitsPoints()}
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {renderEntete()}
            <ScrollView>
                {renderFiltres()}
                
                <HistoriqueEntreesSorties
                    customContainerStyle={{ 
                        ...styles.shadow, 
                        marginBottom: SIZES.padding, 
                        height: SIZES.height /* écran */ - 150 /* banniere */ - SIZES.padding * 6
                    }}
                    navigation={navigation}
                    history={historiqueEntreesSorties}
                    number={0}
                    personne="Tous"
                    type="Tous"
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

export default Historique;