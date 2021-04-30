import React from 'react';
import { 
    Text, 
    TouchableOpacity
} from 'react-native';

import { COLORS, SIZES, FONTS } from "../constants";

const BoutonTexte = ({ customContainerStyle, customLabelStyle, nom, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.radius,
                ...customContainerStyle
            }}
            onPress={onPress}
        >
            <Text style={{ color: COLORS.white, ...FONTS.h4, ...customLabelStyle }}>{nom}</Text>
        </TouchableOpacity>
    )
}

export default BoutonTexte;