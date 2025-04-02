/**
 * Simple vector store implementation for RAG
 */
export class SimpleVectorStore {
    constructor() {
        this.documents = [];
        this.embeddings = [];
        this.ids = [];
    }

    /**
     * Add a document with its embedding to the vector store
     * @param {string} id - Unique identifier for the document
     * @param {string} document - Document text
     * @param {number[]} embedding - Vector embedding for the document
     * @returns {Promise<boolean>} - Success status
     */
    async add(id, document, embedding) {
        this.ids.push(id);
        this.documents.push(document);
        this.embeddings.push(embedding);
        return true;
    }

    /**
     * Search for similar documents using cosine similarity
     * @param {number[]} queryEmbedding - Vector embedding of the query
     * @param {number} limit - Maximum number of results to return
     * @returns {Promise<Array>} - Array of matching documents with scores
     */
    async search(queryEmbedding, limit = 3) {
        // Compute cosine similarity
        const similarities = this.embeddings.map(embedding => {
            return this.cosineSimilarity(queryEmbedding, embedding);
        });

        // Sort indices by similarity (descending)
        const indices = Array.from(Array(similarities.length).keys())
            .sort((a, b) => similarities[b] - similarities[a])
            .slice(0, limit);

        // Return top matching documents
        return indices.map(i => ({
            id: this.ids[i],
            document: this.documents[i],
            score: similarities[i]
        }));
    }

    /**
     * Calculate cosine similarity between two vectors
     * @param {number[]} vecA - First vector
     * @param {number[]} vecB - Second vector
     * @returns {number} - Cosine similarity score
     */
    cosineSimilarity(vecA, vecB) {
        const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
        const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
        const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    }
} 