export const parseToJSON = (stringify: string): any | null => {
  try {
    if (stringify === null) {
      throw new Error('Cannot parse JSON data of: ' + stringify);
    }
    return JSON.parse(stringify);
  } catch (error) {
    console.error(`[getJSON] ${error.message}`);
    return null;
  }
};
