import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

const firebaseConfig = {
databaseURL: "https://openbox-db-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

function fetchData(){
    const dbref = ref(database, "posts/");
    onValue(dbref, (snapshot) => {
        const data = snapshot.val();
        let flexBox = document.querySelector(".flex-box")
        flexBox.innerHTML = "";
        Object.keys(data).forEach((id) => {
            let row = data[id];
            appendPostCard(id, row["visible"], row["subject"], row["body"]);
        })
    })
}

fetchData()


function appendPostCard(id, visibility, subject, content){
// Create the main post-card div
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.id = id;

        // Create the visibility div
        const visibilityDiv = document.createElement('div');
        visibilityDiv.className = 'visibility';

        // Create the eye-icon image
        const eyeIcon = document.createElement('img');
        eyeIcon.src = 'eye-icon.png';
        eyeIcon.className = 'eye-icon';

        // Create the checkbox input
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${id}`;

        if(visibility == "true"){
            checkbox.checked = true;
        }
        // Create the label for the checkbox
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = 'Toggle';

        // Append the eye-icon, checkbox, and label to the visibility div
        visibilityDiv.appendChild(eyeIcon);
        visibilityDiv.appendChild(checkbox);
        visibilityDiv.appendChild(label);

        // Create the post-content div
        const postContent = document.createElement('div');
        postContent.className = 'post-content';

        // Create the h3 element for the subject
        const sub = document.createElement('h3');
        sub.textContent = subject;

        // Create the paragraph for the content
        const paragraph = document.createElement('p');
        paragraph.textContent = content;

        // Append the subject and paragraph to the post-content div
        postContent.appendChild(sub);
        postContent.appendChild(paragraph);

        // Append the visibility and post-content divs to the post-card div
        postCard.appendChild(visibilityDiv);
        postCard.appendChild(postContent);

        // Append the post-card to the flex-box
        let flexBox = document.querySelector(".flex-box")
        flexBox.appendChild(postCard);

}