const fishfryData = require('../_data/fishfry.json');

function computeStats() {
  const seasons = fishfryData.seasons;
  let totalVisits = 0;
  let localVisits = 0;
  const venueCounts = {};
  const venueYears = {};
  let bestYear = { year: 0, count: 0 };
  const seasonLocalCounts = {};

  for (const season of seasons) {
    let seasonLocal = 0;
    for (const visit of season.visits) {
      totalVisits++;
      if (!visit.away) {
        localVisits++;
        seasonLocal++;
        const name = visit.name;
        venueCounts[name] = (venueCounts[name] || 0) + 1;
        if (!venueYears[name]) venueYears[name] = [];
        if (!venueYears[name].includes(season.year)) {
          venueYears[name].push(season.year);
        }
      }
    }
    seasonLocalCounts[season.year] = seasonLocal;
    if (seasonLocal > bestYear.count) {
      bestYear = { year: season.year, count: seasonLocal };
    }
  }

  // Build ranked list sorted by visit count (only venues with 2+ visits)
  const ranked = Object.entries(venueCounts)
    .map(([name, count]) => ({
      name,
      count,
      years: venueYears[name].join(', ')
    }))
    .sort((a, b) => b.count - a.count);

  const hallOfFame = ranked.filter(v => v.count >= 2);
  const oneHitWonders = ranked.filter(v => v.count === 1);

  // Calculate Holy Ghost current streak (counting back from most recent season)
  // Covid years with no visits don't break the streak
  let holyGhostStreak = 0;
  let holyGhostStreakStart = 0;
  for (let i = seasons.length - 1; i >= 0; i--) {
    const season = seasons[i];
    const hasHolyGhost = season.visits.some(v => v.name === 'Holy Ghost' && !v.away);
    const isSkipYear = season.note === 'Coronavirus' || season.note === 'Covid-19' || season.note === 'Unknown';
    if (hasHolyGhost) {
      holyGhostStreak++;
      holyGhostStreakStart = season.year;
    } else if (isSkipYear) {
      // Skip covid/unknown years — don't count them but don't break the streak
      continue;
    } else {
      break;
    }
  }

  return {
    totalVisits,
    localVisits,
    awayVisits: totalVisits - localVisits,
    seasonCount: seasons.length,
    bestYear,
    ranked,
    hallOfFame,
    oneHitWonders,
    uniqueVenues: ranked.length,
    seasonLocalCounts,
    holyGhostStreak,
    holyGhostStreakStart
  };
}

module.exports = {
  eleventyComputed: {
    fishfryStats: () => computeStats()
  }
};
