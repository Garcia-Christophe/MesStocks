import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';

import { COLORS, SIZES, FONTS, icons } from '../constants';
import { historiqueEntreesSorties } from '../constants/dummy';
import { historiquePremieresEntreesSorties } from '../constants/dummy';

const HistoriqueEntreesSorties = ({navigation, customContainerStyle, history, number, personne, type}) => {

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: SIZES.base
                }}
                onPress={() => navigation.navigate("FicheProduit", {idProduit: item.id})}
            >
                <Image 
                    source={icons.entree_sortie}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.primary
                    }}
                />

                <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                    <Text style={{ ...FONTS.h3 }}>{item.nomArticle}</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.gray }}>{item.date} - {item.personne}</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        height: '100%',
                        alignItems: 'center',
                        marginHorizontal: 10
                    }}
                >
                    <Text 
                        style={{ color: item.type === "E" ? COLORS.green : COLORS.red, fontWeight: 'bold', ...FONTS.body4 }}
                    >
                        {item.type === "E" ? "+" : "-"} {item.nombre}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View
            style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: 20,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...customContainerStyle
            }}
        >
            <Text style={{ ...FONTS.h2, fontWeight: 'bold', marginBottom: SIZES.base }}>Historique des entrées/sorties</Text>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                nestedScrollEnabled={true}
            >
                <FlatList 
                    contentContainerStyle={{ marginTop: SIZES.radius }}
                    scrollEnabled={false}
                    data={number === 5 ? historiquePremieresEntreesSorties : historiqueEntreesSorties}
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

            {number === 5 && 
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate("Historique")}
                >
                    <Image 
                        source={icons.troisPetitsPoints}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: COLORS.lightGray
                        }}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}

export default HistoriqueEntreesSorties;