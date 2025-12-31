# ⚡ SuperPower - Electricity Cost Calculator

A simple, mobile-first electricity cost calculator designed for Kashmir households to understand their electricity consumption and costs.

## 🎯 Purpose

Many households in Kashmir recently received new electricity meter connections. This app helps users (especially those who are illiterate or semi-literate) understand:
- How much electricity their devices consume
- How much it costs per day and per month
- Whether using a device for longer hours will become expensive

**Goal:** Remove fear, build trust, and explain costs clearly.

---

## ✨ Features

### v1 MVP Features:
- ✅ Simple calculator-style interface
- ✅ Mobile-first responsive design
- ✅ Big buttons and fonts for easy interaction
- ✅ Quick device selection (heater, bulb, fan, charger, fridge, etc.)
- ✅ Custom device power input option
- ✅ Daily and monthly cost calculation in INR (₹)
- ✅ Bilingual labels (Hindi + English)
- ✅ No login or authentication required
- ✅ High contrast, clean UI

### Calculation Logic:
```
Units per day = (Watts × Hours) / 1000
Monthly units = Units per day × 30
Cost = Units × Rate per unit (₹6)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open in browser:**
The app will automatically open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📱 How to Use

1. **Open the app** - No login required
2. **Select a device** - Choose from common devices like bulb, fan, heater, etc.
   - OR enter custom watts if your device is not listed
3. **Enter hours** - How many hours per day will you use it?
4. **Calculate** - See daily and monthly costs instantly
5. **Calculate again** - Try different devices and scenarios

---

## 🛠️ Tech Stack

- **Frontend:** React 18
- **Styling:** Tailwind CSS 3
- **Build Tool:** Vite
- **Language:** JavaScript (ES6+)

---

## 📁 Project Structure

```
SuperPower/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   └── DeviceCard.jsx    # Device selection card
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── README.md            # This file
```

---

## ⚙️ Configuration

### Electricity Rate
The default electricity rate is **₹6 per unit (kWh)**.

To change it, modify the `RATE_PER_UNIT` constant in `src/App.jsx`:

```javascript
const RATE_PER_UNIT = 6  // Change this value
```

### Common Devices
To add or modify preset devices, edit the `COMMON_DEVICES` array in `src/App.jsx`:

```javascript
const COMMON_DEVICES = [
  { name: 'बल्ब (Bulb)', watts: 10, icon: '💡' },
  { name: 'पंखा (Fan)', watts: 75, icon: '🌀' },
  // Add more devices here
]
```

---

## 🎨 Design Principles

- **Mobile-first:** Optimized for small screens
- **Big touch targets:** Easy to tap (minimum 44px)
- **High contrast:** Easy to read
- **Simple language:** Minimal technical jargon
- **Bilingual:** Hindi + English labels
- **Visual feedback:** Clear selected states
- **One action per screen:** No cognitive overload

---

## 🌱 Future Enhancements (Not in v1)

- [ ] Kashmiri/Urdu language support
- [ ] Voice input for better accessibility
- [ ] Government tariff updates
- [ ] Offline mode (PWA)
- [ ] Save calculations history
- [ ] Compare multiple devices
- [ ] Electricity saving tips
- [ ] Notifications for usage

---

## 🚫 What This App Does NOT Have (By Design)

- Authentication/Login
- User profiles
- Complex dashboards
- Heavy animations
- Technical jargon
- Multi-page navigation
- Backend server (for v1)

---

## 📊 Example Calculations

### Example 1: LED Bulb
- **Device:** 10W LED Bulb
- **Usage:** 5 hours per day
- **Daily cost:** ₹0.30
- **Monthly cost:** ₹9.00

### Example 2: Room Heater
- **Device:** 2000W Heater
- **Usage:** 4 hours per day
- **Daily cost:** ₹48.00
- **Monthly cost:** ₹1,440.00

### Example 3: Ceiling Fan
- **Device:** 75W Fan
- **Usage:** 10 hours per day
- **Daily cost:** ₹4.50
- **Monthly cost:** ₹135.00

---

## 🤝 Contributing

This is an MVP designed for real users. When contributing, please remember:
- Keep it simple
- Think mobile-first
- Use big fonts and buttons
- Avoid technical terms
- Test on slow internet
- Imagine your parents using it

---

## 📄 License

MIT License - Feel free to use and modify

---

## 💡 Tips for Users

1. **Find device watts:** Look on the device label or manual
2. **Estimate hours:** Think about your daily routine
3. **Plan usage:** Use the calculator before buying new devices
4. **Save money:** Compare costs of different devices
5. **Don't fear:** Understanding is the first step to control

---

## 📞 Support

For questions or issues, please create an issue on GitHub.

---

**बिजली बिल से डर नहीं, समझदारी से इस्तेमाल करें 💪**

**Don't fear electricity bills, use wisely**

