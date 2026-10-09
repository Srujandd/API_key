import { SupportedLanguage } from '../types/farm';

export interface RealtimeWeather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  soilMoisture: number; // percentage
  apparentTemperature: number;
  weatherCode: number;
  conditionText: string;
  sprayCondition: 'optimal' | 'wind_alert' | 'rain_alert' | 'humidity_alert';
  sprayConditionText: string;
  locationName: string;
  lastUpdated: string;
  source: 'OpenWeatherMap' | 'Open-Meteo' | 'Fallback' | 'Setup Required';
  missingApiKey?: boolean;
  setupMessage?: string;
  coordinates?: { lat: number; lon: number };
}

export interface RegionPreset {
  id: string;
  name: Record<SupportedLanguage, string>;
  lat: number;
  lon: number;
}

export const REGION_PRESETS: RegionPreset[] = [
  {
    id: 'hyderabad',
    name: {
      en: 'Hyderabad (Telangana)',
      hi: 'हैदराबाद (तेलंगाना)',
      te: 'హైదరాబాద్ (తెలంగాణ)',
      kn: 'ಹೈದರಾಬಾದ್ (ತೆಲಂಗಾಣ)',
      ta: 'ஹைதராபாத் (தெலுங்கானா)',
      gu: 'હૈદરાબાદ (તેલંગાણા)'
    },
    lat: 17.3850,
    lon: 78.4867
  },
  {
    id: 'vijayawada',
    name: {
      en: 'Vijayawada (Andhra Pradesh)',
      hi: 'विजयवाड़ा (आंध्र प्रदेश)',
      te: 'విజయవాడ (ఆంధ్ర ప్రదేశ్)',
      kn: 'ವಿಜಯವಾಡ (ಆಂಧ್ರಪ್ರದೇಶ)',
      ta: 'விஜயவாடா (ஆந்திரா)',
      gu: 'વિજયવાડા (આંધ્ર પ્રદેશ)'
    },
    lat: 16.5062,
    lon: 80.6480
  },
  {
    id: 'bengaluru',
    name: {
      en: 'Bengaluru (Karnataka)',
      hi: 'बेंगलुरु (कर्नाटक)',
      te: 'బెంగళూరు (కర్ణాటక)',
      kn: 'ಬೆಂಗಳೂರು (ಕರ್ನಾಟಕ)',
      ta: 'பெங்களூரு (கர்நாடகா)',
      gu: 'બેંગલુરુ (કર્ણાટક)'
    },
    lat: 12.9716,
    lon: 77.5946
  },
  {
    id: 'chennai',
    name: {
      en: 'Chennai (Tamil Nadu)',
      hi: 'चेन्नई (तमिलनाडु)',
      te: 'చెన్నై (తమిళనాడు)',
      kn: 'ಚೆನ್ನೈ (ತಮಿಳುನಾಡು)',
      ta: 'சென்னை (தமிழ்நாடு)',
      gu: 'ચેન્નાઈ (તમિલનાડુ)'
    },
    lat: 13.0827,
    lon: 80.2707
  },
  {
    id: 'delhi',
    name: {
      en: 'New Delhi (NCR)',
      hi: 'नई दिल्ली',
      te: 'న్యూ ఢిల్లీ',
      kn: 'ನವದೆಹಲಿ',
      ta: 'புது தில்லி',
      gu: 'નવી દિલ્હી'
    },
    lat: 28.6139,
    lon: 77.2090
  },
  {
    id: 'pune',
    name: {
      en: 'Pune (Maharashtra)',
      hi: 'पुणे (महाराष्ट्र)',
      te: 'పుణె (మహారాష్ట్ర)',
      kn: 'ಪುಣೆ (ಮಹಾರಾಷ್ಟ್ರ)',
      ta: 'புனே (மகாராஷ்டிரா)',
      gu: 'પુણે (મહારાષ્ટ્ર)'
    },
    lat: 18.5204,
    lon: 73.8567
  }
];

// OpenWeatherMap API call with seamless fallback
export async function fetchLiveWeather(
  lat: number,
  lon: number,
  locationLabel: string,
  lang: SupportedLanguage
): Promise<RealtimeWeather> {
  const conditionTexts: Record<SupportedLanguage, Record<string, string>> = {
    en: {
      clear: 'Clear Sky',
      cloudy: 'Partly Cloudy',
      rain: 'Rainy',
      optimal: 'Optimal Window (Low Drift)',
      wind_alert: 'High Wind Alert (Drift Risk)',
      rain_alert: 'Rain Alert (Washoff Risk)',
      humidity_alert: 'High Humidity (Fungal Alert)'
    },
    hi: {
      clear: 'साफ मौसम',
      cloudy: 'हल्के बादल',
      rain: 'वर्षा',
      optimal: 'अनुकूल समय (शांत हवा)',
      wind_alert: 'तेज हवा चेतावनी (छिड़काव न करें)',
      rain_alert: 'बारिश चेतावनी (दवा बहने का खतरा)',
      humidity_alert: 'अत्यधिक नमी (फफूंद खतरा)'
    },
    te: {
      clear: 'స్వచ్ఛమైన ఎండ',
      cloudy: 'పాక్షిక మేఘావృతం',
      rain: 'వర్షం',
      optimal: 'మందు పిచికారీకి అనుకూల సమయం',
      wind_alert: 'ఎక్కువ గాలి (మందు పిచికారీ చేయవద్దు)',
      rain_alert: 'వర్షం హెచ్చరిక (మందు కొట్టుకోవద్దు)',
      humidity_alert: 'అధిక తేమ (తెగుళ్ల వ్యాప్తి ఎక్కువ)'
    },
    kn: {
      clear: 'ಸ್ಪಷ್ಟ ಬಿಸಿಲು',
      cloudy: 'ಮೋಡ ಕವಿದ ವಾತಾವರಣ',
      rain: 'ಮಳೆ',
      optimal: 'ಸಿಂಪಡಣೆಗೆ ಸೂಕ್ತ ಸಮಯ (ಶಾಂತ ಗಾಳಿ)',
      wind_alert: 'ಹೆಚ್ಚು ಗಾಳಿ (ಔಷಧಿ ಸಿಂಪಡಿಸಬೇಡಿ)',
      rain_alert: 'ಮಳೆ ಎಚ್ಚರಿಕೆ (ಔಷಧಿ ತೊಳೆದುಹೋಗುವ ಅಪಾಯ)',
      humidity_alert: 'ಹೆಚ್ಚು ತೇವಾಂಶ (ಶಿಲೀಂಧ್ರ ಹರಡುವಿಕೆ)'
    },
    ta: {
      clear: 'தெளிவான வானம்',
      cloudy: 'மேகமூட்டம்',
      rain: 'மழை',
      optimal: 'மருந்து தெளிக்க உகந்த நேரம்',
      wind_alert: 'அதிக காற்று எச்சரிக்கை (தெளிக்க வேண்டாம்)',
      rain_alert: 'மழை எச்சரிக்கை (மருந்து வீணாகும் அபாயம்)',
      humidity_alert: 'அதிக ஈரப்பதம் (பூஞ்சை அபாயம்)'
    },
    gu: {
      clear: 'સ્વચ્છ આકાશ',
      cloudy: 'આંશિક વાદળછાયું',
      rain: 'વરસાદ',
      optimal: 'અનુકૂળ સમય (શાંત પવન)',
      wind_alert: 'ભારે પવન ચેતવણી (છંટકાવ ન કરો)',
      rain_alert: 'વરસાદની ચેતવણી (દવા ધોવાઈ જવાનું જોખમ)',
      humidity_alert: 'વધુ ભેજ (ફૂગનું જોખમ)'
    }
  };

  const dict = conditionTexts[lang] || conditionTexts.en;

  // 1. Server-side Weather API proxy (/api/weather using server-side WEATHER_API_KEY)
  try {
    const owmRes = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    if (owmRes.ok) {
      const owmData = await owmRes.json();
      if (owmData && owmData.success && owmData.data) {
        const d = owmData.data;
        const temp = Math.round(d.temperature);
        const humidity = Math.round(d.humidity);
        const wind = Math.round(d.windSpeed * 10) / 10;
        const isRain = d.weatherMain?.toLowerCase().includes('rain') || d.weatherMain?.toLowerCase().includes('drizzle');

        let sprayCondition: RealtimeWeather['sprayCondition'] = 'optimal';
        if (isRain) {
          sprayCondition = 'rain_alert';
        } else if (wind > 14) {
          sprayCondition = 'wind_alert';
        } else if (humidity > 85) {
          sprayCondition = 'humidity_alert';
        }

        const condKey = isRain ? 'rain' : d.weatherMain?.toLowerCase().includes('cloud') ? 'cloudy' : 'clear';
        const isMissingKey = Boolean(owmData.missingKey);

        return {
          temperature: temp,
          humidity,
          windSpeed: wind,
          soilMoisture: typeof d.soilMoisture === 'number' ? Math.round(d.soilMoisture) : Math.round(humidity * 0.52),
          apparentTemperature: Math.round(d.apparentTemperature ?? temp),
          weatherCode: d.weatherId || 800,
          conditionText: dict[condKey] || d.description || dict.clear,
          sprayCondition,
          sprayConditionText: dict[sprayCondition] || dict.optimal,
          locationName: locationLabel || d.cityName,
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: isMissingKey ? 'Setup Required' : (owmData.source === 'Open-Meteo' ? 'Open-Meteo' : 'OpenWeatherMap'),
          missingApiKey: isMissingKey,
          setupMessage: owmData.setupMessage,
          coordinates: { lat, lon }
        };
      }
    }
  } catch (_e) {
    // Graceful fallback if server unreachable
  }

  return {
    temperature: 28,
    humidity: 68,
    windSpeed: 6.5,
    soilMoisture: 38,
    apparentTemperature: 29,
    weatherCode: 1,
    conditionText: dict.clear,
    sprayCondition: 'optimal',
    sprayConditionText: dict.optimal,
    locationName: locationLabel,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    source: 'Fallback',
    coordinates: { lat, lon }
  };
}
