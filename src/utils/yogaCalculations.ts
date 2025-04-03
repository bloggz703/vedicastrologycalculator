// Yoga definitions and characteristics
const yogaDefinitions = {
  'Raj Yoga': {
    planets: ['Sun', 'Moon', 'Jupiter'],
    requirements: 'Mutual aspect or conjunction between benefic planets in angles',
    interpretation: {
      general: "Raj Yoga indicates success, authority, and leadership potential.",
      timing: "Most effective during the dasha periods of involved planets.",
      effects: [
        "Rise in social status and recognition",
        "Leadership opportunities",
        "Material success and prosperity",
        "Political or administrative power"
      ]
    }
  },
  'Dhana Yoga': {
    planets: ['Jupiter', 'Venus', 'Mercury'],
    requirements: 'Benefic planets in 2nd, 5th, or 11th houses',
    interpretation: {
      general: "Dhana Yoga brings wealth and financial prosperity.",
      timing: "Manifests strongly during Jupiter and Venus periods.",
      effects: [
        "Financial gains and wealth accumulation",
        "Business success",
        "Material comforts",
        "Good investment opportunities"
      ]
    }
  },
  'Gaja Kesari Yoga': {
    planets: ['Jupiter', 'Moon'],
    requirements: 'Jupiter in angle from Moon in good dignity',
    interpretation: {
      general: "Gaja Kesari Yoga bestows wisdom, success, and popularity.",
      timing: "Most prominent during Jupiter and Moon dashas.",
      effects: [
        "Enhanced intelligence and wisdom",
        "Success in education",
        "Social recognition",
        "Leadership qualities"
      ]
    }
  },
  'Budh-Aditya Yoga': {
    planets: ['Sun', 'Mercury'],
    requirements: 'Mercury within 12 degrees of Sun in good dignity',
    interpretation: {
      general: "Budh-Aditya Yoga grants intelligence and communication skills.",
      timing: "Strongest during Mercury and Sun periods.",
      effects: [
        "Excellence in communication",
        "Success in intellectual pursuits",
        "Good education",
        "Career success in media or writing"
      ]
    }
  },
  'Amala Yoga': {
    planets: ['Benefic planets'],
    requirements: 'Benefic planet in 10th house without malefic aspects',
    interpretation: {
      general: "Amala Yoga indicates pure fame and reputation.",
      timing: "Active during periods of the yoga-forming planet.",
      effects: [
        "Spotless reputation",
        "Success without controversy",
        "Ethical conduct",
        "Respect in society"
      ]
    }
  }
};

// Calculate planetary positions
function calculatePlanetaryPositions(birthDateTime: Date): { [key: string]: number } {
  const epoch = new Date('2000-01-01T12:00:00Z');
  const daysSinceEpoch = (birthDateTime.getTime() - epoch.getTime()) / (24 * 60 * 60 * 1000);
  
  // Calculate mean anomalies
  const M_sun = (357.5291092 + 0.98560028 * daysSinceEpoch) % 360;
  const M_moon = (134.9634114 + 13.06498999 * daysSinceEpoch) % 360;
  const M_mars = (19.3870 + 0.524039 * daysSinceEpoch) % 360;
  const M_jupiter = (20.020 + 0.083091 * daysSinceEpoch) % 360;
  const M_saturn = (317.021 + 0.033459 * daysSinceEpoch) % 360;
  const M_mercury = (168.6562 + 4.092335 * daysSinceEpoch) % 360;
  const M_venus = (50.4161 + 1.602136 * daysSinceEpoch) % 360;

  // Calculate equations of center
  const C_sun = (1.9148 * Math.sin(M_sun * Math.PI / 180) + 0.0200 * Math.sin(2 * M_sun * Math.PI / 180)) % 360;
  const C_moon = (6.2886 * Math.sin(M_moon * Math.PI / 180)) % 360;
  
  // Calculate true longitudes
  return {
    'Sun': (280.46646 + M_sun + C_sun) % 360,
    'Moon': (218.3164477 + M_moon + C_moon) % 360,
    'Mars': (355.45332 + M_mars) % 360,
    'Mercury': (168.6562 + M_mercury) % 360,
    'Jupiter': (34.35151 + M_jupiter) % 360,
    'Venus': (50.4161 + M_venus) % 360,
    'Saturn': (50.0774 + M_saturn) % 360
  };
}

// Check for yoga formation
function checkYogaFormation(
  positions: { [key: string]: number },
  yogaName: string,
  requirements: string
): number {
  let strength = 0;

  switch (yogaName) {
    case 'Raj Yoga': {
      // Check for benefic planets in angles (1st, 4th, 7th, 10th houses)
      const angles = [0, 90, 180, 270];
      const benefics = ['Jupiter', 'Venus'];
      
      benefics.forEach(planet => {
        angles.forEach(angle => {
          const diff = Math.abs(positions[planet] - angle);
          if (diff < 10 || diff > 350) {
            strength += 4;
          }
        });
      });
      
      // Check for mutual aspects between benefics
      const jupiterVenusDiff = Math.abs(positions['Jupiter'] - positions['Venus']);
      if (Math.abs(jupiterVenusDiff - 120) < 10) {
        strength += 4;
      }
      break;
    }

    case 'Dhana Yoga': {
      // Check for benefics in wealth houses (2nd, 5th, 11th)
      const wealthHouses = [30, 120, 300];
      const benefics = ['Jupiter', 'Venus', 'Mercury'];
      
      benefics.forEach(planet => {
        wealthHouses.forEach(house => {
          const diff = Math.abs(positions[planet] - house);
          if (diff < 10 || diff > 350) {
            strength += 3;
          }
        });
      });
      break;
    }

    case 'Gaja Kesari Yoga': {
      // Check Jupiter-Moon relationship
      const moonJupiterDiff = Math.abs(positions['Moon'] - positions['Jupiter']);
      if (moonJupiterDiff < 10 || Math.abs(moonJupiterDiff - 120) < 10) {
        strength = 9;
      }
      break;
    }

    case 'Budh-Aditya Yoga': {
      // Check Sun-Mercury conjunction
      const sunMercuryDiff = Math.abs(positions['Sun'] - positions['Mercury']);
      if (sunMercuryDiff < 12) {
        strength = 8;
      }
      break;
    }

    case 'Amala Yoga': {
      // Check benefics in 10th house without malefic aspects
      const tenthHouse = 270;
      const benefics = ['Jupiter', 'Venus', 'Mercury'];
      const malefics = ['Mars', 'Saturn'];
      
      benefics.forEach(benefic => {
        const diff = Math.abs(positions[benefic] - tenthHouse);
        if (diff < 10 || diff > 350) {
          strength = 7;
          // Check for malefic aspects
          malefics.forEach(malefic => {
            const maleficDiff = Math.abs(positions[malefic] - tenthHouse);
            if (maleficDiff < 10 || maleficDiff > 350) {
              strength = 0;
            }
          });
        }
      });
      break;
    }
  }

  return strength;
}

// Calculate yoga combinations
export function calculateYogaCombinations(
  birthDateTime: Date,
  latitude: number,
  longitude: number
): {
  name: string;
  planets: string[];
  strength: number;
  interpretation: {
    general: string;
    timing: string;
    effects: string[];
  };
}[] {
  // Calculate planetary positions
  const positions = calculatePlanetaryPositions(birthDateTime);
  
  // Check for each yoga
  const yogas = Object.entries(yogaDefinitions)
    .map(([name, definition]) => {
      const strength = checkYogaFormation(positions, name, definition.requirements);
      
      if (strength > 0) {
        return {
          name,
          planets: definition.planets,
          strength,
          interpretation: definition.interpretation
        };
      }
      return null;
    })
    .filter((yoga): yoga is NonNullable<typeof yoga> => yoga !== null)
    .sort((a, b) => b.strength - a.strength);

  return yogas;
}