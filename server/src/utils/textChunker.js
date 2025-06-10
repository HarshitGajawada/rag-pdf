function splitIntoChunks(text, maxChunkSize = 1000, overlap = 200) {
  const chunks = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    let endIndex = startIndex + maxChunkSize;
    
    // If we're not at the end of the text, try to find a good breaking point
    if (endIndex < text.length) {
      // Look for the last period or newline within the last 100 characters
      const searchEnd = Math.min(endIndex, endIndex + 100);
      const lastPeriod = text.lastIndexOf('.', searchEnd);
      const lastNewline = text.lastIndexOf('\n', searchEnd);
      
      // Use the later of the two as the breaking point
      const breakPoint = Math.max(lastPeriod, lastNewline);
      
      if (breakPoint > endIndex - 100) {
        endIndex = breakPoint + 1;
      }
    }

    chunks.push(text.slice(startIndex, endIndex).trim());
    startIndex = endIndex - overlap;
  }

  return chunks;
}

module.exports = {
  splitIntoChunks
}; 