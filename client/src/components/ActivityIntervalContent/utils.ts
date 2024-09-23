export function convertMetersToMiles(meters: number) {
  const metersToMilesConversion = 1609.34;
  return Math.floor(meters/metersToMilesConversion * 100) / 100;
}

export function viewSplitsByMin(
  timeStream: number[],
  distanceStream: number[],
  interval: number
) {
  const result = [];
  const minuteMap = new Map();

  for (let i = 0; i < timeStream.length; i++) {
    const timeInSeconds = timeStream[i];
    const minute = Math.floor(timeInSeconds / 60);
    
    if (
      minute >= interval &&
      minute % interval === 0 && // check interval
      !minuteMap.has(minute)  // skip if minute has been added
    ) {
        const distance = convertMetersToMiles(distanceStream[i]);
        result.push({minute, distance});
        minuteMap.set(minute, true);
    }
  }

  return result;
}