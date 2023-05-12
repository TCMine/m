
const fsys = require("fs")
data = new Map();
let dirname = './AppData/Kits/'

const fileError = function(fn, err) {
    return console.error(`Failed to load ${fn}: ${err}`)
}

fsys.readdir(dirname, function(err, filenames) {
    if (err) {
        console.log(err)
        return;
    }
    filenames.forEach(function(filename) {
        if (filename === "main.js") return
        fsys.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
            fileError(filename, err);
            return;
        }
        data.set(filename, content);
        });
    });
});
        

    
    
    
    // readFiles('dirname/', function(filename, content) {
        //     data[filename] = content;
        // }, function(err) {
            //     throw err;
            // });


setTimeout(function() {
    data.forEach((file,c) =>{
        const script = document.createElement("script");
        script.src = dirname + c;
        document.head.appendChild(script);
    })

},60)

setTimeout(function() {
    data.forEach((file,c) =>{
        const script = document.createElement("script");
        script.src = "./AppData/app.js";
        document.head.appendChild(script);
        console.log(document.head)
    })
},90)
