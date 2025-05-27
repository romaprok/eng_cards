import React from 'react'
import { motion } from 'framer-motion'
import { getPerformanceStats } from '@/utils/spacedRepetition'
import type { Card } from '@/types/playlist'

interface PerformanceStatsProps {
  cards: Card[]
}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({ cards }) => {
  // Ensure all cards have SM-2 properties for stats calculation
  const migratedCards = cards.map(card => ({
    ...card,
    easeFactor: card.easeFactor ?? 2.5,
    interval: card.interval ?? 0,
    repetitions: card.repetitions ?? 0,
    totalReviews: card.totalReviews ?? 0,
    correctReviews: card.correctReviews ?? 0,
    successRate: card.successRate ?? 0,
  }))

  const stats = getPerformanceStats(migratedCards)

  if (cards.length === 0) return null

  const statItems = [
    {
      label: 'Total Cards',
      value: stats.totalCards,
      color: 'bg-gray-100 text-gray-700',
      icon: '📚',
    },
    {
      label: 'New',
      value: stats.newCards,
      color: 'bg-gray-100 text-gray-600',
      icon: '🆕',
    },
    {
      label: 'Learning',
      value: stats.learningCards,
      color: 'bg-blue-100 text-blue-600',
      icon: '📖',
    },
    {
      label: 'Mastered',
      value: stats.masteredCards,
      color: 'bg-green-100 text-green-600',
      icon: '🎯',
    },
    {
      label: 'Due for Review',
      value: stats.dueCards,
      color: 'bg-orange-100 text-orange-600',
      icon: '⏰',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Learning Progress</h3>
        {stats.totalReviews > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Success Rate:</span>
            <span className="text-lg font-bold text-green-600">{stats.overallSuccessRate}%</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={`${item.color} rounded-lg p-4 text-center`}
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="text-2xl font-bold mb-1">{item.value}</div>
            <div className="text-sm font-medium">{item.label}</div>
          </motion.div>
        ))}
      </div>

      {stats.totalReviews > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
            <span>Total Reviews: {stats.totalReviews}</span>
            <span>•</span>
            <span>
              Accuracy:{' '}
              {stats.totalReviews > 0
                ? Math.round((stats.overallSuccessRate / 100) * stats.totalReviews)
                : 0}{' '}
              / {stats.totalReviews}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default PerformanceStats
