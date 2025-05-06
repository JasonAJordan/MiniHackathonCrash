"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface InvestmentChartProps {
  data: Array<{
    year: number;
    value: number;
    invested: number;
  }>;
}

export default function InvestmentChart({ data }: InvestmentChartProps) {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="year" stroke="#888" label={{ value: "Years", position: "insideBottomRight", offset: -10, fill: "#888" }} />
          <YAxis 
            stroke="#888" 
            tickFormatter={formatCurrency} 
            label={{ 
              value: "Value ($)", 
              position: "insideBottomLeft", 
              offset: -5, 
              fill: "#888",
              angle: -90,
            }} 
          />
          <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]} contentStyle={{ backgroundColor: "#222", border: "1px solid #333", color: "#fff" }} />
          <Legend />
          <Line type="monotone" dataKey="invested" name="Total Invested" stroke="#0d9488" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: "#0d9488" }} />
          <Line type="monotone" dataKey="value" name="Portfolio Value" stroke="#22c55e" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: "#22c55e" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

