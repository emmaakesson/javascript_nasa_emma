// api och variablar:
const apiKey = 'D5MbN5YePuz1yplYG5I7MALzggcgAZg1529Fgf6R';
const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2022-8-6&api_key=${apiKey}`;
// variabel till min HTML imageContainer där allt ska ligga
const imageContainer = document.querySelector('#image-container');


// fetcha api
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
    // variabel för images
    const images = data.photos;
    // om längden på array bilderna är större än 0 ska det här hända:
    if(images.length !== 0){
        // då ska bilderna begränsas till 8
        limitedImages = images.slice(0, 8);
        // och det ska skapas upp mitt createCard (funktionen jag gjorde)
        limitedImages.forEach((imageData, index) => {
            const card = createCard(imageData);
            // och läggas i min HTML-container
            imageContainer.appendChild(card); 
        });
    } else {
        // annars aka det här hända, alltså om det finns 0 bilder att visa:
        // variabel för message som är felmeddelande om inga bilder finns
        const message = document.createElement('h3');
        //vad som ska stå i message
        message.textContent = 'Inga bilder:((';
        //lägger meddelandet i min container (min container har jag ref till globalt där uppe)
        imageContainer.append(message);
    }
    })
    .catch(error => {
    console.error('Det uppstod ett fel:', error);
    });

  //skapar funktionen
function createCard(imageData) {
    // skapar upp div med klassen card
    const card = document.createElement('div');
    card.classList.add('card');

    // skapar upp h3 med data från NASA
    const heading = document.createElement('h3');
    heading.textContent = imageData.rover.name;

    // skapar upp h3 med data från NASA
    const date = document.createElement('h3');
    date.textContent = imageData.earth_date;

    // skapar upp figure med klassen card-figure
    const figure = document.createElement('figure');
    figure.classList.add('card-figure');

    // skapar upp img med klassen card-image, sedan source för NASA-bilder
    const image = document.createElement('img');
    image.classList.add('card-image');
    image.src = imageData.img_src;
    // lägger bilden i figure
    figure.appendChild(image);
    // lägger h3or och figure i card.
    card.appendChild(heading);
    card.appendChild(date);
    card.appendChild(figure);
    //för att skicka funktionen så den kan användas när den anropas och användas
    return card;
}


// variabler
const switchbtn = document.querySelector('#switchBtn');
const bodyRef = document.querySelector('body');
const headerElement = document.querySelector('.main-header');
const spaceElement = document.querySelector('.space-name');
// för att få tag i alla artiklar och inte bara den första (alla):
const articleElements = document.querySelectorAll('.article');

// mitt LIGHT MODE / DARK MODE:
// för att lägga lyssnare på knappen switchBtn när man klickar:
switchbtn.addEventListener('click', () => {
    // när man klickar ska klassen dark läggas till på:
    // toggle = på/av
    bodyRef.classList.toggle('dark');
    headerElement.classList.toggle('dark');
    spaceElement.classList.toggle('dark');

    // forEach element (alla)
    articleElements.forEach(article => {
        article.classList.toggle('dark');
    });
});


// HÄMTA VÄRDE FRÅN INPUT TILL H2:
// variabel för submit-knapp:
const submitButton = document.querySelector('#submit-btn');

// för att lägga lyssnare på knappen submitButton när man klickar:
submitButton.addEventListener('click', () => {
    // variabel för namn som ska skrivas in och H2:
    const name = inputText.value;
    const welcomeHeading = document.querySelector('#name-display')
    
    //welcomeHeading är min variabel, textContent för att lägga till text, ska bli lika med = (h2-text + input-field text (variabeln name jag gjorde + !) när man klickat på knapp. (skriver ihop sträng med variabeln med sträng:) 
    welcomeHeading.textContent = "Welcome " + name  + "!";

    // för att rensa inputs värde när man skickar in nytt namn (tom sträng)
    inputText.value = '';
    
    // för att knappen ska vara disabled efter klick (submitButton variabel, disabled klass)
    submitButton.disabled = true;
})


// DISABLED KNAPP INNAN MINST 3 TECKEN:
// för att inaktivera knappen från början
submitButton.disabled = true;
// variabel (id)
const inputText = document.getElementById('space-name');

// för att lägga lyssnare på inputText, lyssnar efter input:
inputText.addEventListener('input', () => {
    // för att kontrollera längden på värdet i inputfältet, om det är mer eller lika med 3 är det falskt (knappen blir enabled)
    if (inputText.value.length >= 3) {
        submitButton.disabled = false; // Aktiverar knappen om längden är minst tre tecken, ANNARS:
    } else {
        submitButton.disabled = true; // Inaktiverar knappen om längden är mindre än tre tecken
    }
});

// när inputfield är i fokus
inputText.addEventListener('focus', () => {
    inputText.style.border = '2px solid black'; 
});

// när inputfield inte är i fokus
inputText.addEventListener('blur', () => {
    inputText.style.border = '2px solid transparent';
});
