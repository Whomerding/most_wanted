/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"


/* This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person, people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;

    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁


// Search by different parameter functions
/**
 * We pass in the entire original dataset of people and filter by object attributes.  Can search by one attribute or many attributes. 
 * @param {Array} people        A collection of person objects.
 * @returns {Array}            Returns an array of person objects matching search criteria.
 */
function searchByTraits (people) {
    let displayOption = prompt("Would you like to search by 'one' or 'many' traits?")
    switch(displayOption) {
        case "one":
            let userInput = prompt("What trait would you like to search by?\n'gender'\n'Date of Birth'\n'height'\n'weight'\n'eye color'\n'occupation'")
            userInput = validator(userInput)
            if (userInput === "gender") {
                let foundPeople = searchByGender(people)
                displayPeople (foundPeople);
                break;
            }
            if (userInput === "Date of Birth") {
                let foundPeople = searchByDOB(people)
                displayPeople(foundPeople);
                break;
            }
            if (userInput === "height") {
                let foundPeople = searchByHeight(people)
                displayPeople(foundPeople);
                break;
            }
            if (userInput === "weight") {
                let foundPeople = searchByWeight(people)
                displayPeople(foundPeople);
                break;
            }
            if (userInput === "eye color") {
                let foundPeople = searchByEyeColor(people)
                displayPeople(foundPeople);
                break;
            }
            if (userInput === "occupation") {
                let foundPeople = searchByOccupation(people)
                displayPeople(foundPeople);
                break;
            }
        case "many":  
            let searchRequestMany = prompt ("Please enter up to five search parameters:\n'gender'\n'Date of Birth'\n'height'\n'weight'\n'eye color'\n'occupation'");
            let foundPeople = people;
            if (searchRequestMany.includes ("gender")) {
                foundPeople = searchByGender (foundPeople);
            }
            if (searchRequestMany.includes ("Date of Birth")) {
                foundPeople = searchByDOB (foundPeople);
            }
            if (searchRequestMany.includes ("height")) {
                foundPeople = searchByHeight (foundPeople);
            }    
            if (searchRequestMany.includes ("weight")) {
                foundPeople = searchByWeight (foundPeople);
            }    
            if (searchRequestMany.includes ("eye color")) {
                foundPeople = searchByEyeColor (foundPeople);
            }
            if (searchRequestMany.includes ("occupation")) {
                foundPeople = searchByOccupation (foundPeople);
            }
         
        displayPeople(foundPeople)   
        }

    }
    

/**
 * all searchBy functions take in an array of objects and return an array of objects matching the searchBy criteria.
 * example: searchByGender will retrieve all male or female persons in the people array. 
 * @param {Array} people        A collection of person objects.
 * @returns {Array}            Returns an array of people matching search criteria
 */
function searchByGender (people) {
    let userInput = prompt ("Please enter 'male' or 'female'.");
    let foundPeople = people.filter(function(person) {
        if (person.gender === (userInput)) {
            return true;
        }
    });
    return foundPeople;
}
/**
 * all searchBy functions take in an array of objects and return an array of objects matching the searchBy criteria.
 * example: searchByGender will retrieve all male or female persons in the people array. 
 * @param {Array} people        A collection of person objects.
 * @returns {Array}            Returns an array of people matching search criteria
 */
function searchByDOB (people) {
    let userInput = prompt ("Please enter the Date of Birth in month/day/year format.");
    let foundPeople = people.filter(function(person) {
        if (person.dob === (userInput)) {
            return true;
        }
    });
    return foundPeople;
}
/**
 * all searchBy functions take in an array of objects and return an array of objects matching the searchBy criteria.
 * example: searchByGender will retrieve all male or female persons in the people array. 
 * @param {Array} people        A collection of person objects.
 * @returns {Array}            Returns an array of people matching search criteria
 */
function searchByHeight (people) {
    let userInput = prompt ("Please enter height in inches.");
    let foundPeople = people.filter(function(person) {
        if (person.height === (userInput)) {
            return true;
        }
    });
    return foundPeople;
}
/**
 * all searchBy functions take in an array of objects and return an array of objects matching the searchBy criteria.
 * example: searchByGender will retrieve all male or female persons in the people array. 
 * @param {Array} people        A collection of person objects.
 * @returns {Array}            Returns an array of people matching search criteria
 */
function searchByWeight (people) {
    let userInput = prompt ("Please enter weight in pounds.");
    let foundPeople = people.filter(function(person) {
        if (person.weight === (userInput)) {
            return true;
        }
    });
    return foundPeople;
}
/**
 * all searchBy functions take in an array of objects and return an array of objects matching the searchBy criteria.
 * example: searchByGender will retrieve all male or female persons in the people array. 
 * @param {Array} people        A collection of person objects.
 * @returns {Array}            Returns an array of people matching search criteria
 */
function searchByEyeColor (people) {
    let userInput = prompt ("Please enter eye color.");
    let foundPeople = people.filter(function(person) {
        if (person.eyeColor === (userInput)) {
            return true;
        }
    });
    return foundPeople;
}
/**
 * all searchBy functions take in an array of objects and return an array of objects matching the searchBy criteria.
 * example: searchByGender will retrieve all male or female persons in the people array. 
 * @param {Array} people        A collection of person objects.
 * @returns {Array}            Returns an array of people matching search criteria
 */
function searchByOccupation (people) {
    let userInput = prompt ("Please enter occupation.");
    let foundPeople = people.filter(function(person) {
        if (person.occupation === (userInput)) {
            return true;
        }
    });    
    return foundPeople;
}
 
/**
 * Functions that takes in an object and return an array of objects matching criteria. 
 * @param {Array} people        A collection of person objects.
 * @returns {Array}            Returns an array of people matching search criteria
 */


function findPersonFamily (person, people) {
    let parents = findParents(person, people)
    let parentDisplay= parents.map((el)=>{
        return `Parent: ${el.firstName} ${el.lastName}`;
    });
    let spouse = findSpouse(person, people)
    let spouseDisplay= spouse.map((el)=>{
        return `Spouse: ${el.firstName} ${el.lastName}`;
    });
    let siblings = findSiblings(person, people)
    let siblingDisplay= siblings.map((el)=>{
        return `Sibling: ${el.firstName} ${el.lastName}`;
    });
    let familyDisplay = [];
    familyDisplay = familyDisplay.concat([parentDisplay, spouseDisplay, siblingDisplay]);

    return familyDisplay;
}   
  /**
 * Helper Function to findPersonFamily function.     
 * @param {Object[]} person     A single person object from the people array.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}            Returns an array of people matching search criteria
 */  
function findParents (person, people) {
    let foundPeople = people.filter(function(el) {
    if (person.parents.includes(el.id)) {
        return true;
    }
});
return foundPeople;
}
  /**
 * Helper Function to findPersonFamily function.     
 * @param {Object[]} person     A single person object from the people array.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}            Returns an array of people matching search criteria
 */ 
function findSpouse (person, people) {
    let foundPeople = people.filter(function(el) {
    if (person.currentSpouse === (el.id)) {
        return true;
    }
});
return foundPeople;
}
  /**
 * Helper Function to findPersonFamily function.     
 * @param {Object[]} person     A single person object from the people array.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}            Returns an array of people matching search criteria
 */ 
function findSiblings (person, people) {
    let foundPeople = people.filter(function(el) {
    if (person.parents.toString() === el.parents.toString() && person.id != el.id) {
        return true;
    }
});
return foundPeople;
}

function findPersonDescendants(person, people){
    let foundPeople = people.filter(function(el){
        if (el.parents.includes(person.id)) {
            return true;
        }
    });
    return foundPeople
}

function validator (validInput) {   
        if (validInput === "first name"||validInput==="last name"||validInput==="gender"||validInput==="date of birth"||validInput==="height"||validInput==="weight"||validInput==="eye color"||validInput==="occupation") {
            return validInput;
        }
        else {
            let validInput = prompt("That is not a valid input please type inputs exactly as they appear on the screen. first name\nlast name\ngender\ndate of birth\nheight\nweight\neye color\noccupation")
            validator(validInput)
        }
        return validInput;
}