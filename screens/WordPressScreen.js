import axios from "axios";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const WP_API = "https://engineering.fb.com/wp-json/wp/v2/posts?per_page=3";
const LOGO =
  "https://engineering.fb.com/wp-content/uploads/2023/08/Meta_lockup_positive-primary_RGB.jpg";

const limpiarHTML = (html) => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#8230;/g, "...")
    .replace(/&amp;/g, "&")
    .trim();
};

export default function WordPressScreen() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const response = await axios.get(WP_API);
        setNoticias(response.data);
      } catch (e) {
        setError("No se pudieron cargar las noticias");
      } finally {
        setCargando(false);
      }
    };
    obtenerNoticias();
  }, []);

  if (cargando)
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#E63946" />
        <Text style={styles.cargandoTexto}>Cargando noticias...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.centrado}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {/* LOGO DEL SITIO */}
      <View style={styles.logoBloque}>
        <Image
          source={{ uri: LOGO }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.sitioNombre}>Engineering at Meta</Text>
        <Text style={styles.sitioUrl}>engineering.fb.com</Text>
      </View>

      <View style={styles.divider} />
      <Text style={styles.seccionTitulo}>ÚLTIMAS 3 NOTICIAS</Text>

      <FlatList
        data={noticias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.tarjeta}>
            {item.jetpack_featured_media_url ? (
              <Image
                source={{ uri: item.jetpack_featured_media_url }}
                style={styles.imagen}
              />
            ) : null}

            <View style={styles.tarjetaContenido}>
              <Text style={styles.numero}>0{index + 1}</Text>

              <Text style={styles.titular}>{item.title.rendered}</Text>

              <Text style={styles.resumen} numberOfLines={3}>
                {limpiarHTML(item.excerpt.rendered)}
              </Text>

              <Text style={styles.fecha}>
                {new Date(item.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>

              <TouchableOpacity
                style={styles.visitarBoton}
                onPress={() => Linking.openURL(item.link)}
              >
                <Text style={styles.visitarTexto}>VISITAR NOTICIA</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111" },
  centrado: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  cargandoTexto: { color: "#888", marginTop: 12 },
  error: { color: "#E63946", fontSize: 14 },

  logoBloque: { alignItems: "center", padding: 20, backgroundColor: "#fff" },
  logo: { width: "80%", height: 60 },
  sitioNombre: {
    color: "#333",
    fontWeight: "bold",
    marginTop: 8,
    fontSize: 14,
  },
  sitioUrl: { color: "#888", fontSize: 12 },

  divider: { height: 3, backgroundColor: "#E63946" },
  seccionTitulo: {
    color: "#E63946",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 3,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  tarjeta: {
    backgroundColor: "#1C1C1C",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
    marginBottom: 4,
  },
  imagen: { width: "100%", height: 160, resizeMode: "cover" },
  tarjetaContenido: { padding: 16 },
  numero: { color: "#E63946", fontSize: 22, fontWeight: "bold", opacity: 0.4 },
  titular: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 8,
    lineHeight: 22,
  },
  resumen: { color: "#888", fontSize: 13, lineHeight: 20, marginBottom: 10 },
  fecha: { color: "#555", fontSize: 11, marginBottom: 12 },
  visitarBoton: {
    backgroundColor: "#E63946",
    padding: 10,
    alignItems: "center",
  },
  visitarTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 2,
  },
});
