var soundList = [],
    index,
    sound,
    selectedSound = null,
    db = "", // URL for folder where sounds are stored
    playerList = [];

function Sound(name, source, player) {
    this.displayName = name;
    this.source = source;
    this.player = player;
}

function compareByPlayer(a, b) {
    if (a.player < b.player) {
        return -1;
    }
    if (a.player > b.player) {
        return 1;
    }
    return 0;
}

function addSounds() {
    sound = new Sound("Title of Sound", db + "name_of_sound.mp3", "Category");
    soundList.push(sound);
    soundList.sort(compareByPlayer);
}



function getPlayerName(player) {
    switch (player) {
    case "nickname":
        return "Category Name";
    
    }
}

function playSound(el, soundFile) {
    
    if (el === document.getElementById("randomButton")) {
        el.mp3 = new Audio(soundFile.source);
        el.mp3.play();
    } else {
        if (el.mp3) {
            if (el.mp3.paused) {
                el.mp3.play();
            } else {
                el.mp3.pause();
            }
        } else {
            el.mp3 = new Audio(soundFile.source);
            el.mp3.play();
        }
    }
}

function displayButtons() {
    var button,
        buttonGroup,
        nameLabel,
        foo = document.getElementById("mainArea"),
        label,
        group,
        player,
        panel,
        panelHeading,
        panelBody,
        idString;
        
    // Create Player Panels
    for (index = 0; index < playerList.length; index += 1) {
        panel = document.createElement("div");
        panel.className = "panel panel-default col-lg-4";
        panelHeading = document.createElement("div");
        panelHeading.className = "panel-heading";
        panelBody = document.createElement("div");
        panelBody.className = "panel-body";
        
        buttonGroup = document.createElement("div");
        buttonGroup.className = "btn-group btn-group-sm";
        buttonGroup.setAttribute("role", "group");
        buttonGroup.id = playerList[index];
        
        label = document.createElement("h6");
        label.className = "panel-title";
        label.innerHTML = getPlayerName(playerList[index]);
        panelBody.appendChild(buttonGroup);
        panelHeading.appendChild(label);
        panel.appendChild(panelHeading);
        panel.appendChild(panelBody);
        foo.appendChild(panel);
    }
    
    for (index = 0; index < soundList.length; index += 1) {
        player = document.getElementById(soundList[index].player);
        button = document.createElement("button");
        button.nodeType = "button";
        button.className = "btn btn-default";
        button.onclick = function () {
            playSound(this, soundList[Number(this.id)]);
        };
        button.id = index.toString();
        button.innerHTML = soundList[index].displayName;
        player.appendChild(button);
    }
}

function logMessage(string) {
    var message = document.createElement("span"),
        parent = document.getElementById("debugArea"),
        linebreak = document.createElement("br");
    message.innerHTML = string;
    parent.insertBefore(message, parent.firstChild);
    parent.insertBefore(linebreak, message);
}

function getPlayerList() {
    var currentPlayer = null;
    for (index = 0; index < soundList.length; index += 1) {
        if (soundList[index].player !== currentPlayer) {
            currentPlayer = soundList[index].player;
            playerList.push(currentPlayer);
        }
    }
}

function playRandom() {
    var randNum;
        randNum = Math.floor((Math.random() * soundList.length));
        playSound(document.getElementById("randomButton"), soundList[randNum]);
}

function initialize() {
    addSounds();
    getPlayerList();
    displayButtons();
}

initialize();