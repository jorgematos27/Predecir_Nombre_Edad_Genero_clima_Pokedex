import axios from "axios";
import { useState } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const categorizar = (edad) => {
  if (edad < 30)
    return {
      label: "JOVEN",
      color: "#1B5E20",
      imagen:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400",
      mensaje: "Lleno de energía y posibilidades",
    };
  if (edad < 60)
    return {
      label: "ADULTO",
      color: "#1A237E",
      imagen:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      mensaje: "En la plenitud de su vida",
    };
  return {
    label: "ANCIANO",
    color: "#4A148C",
    imagen:
      "https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=400",
    mensaje: "Con la sabiduría de los años",
  };
};

export default function EdadScreen() {
  const [nombre, setNombre] = useState("");
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const buscarEdad = async () => {
    if (!nombre.trim()) {
      setError("Escribe un nombre primero");
      return;
    }
    setCargando(true);
    setError("");
    setResultado(null);

    try {
      const response = await axios.get(`https://api.agify.io/?name=${nombre}`);
      setResultado(response.data);
    } catch (e) {
      setError("Error al consultar la API");
    } finally {
      setCargando(false);
    }
  };

  const categoria = resultado?.age ? categorizar(resultado.age) : null;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>PREDICTOR DE EDAD</Text>
      <Text style={styles.subtitulo}>
        Ingresa un nombre para estimar su edad
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: Jorge, Maria, Alex..."
        placeholderTextColor="#666"
        value={nombre}
        onChangeText={setNombre}
        autoCapitalize="words"
      />

      <TouchableOpacity style={styles.boton} onPress={buscarEdad}>
        <Text style={styles.botonTexto}>ESTIMAR EDAD</Text>
      </TouchableOpacity>

      {cargando && (
        <ActivityIndicator
          size="large"
          color="#E63946"
          style={{ marginTop: 30 }}
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {resultado && categoria && (
        <View
          style={[
            styles.resultado,
            { borderColor: categoria.color, borderWidth: 2 },
          ]}
        >
          <Image source={{ uri: categoria.imagen }} style={styles.imagen} />
          <View style={[styles.etiqueta, { backgroundColor: categoria.color }]}>
            <Text style={styles.etiquetaTexto}>{categoria.label}</Text>
          </View>
          <Text style={styles.nombreTexto}>{resultado.name}</Text>

          <Text style={styles.edadNumero}>
            {resultado.age ? resultado.age : "?"} años
          </Text>
          <Text style={styles.mensajeTexto}>{categoria.mensaje}</Text>
          <Text style={styles.muestraTexto}>
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
  resultado: { marginTop: 24, overflow: "hidden" },
  imagen: { width: "100%", height: 180, resizeMode: "cover" },
  etiqueta: { padding: 8, alignItems: "center" },
  etiquetaTexto: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 3,
    fontSize: 16,
  },
  nombreTexto: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
    textTransform: "capitalize",
  },
  edadNumero: {
    color: "#E63946",
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
  },
  mensajeTexto: {
    color: "#ccc",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 8,
  },
  muestraTexto: {
    color: "#666",
    textAlign: "center",
    fontSize: 11,
    marginBottom: 16,
  },
});
