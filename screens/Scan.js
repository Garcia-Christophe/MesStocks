import React from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";

//import QRCodeScanner from "react-native-qrcode-scanner";
//import { RNCamera } from "react-native-camera";

const Scan = () => {
  return (
    <View style={styles.container}>
      {/* <QRCodeScanner
        onRead={(e) => Alert.alert("ID Trouvé !", "ID : " + e.data)}
        topContent={
          <Text>
            Scanne le QR Code de l'article dont tu souhaites ajuster le stock.
          </Text>
        }
        bottomContent={
          <TouchableOpacity>
            <Text>OK. Compris !</Text>
          </TouchableOpacity>
        }
      /> */}
      {/* <RNCamera
        ref={(ref) => console.log(ref)}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}
      /> */}
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
});

export default Scan;
