
export const convertToMilliseconds = (value: string, timeUnit: string): number => {
  const numValue = parseInt(value);
  
  let durationMs = numValue * 60 * 1000; // default: minutes
  if (timeUnit === "hour") {
    durationMs = durationMs * 60;
  } else if (timeUnit === "day") {
    durationMs = durationMs * 60 * 24;
  }
  
  return durationMs;
};

export const parseTimeFromMilliseconds = (duration: number): { value: number, unit: string } => {
  let unit = "minute";
  let value = Math.round(duration / (60 * 1000));
  
  if (duration >= 60 * 60 * 1000) {
    value = Math.round(duration / (60 * 60 * 1000));
    unit = "hour";
  } else if (duration >= 24 * 60 * 60 * 1000) {
    value = Math.round(duration / (24 * 60 * 60 * 1000));
    unit = "day";
  }
  
  return { value, unit };
};
