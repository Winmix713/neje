'use client'

import { useState } from 'react'
import MatchSelection from './MatchSelection'
import PredictionResults from './PredictionResults'
import Statistics from './Statistics'

export default function MainContent() {
  const [activeTab, setActiveTab] = useState('matchSelection')
  const [predictions, setPredictions] = useState([])

  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      {activeTab === 'matchSelection' && (
        <MatchSelection onPredictionsGenerated={(newPredictions) => {
          setPredictions(newPredictions)
          setActiveTab('predictionResults')
        }} />
      )}
      {activeTab === 'predictionResults' && (
        <PredictionResults predictions={predictions} />
      )}
      {activeTab === 'statistics' && (
        <Statistics predictions={predictions} />
      )}
    </main>
  )
}

