/*jslint browser:true */
"use strict"; //makes strict usage of javascript necessary - declared variables etc

//Function to calculate daily home usage - grabs annual KW usage and divides by 365
function addMonths(elem) {
    let annualUseKw = 0, dailyUseKw = 0, i = 0, x = 0;
    const months = document.getElementById(elem).getElementsByTagName('input');
    // console.log(months); - testing purposes

    for (i = 0; i < months.length; i++) {
        x = +months[i].value; //converts the string value of the months index to a number
        annualUseKw += x; //combining the sum of each element in the months array
    } //end loop

    // console.log(annualUseKw)
    dailyUseKw = annualUseKw/365;
    return dailyUseKw;
} //end of function
// const dailyUseKw = addMonths('mpc');
// console.log(dailyUseKw);


//Function to calculate total number of sun hours, by zone
function sunHours() {
    let hrs;
    let theZone = document.forms.solarForm.zone.selectedIndex;
    theZone += 1;

    switch(theZone) {
        case 1:
            hrs = 6;
            break;
        case 2:
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;    
        case 4:
            hrs = 4.5;
            break;        
        case 5:
            hrs = 4.2;
            break;
        case 6:
            hrs = 3.5;
            break;
        default :
            hrs = 0;       
    }  //end switch

    return hrs;
}  //end function


//A function to determine what panel is being selected complete with name and power
function calculatePanel() {
    let userChoice = document.forms.solarForm.panel.selectedIndex;
    let panelOptions = document.forms.solarForm.panel.options;
    let power = panelOptions[userChoice].value;
    let name = panelOptions[userChoice].text;
    let x = [power, name]; //create an array of the power generated and the name
    return x;
} //end function;


//This function is fired by onclick="calculateSolar()" from the html page, line 74
function calculateSolar() {
    const dailyUseKw = addMonths('mpc');
    // console.log(dailyUseKw);

    const sunHoursPerDay = sunHours();
    // console.log(sunHoursPerDay);

    const minKwNeeds = dailyUseKw/sunHoursPerDay;
    // console.log(minKwNeeds);

    const realKwNeeds = minKwNeeds * 1.25; //increase the minimum KW needs by 25% to account for real life variabels.. namely weather/clouds
    // console.log(realKwNeeds);

    const realWattNeeds = realKwNeeds * 1000 //turns Kw into Watts
    // console.log(realWattNeeds);

    const panelInfo = calculatePanel(); //start of panel
    const panelOutput = panelInfo[0];
    const panelName = panelInfo[1];
    // console.log(panelOutput);
    // console.log(panelName);

    const panelsNeeded = Math.ceil(realWattNeeds / panelOutput); //how many panels needed per energy usage and light available
    // console.log(panelsNeeded);
    
    let feedback = "";
        feedback += "<p>Based on your average daily use of " + Math.round(dailyUseKw) + " kWh, you will need to purchase " + panelsNeeded + " " + panelName + " to offset 100% of your electricity bill.</p>"
        feedback += "<h2>Additional Details</h2>"    
        feedback += "<p>Your average daily electricity consumption: " + Math.round(dailyUseKw) + " KwH per day.</p>"
        feedback += "<p>Average sunshine hours per day: " + sunHoursPerDay + " hours</p>"
        feedback += "<p>Realistic watts needed per hour: " + Math.round(realWattNeeds) + " watts/hour.</p>"
        feedback += "<p>The " + panelName +" panel you selected generates about " + panelOutput + " watts per hour.</p>"
    
    document.getElementById('feedback').innerHTML = feedback;
} //end function


