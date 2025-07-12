'use client';

import React from 'react';
import Plot from 'react-plotly.js';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { CustomTooltip } from './PrediccionClimatica';

interface DatoViento {
  mes: string;
  valor: number;
}

interface RosaVientoProps {
  datos: DatoViento[];
  datosDireccion: DatoViento[];
}

function calcularDominioDireccion(): [number, number] {
  return [0, 3];
}

const colores = {
  direccion: '#004d40',
};

export default function RosaViento({ datos, datosDireccion }: RosaVientoProps) {
  const grados = datos.map((d) => d.valor);
  const direcciones = grados.map((g) =>
    ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'][Math.round(g / 45) % 8]
  );

  const conteoDirecciones: Record<string, number> = {};
  direcciones.forEach((dir) => {
    conteoDirecciones[dir] = (conteoDirecciones[dir] || 0) + 1;
  });

  const sectores = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  const r = sectores.map((dir) => conteoDirecciones[dir] || 0);

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(37, 37, 37, 0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        maxWidth: '900px',
        margin: 'auto',
      }}
    >
      {/* 🌬️ Rosa de los Vientos */}
      <div>
        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>🧭 Rosa de los Vientos</h3>
        <Plot
          data={[
            {
              type: 'barpolar',
              r: r,
              theta: sectores,
              name: 'Frecuencia',
              marker: {
                color: '#2196f3',
                opacity: 0.7,
              },
            },
          ]}
          layout={{
            width: 300,
            height: 300,
            margin: { t: 30, b: 30, l: 30, r: 30 },
            paper_bgcolor: 'white',
            plot_bgcolor: 'white',
            polar: {
              angularaxis: { direction: 'clockwise', showline: true, linewidth: 1, linecolor: '#444' },
              radialaxis: {
                ticksuffix: ' veces',
                visible: true,
                showline: true,
                linecolor: '#444',
                linewidth: 1,
              },
            },
            showlegend: false,
          }}
          config={{ displayModeBar: false }}
        />
      </div>

      {/* 📈 Evolución mensual */}
      <div style={{ width: '360px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>📈 Evolución mensual</h3>
        <ResponsiveContainer width="100%" height={360}>
          <RadarChart data={datosDireccion} outerRadius="75%">
            <PolarGrid stroke="#333" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="mes"
              stroke="#000"
              tick={{ fill: '#000', fontSize: 12 }}
              tickLine={{ stroke: '#000' }}
            />
            <PolarRadiusAxis
              domain={calcularDominioDireccion()}
              tickFormatter={(t) => `${t}°`}
              stroke="#000"
              tick={{ fill: '#000' }}
              axisLine={{ stroke: '#000' }}
            />
            <Radar
              name="Dirección del viento"
              dataKey="valor"
              stroke={colores.direccion}
              strokeWidth={2}
              fill={colores.direccion}
              fillOpacity={0.6}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}
