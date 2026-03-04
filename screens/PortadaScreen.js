import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PortadaScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>COUTEAU</Text>
      <Text style={styles.subtitulo}>Tu caja de herramientas digital</Text>
      <View style={styles.divider} />

      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800",
        }}
        style={styles.imagen}
      />

      <View style={styles.grid}>
        {[
          {
            icon: "👤",
            titulo: "Género",
            desc: "Predice el género por nombre",
          },
          { icon: "🎂", titulo: "Edad", desc: "Estima la edad por nombre" },
          {
            icon: "🎓",
            titulo: "Universidades",
            desc: "Busca universidades por país",
          },
          { icon: "🌤", titulo: "Clima", desc: "Clima actual en RD" },
          {
            icon: "⚡",
            titulo: "Pokémon",
            desc: "Info y sonido de cualquier Pokémon",
          },
          {
            icon: "📰",
            titulo: "WordPress",
            desc: "Últimas noticias de Engineering at Meta",
          },
        ].map((item) => (
          <View key={item.titulo} style={styles.tarjeta}>
            <Text style={styles.tarjetaIcon}>{item.icon}</Text>
            <Text style={styles.tarjetaTitulo}>{item.titulo}</Text>
            <Text style={styles.tarjetaDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111" },
  titulo: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    letterSpacing: 4,
  },
  subtitulo: { color: "#888", textAlign: "center", marginBottom: 16 },
  divider: {
    height: 2,
    backgroundColor: "#E63946",
    marginHorizontal: 40,
    marginBottom: 16,
  },
  imagen: { width: "100%", height: 200, resizeMode: "cover" },
  grid: { flexDirection: "row", flexWrap: "wrap", padding: 12 },
  tarjeta: {
    width: "47%",
    margin: "1.5%",
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#333",
    padding: 14,
  },
  tarjetaIcon: { fontSize: 28, marginBottom: 8 },
  tarjetaTitulo: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  tarjetaDesc: { color: "#888", fontSize: 11, marginTop: 4 },
});
