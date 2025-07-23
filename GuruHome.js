import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function GuruHomeScreen() {
  const [namaGuru, setNamaGuru] = useState("");
  const [kelas, setKelas] = useState("");
  const [mapel, setMapel] = useState("");
  const [durasi, setDurasi] = useState("");
  const [qrValue, setQrValue] = useState(null);

  const handleGenerateQR = () => {
    if (namaGuru && kelas && mapel && durasi) {
      const timestamp = Date.now();
      const expired = timestamp + parseInt(durasi) * 60 * 60 * 1000;
      const data = JSON.stringify({ namaGuru, kelas, mapel, expired });
      setQrValue(data);
    } else {
      alert("Mohon lengkapi semua data terlebih dahulu.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Generate QR Code Presensi</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Guru"
        value={namaGuru}
        onChangeText={setNamaGuru}
      />

      <TextInput
        style={styles.input}
        placeholder="Kelas (contoh: 9A)"
        value={kelas}
        onChangeText={setKelas}
      />

      <TextInput
        style={styles.input}
        placeholder="Mata Pelajaran"
        value={mapel}
        onChangeText={setMapel}
      />

      <TextInput
        style={styles.input}
        placeholder="Durasi Presensi (Jam)"
        value={durasi}
        onChangeText={setDurasi}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleGenerateQR}>
        <Text style={styles.buttonText}>Buat QR Code</Text>
      </TouchableOpacity>

      {qrValue && (
        <View style={styles.qrContainer}>
          <Text style={styles.qrText}>QR Code berhasil dibuat:</Text>
          <QRCode value={qrValue} size={220} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f4f7",
    flexGrow: 1,
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2e7d32",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2e7d32",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  qrContainer: {
    marginTop: 30,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 4,
  },
  qrText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
