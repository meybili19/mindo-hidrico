'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LineChart, Line, AreaChart, Area,
    TooltipProps,
    XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import dynamic from 'next/dynamic';
import styles from '../styles/Prediccion.module.css';

interface CustomTooltipProps extends Partial<TooltipProps<number, string>> {
    payload?: { value?: number }[];
    label?: string;
}

const RosaViento = dynamic(() => import('./RosaViento'), {
    ssr: false
});

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
    probabilidad: number
) => {
    const porcentaje = `${probabilidad}%`;

    switch (v) {
        case "precipitacion":
            if (valor > 150)
                return `En ${mes} podrían caer muchas lluvias. ☔ Probabilidad: ${porcentaje}`;
            else if (valor < 50)
                return `En ${mes} casi no llovería. 🌤️ Probabilidad: ${porcentaje}`;
            else
                return `Lluvias normales en ${mes}. 🌦️ Probabilidad: ${porcentaje}`;

        case "temperatura":
            if (valor > 26)
                return `¡Calorcito en ${mes}! 🌞 Temperatura mayor a ${valor.toFixed(1)}°${unidad}. Probabilidad: ${porcentaje}`;
            else if (valor < 18)
                return `Será fresco en ${mes}, como para usar suéter. ❄️ Temperatura: ${valor.toFixed(1)}°${unidad}. Probabilidad: ${porcentaje}`;
            else
                return `Temperatura templada en ${mes}. 🌤️ ${valor.toFixed(1)}°${unidad}. Probabilidad: ${porcentaje}`;

        case "viento":
            if (valor > 3)
                return `Vientos fuertes podrían soplar en ${mes}. 🍃 Velocidad: ${valor.toFixed(1)}${unidad}. Probabilidad: ${porcentaje}`;
            else
                return `Poco viento en ${mes}, ideal para jugar afuera. 🎈 Probabilidad: ${porcentaje}`;

        case "direccion":
            const direccionCardinal = gradosADireccion(valor);
            return `En ${mes}, 💨 el viento soplaría desde el ${direccionCardinal} (${valor.toFixed(1)}°). Probabilidad: ${porcentaje}`;

        default:
            return "";
    }
};

export function gradosADireccion(deg: number): string {
    if (deg === null || deg === undefined) return "";
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
}

export const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
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
                                strokeWidth={2}
                                name={variables.viento}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case "direccion":
                const datosDireccion = datos.map(d => ({ mes: d.mes, valor: d.valor }));
                return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <RosaViento datos={datos} datosDireccion={datosDireccion} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.fullContent}>
            <h2 className={styles.tituloPrincipal}>📦 Elige qué quieres predecir:
            </h2>
            <div className={styles.variableButtons}>
                {Object.entries(variables).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setVariable(key as VariableType)}
                        className={`${styles.variableButton} ${variable === key ? styles.active : ''}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <h3>📅 ¿Cuántos meses quieres predecir?</h3>
            <div className={styles.monthButtons}>
                {[1, 3, 6, 9, 12].map(n => (
                    <button
                        key={n}
                        onClick={() => setMeses(n)}
                        className={`${styles.monthButton} ${meses === n ? styles.active : ''}`}
                    >
                        {n}
                    </button>
                ))}
            </div>

            <div className={styles.actionButtons}>
                <button onClick={obtenerPredicciones} className={styles.predictButton}>
                    🔮 Ver predicción
                </button>
                <button onClick={limpiarPredicciones} className={styles.clearButton}>
                    🧹 Limpiar predicciones
                </button>
            </div>

            {datos.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                    <h3>📊 Predicción para los próximos {meses} meses:</h3>
                    {renderGrafico()}
                    <ul className={styles.predictionList}>
                        {datos.map((item, idx) => (
                            <li key={idx} className={styles.predictionItem}>
                                {interpretacion(variable, item.mes, item.valor, item.unidad, item.confianza)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
