import React, { useState, useEffect, useRef } from "react";
import { Text, View, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";

export default function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    Alert.alert("Scan QR Berhasil", `Data: ${data}`, [
      { text: "OK", onPress: () => setScanned(false) },
    ]);
  };

  if (hasPermission === null) {
    return <Text>Meminta izin kamera...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Akses kamera ditolak</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ["qr"],
        }}
      >
        <View style={styles.scanBox}>
          <Text style={styles.scanText}>Arahkan QR Code ke dalam kotak</Text>
        </View>
      </Camera>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      {scanned && (
        <View style={styles.rescanButton}>
          <TouchableOpacity
            style={styles.rescanTouch}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.rescanText}>Scan Ulang</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  scanBox: {
    position: "absolute",
    top: "30%",
    left: "10%",
    right: "10%",
    height: 250,
    borderWidth: 2,
    borderColor: "#00FF00",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  scanText: { color: "#fff", fontSize: 16, marginTop: 10 },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 30,
  },
  rescanButton: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  rescanTouch: {
    backgroundColor: "#2e7d32",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  rescanText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
