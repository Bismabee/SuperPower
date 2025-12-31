import { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  Thermometer, 
  Wind, 
  Tv, 
  Smartphone, 
  Zap, 
  Coffee, 
  Shirt, 
  Flame,
  Info,
  Settings,
  X,
  SlidersHorizontal,
  Box,
  Droplets,
  Eye
} from 'lucide-react';
import SplashScreen from './components/SplashScreen';

// --- Configuration & Presets ---
// Common wattages based on typical usage
const DEVICE_PRESETS = [
  // Custom option at the beginning
  { id: 'custom', name: 'Custom Device', watts: 0, icon: SlidersHorizontal },
  { id: 'bulb', name: 'LED Bulb', watts: 9, icon: Lightbulb },
  { id: 'tube', name: 'Tube Light', watts: 20, icon: Zap },
  { id: 'fan', name: 'Ceiling Fan', watts: 75, icon: Wind },
  { id: 'tv', name: 'LED TV', watts: 50, icon: Tv },
  { id: 'charger', name: 'Phone Charger', watts: 10, icon: Smartphone },
  { id: 'blanket', name: 'Elec. Blanket', watts: 200, icon: Shirt }, 
  { id: 'heater_s', name: 'Small Heater', watts: 1000, icon: Flame },
  { id: 'heater_l', name: 'Blow Heater', watts: 2000, icon: Thermometer },
  { id: 'rice', name: 'Rice Cooker', watts: 700, icon: Coffee },
  { id: 'fridge', name: 'Refrigerator', watts: 150, icon: Box },
  { id: 'iron', name: 'Iron', watts: 1000, icon: Shirt },
  { id: 'geyser', name: 'Geyser', watts: 2000, icon: Droplets },
];

export default function App() {
  // --- Splash Screen State ---
  const [showSplash, setShowSplash] = useState(true);

  // --- State ---
  const [watts, setWatts] = useState(2000); // Default to a heater
  const [hours, setHours] = useState(4);
  const [rate, setRate] = useState(6.0); // Default rate
  const [selectedDevice, setSelectedDevice] = useState('heater_l');
  const [showSettings, setShowSettings] = useState(false);
  const [helpDialog, setHelpDialog] = useState(null); // 'rate', 'watts', 'hours', or null

  // --- Splash Screen Timer ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // --- Calculations ---
  // Formula: (Watts * Hours) / 1000 = Units (kWh)
  const unitsPerDay = (watts * hours) / 1000;
  const costPerDay = unitsPerDay * rate;
  const costPerMonth = costPerDay * 30;

  // --- Handlers ---
  const handleDeviceSelect = (device) => {
    // If Custom is clicked, just set the mode, don't change the watts
    if (device.id === 'custom') {
      setSelectedDevice('custom');
      return;
    }
    setWatts(device.watts);
    setSelectedDevice(device.id);
  };

  const handleWattsChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    setWatts(val);
    setSelectedDevice('custom');
  };

  // --- Visual Logic ---
  // Determine color urgency based on daily cost
  let costColor = "text-emerald-600";
  let costBg = "bg-emerald-50";
  if (costPerDay > 50) {
    costColor = "text-orange-600";
    costBg = "bg-orange-50";
  }
  if (costPerDay > 100) {
    costColor = "text-red-600";
    costBg = "bg-red-50";
  }

  // Show splash screen for first 3 seconds
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-10">
      
      {/* --- Header --- */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-2 rounded-lg text-white">
              <Zap size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">SuperPower</h1>
              <p className="text-xs text-slate-500">Electricity Calculator</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors"
          >
            {showSettings ? <X size={20} /> : <Settings size={20} />}
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">

        {/* --- Settings (Collapsible) --- */}
        {showSettings && (
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 animate-in slide-in-from-top-4 duration-300">
            <h3 className="font-semibold text-sm text-slate-500 mb-3 uppercase tracking-wider">Settings</h3>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Electricity Rate (₹/unit)</label>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button 
                  onClick={() => setRate(r => Math.max(0, parseFloat((r - 0.5).toFixed(2))))}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-slate-700 font-bold"
                >-</button>
                <input 
                  type="number" 
                  step="0.01"
                  value={rate.toFixed(2)}
                  onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                  className="w-14 text-center bg-transparent font-bold outline-none"
                />
                <button 
                  onClick={() => setRate(r => parseFloat((r + 0.5).toFixed(2)))}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-slate-700 font-bold"
                >+</button>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">Adjust this if the government changes the price.</p>
          </div>
        )}

        {/* --- Quick Rate Selector --- */}
        <section className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 p-4 rounded-2xl">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-amber-600" />
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Electricity Rate
                </label>
                <p className="text-xs text-slate-500">₹ per unit (kWh)</p>
              </div>
            </div>
            <button 
              onClick={() => setHelpDialog('rate')}
              className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm transition-all hover:shadow-md flex-shrink-0"
            >
              <Eye size={14} />
              <span>Know More</span>
            </button>
          </div>
          <div className="flex justify-center">
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
              <button 
                onClick={() => setRate(r => Math.max(0, parseFloat((r - 0.5).toFixed(2))))}
                className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-bold transition-colors"
              >-</button>
              <input 
                type="number" 
                step="0.01"
                value={rate.toFixed(2)}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                className="w-16 text-center bg-transparent font-bold outline-none text-slate-800 text-lg"
              />
              <button 
                onClick={() => setRate(r => parseFloat((r + 0.5).toFixed(2)))}
                className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-bold transition-colors"
              >+</button>
            </div>
          </div>
        </section>

        {/* --- Step 1: Device Selection --- */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
            Select Device
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {DEVICE_PRESETS.map((device) => {
              const isSelected = selectedDevice === device.id;
              const isCustom = device.id === 'custom';
              const Icon = device.icon;
              
              // Custom Logic for Styles
              let cardStyles = "bg-white border-gray-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50";
              if (isSelected) {
                if (isCustom) {
                   cardStyles = "bg-purple-600 border-purple-600 text-white shadow-md scale-105";
                } else {
                   cardStyles = "bg-blue-600 border-blue-600 text-white shadow-md scale-105";
                }
              } else if (isCustom) {
                // Unselected Custom Style
                cardStyles = "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300";
              }

              return (
                <button
                  key={device.id}
                  onClick={() => handleDeviceSelect(device)}
                  className={`
                    flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-200
                    ${cardStyles}
                  `}
                >
                  <Icon size={24} strokeWidth={1.5} className="mb-1" />
                  <span className="text-[10px] font-medium leading-tight text-center">{device.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* --- Step 2: Fine Tune Controls --- */}
        <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          
          {/* Watts Input */}
          <div className="space-y-2 relative">
            <div className="flex justify-between items-start mb-1">
              <div className="flex-1">
                <label className="text-sm font-semibold text-slate-500">
                  Power (Watts)
                </label>
                <p className="text-xs text-slate-400 mt-0.5">
                  1000W = 1 Unit / Hour
                </p>
              </div>
              <button 
                onClick={() => setHelpDialog('watts')}
                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm transition-all hover:shadow-md flex-shrink-0"
              >
                <Eye size={14} />
                <span>Know More</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="number"
                value={watts}
                onChange={handleWattsChange}
                className={`w-full text-3xl font-bold bg-gray-50 border-none rounded-xl p-3 focus:ring-2 transition-all outline-none ${selectedDevice === 'custom' ? 'text-purple-700 focus:ring-purple-500' : 'text-slate-800 focus:ring-blue-500'}`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">W</span>
            </div>
          </div>

          {/* Hours Slider/Counter */}
          <div className="space-y-3">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1">
                <label className="text-sm font-semibold text-slate-500">
                  Usage per Day
                </label>
                <p className={`text-xl font-bold mt-1 ${selectedDevice === 'custom' ? 'text-purple-600' : 'text-blue-600'}`}>
                  {hours} <span className="text-sm font-normal text-slate-500">hours</span>
                </p>
              </div>
              <button 
                onClick={() => setHelpDialog('hours')}
                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm transition-all hover:shadow-md flex-shrink-0"
              >
                <Eye size={14} />
                <span>Know More</span>
              </button>
            </div>
            
            {/* Range Slider */}
            <input 
              type="range" 
              min="0.5" 
              max="24" 
              step="0.5"
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              className={`w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer ${selectedDevice === 'custom' ? 'accent-purple-600' : 'accent-blue-600'}`}
            />
            
            {/* Quick Buttons */}
            <div className="flex justify-between gap-2">
              {[1, 4, 8, 12, 24].map(h => (
                <button 
                  key={h}
                  onClick={() => setHours(h)}
                  className={`flex-1 py-1 rounded-lg text-xs font-semibold border ${hours === h ? (selectedDevice === 'custom' ? 'bg-purple-100 border-purple-200 text-purple-700' : 'bg-blue-100 border-blue-200 text-blue-700') : 'bg-white border-gray-100 text-slate-500'}`}
                >
                  {h}h
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* --- Step 3: Result --- */}
        <section className={`rounded-3xl p-6 shadow-lg transition-colors duration-300 ${costBg} border-2 ${costPerDay > 50 ? 'border-orange-100' : 'border-emerald-100'}`}>
          <h2 className="text-center font-medium text-slate-600 mb-4 uppercase tracking-widest text-xs">Estimated Cost</h2>
          
          <div className="flex items-end justify-center gap-1 mb-2">
            <span className={`text-5xl font-extrabold ${costColor}`}>₹{costPerDay.toFixed(2)}</span>
            <span className="text-lg font-medium text-slate-500 mb-2">/ day</span>
          </div>
          
          {/* Calculation Breakdown */}
          <div className="flex justify-center mb-4">
            <div className="bg-white/70 border-2 border-slate-200 rounded-lg px-3 py-2 inline-block">
              <p className="text-xs text-slate-600 font-mono text-center">
                <span className="font-semibold">{watts}W</span> × <span className="font-semibold">{hours}h</span> ÷ 1000 = <span className="font-semibold">{unitsPerDay.toFixed(2)}</span> units
              </p>
              <p className="text-xs text-slate-600 font-mono text-center mt-1">
                <span className="font-semibold">{unitsPerDay.toFixed(2)}</span> units × <span className="font-semibold">₹{rate.toFixed(2)}</span> = <span className={`font-bold ${costColor}`}>₹{costPerDay.toFixed(2)}</span>
              </p>
            </div>
          </div>
          
          <div className="h-px bg-slate-200/50 w-full my-4"></div>

          <div className="flex justify-between items-center">
            <div className="text-left">
              <p className="text-xs text-slate-500 font-medium uppercase">Monthly</p>
              <p className={`text-2xl font-bold ${costColor}`}>₹{costPerMonth.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 font-medium uppercase">Consumption</p>
              <p className="text-2xl font-bold text-slate-700">{unitsPerDay.toFixed(2)} <span className="text-sm font-normal text-slate-500">units</span></p>
            </div>
          </div>
          
          {/* Context Message */}
          <div className="mt-4 bg-white/60 p-3 rounded-xl flex gap-3 items-start">
            <Info className="flex-shrink-0 text-slate-400 mt-0.5" size={18} />
            <p className="text-xs text-slate-600 leading-relaxed">
              Using a <strong>{watts}W</strong> device for <strong>{hours} hours</strong> consumes <strong>{unitsPerDay.toFixed(2)} units</strong>. At ₹{rate.toFixed(2)}/unit, this costs ₹{costPerDay.toFixed(2)}.
            </p>
          </div>
        </section>

      </main>

      {/* --- Help Dialog --- */}
      {helpDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setHelpDialog(null)}>
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-800">
                {helpDialog === 'rate' && '💰 Electricity Rate'}
                {helpDialog === 'watts' && '⚡ Power (Watts)'}
                {helpDialog === 'hours' && '⏰ Usage Hours'}
              </h3>
              <button onClick={() => setHelpDialog(null)} className="text-slate-400 hover:text-slate-700">
                <X size={24} />
              </button>
            </div>

            {/* Rate Help */}
            {helpDialog === 'rate' && (
              <div className="space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  This is how much you pay for 1 unit (kWh) of electricity.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-700 mb-2">📍 Where to find it:</p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Check your electricity bill</li>
                    <li>• Look for "Rate per Unit" or "Tariff"</li>
                    <li>• Usually between ₹4 - ₹8 per unit</li>
                    <li>• Contact your electricity office</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-700 mb-2">📝 Example:</p>
                  <p className="text-sm text-slate-600">
                    If your bill shows ₹6.00 per unit, enter <strong>6</strong> in the rate field.
                  </p>
                </div>
              </div>
            )}

            {/* Watts Help */}
            {helpDialog === 'watts' && (
              <div className="space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  Watts (W) tells you how much power a device uses. Higher watts = more electricity.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-700 mb-2">📍 Where to find it:</p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Check the back of the device</li>
                    <li>• Look at the device label/sticker</li>
                    <li>• Check the manual/box</li>
                    <li>• Look for "W" or "Watts"</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-700 mb-2">📝 Examples:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• LED Bulb: 9W - 15W</li>
                    <li>• Fan: 60W - 80W</li>
                    <li>• Heater: 1000W - 2000W</li>
                    <li>• Phone Charger: 10W - 20W</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Hours Help */}
            {helpDialog === 'hours' && (
              <div className="space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  How many hours per day do you use this device?
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-700 mb-2">💡 How to estimate:</p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Think about your daily routine</li>
                    <li>• Count hours you use it</li>
                    <li>• Be realistic, not exact</li>
                    <li>• You can adjust later</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-700 mb-2">📝 Examples:</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Bulb at night: 5-6 hours</li>
                    <li>• Fan in summer: 8-10 hours</li>
                    <li>• Heater in winter: 4-6 hours</li>
                    <li>• Phone charging: 2-3 hours</li>
                  </ul>
                </div>
              </div>
            )}

            <button 
              onClick={() => setHelpDialog(null)}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Got it! 👍
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
