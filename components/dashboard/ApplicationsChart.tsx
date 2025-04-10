"use client";

import { useEffect, useRef } from 'react';

type ChartProps = {
  data: {
    labels: string[];
    values: number[];
    colors: string[];
  };
};

export default function ApplicationsChart({ data }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Set dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const radius = Math.min(width, height) / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate total for percentages
    const total = data.values.reduce((sum, value) => sum + value, 0);
    
    // Draw pie chart
    let startAngle = 0;
    
    data.values.forEach((value, index) => {
      if (value === 0) return; // Skip zero values
      
      const sliceAngle = (2 * Math.PI * value) / total;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      ctx.fillStyle = data.colors[index];
      ctx.fill();
      
      // Add labels if there's enough space
      if (sliceAngle > 0.2) {
        const labelAngle = startAngle + sliceAngle / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${Math.round((value / total) * 100)}%`, labelX, labelY);
      }
      
      startAngle += sliceAngle;
    });
    
    // Draw center circle for donut chart
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    
    // Add total in center
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total.toString(), centerX, centerY);
    
  }, [data]);

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        width={200} 
        height={200}
        className="mx-auto"
      />
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.labels.map((label, index) => (
          data.values[index] > 0 ? (
            <div key={index} className="flex items-center text-sm">
              <span 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: data.colors[index] }}
              />
              <span>{label} ({data.values[index]})</span>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
}