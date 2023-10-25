import { initializeApp } from " https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"




const collabSettings = {
    databaseUrl: "https://collabwrite-2079e-default-rtdb.firebaseio.com/",
    projectId: "collabwrite-2079e"
    //If we use only url then it will throw error as only the service is accessed
    //and with project id firebase get the project and with database url it gets the real time database
    //that will be accessed
}

const collabapp = initializeApp(collabSettings);

const database = getDatabase(collabapp);
const StoryDB = ref(database, "Story");
const newStoryContainer = document.getElementById("newstory-container");
const textEditor = document.getElementById("textEditor");
const storyTextArea = document.getElementById("storyTextArea");
const saveButton = document.getElementById("saveButton");
const savedStory = localStorage.getItem("savedStory");
const collabButton = document.getElementById("collab-button");

let collaborationMode = false;
    //this variable is used to check whether the collaboration mode is enabled or not
 if (savedStory) {
        storyTextArea.value = savedStory;
    }

 collabButton.addEventListener("click", () => {
        const userKey = prompt("Enter the key to collaborate:");
        if (userKey == "1234") {
            collaborationMode = true;
            alert("Collaboration mode enabled. Click the 'New Story' container to start editing.");
        } else {
            collaborationMode = false;
            alert("Incorrect Collaborator Key. Access Denied!!");
        }
    });

  newStoryContainer.addEventListener("click", () => {
        if (collaborationMode) {
            textEditor.style.display = "block";
            
        }
    });

  saveButton.addEventListener("click", () => {
        const storyText = storyTextArea.value;

        if (collaborationMode) {
            const newStoryRef = push(StoryDB, {
                text: storyText
            });

            alert("Story saved.");
        }
        //the above if statement is used to check whether the collaboration mode is enabled or not and
        //if it is enabled then the story is saved in the realtime database of firebase

   localStorage.setItem("savedStory", storyText);
        //we are saving the story in the local storage of the browser because if we dont save
        //the story in the local storage then the story will be lost when we refresh the page
       

        
        storyTextArea.value = "";
        textEditor.style.display = "none";
    });

    storyTextArea.style.height = "450px";
    storyTextArea.style.width = "1179px";

