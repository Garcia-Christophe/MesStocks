import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const Scan = () => {
  const [permissionOK, setPermissionOK] = useState(null);
  const [articleScanne, setArticleScanne] = useState(false);
  const [contenu, setContenu] = useState("vide");

  // Demander la permission de la caméra
  const demanderPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermissionOK(status == "granted");
      alert(status == "granted");
    })();
  };

  // Demander la permission de la caméra dès qu'on arrive sur la page
  useEffect(() => {
    demanderPermission();
  }, []);

  // Lorsqu'un qrcode/barcode est scanné (type = qrcode/barcode, data = contenu)
  const handleScan = ({ type, data }) => {
    setArticleScanne(true);
    setContenu(data);
    console.log("type: " + type + "\nData: " + data);
  };

  // Vérification des permissions, et return en conséquence
  if (permissionOK === null) {
    return (
      <View style={styles.container}>
        <Text>L'application a besoin de votre permission.</Text>
      </View>
    );
  }

  if (permissionOK === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Pas d'accès à la caméra.</Text>
        <Button
          title="Autoriser la caméra"
          onPress={() => demanderPermission}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.qrcodebox}>
        <BarCodeScanner
          onBarCodeScanned={articleScanne ? undefined : handleScan}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.texteContenu}>{contenu}</Text>

      {articleScanne && (
        <Button
          title="Scanner"
          onPress={() => setArticleScanne(false)}
          color="black"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  qrcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "white",
  },
  texteContenu: {
    fontSize: 16,
    margin: 20,
  },
});

export default Scan;
