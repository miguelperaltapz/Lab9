const config = require("./config/config.json")
const { table } = require("console");
var express = require("express");
var path = require("path");

var app = express();

var port = process.env.PORT || config.node_port || 3000;

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

var tables = [{
    customerName: "Table1",
    phoneNumber: 11111111,
    customerEmail: "mesa1@gmail.com",
    customerID: 01
}, {
    customerName: "Table2",
    phoneNumber: 22222222,
    customerEmail: "mesa2@gmail.com",
    customerID: 02
}, {
    customerName: "Table3",
    phoneNumber: 33333333,
    customerEmail: "mesa3@gmail.com",
    customerID: 03
}];

var waitTables = [{
    customerName: "Table6",
    phoneNumber: 66666666,
    customerEmail: "mesa6@gmail.com",
    customerID: 06
}]

app.get("/", function(req, res){
    //res.send("Get Requested");
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    res.render('pages/tables',{tables, waitTables});
  });

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

app.get("/api/tables", function(req, res) {
    return res.json(tables);
  });

app.get("/api/waitlist", function(req, res) {
    return res.json(waitTables);
  });

//Ruta dinámica
app.get("/:tables", function(req, res){
    //Variable dinámica
    var chosen = req.params.tables;

    for(var i = 0; i < tables.length; i++){
        if(chosen === tables[i].name){
            return res.json(tables[i]);
        }
    }

    return res.send("No hay reservaciones");
});

app.post("/api/tables", function(req, res){
    if(tables.length < 5){
        tables.push(req.body);
        res.json(true);
    } 
    else{
        waitTables.push(req.body);
        res.json(false);
    }
});

app.post("/api/clear", function(req, res) {
    tables.length = 0;
    waitTables.length = 0;

    res.json({ ok: true });
});

app.listen(port, function(){
    console.log("Server Up");
});
