'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface StatisticsProps {
  predictions: any[]
}

export default function Statistics({ predictions }: StatisticsProps) {
  const predictionScoreChartRef = useRef<HTMLCanvasElement>(null)
  const goalsDistributionChartRef = useRef<HTMLCanvasElement>(null)
  const formIndexTrendChartRef = useRef<HTMLCanvasElement>(null)
  const resultDistributionChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (predictions.length === 0) return

    const createChart = (canvasRef: React.RefObject<HTMLCanvasElement>, config: any) => {
      const ctx = canvasRef.current?.getContext('2d')
      if (ctx) {
        new Chart(ctx, config)
      }
    }

    // Prediction Score Distribution Chart
    createChart(predictionScoreChartRef, {
      type: 'bar',
      data: {
        labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
        datasets: [{
          label: 'Prediction Score Distribution',
          data: [0, 0, 0, 0, 0], // Replace with actual data
          backgroundColor: 'rgba(204, 255, 0, 0.6)',
          borderColor: 'rgba(204, 255, 0, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: 'white' }
          },
          x: {
            ticks: { color: 'white' }
          }
        },
        plugins: {
          legend: {
            labels: { color: 'white' }
          }
        }
      }
    })

    // Create other charts (Goals Distribution, Form Index Trend, Result Distribution) similarly

  }, [predictions])

  return (
    <div className="bg-[#141414]/50 backdrop-blur-md border border-[#CCFF00]/20 rounded-2xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-[#CCFF00]">Részletes Statisztikák</h2>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold mb-4">Predikciós pontszámok eloszlása</h3>
          <canvas ref={predictionScoreChartRef}></canvas>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Gólok eloszlása</h3>
          <canvas ref={goalsDistributionChartRef}></canvas>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Forma index trend</h3>
          <canvas ref={formIndexTrendChartRef}></canvas>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Eredmények megoszlása</h3>
          <canvas ref={resultDistributionChartRef}></canvas>
        </div>
      </div>
    </div>
  )
}

