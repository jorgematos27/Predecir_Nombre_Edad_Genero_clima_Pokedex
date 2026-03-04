import axios from "axios";
import { Audio } from "expo-av";
import { useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function PokemonScreen() {
  const [nombre, setNombre] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [sonidoCargando, setSonidoCargando] = useState(false);

  const buscarPokemon = async () => {
    if (!nombre.trim()) {
      setError("Escribe un nombre de Pokémon");
      return;
    }
    setCargando(true);
    setError("");
    setPokemon(null);

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase().trim()}`,
      );
      setPokemon(response.data);
    } catch (e) {
      setError("Pokémon no encontrado. Verifica el nombre en inglés.");
    } finally {
      setCargando(false);
    }
  };

  const reproducirSonido = async () => {
    if (!pokemon?.cries?.latest) return;
    setSonidoCargando(true);
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: pokemon.cries.latest },
        { shouldPlay: true },
      );

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) sound.unloadAsync();
      });
    } catch (e) {
      console.log("Error reproduciendo sonido:", e);
    } finally {
      setSonidoCargando(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>POKÉDEX</Text>
      <Text style={styles.subtitulo}>
        Busca cualquier Pokémon por nombre en inglés
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: pikachu, charizard, mewtwo..."
        placeholderTextColor="#666"
        value={nombre}
        onChangeText={setNombre}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.boton} onPress={buscarPokemon}>
        <Text style={styles.botonTexto}>BUSCAR POKÉMON</Text>
      </TouchableOpacity>

      {cargando && (
        <ActivityIndicator
          size="large"
          color="#E63946"
          style={{ marginTop: 20 }}
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {pokemon && (
        <View style={styles.card}>
          <Image
            source={{
              uri: pokemon.sprites.other["official-artwork"].front_default,
            }}
            style={styles.imagen}
          />
          <Text style={styles.pokemonNombre}>{pokemon.name.toUpperCase()}</Text>
          <Text style={styles.pokemonId}>
            #{String(pokemon.id).padStart(3, "0")}
          </Text>

          <View style={styles.divider} />

          {/* TIPOS */}
          <Text style={styles.seccion}>TIPOS</Text>
          <View style={styles.tipos}>
            {pokemon.types.map((t) => (
              <View key={t.type.name} style={styles.tipoBadge}>
                <Text style={styles.tipoTexto}>
                  {t.type.name.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.seccion}>ESTADÍSTICAS</Text>
          <View style={styles.stats}>
            <View style={styles.statFila}>
              <Text style={styles.statLabel}>Experiencia base</Text>
              <Text style={styles.statValor}>{pokemon.base_experience} XP</Text>
            </View>
            <View style={styles.statFila}>
              <Text style={styles.statLabel}>Altura</Text>
              <Text style={styles.statValor}>{pokemon.height / 10} m</Text>
            </View>
            <View style={styles.statFila}>
              <Text style={styles.statLabel}>Peso</Text>
              <Text style={styles.statValor}>{pokemon.weight / 10} kg</Text>
            </View>
          </View>

          <Text style={styles.seccion}>HABILIDADES</Text>
          <View style={styles.habilidades}>
            {pokemon.abilities.map((a) => (
              <View key={a.ability.name} style={styles.habilidadBadge}>
                <Text style={styles.habilidadTexto}>{a.ability.name}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.sonidoBoton}
            onPress={reproducirSonido}
            disabled={sonidoCargando}
          >
            {sonidoCargando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.sonidoTexto}>REPRODUCIR SONIDO</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
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
  card: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    padding: 16,
    marginBottom: 20,
  },
  imagen: {
    width: 200,
    height: 200,
    alignSelf: "center",
    resizeMode: "contain",
  },
  pokemonNombre: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  pokemonId: {
    color: "#E63946",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 12,
  },
  divider: { height: 1, backgroundColor: "#333", marginVertical: 12 },
  seccion: {
    color: "#E63946",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 3,
    marginBottom: 8,
  },
  tipos: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  tipoBadge: {
    backgroundColor: "#2A2A2A",
    borderWidth: 1,
    borderColor: "#E63946",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tipoTexto: { color: "#fff", fontSize: 12 },
  stats: { marginBottom: 16 },
  statFila: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  statLabel: { color: "#888", fontSize: 13 },
  statValor: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  habilidades: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  habilidadBadge: {
    backgroundColor: "#2A2A2A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#333",
  },
  habilidadTexto: { color: "#ccc", fontSize: 12 },
  sonidoBoton: {
    backgroundColor: "#E63946",
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  sonidoTexto: { color: "#fff", fontWeight: "bold", letterSpacing: 2 },
});
