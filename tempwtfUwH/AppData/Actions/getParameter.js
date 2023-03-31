module.exports = {
    data: {"name":"Get Parameter", "paramName":"", "storeAs":"", "button": "String", "choice":"String"},
    UI: {"compatibleWith": ["Slash"],"text": "Get Parameter","sepbar":"sbar", "btext1":"Parameter Name", "input43":"paramName", "btext69":"Store As", "input777":"storeAs", "sepbar422":"sepbar", "menuBar": {choices: ["String", "Boolean", "Channel", "User", "Integer"], storeAs: "choice"}, "preview":"paramName", "previewName":"Name"},
    run(values, interaction, uID) { 
        const fs = require('fs')
        var param;
        switch(values.button) {
            case 'String':
                 param = interaction.options.getString(values.paramName)
            break
            case 'Boolean': 
                 param = interaction.options.getBoolean(values.paramName)
            break
            case 'User':
                 param = interaction.options.getUser(values.paramName)
            break
            case 'Channel':
                 param = interaction.options.getChannel(values.paramName)
            break
            case 'Integer':
                 param = interaction.options.getInteger(values.paramName)
            break
        }

  // do something with the parameter value
  let varTools = require(`../Toolkit/variableTools.js`)
  let tempVar = varTools.tempVar
  let vls = values.storeAs
  fs.writeFileSync('./AppData/Toolkit/tempVars.json', varTools.newVariable(vls, values.paramName, uID), 'utf8')
}
}
// ??