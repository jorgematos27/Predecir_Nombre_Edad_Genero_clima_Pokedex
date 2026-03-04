import axios from "axios";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const API_KEY = "b945cb9680835c007d38464e21b2bbfd";
const CIUDAD = "Santo Domingo";
const PAIS = "DO";

const iconoClima = (codigo) => {
  if (codigo.startsWith("01")) return "☀️";
  if (codigo.startsWith("02")) return "⛅";
  if (codigo.startsWith("03") || codigo.startsWith("04")) return "☁️";
  if (codigo.startsWith("09") || codigo.startsWith("10")) return "🌧️";
  if (codigo.startsWith("11")) return "⛈️";
  if (codigo.startsWith("13")) return "❄️";
  return "🌫️";
};

export default function ClimaScreen() {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerClima = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CIUDAD},${PAIS}&appid=${API_KEY}&units=metric&lang=es`,
        );
        setClima(response.data);
      } catch (e) {
        setError("No se pudo obtener el clima. Verifica tu API key.");
      } finally {
        setCargando(false);
      }
    };
    obtenerClima();
  }, []);

  if (cargando)
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#E63946" />
        <Text style={styles.cargandoTexto}>Obteniendo clima...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.centrado}>
        <Text style={styles.error}>{error}</Text>
        <Text style={styles.errorHint}>
          Regístrate en openweathermap.org y reemplaza TU_API_KEY en el código
        </Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>CLIMA EN RD</Text>
      <Text style={styles.ciudad}>{clima?.name}, República Dominicana</Text>

      {clima && (
        <>
          <View style={styles.principal}>
            <Text style={styles.icono}>
              {iconoClima(clima.weather[0].icon)}
            </Text>
            <Text style={styles.temperatura}>
              {Math.round(clima.main.temp)}°C
            </Text>
            <Text style={styles.descripcion}>
              {clima.weather[0].description.toUpperCase()}
            </Text>
          </View>

          <View style={styles.detalles}>
            {[
              {
                label: "Sensación térmica",
                valor: `${Math.round(clima.main.feels_like)}°C`,
              },
              { label: "Humedad", valor: `${clima.main.humidity}%` },
              {
                label: "Temp. mínima",
                valor: `${Math.round(clima.main.temp_min)}°C`,
              },
              {
                label: "Temp. máxima",
                valor: `${Math.round(clima.main.temp_max)}°C`,
              },
              { label: "Viento", valor: `${clima.wind.speed} m/s` },
              {
                label: "Visibilidad",
                valor: `${(clima.visibility / 1000).toFixed(1)} km`,
              },
            ].map((item) => (
              <View key={item.label} style={styles.fila}>
                <Text style={styles.filaLabel}>{item.label}</Text>
                <Text style={styles.filaValor}>{item.valor}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 16 },
  centrado: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 4,
  },
  ciudad: { color: "#888", fontSize: 13, marginBottom: 20 },
  principal: {
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    padding: 30,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#E63946",
  },
  icono: { fontSize: 80 },
  temperatura: { color: "#fff", fontSize: 64, fontWeight: "bold" },
  descripcion: {
    color: "#E63946",
    fontSize: 14,
    letterSpacing: 2,
    marginTop: 8,
  },
  detalles: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  fila: {
    flexDirection: "row",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  filaLabel: { color: "#888", flex: 1, fontSize: 13 },
  filaValor: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  cargandoTexto: { color: "#888", marginTop: 12 },
  error: {
    color: "#E63946",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  errorHint: { color: "#666", fontSize: 12, textAlign: "center" },
});
