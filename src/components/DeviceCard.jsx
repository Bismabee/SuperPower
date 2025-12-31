import React from 'react'

/**
 * DeviceCard Component
 * Displays a device option with icon and name
 * Used for quick device selection
 */
const DeviceCard = ({ device, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        p-4 md:p-5 rounded-2xl border-4 transition-all touch-target
        ${
          isSelected
            ? 'border-primary bg-green-50 shadow-lg scale-105'
            : 'border-gray-200 bg-white hover:border-primary hover:shadow-md'
        }
      `}
    >
      <div className="text-4xl md:text-5xl mb-2">{device.icon}</div>
      <div className="text-sm md:text-base font-bold text-gray-800 leading-tight">
        {device.name}
      </div>
      <div className="text-xs md:text-sm text-gray-500 mt-1">{device.watts}W</div>
    </button>
  )
}

export default DeviceCard

