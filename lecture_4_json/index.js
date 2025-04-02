import { OpenAI } from 'openai';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { SimpleVectorStore } from './vector-store.js';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Initialize vector store
const vectorStore = new SimpleVectorStore();

// Function to extract text from PDF
async function extractTextFromPDF(pdfPath) {
    try {
        console.log(`Reading PDF file: ${pdfPath}`);
        if (!fs.existsSync(pdfPath)) {
            throw new Error(`PDF file not found at path: ${pdfPath}`);
        }
        
        const dataBuffer = fs.readFileSync(pdfPath);
        console.log(`PDF file size: ${dataBuffer.length} bytes`);
        
        // Use pdf-parse with the buffer directly
        const data = await pdf(dataBuffer);
        console.log(`Extracted ${data.text.length} characters of text`);
        return data.text;
    } catch (error) {
        console.error(`Error processing PDF ${pdfPath}:`, error.message);
        throw error;
    }
}

// Function to split text into chunks
function splitTextIntoChunks(text, chunkSize = 1000) {
    const chunks = [];
    const sentences = text.split(/[.!?]+/);
    let currentChunk = '';

    for (const sentence of sentences) {
        if ((currentChunk + sentence).length > chunkSize) {
            chunks.push(currentChunk.trim());
            currentChunk = sentence;
        } else {
            currentChunk += sentence + '. ';
        }
    }
    if (currentChunk) {
        chunks.push(currentChunk.trim());
    }
    console.log(`Split text into ${chunks.length} chunks`);
    return chunks;
}

// Function to get embeddings from OpenAI
async function getEmbeddings(text) {
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: text
        });
        return response.data[0].embedding;
    } catch (error) {
        console.error('Error getting embeddings:', error.message);
        throw error;
    }
}

// Function to process PDF and store in vector database
async function processPDF(pdfPath) {
    try {
        console.log('\nProcessing PDF:', pdfPath);
        const text = await extractTextFromPDF(pdfPath);
        const chunks = splitTextIntoChunks(text);
        
        if (chunks.length === 0) {
            console.log('No valid chunks found in PDF, skipping...');
            return;
        }

        console.log(`Processing ${chunks.length} chunks...`);
        for (let i = 0; i < chunks.length; i++) {
            console.log(`Processing chunk ${i + 1}/${chunks.length}`);
            const embedding = await getEmbeddings(chunks[i]);
            await vectorStore.add(
                `${path.basename(pdfPath)}_chunk_${i}`,
                chunks[i],
                embedding
            );
        }
        console.log(`Successfully processed PDF: ${pdfPath}`);
    } catch (error) {
        console.error(`Failed to process PDF ${pdfPath}:`, error.message);
    }
}

// Function to query the RAG system
async function queryRAG(question) {
    try {
        const questionEmbedding = await getEmbeddings(question);
        const results = await vectorStore.search(questionEmbedding, 3);

        if (results.length === 0) {
            return "I couldn't find any relevant information in the documents to answer your question.";
        }

        const context = results.map(r => r.document).join('\n\n');
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that answers questions based on the provided context. If the context doesn't contain relevant information, say so."
                },
                {
                    role: "user",
                    content: `Context: ${context}\n\nQuestion: ${question}`
                }
            ]
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error querying RAG system:', error.message);
        throw error;
    }
}

// Function to process all PDFs in a directory
async function processAllPDFs(directory) {
    try {
        console.log(`\nInitializing vector database for directory: ${directory}`);

        // Read all files in the directory
        const files = fs.readdirSync(directory);
        const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));

        if (pdfFiles.length === 0) {
            console.log('No PDF files found in the directory.');
            return;
        }

        console.log(`Found ${pdfFiles.length} PDF files:`, pdfFiles);
        
        for (const file of pdfFiles) {
            const pdfPath = path.join(directory, file);
            await processPDF(pdfPath);
        }

        console.log('\nAll PDFs have been processed successfully!');
    } catch (error) {
        console.error('Error processing PDFs:', error.message);
        throw error;
    }
}

// Function to create readline interface
function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

// Function to ask questions interactively
async function askQuestions() {
    const rl = createReadlineInterface();
    
    const askQuestion = () => {
        rl.question('\nEnter your question (or type "exit" to quit): ', async (question) => {
            if (question.toLowerCase() === 'exit') {
                rl.close();
                return;
            }

            try {
                const answer = await queryRAG(question);
                console.log('\nAnswer:', answer);
                askQuestion();
            } catch (error) {
                console.error('Error getting answer:', error.message);
                askQuestion();
            }
        });
    };

    askQuestion();
}

// Main function
async function main() {
    try {
        const pdfDirectory = path.join(__dirname, 'pdfs');
        console.log(`Looking for PDFs in: ${pdfDirectory}`);
        
        // Create pdfs directory if it doesn't exist
        if (!fs.existsSync(pdfDirectory)) {
            fs.mkdirSync(pdfDirectory);
            console.log('Created "pdfs" directory. Please add your PDF files to this directory.');
            return;
        }

        // Process all PDFs
        await processAllPDFs(pdfDirectory);

        // Start interactive question-answering
        console.log('\nYou can now ask questions about your PDFs. Type "exit" to quit.');
        await askQuestions();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main(); 