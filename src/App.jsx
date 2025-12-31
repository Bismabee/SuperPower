import { useState } from 'react'
import DeviceCard from './components/DeviceCard'

// Electricity rate in INR per unit (kWh)
const RATE_PER_UNIT = 6

// Common devices with typical power consumption
const COMMON_DEVICES = [
  { name: 'Bulb', watts: 10, icon: '💡' },
  { name: 'Fan', watts: 75, icon: '🌀' },
  { name: 'Heater', watts: 2000, icon: '🔥' },
  { name: 'Charger', watts: 20, icon: '🔌' },
  { name: 'Fridge', watts: 150, icon: '❄️' },
  { name: 'TV', watts: 100, icon: '📺' },
  { name: 'Washing Machine', watts: 500, icon: '🌊' },
  { name: 'AC', watts: 1500, icon: '❄️' },
]

function App() {
  // State management for calculator inputs
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [customWatts, setCustomWatts] = useState('')
  const [hoursPerDay, setHoursPerDay] = useState('')
  const [showResults, setShowResults] = useState(false)

  // Calculation logic
  const calculateCost = () => {
    const watts = selectedDevice ? selectedDevice.watts : parseFloat(customWatts)
    const hours = parseFloat(hoursPerDay)

    if (!watts || !hours || hours <= 0 || watts <= 0) {
      return null
    }

    // Units per day = (Watts × Hours) / 1000
    const unitsPerDay = (watts * hours) / 1000

    // Monthly units = Units per day × 30
    const unitsPerMonth = unitsPerDay * 30

    // Cost calculation
    const costPerDay = unitsPerDay * RATE_PER_UNIT
    const costPerMonth = unitsPerMonth * RATE_PER_UNIT

    return {
      unitsPerDay: unitsPerDay.toFixed(2),
      unitsPerMonth: unitsPerMonth.toFixed(2),
      costPerDay: costPerDay.toFixed(2),
      costPerMonth: costPerMonth.toFixed(2),
      watts,
      hours,
    }
  }

  const result = showResults ? calculateCost() : null

  // Reset calculator
  const handleReset = () => {
    setSelectedDevice(null)
    setCustomWatts('')
    setHoursPerDay('')
    setShowResults(false)
  }

  // Handle device selection
  const handleDeviceSelect = (device) => {
    setSelectedDevice(device)
    setCustomWatts('') // Clear custom watts when device is selected
  }

  // Handle calculate button click
  const handleCalculate = () => {
    if ((selectedDevice || customWatts) && hoursPerDay) {
      setShowResults(true)
    }
  }

  return (
    <div className="min-h-screen py-6 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
            ⚡ Electricity Cost Calculator
          </h1>
          <p className="text-center text-lg md:text-xl text-gray-600">
            Know your electricity bill in advance
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
          {!showResults ? (
            <>
              {/* Step 1: Select Device */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  1. Select Device
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {COMMON_DEVICES.map((device, index) => (
                    <DeviceCard
                      key={index}
                      device={device}
                      isSelected={selectedDevice?.name === device.name}
                      onClick={() => handleDeviceSelect(device)}
                    />
                  ))}
                </div>
              </div>

              {/* Custom Device Input */}
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  Or Enter Custom Watts
                </h2>
                <input
                  type="number"
                  value={customWatts}
                  onChange={(e) => {
                    setCustomWatts(e.target.value)
                    setSelectedDevice(null)
                  }}
                  placeholder="e.g. 100"
                  className="w-full text-2xl md:text-3xl p-4 md:p-6 border-4 border-gray-300 rounded-2xl focus:border-primary focus:outline-none text-center font-bold touch-target"
                />
                <p className="text-center text-sm md:text-base text-gray-500 mt-2">
                  Check the device label or manual
                </p>
              </div>

              {/* Step 2: Hours Per Day */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  2. Hours Per Day?
                </h2>
                <input
                  type="number"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full text-2xl md:text-3xl p-4 md:p-6 border-4 border-gray-300 rounded-2xl focus:border-primary focus:outline-none text-center font-bold touch-target"
                />
                <p className="text-center text-sm md:text-base text-gray-500 mt-2">
                  How many hours will you use it daily?
                </p>

                {/* Quick Hour Buttons */}
                <div className="grid grid-cols-4 gap-2 md:gap-3 mt-4">
                  {[1, 2, 5, 10].map((hours) => (
                    <button
                      key={hours}
                      onClick={() => setHoursPerDay(hours.toString())}
                      className="bg-gray-100 hover:bg-primary hover:text-white text-gray-800 font-bold py-3 md:py-4 px-4 rounded-xl text-lg md:text-xl transition-colors touch-target"
                    >
                      {hours}h
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                disabled={!(selectedDevice || customWatts) || !hoursPerDay}
                className="w-full bg-primary hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-5 md:py-6 px-6 rounded-2xl text-2xl md:text-3xl transition-colors shadow-lg disabled:cursor-not-allowed touch-target"
              >
                {!(selectedDevice || customWatts) || !hoursPerDay
                  ? '⚠️ Please Fill All Fields'
                  : '🧮 Calculate Cost'}
              </button>
            </>
          ) : (
            <>
              {/* Results Display */}
              {result && (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      📊 Your Electricity Cost
                    </h2>
                  </div>

                  {/* Device Info */}
                  <div className="bg-blue-50 rounded-2xl p-4 md:p-6 mb-6">
                    <div className="text-center">
                      <p className="text-lg md:text-xl text-gray-700 mb-2">
                        {selectedDevice ? (
                          <span className="text-3xl md:text-4xl">{selectedDevice.icon}</span>
                        ) : (
                          <span className="text-3xl md:text-4xl">🔌</span>
                        )}
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-gray-800">
                        {selectedDevice ? selectedDevice.name : 'Custom Device'}
                      </p>
                      <p className="text-lg md:text-xl text-gray-600 mt-2">
                        {result.watts} Watts × {result.hours} Hours
                      </p>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-4 mb-6">
                    {/* Daily Cost */}
                    <div className="bg-green-50 rounded-2xl p-5 md:p-6">
                      <p className="text-lg md:text-xl text-gray-600 mb-2">Daily Cost</p>
                      <p className="text-4xl md:text-5xl font-bold text-green-600">
                        ₹{result.costPerDay}
                      </p>
                      <p className="text-sm md:text-base text-gray-500 mt-2">
                        ({result.unitsPerDay} units)
                      </p>
                    </div>

                    {/* Monthly Cost */}
                    <div className="bg-purple-50 rounded-2xl p-5 md:p-6">
                      <p className="text-lg md:text-xl text-gray-600 mb-2">Monthly Cost</p>
                      <p className="text-4xl md:text-5xl font-bold text-purple-600">
                        ₹{result.costPerMonth}
                      </p>
                      <p className="text-sm md:text-base text-gray-500 mt-2">
                        ({result.unitsPerMonth} units)
                      </p>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 md:p-5 mb-6">
                    <p className="text-base md:text-lg text-gray-700 text-center">
                      💡 <strong>Rate:</strong> ₹{RATE_PER_UNIT} per unit (kWh)
                    </p>
                  </div>

                  {/* Reset Button */}
                  <button
                    onClick={handleReset}
                    className="w-full bg-secondary hover:bg-blue-600 text-white font-bold py-5 md:py-6 px-6 rounded-2xl text-xl md:text-2xl transition-colors shadow-lg touch-target"
                  >
                    🔄 Calculate Again
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white">
          <p className="text-sm md:text-base opacity-90">
            Don't fear electricity bills, use them wisely 💪
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

