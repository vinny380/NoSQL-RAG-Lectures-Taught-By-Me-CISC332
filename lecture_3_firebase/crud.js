import { db } from './config.js';
import { 
    collection, 
    addDoc, 
    getDoc, 
    getDocs,
    updateDoc, 
    deleteDoc, 
    doc, 
    query,
    where,
    orderBy
} from 'firebase/firestore';

/**
 * Example student data structure (like a JSON object)
 * @type {Object}
 */
const data = {
    name: "John Doe",
    age: 20,
    grade: "A",
    courses: ["Math", "Physics"],
    createdAt: new Date()
}

/**
 * Example update data structure
 * @type {Object}
 */
const dataTwo = {
    grade: "A+",
    courses: ["Math", "Physics", "Chemistry"]
}

/**
 * Adds a new student document to the Firestore database
 * @param {Object} data - The student data to be added
 * @param {string} data.name - Student's full name
 * @param {number} data.age - Student's age
 * @param {string} data.grade - Student's current grade
 * @param {string[]} data.courses - Array of courses the student is enrolled in
 * @param {Date} data.createdAt - Timestamp of when the record was created
 * @throws {Error} If there's an error adding the document
 */
async function addStudent(data) {
    try {
        const collectionRef = collection(db, "students")
        const docRef = await addDoc(collectionRef, data);
        return docRef;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
}

/**
 * Retrieves a single student document from Firestore
 * @param {string} studentId - The unique identifier of the student document
 * @returns {Promise<Object|null>} The student document data if it exists, null otherwise
 * @throws {Error} If there's an error retrieving the document
 */
async function getStudent(studentId) {
    try {
        const docRef = doc(db, "courses", studentId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log("Document exists");
            return docSnap.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document: ", error);
        throw error;
    }
}

/**
 * Retrieves all students with a specific grade from Firestore
 * @param {string} grade - The grade to filter students by
 * @returns {Promise<void>}
 * @throws {Error} If there's an error querying the documents
 */
async function getStudentsByGrade(grade) {
    try {
        const q = query(
            collection(db, "students"),
            where("grade", "==", grade),
            orderBy("name")        
        );
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error("Error getting documents: ", error);
        throw error;
    }
}

/**
 * Updates an existing student document in Firestore
 * @param {string} studentId - The unique identifier of the student document to update
 * @param {Object} data - The data to update in the document
 * @returns {Promise<void>}
 * @throws {Error} If there's an error updating the document
 */
async function updateStudent(studentId, data) {
    try {
        const docRef = doc(db, "students", studentId);
        await updateDoc(docRef, data);
        console.log("Document updated successfully");
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error;
    }
}

/**
 * Deletes a student document from Firestore
 * @param {string} studentId - The unique identifier of the student document to delete
 * @returns {Promise<void>}
 * @throws {Error} If there's an error deleting the document
 */
async function deleteStudent(studentId) {
    try {
        await deleteDoc(doc(db, "students", studentId));
        console.log("Document deleted successfully");
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw error;
    }
}

/**
 * Runs example operations demonstrating Firebase CRUD functionality
 * @returns {Promise<void>}
 * @throws {Error} If any of the example operations fail
 */
async function runExamples() {
    console.log("Starting Firebase Firestore examples...");
    
    // Add a student
    const studentDoc = await addStudent(data);
    console.log("Student added with ID: ", studentDoc.id);
    
    // Update the student
    await updateStudent(studentDoc.id, dataTwo);
}

// Run the examples
runExamples().catch(console.error); 