// uploadData.js
const admin = require('firebase-admin');
const serviceAccount = require('./bleep-4f982-firebase-adminsdk-feclm-f93e7734a0.json'); // Update this path

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://bleep-4f982-default-rtdb.firebaseio.com/' // Replace with your database URL
});

const firestore = admin.firestore();

// Define your tasks with subtasks and comments
const tasks = [
    {
        id: 'task1',
        name: "Project Setup",
        completed: false,
        subTasks: [
            { id: 'subtask1_1', name: 'Define project objectives and goals.', completed: false },
            { id: 'subtask1_2', name: 'Set up the development environment (Python, Jupyter Notebook/IDE).', completed: false },
            { id: 'subtask1_3', name: 'Install necessary libraries:', completed: false, subTasks: [
                { id: 'subtask1_3_1', name: 'Pandas', completed: false },
                { id: 'subtask1_3_2', name: 'NumPy', completed: false },
                { id: 'subtask1_3_3', name: 'Scikit-learn', completed: false },
                { id: 'subtask1_3_4', name: 'Matplotlib', completed: false },
                { id: 'subtask1_3_5', name: 'Seaborn', completed: false },
                { id: 'subtask1_3_6', name: 'NLTK or SpaCy (for text processing)', completed: false }
            ]}
        ],
        comments: []
    },
    {
        id: 'task2',
        name: "Data Collection",
        completed: false,
        subTasks: [
            { id: 'subtask2_1', name: 'Download the dataset from Kaggle.', completed: false },
            { id: 'subtask2_2', name: 'Load the dataset into a Pandas DataFrame.', completed: false },
            { id: 'subtask2_3', name: 'Inspect the dataset structure (columns, data types).', completed: false }
        ],
        comments: []
    },
    {
        id: 'task3',
        name: "Data Exploration",
        completed: false,
        subTasks: [
            {
                id: 'subtask3_1',
                name: "Initial Data Inspection",
                completed: false,
                subTasks: [
                    { id: 'subtask3_1_1', name: "Use df.info() to check data types and non-null counts.", completed: false },
                    { id: 'subtask3_1_2', name: "Use df.describe() to get summary statistics for numerical features.", completed: false },
                    { id: 'subtask3_1_3', name: "Use df.head() and df.tail() to view the first and last few rows of the dataset.", completed: false }
                ]
            },
            {
                id: 'subtask3_2',
                name: "Data Visualization",
                completed: false,
                subTasks: [
                    { 
                        id: 'subtask3_2_1',
                        name: 'Visualize the distribution of the target variable (real vs. fake postings):',
                        completed: false,
                        subTasks: [
                            { id: 'subtask3_2_1_a', name: 'Create a bar plot to show counts of real and fake postings.', completed: false }
                        ]
                    },
                    {
                        id: 'subtask3_2_2',
                        name: 'Visualize distributions of numerical features:',
                        completed: false,
                        subTasks: [
                            { id: 'subtask3_2_2_a', name: 'Create histograms for features like salary (if available).', completed: false },
                            { id: 'subtask3_2_2_b', name: 'Create box plots for identifying outliers in numerical features.', completed: false }
                        ]
                    }
                ]
            },
            {
                id: 'subtask3_3',
                name: 'Correlation Analysis',
                completed: false,
                subTasks: [
                    { id: 'subtask3_3_1', name: 'Check for correlations between numerical features using a heatmap.', completed: false },
                    { id: 'subtask3_3_2', name: 'Identify any multicollinearity issues.', completed: false }
                ]
            }
        ],
        comments: []
    },
    {
        id: 'task4',
        name: 'Data Preprocessing',
        completed: false,
        subTasks: [
            {
                id: 'subtask4_1',
                name: 'Handling Missing Values',
                completed: false,
                subTasks: [
                    { id: 'subtask4_1_1', name: 'Identify missing values using df.isnull().sum().', completed: false },
                    {
                        id: 'subtask4_1_2',
                        name: 'Decide on strategies to handle missing values:',
                        completed: false,
                        subTasks: [
                            { id: 'subtask4_1_2_a', name: 'Remove rows with missing values (if minimal).', completed: false },
                            { id: 'subtask4_1_2_b', name: 'Fill missing values with mean/median/mode or a placeholder.', completed: false }
                        ]
                    }
                ]
            },
            {
                id: 'subtask4_2',
                name: 'Text Normalization',
                completed: false,
                subTasks: [
                    {
                        id: 'subtask4_2_a',
                        name: 'Normalize text data in job titles and descriptions:',
                        completed: false,
                        subTasks: [
                            { id: 'subtask4_2_a_i', name: 'Convert text to lowercase.', completed: false },
                            { id: 'subtask4_2_a_ii', name: 'Remove punctuation and special characters.', completed: false },
                            { id: 'subtask4_2_a_iv', name: 'Remove stop words using NLTK or SpaCy.', completed: false }
                        ]
                    }
                ]
            },
            {
                id: 'subtask4_3',
                name: 'Feature Engineering',
                completed: false,
                subTasks: [
                    {
                        id: 'subtask4_3_a',
                        name: "Text Vectorization",
                        completed: false,
                        subTasks: [
                            { id: "subtask4_3_a_i", name: "Use TF-IDF or Count Vectorization for job titles and descriptions.", completed: false },
                            { id: "subtask4_3_a_ii", name: "Create a feature matrix from vectorized text.", completed: false }
                        ]
                    },
                    {
                        id: "subtask4_b",
                        name: "Categorical Encoding",
                        completed: false,
                        subTasks: [
                            { id: "subtask4_b_i", name: "One-hot encode categorical variables such as location, department, and job type.", completed: false }
                        ]
                    },
                    {
                        id: "subtask4_c",
                        name: "Additional Features",
                        completed: false,
                        subTasks: [
                            { id: "subtask4_c_i", name: "Create additional features if applicable (e.g., length of job description).", completed: false },
                            { id: "subtask4_c_ii", name: "Identify keywords that may indicate fake postings.", completed: false }
                        ]
                    }
                ]
            }
        ],
        comments: []
    },
    {
        id: 'task5',
        name: "Model Development",
        completed: false,
        subTasks: [
            {
                id: "subtask5_a",
                name: "Data Splitting",
                completed: false,
                subTasks: [
                    { id: "subtask5_a_i", name: "Split the dataset into training and testing sets (e.g., 80% training, 20% testing).", completed: false }
                ]
            },
            {
                id: "subtask5_b",
                name: "Model Selection",
                completed: false,
                subTasks: [
                    { id: "subtask5_b_i", name: "Choose classification algorithms to implement:", completed: false },
                    { id: "algorithm_lr", name: "Logistic Regression", completed: false },
                    { id: "algorithm_dt", name: "Decision Trees", completed: false },
                    { id: "algorithm_svm", name: "SVM", completed: false },
                    { id: "algorithm_rf", name: "Random Forest", completed: false },
                    { id: "algorithm_xgb", name: "XGBoost", completed: false },
                    { id: "algorithm_nn", name: "Neural Networks", completed: false }
                ]
            }
        ],
        comments: []
    }
];


// Export to Firestore
async function uploadTasks() {
    const tasksCollectionRef = firestore.collection('tasks');
    for (const task of tasks) {
        try {
            await tasksCollectionRef.doc(task.id).set(task);
            console.log(`Task with ID: ${task.id} uploaded successfully!`);
        } catch (error) {
            console.error(`Error uploading task with ID: ${task.id}`, error);
        }
    }
}

uploadTasks();
