'use client'

import { useState } from 'react'

interface PredictionResultsProps {
  predictions: any[]
}

export default function PredictionResults({ predictions }: PredictionResultsProps) {
  const [sortBy, setSortBy] = useState('predictionScore')

  const sortedPredictions = [...predictions].sort((a, b) => {
    if (sortBy === 'predictionScore') {
      return (b.teamAnalysis.predictionScore || 0) - (a.teamAnalysis.predictionScore || 0)
    }
    if (sortBy === 'averageGoals') {
      return (b.teamAnalysis.average_goals.average_total_goals || 0) - (a.teamAnalysis.average_goals.average_total_goals || 0)
    }
    if (sortBy === 'btts') {
      return (b.teamAnalysis.both_teams_scored_percentage || 0) - (a.teamAnalysis.both_teams_scored_percentage || 0)
    }
    return 0
  })

  return (
    <div className="bg-[#141414]/50 backdrop-blur-md border border-[#CCFF00]/20 rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-[#CCFF00]">Predikciók eredménye</h2>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="sortPredictions" className="mr-2">Rendezés:</label>
          <select
            id="sortPredictions"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#141414] border border-[#CCFF00]/20 rounded-md text-white p-2"
          >
            <option value="predictionScore">Predikciós pontszám</option>
            <option value="averageGoals">Átlagos gólszám</option>
            <option value="btts">Mindkét csapat szerez gólt %</option>
          </select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedPredictions.map((prediction, index) => (
          <div key={index} className="bg-[#1A1A1A]/50 p-4 rounded-xl">
            {/* Render prediction details here */}
            <h3 className="text-lg font-semibold mb-2">{prediction.match.homeTeam.name} vs {prediction.match.awayTeam.name}</h3>
            <p>Prediction Score: {prediction.teamAnalysis.predictionScore?.toFixed(2)}</p>
            {/* Add more prediction details as needed */}
            <p>Average Goals: {prediction.teamAnalysis.average_goals.average_total_goals.toFixed(2)}</p>
            <p>Both Teams Scored %: {prediction.teamAnalysis.both_teams_scored_percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}

