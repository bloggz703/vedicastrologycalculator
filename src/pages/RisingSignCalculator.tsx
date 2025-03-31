import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, MapPin, Star } from 'lucide-react';
import DatePicker from 'react-datepicker';
import LocationSearch from '../components/LocationSearch';
import Navigation from '../components/Navigation';
import { calculateAscendant, getRulingPlanet, getSignCharacteristics } from '../utils/astroCalculations';
import { Helmet } from 'react-helmet';
import "react-datepicker/dist/react-datepicker.css";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface CalculationResult {
  sign: string;
  rulingPlanet: string;
  element: string;
  quality: string;
  characteristics: string[];
}

function RisingSignCalculator() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthTime, setBirthTime] = useState<Date | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateRisingSign = () => {
    setError(null);

    if (!birthDate || !birthTime || !location) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // Combine date and time
      const fullDateTime = new Date(
        birthDate.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate(),
        birthTime.getHours(),
        birthTime.getMinutes()
      );

      // Calculate rising sign
      const risingSign = calculateAscendant(fullDateTime, location.latitude, location.longitude);
      
      // Get additional information
      const rulingPlanet = getRulingPlanet(risingSign);
      const characteristics = getSignCharacteristics(risingSign);

      setCalculationResult({
        sign: risingSign,
        rulingPlanet,
        ...characteristics
      });
    } catch (err) {
      setError('Error calculating rising sign. Please check your inputs and try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Rising Sign Calculator</title>
        <meta name="description" content="Calculate your rising sign (ascendant) using precise birth time and location. Get detailed insights about your rising sign's influence." />
        <link rel="canonical" href="https://www.vedicastrologycalculator.com/rising-sign-calculator" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
        <Navigation />

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-sky-900 mb-8">Rising Sign Calculator</h1>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Birth Details</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Date
                </label>
                <div className="relative">
                  <DatePicker
                    selected={birthDate}
                    onChange={(date) => setBirthDate(date)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholderText="Select birth date"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Time
                </label>
                <div className="relative">
                  <DatePicker
                    selected={birthTime}
                    onChange={(date) => setBirthTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholderText="Select birth time"
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-400 pointer-events-none" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Location
                </label>
                <div className="relative">
                  <LocationSearch onLocationSelect={setLocation} />
                  <MapPin className="absolute right-3 top-3 h-5 w-5 text-sky-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={calculateRisingSign}
              className="mt-8 w-full bg-sky-900 text-white px-6 py-3 rounded-lg hover:bg-sky-800 transition-colors flex items-center justify-center gap-2"
            >
              Calculate Rising Sign
              <ArrowRight className="h-4 w-4" />
            </button>

            {calculationResult && (
              <div className="mt-8 p-6 bg-sky-50 rounded-lg">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-sky-900 mb-2">Your Rising Sign is:</h3>
                    <p className="text-3xl font-bold text-sky-700 mb-2">{calculationResult.sign}</p>
                    <p className="text-lg text-sky-600">
                      Ruling Planet: {calculationResult.rulingPlanet}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="p-3 bg-sky-100 rounded-full mb-2">
                        <Star className="h-6 w-6 text-sky-700" />
                      </div>
                      <p className="text-sm font-medium text-sky-900">{calculationResult.element}</p>
                    </div>
                    <div className="text-center">
                      <div className="p-3 bg-sky-100 rounded-full mb-2">
                        <Star className="h-6 w-6 text-sky-700" />
                      </div>
                      <p className="text-sm font-medium text-sky-900">{calculationResult.quality}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-sky-200 pt-4">
                  <h4 className="font-medium text-sky-900 mb-3">Key Characteristics:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {calculationResult.characteristics.map((trait, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg text-center">
                        <p className="text-sky-700">{trait}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <section className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-4">How Does a Rising Sign Calculator Work?</h2>
            <div className="prose prose-sky max-w-none">
              <p className="text-gray-600 mb-4">
                A rising sign calculator operates based on precise astrological calculations. Here's a step-by-step breakdown of how it works:
              </p>
              <ol className="list-decimal list-inside space-y-4 text-gray-600">
                <li>
                  <span className="font-medium">Input Birth Details:</span> You enter your birth date, exact birth time, and birth location into the calculator.
                </li>
                <li>
                  <span className="font-medium">Calculate Ascendant:</span> The tool calculates the zodiac sign that was ascending on the eastern horizon at your time of birth.
                </li>
                <li>
                  <span className="font-medium">Generate Results:</span> The calculator displays your rising sign and provides additional details about its influence on your personality and life.
                </li>
              </ol>
              <p className="text-gray-600 mt-4">
                For example, if you were born at sunrise in New York, and Aries was rising on the eastern horizon, your rising sign would be Aries, indicating a bold and energetic outer personality.
              </p>
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Discover Your Rising Sign with a Rising Sign Calculator: A Guide to Understanding Your Ascendant</h2>
            <div className="prose prose-sky max-w-none text-gray-600">
              <p className="mb-4">
                In astrology, your rising sign, also known as your ascendant sign, is one of the most important elements of your birth chart. It represents the zodiac sign that was rising on the eastern horizon at the exact moment of your birth. Your rising sign influences your personality, appearance, and how others perceive you. It also sets the stage for the rest of your birth chart, determining the layout of the houses and the zodiac signs that govern them.
              </p>
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">What is a Rising Sign?</h2>
            <div className="prose prose-sky max-w-none text-gray-600">
              <p className="mb-4">
                Your rising sign is the zodiac sign that was ascending on the eastern horizon at the time of your birth. It changes approximately every two hours, which is why knowing your exact birth time is crucial for determining your ascendant sign. Unlike your sun sign, which is based on your birth date, your rising sign reflects your outward personality, first impressions, and the mask you wear when interacting with the world. For example, if your rising sign is Aries, you may come across as bold, energetic, and confident, even if your sun sign is more reserved, like Cancer. This duality between your sun sign and rising sign is what makes astrology so nuanced and fascinating.
              </p>
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">The Role of a Rising Sign Calculator</h2>
            <div className="prose prose-sky max-w-none text-gray-600">
              <p className="mb-4">
                A rising sign calculator is an online tool designed to simplify the process of determining your ascendant sign. By inputting your birth details—such as your date, time, and place of birth—the calculator uses astrological algorithms to identify your rising sign. This tool is especially helpful for those who are new to astrology or don't have access to an astrologer.
              </p>
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Why is Your Rising Sign Important?</h2>
            <div className="prose prose-sky max-w-none text-gray-600">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Personality and First Impressions:</strong> Your rising sign influences how you present yourself to the world and how others perceive you.</li>
                <li><strong>House Layout in Your Birth Chart:</strong> The rising sign determines the layout of the houses in your birth chart.</li>
                <li><strong>Ruling Planet:</strong> Each ascendant sign is ruled by a specific planet, which further influences your personality and life experiences.</li>
                <li><strong>Life Path and Purpose:</strong> Your rising sign can provide clues about your life path and the lessons you're meant to learn.</li>
              </ul>
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Common Misconceptions About the Rising Sign</h2>
            <div className="prose prose-sky max-w-none text-gray-600">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>It's Less Important Than the Sun Sign:</strong> While the sun sign represents your core identity, the rising sign is equally important.</li>
                <li><strong>It's Only Relevant for First Impressions:</strong> The rising sign influences your entire life path, not just initial meetings.</li>
                <li><strong>You Can Guess Your Rising Sign Without a Calculator:</strong> Due to the two-hour rotation, precise birth time is essential.</li>
              </ul>
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white p-6 rounded-lg shadow-sm">
                <summary className="text-sky-900 font-medium cursor-pointer">Why is exact birth time important for rising sign?</summary>
                <p className="mt-4 text-sky-600">
                  The rising sign changes approximately every two hours, so an accurate birth time is crucial for calculating your true rising sign. Even a difference of a few minutes can result in a different rising sign.
                </p>
              </details>
              <details className="bg-white p-6 rounded-lg shadow-sm">
                <summary className="text-sky-900 font-medium cursor-pointer">How does birth location affect rising sign?</summary>
                <p className="mt-4 text-sky-600">
                  Your birth location determines which zodiac sign was ascending on the eastern horizon at your birth time. Different locations will see different signs rising at the same moment.
                </p>
              </details>
              <details className="bg-white p-6 rounded-lg shadow-sm">
                <summary className="text-sky-900 font-medium cursor-pointer">What if I don't know my exact birth time?</summary>
                <p className="mt-4 text-sky-600">
                  Without an exact birth time, it's not possible to accurately calculate your rising sign. Consider obtaining your birth certificate or consulting family records for this information.
                </p>
              </details>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default RisingSignCalculator;