import axios from "axios";
import { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Linking,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function UniversidadesScreen() {
  const [pais, setPais] = useState("");
  const [universidades, setUniversidades] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const buscarUniversidades = async () => {
    if (!pais.trim()) {
      setError("Escribe un país en inglés");
      return;
    }
    setCargando(true);
    setError("");
    setUniversidades([]);

    try {
      // El proxy de adamix.net devuelve un array de universidades
      // cada una tiene: name, domains[], web_pages[]
      const response = await axios.get(
        `https://adamix.net/proxy.php?country=${encodeURIComponent(pais)}`,
      );
      if (response.data.length === 0) {
        setError("No se encontraron universidades para ese país");
      } else {
        setUniversidades(response.data);
      }
    } catch (e) {
      setError("Error al consultar la API");
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>UNIVERSIDADES</Text>
      <Text style={styles.subtitulo}>
        Busca universidades por país (en inglés)
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: Dominican Republic, Mexico, Spain..."
        placeholderTextColor="#666"
        value={pais}
        onChangeText={setPais}
      />

      <TouchableOpacity style={styles.boton} onPress={buscarUniversidades}>
        <Text style={styles.botonTexto}>BUSCAR</Text>
      </TouchableOpacity>

      {cargando && (
        <ActivityIndicator
          size="large"
          color="#E63946"
          style={{ marginTop: 20 }}
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {universidades.length > 0 && (
        <Text style={styles.conteo}>
          {universidades.length} universidades encontradas
        </Text>
      )}

      {/* FlatList es más eficiente que map para listas largas */}
      <FlatList
        data={universidades}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.tarjeta}>
            <Text style={styles.numero}>#{index + 1}</Text>
            <Text style={styles.nombre}>{item.name}</Text>

            {/* item.domains es un array, mostramos el primero */}
            {item.domains?.[0] && (
              <Text style={styles.dominio}>{item.domains[0]}</Text>
            )}

            {/* item.web_pages es un array de URLs */}
            {item.web_pages?.[0] && (
              <TouchableOpacity
                onPress={() => Linking.openURL(item.web_pages[0])}
                style={styles.linkBoton}
              >
                <Text style={styles.linkTexto}>Visitar sitio web</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 16 },
  titulo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 6,
  },
  subtitulo: { color: "#888", fontSize: 12, marginBottom: 16 },
  input: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#333",
    color: "#fff",
    padding: 14,
    fontSize: 14,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: "#E63946",
    padding: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  botonTexto: { color: "#fff", fontWeight: "bold", letterSpacing: 2 },
  error: { color: "#E63946", textAlign: "center", marginVertical: 10 },
  conteo: { color: "#888", fontSize: 12, marginBottom: 10 },
  tarjeta: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    padding: 14,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#E63946",
  },
  numero: {
    color: "#E63946",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
  },
  nombre: { color: "#fff", fontWeight: "bold", fontSize: 14, marginBottom: 4 },
  dominio: { color: "#888", fontSize: 12, marginBottom: 8 },
  linkBoton: { backgroundColor: "#2A2A2A", padding: 8, alignItems: "center" },
  linkTexto: { color: "#E63946", fontSize: 12, fontWeight: "bold" },
});
