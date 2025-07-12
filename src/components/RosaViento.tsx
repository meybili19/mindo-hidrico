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
import { CustomTooltip } from './PrediccionClimatica'; // Asegúrate de exportarlo allá

interface DatoViento {
  mes: string;
  valor: number;
}

interface RosaVientoProps {
  datos: DatoViento[];
  datosDireccion: DatoViento[];
}

// Puedes ajustar el dominio según tus datos
function calcularDominioDireccion(): [number, number] {
  return [0, 360];
}

const colores = {
  direccion: '#004d40',
};

export default function RosaViento({ datos, datosDireccion }: RosaVientoProps) {
  // Preparamos los datos para el gráfico de la rosa de los vientos (Plotly)
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
    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
      {/* 🌬️ Rosa de los Vientos */}
      <div>
        <h3>🧭 Rosa de los Vientos</h3>
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
            polar: {
              angularaxis: { direction: 'clockwise' },
              radialaxis: {
                ticksuffix: ' veces',
                visible: true,
              },
            },
            showlegend: false,
            title: {
              text: '',
            },
          }}
          config={{ displayModeBar: false }}
        />
      </div>

      {/* 📈 Evolución mensual (RadarChart) */}
      <div>
        <h3>📈 Evolución mensual</h3>
        <ResponsiveContainer width={300} height={300}>
          <RadarChart data={datosDireccion} outerRadius="70%">
            <PolarGrid />
            <PolarAngleAxis dataKey="mes" />
            <PolarRadiusAxis
              domain={calcularDominioDireccion()}
              tickFormatter={(t) => `${t}°`}
            />
            <Radar
              name="Dirección del viento"
              dataKey="valor"
              stroke={colores.direccion}
              fill={colores.direccion}
              fillOpacity={0.6}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
