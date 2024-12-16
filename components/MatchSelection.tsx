'use client'

import { useState, useEffect } from 'react'
import { TEAMS, MATCH_SLOTS } from '@/lib/constants'

interface MatchSelectionProps {
  onPredictionsGenerated: (predictions: any[]) => void
}

export default function MatchSelection({ onPredictionsGenerated }: MatchSelectionProps) {
  const [selectedMatches, setSelectedMatches] = useState(Array(MATCH_SLOTS).fill(null).map(() => ({ homeTeam: null, awayTeam: null })))
  const [timeLeft, setTimeLeft] = useState(375)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleTeamSelect = (index: number, position: 'home' | 'away', teamId: string) => {
    const team = TEAMS.find(t => t.id === teamId)
    setSelectedMatches(prevMatches => {
      const newMatches = [...prevMatches]
      newMatches[index] = {
        ...newMatches[index],
        [position === 'home' ? 'homeTeam' : 'awayTeam']: team || null
      }
      return newMatches
    })
  }

  const runPredictions = async () => {
    // Implement prediction logic here
    const predictions = [] // Replace with actual predictions
    onPredictionsGenerated(predictions)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[#CCFF00]">Mérkőzések kiválasztása</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {selectedMatches.map((match, index) => (
          <div key={index} className="bg-white/5 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <select
                value={match.homeTeam?.id || ''}
                onChange={(e) => handleTeamSelect(index, 'home', e.target.value)}
                className="w-full p-2 bg-[#141414] border border-[#CCFF00]/20 rounded-md text-white"
              >
                <option value="">Válassz hazai csapatot</option>
                {TEAMS.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <select
                value={match.awayTeam?.id || ''}
                onChange={(e) => handleTeamSelect(index, 'away', e.target.value)}
                className="w-full p-2 bg-[#141414] border border-[#CCFF00]/20 rounded-md text-white"
              >
                <option value="">Válassz vendég csapatot</option>
                {TEAMS.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={runPredictions}
        disabled={!selectedMatches.some(match => match?.homeTeam && match?.awayTeam) || timeLeft <= 0}
        className="w-full mt-6 py-3 bg-[#CCFF00] text-black font-bold rounded-md hover:bg-[#CCFF00]/90 transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        Predikciók futtatása
      </button>
      <div className="fixed top-4 right-4 bg-[#CCFF00] text-black px-4 py-2 rounded-md font-bold">
        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
    </div>
  )
}

