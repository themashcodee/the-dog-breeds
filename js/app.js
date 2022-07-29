// VARIBALES DECLARATION
const API_KEY = 'ed138db8-21c5-4165-b0db-2ba951ee4169';

const breedDropdown = document.getElementById('dogNameList')
const closePopUp = document.getElementById('closePopUp')
const popUpWrapper = document.getElementById('popUpWrapper')
const popUp = document.getElementById('popUp')
let dogList;

const dogImage = document.getElementById('dogImage')
const dogName = document.getElementById('dogName')
const dogLife = document.getElementById('dogLife')
const dogHeight = document.getElementById('dogHeight')
const dogWeight = document.getElementById('dogWeight')
const dogOrigin = document.getElementById('dogOrigin')
const dogBredFor = document.getElementById('dogBredFor')
const dogBreedGroup = document.getElementById('dogBreedGroup')
const dogTemparament = document.getElementById('dogTemparament')


// SETTING API
const headerRequest = new Headers();
headerRequest.append('x-api-key', API_KEY)
headerRequest.append('Content-Type', 'application/json')
const getNames = 'https://api.TheDogAPI.com/v1/breeds'
const REQ_getBreed = new Request(getNames, { method: 'get', headers: headerRequest })


// FUNCTIONS
async function settingBreedDropdown() {
    try {
        const res = (await fetch(REQ_getBreed)).json()
        dogList = await res.then(data => data)
        dogList.forEach(breed => {
            const newBreed = document.createElement('option')
            newBreed.value = breed.name
            newBreed.textContent = breed.name
            breedDropdown.appendChild(newBreed)
        })
    }
    catch (err) {
        console.log(err)
        alert('There is some errors')
    }
}
settingBreedDropdown()

function setPopUp(image, name, life, height, weight, origin, bredfor, breedGroup, temp) {
    dogImage.style.backgroundImage = `url('${image}')`
    dogName.innerHTML = `<span>${name}</span>`
    dogLife.innerHTML = `<span>Life Span</span> : ${life}`
    dogHeight.innerHTML = `<span>Height</span> : ${height} cm`
    dogWeight.innerHTML = `<span>Weight</span> : ${weight} kg`
    dogOrigin.innerHTML = `<span>Origin</span> : ${origin}`
    dogBredFor.innerHTML = `<span>Bred For</span> : ${bredfor}`
    dogBreedGroup.innerHTML = `<span>Breed Group</span> : ${breedGroup}`
    dogTemparament.innerHTML = `<span>Temperament</span> : ${temp}`
}

// EVENTS LISTENERS
breedDropdown.addEventListener('change', async () => {
    const dogName = breedDropdown.value;
    const dog = dogList.find(breed => breed.name === dogName)
    setPopUp(dog.image.url,dog.name,dog.life_span,dog.height.metric,dog.weight.metric,dog.origin,dog.bred_for,dog.breed_group,dog.temperament)
    popUpWrapper.style.display = 'flex'
    setTimeout(() => popUp.style.transform = 'translateY(0)', 1)
})
closePopUp.addEventListener('click', () => {
    popUp.style.transform = 'translateY(100%)'
    setTimeout(() => popUpWrapper.style.display = 'none', 500)
})