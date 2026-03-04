import axios from "axios";
import { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function GeneroScreen() {
  // useState para guardar el nombre que escribe el usuario
  const [nombre, setNombre] = useState("");
  // useState para guardar el resultado de la API
  const [resultado, setResultado] = useState(null);
  // useState para mostrar el spinner de carga
  const [cargando, setCargando] = useState(false);
  // useState para errores
  const [error, setError] = useState("");

  const buscarGenero = async () => {
    // Validación básica
    if (!nombre.trim()) {
      setError("Escribe un nombre primero");
      return;
    }
    setCargando(true);
    setError("");
    setResultado(null);

    try {
      // axios.get hace una petición GET a la URL.
      // Es como fetch() pero más simple.
      // La respuesta viene en response.data
      const response = await axios.get(
        `https://api.genderize.io/?name=${nombre}`,
      );
      setResultado(response.data);
    } catch (e) {
      setError("Error al consultar la API");
    } finally {
      // finally se ejecuta siempre, haya error o no
      setCargando(false);
    }
  };

  // Determinamos el color de fondo según el género
  const esMasculino = resultado?.gender === "male";
  const fondoColor = resultado
    ? esMasculino
      ? "#0A2A4A"
      : "#4A0A2A"
    : "#1C1C1C";

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>PREDICTOR DE GÉNERO</Text>
      <Text style={styles.subtitulo}>
        Ingresa un nombre para predecir su género
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: Jorge, Maria, Alex..."
        placeholderTextColor="#666"
        value={nombre}
        // onChangeText se ejecuta cada vez que el usuario escribe
        onChangeText={setNombre}
        autoCapitalize="words"
      />

      <TouchableOpacity style={styles.boton} onPress={buscarGenero}>
        <Text style={styles.botonTexto}>PREDECIR</Text>
      </TouchableOpacity>

      {/* Muestra spinner mientras carga */}
      {cargando && (
        <ActivityIndicator
          size="large"
          color="#E63946"
          style={{ marginTop: 30 }}
        />
      )}

      {/* Muestra error si hay */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Muestra resultado si existe */}
      {resultado && (
        <View style={[styles.resultado, { backgroundColor: fondoColor }]}>
          <Text style={styles.resultadoNombre}>{resultado.name}</Text>
          <Text style={styles.resultadoGenero}>
            {esMasculino ? "MASCULINO" : "FEMENINO"}
          </Text>
          <Text style={styles.resultadoEmoji}>{esMasculino ? "♂" : "♀"}</Text>
          <Text style={styles.resultadoProbabilidad}>
            Probabilidad: {Math.round(resultado.probability * 100)}%
          </Text>
          <Text style={styles.resultadoMuestra}>
            Basado en {resultado.count} registros
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  titulo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 6,
  },
  subtitulo: { color: "#888", fontSize: 13, marginBottom: 24 },
  input: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#333",
    color: "#fff",
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  boton: { backgroundColor: "#E63946", padding: 14, alignItems: "center" },
  botonTexto: { color: "#fff", fontWeight: "bold", letterSpacing: 2 },
  error: { color: "#E63946", marginTop: 16, textAlign: "center" },
  resultado: {
    marginTop: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  resultadoNombre: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  resultadoGenero: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 3,
    marginTop: 8,
  },
  resultadoEmoji: { fontSize: 60, marginVertical: 12 },
  resultadoProbabilidad: { color: "#ccc", fontSize: 14 },
  resultadoMuestra: { color: "#888", fontSize: 12, marginTop: 4 },
});
