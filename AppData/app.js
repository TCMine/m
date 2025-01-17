const interactionTools = require('./AppData/Toolkit/interactionTools.js')
const fese = require('fs')
try {
    fese.readFileSync(processPath + '\\AppData\\data.json', 'utf8')
} catch (err) {
    loadError(err)
}

let lastButton;
let pinHTML;
  
function commandData() {
    let elmd = document.getElementById('commandData')
    elmd.style.animationName = 'expandFrom'
    elmd.style.animationDuration = '0.5s'
    elmd.style.height = '40%'
    elmd.style.maxHeight = '1000%'
    elmd.onclick = () => {}
    elmd.style.borderRadius = '22px'
    setTimeout(() => {
        for (let action in datjson.commands[lastObj]) {
            elmd.innerHTML += `<div class="action"><div>${action}</div> - ${datjson.commands[lastObj].action}</div>`
        }
    }, 500)
}
  let ActionTile = document.getElementById('actionbar');
  let SWT = document.getElementById('switchTask')
  let CmdName = document.getElementById('Command_Name')

let currentlyEditing = false;

  function editAction(ect) {
    currentlyEditing = true;
    lastAct = ect.id
    let action = lastAct
    lastHighlighted.style.backgroundColor = '#232323'
    let edutor = document.getElementById('edutor');
    let bbar = document.getElementById('bbar')
    edutor.style.animationDuration = '0.6s'
    edutor.style.animationName = 'moveFrom'
    bbar.style.animationDuration = '0.6s'
    bbar.style.animationName = 'moveunder'
    ActionTile.style.animationDuration = '0.6s'
    document.getElementById('bottombar').style.animationName = 'fadeout'
    document.getElementById('bottombar').style.animationDuration = '0.4s'
    ActionTile.style.animationName = 'moveFrom'
        pinHTML = edutor.innerHTML;
        let htmle = "<br>"
        let actionData = require(`${processPath}\\AppData\\Actions\\${datjson.commands[lastObj].actions[ect.id].file}`).data 
            for (let dataElement in actionData) {
                if (datjson.commands[lastObj].actions[lastAct].data[dataElement] == undefined) {
                    datjson.commands[lastObj].actions[lastAct].data[dataElement] = actionData[dataElement]
                    fs.writeFileSync(datjson.prjSrc + '\\AppData\\data.json', JSON.stringify(datjson, null, 2))
                }
            }
        
        let UIdata = require(`${processPath}\\AppData\\Actions\\${datjson.commands[lastObj].actions[ect.id].file}`).UI
        console.log(UIdata)
        for (let e in UIdata) {
            console.log(UIdata[e], datjson.commands[lastObj].actions[lastAct].data)

            let ems = e
            if (ems == 'largeInput') {
                htmle = `${htmle} <div class="largeInput" contentEditable="true" id="${UIdata[e]}">${datjson.commands[lastObj].actions[lastAct].data[UIdata[e]]}</div>`
            }
            if (ems.startsWith('input')) {
                htmle = `${htmle} <div class="input" style="animation-name: startFrominput; animation-duration: 0.4s;" contentEditable="true" id="${UIdata[e]}">${datjson.commands[lastObj].actions[lastAct].data[UIdata[e]]}</div>`
            }
            if (ems.startsWith('sepbar')) {
                htmle = `${htmle} <div class="sepbars"></div>`
            }
            if (ems == 'ButtonBar') { 
                let ButtonBar = "";
                let HighlightedButton;
                let extraElements = ''
                let lastLastid = undefined;
                for (let scl in UIdata[ems].buttons) {
                    let button = UIdata[ems].buttons[scl];
                    extraOptions = ''
                        if (UIdata[ems].buttons[parseFloat(scl) + 1] == undefined) {
                            console.log(scl)
                            console.log()
                            extraOptions = 'border-top-right-radius: 12px; border-bottom-right-radius: 12px;'
                        } else {
                            null
                        }

                        if (UIdata[ems].buttons[scl - 1] == undefined || UIdata[ems].buttons[scl - 1] == null) {
                            extraOptions = 'border-top-left-radius: 12px; border-bottom-left-radius: 12px;'
                        } else {
                            null
                        }
                    if (datjson.commands[lastObj].actions[lastAct].data.button == button) {
                        
                        ButtonBar = `${ButtonBar}<div onclick="Bselect(this, '${lastAct}')" class="switchableButton" style="width: 23%; background-color: #FFFFFF20; ${extraOptions}" id="${button}"><div class="barbuttontexta" style="margin: auto;">${button}</div></div>`
                        lastButton = button
                        if (button.endsWith('*')) {
                            extraElements = `${extraElements} <div class="inputB" style="animation-name: startFrominput; animation-duration: 0.3s;" id="ExtraData" contenteditable="true">${datjson.commands[lastObj].actions[lastAct].data.ExtraData}</div>`
                        }
                    } else {
                        ButtonBar = `${ButtonBar}<div onclick="Bselect(this, '${lastAct}')" class="switchableButton" style="${extraOptions}" id="${button}"><div class="barbuttontexta" style="margin: auto;">${button}</div></div>`
                    }
                }
                htmle = `${htmle}<div class="flexbox" style="margin-left: auto; width: 100%;  margin-right: auto; align-content: center; justify-content: center;">${ButtonBar} ${extraElements}</div> <br>`
            }
            
            if (ems.startsWith('menuBar')) {
                MenuBar = ''
                for (let option in UIdata[ems].choices) {
                    if (datjson.commands[lastObj].actions[lastAct].data[UIdata[ems].storeAs] == UIdata[ems].choices[option]) {
                       let thenm = undefined
                       if (UIdata[ems].extraField) {
                        thenm = UIdata[ems].extraField
                       }
                       console.log(thenm, "thenm")
                        htmle = `${htmle}<div class="baction" id="${lastAct}" style="animation-name: appearfadenmt; width: 90% !important; text-align: left; border-radius: 12px; border-bottom-left-radius: 0px; border-bottom: solid 2px #FFFFFF40; padding-bottom: 0px; border-bottom-right-radius: 0px; padding-left: 0px; padding-right: 0px; margin-bottom: 6px; padding-left: 24px !important; " onclick="openChoices('${UIdata[ems].storeAs}', this, '${thenm}', '${ems}')">${UIdata[ems].choices[option]}</div>`
                        if (UIdata[ems].choices[option].endsWith('*')) {
                            htmle = `${htmle} <div class="selectBar" onblur="saveField('${UIdata[ems].extraField}', '${UIdata[ems].storeAs}')" onkeyup="saveField('${UIdata[ems].extraField}', '${UIdata[ems].storeAs}')" id="${thenm}" contenteditable="true">${datjson.commands[lastObj].actions[lastAct].data[UIdata[ems].extraField]}</div>`
                        }
                    }
                }
            }


            if (ems.startsWith('text')) {
                htmle = `${htmle} <div class="text">${UIdata[e]}</div>`
            }
            if (ems.startsWith('btext')) {
                htmle = `${htmle} <div class="textse">${UIdata[e]}</div>`
            }
            if (ems.startsWith('invisible')) {
                htmle = `${htmle} <div class="none"></div>`
            }

        }
          setTimeout(() => {
            edutor.innerHTML = htmle;
            var dfs = ActionTile.innerHTML;
            ActionTile.innerHTML = '<br><div class="text blk" style="text-align: center;">Currently Editing <br> <div class="center halftransparent" id="actionName00"> ' + datjson.commands[lastObj].actions[lastAct].name + '</div></div> <br> <div class="flexbox" style="align-content: center; margin-left: auto; margin-right: auto; width: 90%; justify-content: center;"><div class="barbutton borderright"  onclick="save_changes(\'' + lastAct + '\')"><br><div id="saveobjects69" class="image save"></div></div><div class="barbutton borderleft center" id="cndcl"> <div class="barbuttontext">✕</div></div></div> <div class="daction noanim" style="width: 45%" onclick="selectAction()" id="cakt"><div>Change Action</div></div>' + `
            <div id="actionElements" style="margin-top: auto;"></div>
            ` + ' <div class="smalltext blk" style="margin-top: 14px; text-align: center; font-size: 18px;">Action Of ' + datjson.commands[lastObj].name + ' <br></div> <div class="smalltext blk" style="text-align: center">✓ = Save | ✕ = Discard</div>'
    document.getElementById('cndcl').onclick = () => {restoreTo(dfs, pinHTML)  }
    ActionTile.className = 'actionBar'
    edutor.style.overflowY = 'auto'
    document.getElementById('bottombar').style.opacity = '0%'
    document.getElementById('bottombar').remove()
    bbar.style.opacity = '0%'

        }, 330)
          setTimeout(()=> {
            if (document.getElementById('bottombar')) {
                document.getElementById('bottombar').remove()
            }
        edutor.style.animationDuration = ''
        edutor.style.animationName = ''
        ActionTile.style.animationDuration = ''
        ActionTile.style.animationName = ''
        bbar.style.animationDuration = ''
        bbar.style.animationName = ''
        fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2))
        if (datjson.commands[lastObj].actions[action].data.actionRowElements != undefined) {
            let viewActionRowElements = document.getElementById('actionElements');
            viewActionRowElements.onclick = () => {
                showAvailableSlots(viewActionRowElements)
            }
            viewActionRowElements.className = 'zaction noanim'
            viewActionRowElements.style.width = '45%'
            viewActionRowElements.style.marginRight = 'auto'
viewActionRowElements.style.marginLeft = 'auto'
viewActionRowElements.style.marginTop = 'auto'
            viewActionRowElements.innerHTML = '<div class="barbuttontexta fade">Action Rows</div>'
        }
        delete UIdata
        delete htmle 
        delete edutor
        delete bbar
          }, 610)
}



function Bselect(butt, action) {
    console.log('eeeeeee')
    let edutor = document.getElementById('edutor')
    let oldButton = document.getElementById(lastButton);
    oldButton.style.backgroundColor = '';
    oldButton.style.width = '20%'
    butt.style.width = '23%'
    butt.style.backgroundColor = '#FFFFFF20';
    if (butt.innerText.endsWith('*') && !oldButton.innerText.endsWith('*')) {
        var extrda = document.createElement('div')
        extrda.className = 'inputB'
        extrda.contentEditable = 'true'
        extrda.id = 'ExtraData'
        extrda.style.animationName = 'startFrominput'
        extrda.style.animationDuration = '0.3s'
        butt.parentNode.appendChild(extrda) 
    }
    if (!butt.innerText.endsWith('*') && oldButton.innerText.endsWith('*')) {
        document.getElementById('ExtraData').style.animationName = 'goFromInput'
        setTimeout(() => {
            document.getElementById('ExtraData').remove()
        }, 290)
    }
    lastButton = butt.id
    datjson.commands[lastObj].actions[action].data.button = butt.innerText
    console.log(butt.innerText, datjson.commands[lastObj].actions[action].data.button)
    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2))
    
}


function save_changes(d) {
    let toSave = document.getElementById('saveobjects69')
    let action = lastAct
    console.log(action)
    console.log('started')
    let savd = datjson.commands[lastObj].actions[lastAct]
    var sdd = require(processPath + `\\AppData\\Actions\\${datjson.commands[lastObj].actions[lastAct].file}`)
    delete sdd
    var sdd = require(processPath + `\\AppData\\Actions\\${datjson.commands[lastObj].actions[lastAct].file}`)

    console.log('w')
    for (let i in sdd.UI) {
        let uid = sdd.UI
        let ems = sdd.UI[i]
        console.log(uid)
        console.log(ems)
        if (ems != 'preview' || ems != 'previewName' || !ems.StartsWith('invisible')) {
        if (i == 'ButtonBar' ) {
            if (datjson.commands[lastObj].actions[lastAct].data.button.endsWith('*')) {
                datjson.commands[lastObj].actions[lastAct].data.ExtraData = document.getElementById('ExtraData').innerText
            } 
        } else {
            if (i.startsWith('text') || i.startsWith('menuBar') || i == 'preview' || i == 'previewName' || i.startsWith('sepbar') || i.startsWith('btext') || i.startsWith('invisible')) {
                 
            } else {
                try {
                console.log(document.getElementById(ems))
                datjson.commands[lastObj].actions[lastAct].data[ems] = document.getElementById(ems).innerText;
            } catch(err) {
                console.log(err)
            }}

        }
    }
    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2))
    // toSave.className = 'image save'
    // toSave.className = 'image saveGif'
    toSave.style.backgroundImage = 'url(./AppData/save.gif)'
    setTimeout(() => {
        toSave.style.backgroundImage = 'url(./AppData/save.png)'

        // toSave.className = 'image saveAN'
    }, 700)
}}
function updateName(mnt) {
    let type = 'event'
        if (datjson.commands[lastObj].type == 'action') {
            console.log(datjson.commands[lastObj])
                switch(datjson.commands[lastObj].trigger) {
            case 'slashCommand':
                type = 'slsh'
                break
            case 'textCommand':
                type = 'txt'
            break
            case 'messageContent':
                type = 'msg'
        }
    }
    if (type == 'txt' || type == 'msg') {
        let text = mnt.innerHTML
        let output = text.replaceAll('&nbsp;', "").replaceAll(" ", "")


        datjson.commands[lastObj].name = output.trim()
        
    if (lastType == 0) {
        document.getElementById(lastObj).innerHTML = `<div id="name">${output.trim()}</div> <div style="opacity: 50%; margin-left: 7px;"> | ${Object.keys(datjson.commands[lastObj].actions).length} Actions</div> <div class="deleteActionButton forceRounded" onclick="deleteObject(this)">✕</div>`
    }
    }
    if (type == 'event') {
        datjson.commands[lastObj].name = mnt.innerText
        if (lastType == 0) {
        document.getElementById(lastObj).innerHTML = `<div id="name">${mnt.innerText}</div> <div style="opacity: 50%; margin-left: 7px;"> | ${Object.keys(datjson.commands[lastObj].actions).length} Actions</div> <div class="deleteActionButton forceRounded" onclick="deleteObject(this)">✕</div>`
        }
    }
    if (type == 'slsh') {
        let text = mnt.innerHTML
        let output = text.replaceAll('&nbsp;', "").replaceAll(" ", "")
        datjson.commands[lastObj].name = output.toLowerCase().trim()    
        if (lastType == 0) {
        document.getElementById(lastObj).innerHTML = `<div id="name">${output.toLowerCase().trim()}</div> <div style="opacity: 50%; margin-left: 7px;"> | ${Object.keys(datjson.commands[lastObj].actions).length} Actions</div> <div class="deleteActionButton forceRounded" onclick="deleteObject(this)">✕</div>`
    }
    }



    fs.writeFileSync(processPath + '\\AppData\\data.json', JSON.stringify(datjson, null, 2))
}

    switchObjs()
    switchObjs()
    highlight(document.getElementById('1'), true, true)

    document.getElementById("main").style.visibility = "visible"
    document.getElementById("load").remove()

    function loadError(err) {
        document.body.innerHTML = `<div class="centered">
        <div class="ring" style="margin-bottom:40px"></div>
        <div class="barbuttontexta">Hold on, Studio Bot Maker is downloading a few things!</div></div>`
        setTimeout(() => {
            location.reload()
        }, 10000)
    }