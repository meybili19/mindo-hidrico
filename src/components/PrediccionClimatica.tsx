'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LineChart, Line, AreaChart, Area,
    TooltipProps,
    XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';

import styles from '../../styles/Prediccion.module.css';

interface CustomTooltipProps extends Partial<TooltipProps<number, string>> {
    payload?: { value?: number }[];  
    label?: string;
}

const variables = {
    precipitacion: "☔ Precipitación",
    temperatura: "🌡️ Temperatura",
    viento: "🍃 Velocidad del viento",
    direccion: "🧭 Dirección del viento"
} as const;

type VariableType = keyof typeof variables;

const interpretacion = (
    v: VariableType,
    mes: string,
    valor: number,
    unidad: string,
    confianza: number
) => {
    const iconoConfianza = confianza >= 85 ? "🟢 Confianza alta" : confianza >= 60 ? "🟡 Confianza media" : "🔴 Confianza baja";

    switch (v) {
        case "precipitacion":
            return valor > 150
                ? `¡En ${mes} lloverá mucho! ☔ ¡Prepara tus botas! (${iconoConfianza} - ${confianza}%)`
                : valor < 50
                    ? `En ${mes} casi no lloverá. (${iconoConfianza} - ${confianza}%)`
                    : `Lluvia moderada en ${mes}. (${iconoConfianza} - ${confianza}%)`;
        case "temperatura":
            return valor > 25
                ? `¡En ${mes} hará más calor! 🔥 (${iconoConfianza} - ${confianza}%)`
                : `Temperatura suave en ${mes}. (${iconoConfianza} - ${confianza}%)`;
        case "viento":
            return valor > 3
                ? `¡Vientos fuertes en ${mes}! 🍃 (${iconoConfianza} - ${confianza}%)`
                : `Viento suave en ${mes}. (${iconoConfianza} - ${confianza}%)`;
        case "direccion":
            return `En ${mes}, el viento vendrá de ${Math.round(valor)}°. ¡Como una visita del volcán! (${iconoConfianza} - ${confianza}%)`;
        default:
            return "";
    }
};

// Convierte grados a dirección cardinal (8 puntos)
function gradosADireccion(deg: number): string {
    if (deg === null || deg === undefined) return "";
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
}

// Tooltip personalizado para variable "direccion"
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length && label) {
        const valorGrados = payload[0].value as number;
        const direccionCardinal = gradosADireccion(valorGrados);
        return (
            <div style={{ backgroundColor: '#fff', padding: '8px', border: '1px solid #ccc' }}>
                <p><strong>{label}</strong></p>
                <p>Grados: {valorGrados.toFixed(1)}°</p>
                <p>Dirección: {direccionCardinal}</p>
            </div>
        );
    }
    return null;
};

export default function PrediccionClimatica() {
    const [variable, setVariable] = useState<VariableType>("precipitacion");
    const [meses, setMeses] = useState(3);
    const [datos, setDatos] = useState<any[]>([]);
    const [unidad, setUnidad] = useState("");

    useEffect(() => {
        setDatos([]);
        setUnidad("");
    }, [variable]);

    const obtenerPredicciones = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/predicciones", {
                params: { variable, meses }
            });
            setDatos(res.data.predicciones);
            setUnidad(res.data.unidad);
        } catch (err) {
            alert("Error al obtener predicciones");
        }
    };

    const limpiarPredicciones = () => {
        setDatos([]);
        setUnidad("");
    };

    const colores: Record<VariableType, string> = {
        precipitacion: "#1e90ff",
        temperatura: "#ff7300",
        viento: "#ff7300",
        direccion: "#034d5f"
    };

    // Ajustar dominio dinámico para eje Y variable "direccion"
    const calcularDominioDireccion = () => {
        if (datos.length === 0) return [0, 360];

        const valores = datos
            .map(d => d.valor as number)
            .filter(v => v !== null && v !== undefined);

        if (valores.length === 0) return [0, 360];

        const minValor = Math.min(...valores);
        const maxValor = Math.max(...valores);

        // Si rango es muy pequeño, poner mínimo rango para que se vea bien
        if (maxValor - minValor < 10) {
            // Por ejemplo ±5 grados para evitar escala muy estrecha
            const minDominio = Math.max(0, minValor - 5);
            const maxDominio = Math.min(360, maxValor + 5);
            return [minDominio, maxDominio];
        }

        // Si rango amplio, añadir margen ±10 grados
        const minDominio = Math.max(0, minValor - 10);
        const maxDominio = Math.min(360, maxValor + 10);

        return [minDominio, maxDominio];
    };
    const renderGrafico = () => {
        switch (variable) {
            case "precipitacion":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={datos}>
                            <defs>
                                <linearGradient id="colorPrecip" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colores.precipitacion} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={colores.precipitacion} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="mes" />
                            <YAxis unit={unidad} />
                            <Tooltip />
                            <CartesianGrid stroke="#ccc" />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="valor"
                                stroke={colores.precipitacion}
                                fill="url(#colorPrecip)"
                                name={variables.precipitacion}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                );
            case "temperatura":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={datos}>
                            <defs>
                                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#0000ff" stopOpacity={0.8} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="mes" />
                            <YAxis unit={unidad} />
                            <Tooltip />
                            <CartesianGrid stroke="#ccc" />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="valor"
                                stroke="#ff0000"
                                fill="url(#colorTemp)"
                                name={variables.temperatura}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                );
            case "viento":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={datos}>
                            <XAxis dataKey="mes" />
                            <YAxis unit={unidad} />
                            <Tooltip />
                            <CartesianGrid stroke="#ccc" />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="valor"
                                stroke={colores.viento}
                                strokeWidth={2}      // <-- Aquí
                                name={variables.viento}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                );

            case "direccion":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={datos}>
                            <XAxis dataKey="mes" />
                            <YAxis
                                domain={calcularDominioDireccion()}
                                tickCount={9}
                                tickFormatter={(tick) => `${tick}°`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <CartesianGrid stroke="#ccc" />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="valor"
                                stroke={colores.direccion}
                                strokeWidth={2}      // <-- Y aquí también
                                name={variables.direccion}
                                dot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '12px' }}>
            <h2>📦 Elige qué quieres predecir:</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                {Object.entries(variables).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setVariable(key as VariableType)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: variable === key ? '#0070f3' : '#e0e0e0',
                            color: variable === key ? '#fff' : '#000',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <h3>📅 ¿Cuántos meses quieres predecir?</h3>
            {[1, 3, 6, 9, 12].map(n => (
                <button
                    key={n}
                    onClick={() => setMeses(n)}
                    style={{
                        marginRight: '10px',
                        padding: '6px 12px',
                        backgroundColor: meses === n ? '#34d399' : '#f3f4f6',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        cursor: 'pointer'
                    }}
                >
                    {n}
                </button>
            ))}

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button
                    onClick={obtenerPredicciones}
                    style={{
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    🔮 Ver predicción
                </button>
                <button
                    onClick={limpiarPredicciones}
                    style={{
                        backgroundColor: '#ef4444',
                        color: '#fff',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    🧹 Limpiar predicciones
                </button>
            </div>


            {datos.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                    <h3>📊 Predicción para los próximos {meses} meses:</h3>
                    {renderGrafico()}

                    <ul style={{ marginTop: '20px' }}>
                        {datos.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '8px', fontSize: '16px' }}>
                                {interpretacion(variable, item.mes, item.valor, item.unidad, item.confianza)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
