'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [favoriteCount, setFavoriteCount] = useState(0)

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoritePredictions')
    if (storedFavorites) {
      setFavoriteCount(JSON.parse(storedFavorites).length)
    }
  }, [])

  return (
    <footer className="bg-[#0A0A0A]/80 backdrop-blur-md border-t border-[#CCFF00]/20 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <nav className="flex justify-around md:justify-start space-x-4 mb-4 md:mb-0">
            <Link href="/" className="flex flex-col items-center text-[#CCFF00]">
              <i className="ri-home-line text-2xl mb-1"></i>
              <span className="text-xs">Home</span>
            </Link>
            <Link href="/statistics" className="flex flex-col items-center text-white/70 hover:text-[#CCFF00] transition-colors">
              <i className="ri-bar-chart-line text-2xl mb-1"></i>
              <span className="text-xs">Statistics</span>
            </Link>
            <Link href="/favorited" className="flex flex-col items-center text-white/70 hover:text-[#CCFF00] transition-colors">
              <i className="ri-star-line text-2xl mb-1"></i>
              <span className="text-xs">Favorited Stats</span>
            </Link>
            <Link href="/recent" className="flex flex-col items-center text-white/70 hover:text-[#CCFF00] transition-colors">
              <i className="ri-history-line text-2xl mb-1"></i>
              <span className="text-xs">Recent</span>
            </Link>
            <Link href="/settings" className="flex flex-col items-center text-white/70 hover:text-[#CCFF00] transition-colors">
              <i className="ri-settings-line text-2xl mb-1"></i>
              <span className="text-xs">Settings</span>
            </Link>
          </nav>
          <div className="text-[#CCFF00]">
            <span className="text-sm">Kedvencek száma: {favoriteCount}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

