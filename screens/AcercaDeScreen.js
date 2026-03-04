import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const MIS_DATOS = {
  nombre: "Jorge Joel Matos Jiménez",
  matricula: "2024-0177",
  carrera: "Desarrollo de Software Técnico",
  universidad: "ITLA — 2024/2026",
  email: "jorgejoel277@gmail.com",
  telefono: "+1 829 803 9915",

  foto: require("../assets/mifoto.jpg"),
};

const contactos = [
  {
    id: "1",
    icono: "mail-outline",
    label: "EMAIL",
    valor: MIS_DATOS.email,
    onPress: () => Linking.openURL(`mailto:${MIS_DATOS.email}`),
  },
  {
    id: "2",
    icono: "call-outline",
    label: "TELÉFONO",
    valor: MIS_DATOS.telefono,
    onPress: () => Linking.openURL(`tel:${MIS_DATOS.telefono}`),
  },
];

const skills = [
  "React Native (Basico)",
  "JavaScript",
  "HTML",
  "CSS",
  "Git",
  "SQL",
  "C#",
];

export default function AcercaDeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            typeof MIS_DATOS.foto === "string"
              ? { uri: MIS_DATOS.foto }
              : MIS_DATOS.foto
          }
          style={styles.foto}
        />
        <Text style={styles.nombre}>{MIS_DATOS.nombre}</Text>
        <Text style={styles.carrera}>{MIS_DATOS.carrera}</Text>
        <Text style={styles.universidad}>{MIS_DATOS.universidad}</Text>
        <View style={styles.matriculaBloque}>
          <Text style={styles.matriculaLabel}>MATRÍCULA </Text>
          <Text style={styles.matriculaValor}>{MIS_DATOS.matricula}</Text>
        </View>
      </View>

      <View style={styles.dividerRojo} />

      <View style={styles.seccion}>
        <Text style={styles.seccionTitulo}>CONTACTO</Text>
        {contactos.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.contactoFila}
            onPress={item.onPress}
          >
            <Ionicons
              name={item.icono}
              size={20}
              color="#E63946"
              style={{ marginRight: 14 }}
            />
            <View>
              <Text style={styles.contactoLabel}>{item.label}</Text>
              <Text style={styles.contactoValor}>{item.valor}</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color="#444"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.seccion}>
        <Text style={styles.seccionTitulo}>HABILIDADES</Text>
        <View style={styles.skillsContainer}>
          {skills.map((skill) => (
            <View key={skill} style={styles.skillBadge}>
              <Text style={styles.skillTexto}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.mensajeFinal}>
        <Text style={styles.mensajeTexto}>
          Desarrollador Junior con pasión por crear soluciones funcionales.
          Disponible para proyectos freelance y oportunidades laborales.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111" },
  header: {
    backgroundColor: "#1C1C1C",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  foto: {
    width: 110,
    height: 110,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E63946",
    marginBottom: 14,
  },
  nombre: { color: "#fff", fontSize: 20, fontWeight: "bold", letterSpacing: 1 },
  carrera: { color: "#E63946", fontSize: 13, marginTop: 4, fontWeight: "bold" },
  universidad: { color: "#888", fontSize: 12, marginTop: 2 },
  matriculaBloque: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#333",
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: "row",
  },
  matriculaLabel: { color: "#888", fontSize: 11, letterSpacing: 2 },
  matriculaValor: { color: "#fff", fontSize: 11, fontWeight: "bold" },
  dividerRojo: { height: 3, backgroundColor: "#E63946" },
  seccion: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  seccionTitulo: {
    color: "#E63946",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 3,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  contactoFila: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  contactoLabel: { color: "#888", fontSize: 10, letterSpacing: 2 },
  contactoValor: { color: "#ccc", fontSize: 13, marginTop: 2 },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
    gap: 8,
  },
  skillBadge: {
    backgroundColor: "#2A2A2A",
    borderWidth: 1,
    borderColor: "#E63946",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skillTexto: { color: "#ccc", fontSize: 12 },
  mensajeFinal: {
    margin: 16,
    marginBottom: 30,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#E63946",
    backgroundColor: "#1C1C1C",
  },
  mensajeTexto: {
    color: "#888",
    fontSize: 13,
    fontStyle: "italic",
    lineHeight: 22,
  },
});
