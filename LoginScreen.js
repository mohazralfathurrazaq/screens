import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      navigation.navigate("Home");
    } else {
      Alert.alert("Login Gagal", "Username atau password salah!");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/al-ma'arij.png")} style={styles.logo} />
      <Text style={styles.title}>Sistem Absensi Madrasah</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>

      {/* Navigasi ke Register */}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>
          Belum punya akun? Daftar di sini
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#e8f5e9",
  },
  title: {
    fontSize: 22,
    marginBottom: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2e7d32",
  },
  input: {
    height: 45,
    borderColor: "#a5d6a7",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#388e3c",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerText: {
    color: "#1b5e20",
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: "underline",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 15,
  },
});
