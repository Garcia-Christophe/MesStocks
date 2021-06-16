import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { COLORS, SIZES, FONTS } from "../constants";

const BoutonTexte = ({
  customContainerStyle,
  customLabelStyle,
  nom,
  myOnPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.radius,
        ...customContainerStyle,
      }}
      onPress={() => myOnPress()}
    >
      <Text style={{ color: COLORS.white, ...FONTS.h4, ...customLabelStyle }}>
        {nom}
      </Text>
    </TouchableOpacity>
  );
};

export default BoutonTexte;
