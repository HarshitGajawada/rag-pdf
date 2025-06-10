const { Pinecone } = require('@pinecone-database/pinecone');

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT
});

const index = pinecone.Index(process.env.PINECONE_INDEX);

async function upsertVectors(vectors) {
  try {
    await index.upsert(vectors);
  } catch (error) {
    console.error('Error upserting vectors:', error);
    throw error;
  }
}

async function queryVectors(vector, topK = 3) {
  try {
    const results = await index.query({
      vector,
      topK,
      includeMetadata: true
    });
    return results.matches;
  } catch (error) {
    console.error('Error querying vectors:', error);
    throw error;
  }
}

async function deleteVectors(ids) {
  try {
    await index.deleteMany(ids);
  } catch (error) {
    console.error('Error deleting vectors:', error);
    throw error;
  }
}

module.exports = {
  upsertVectors,
  queryVectors,
  deleteVectors
}; 