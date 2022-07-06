const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

//SOUND STUFF
// fireAudio = new Audio('fire.wav');
fireAudio = new Audio('sounds/no_fire.wav');

//Show Sword img
document.getElementById("sword").hidden=true;
document.getElementById("cvscroll").hidden=true;




//LOOP SOUND
if (typeof fireAudio.loop == 'boolean')
{
    fireAudio.loop = true;
}
else
{
    fireAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
fireAudio.loop = true;



//
// CURSOR STUFF
// var cursor = document.getElementById("cursor");
// document.body.addEventListener("mousemove", function(e) {
//     cursor.style.left = e.clientX + "px",
//         cursor.style.top = e.clientY + "px";
// });





//GAME STUFF
let state = {}

function startGame(){
    state = {}
    document.getElementById("sword").hidden=true;
    document.getElementById("cvscroll").hidden=true;
    showTextNode(1)

}

function showTextNode(textNodeIndex){
    if(state.sword){
        document.getElementById("sword").hidden=false;

    }
    if(state.cvscroll){
        document.getElementById("cvscroll").hidden=false;
            let url ="cv.pdf"
            const a = document.createElement('a')
            a.href = url
            a.download = url.split('/').pop()
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        
    }
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while(optionButtonsElement.firstChild){
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option =>{
            if (showOption(option)){
                const button = document.createElement('button')
                button.innerText = option.text
                button.classList.add('btn')
                button.addEventListener('click',() => selectOption(option))
                optionButtonsElement.appendChild(button)
            }
    })
}


function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}


function selectOption(option){
     const nextTextnodeId = option.nextText
    if(nextTextnodeId <= 0){
        return startGame()
    }
     Object.assign(state, option.setState)
    showTextNode(nextTextnodeId)
}


const textNodes = [
    {
        id:1,
        text: 'Well hello there wanderer..\nWho goes there?',


        options: [
            {
                text: "I'm just passing by peacefully..",
                setState: {blueGoo: true},
                nextText: 2
            },
            {
                text: "I am looking for someone who wants a really cool job!",
                setState: {blueGoo: false},
                nextText: 3
            },

        ]
    },
    {
        id:2,
        text: 'Oh that is fine, not all who wonder is at loss, tell me this stranger, do you happen to know a boss? ',


        options: [
            {
                text: "No, I am looking for one  myself..",
                requiredState: (currentState) => currentState.blueGoo,
                // setState: {blueGoo: false, sword: true},
                nextText: 4
            },
            {
                text: "Yes!\n[Trade your boss for a sword]",
                setState: {sword: true},
                nextText: 5
            },
            {
                text: "Boss? I've neve heard of such thing!",
                nextText: 4
            },

        ]
    },
    {
        id:3,
        text: 'Well there wanderer, you are in luck. \nBecause if you like what you see ' +
            'this will sound pretty wild.\n' +
            'For i am the creator\n' +
            'of this strange looking child...',


        options: [
            {
                text: "wait..what?",
                nextText: 4
            },
            {
                text: "Nevermind i thought this was serious..",
                nextText: 4
            },

        ]
    },
    {
        id:4,
        text: 'I studied the elders and Im getting wiser with time, for the two years i have studied, i think my time is worth a dime',


        options: [
            {
                text: "ok..im sold! I will accept your resumé",
                setState: {cvscroll: true},
                nextText: 11
            },
            {
                text: "I will wander off..",
                nextText: 11
            },

        ]
    },
    {
        id:5,
        text: 'Introduce me friend, and Im in debt. I favour companios and will never be a threat\n'
        +'The sword you have, will save you in a darker place, summon your boss, fingers crossed I\'ll see you at your workplace',


        options: [
            {
                text: "Restart",
                nextText: -1
            },

        ]
    },
    {
        id:11,
        text: 'If you stumble upon a boss in the far and distant wild, tell him my name, and i will show him how this was styled',


        options: [
            {
                text: "Restart",
                nextText: -1
            },

        ]
    },
]

startGame()