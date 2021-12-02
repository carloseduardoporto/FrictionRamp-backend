const firebase = require("firebase");
const { Led } = require("johnny-five");


const five = require("johnny-five");
const board = new five.Board({ port: "COM10" });

//PRECISO IMPLEMENTAR O EC MODULES E TYPESCRIPT NESSE BACKEND


board.on("ready", function () {
  const Sobe = new Led(5);
  const Desce = new Led(6);
  const Para = new Led(7);

  let informacaBancoDeDados = "";

  // configuração do banco de dados
  const firebaseConfig = {
    apiKey: "AIzaSyAa_T3mkHgMhU6Od5WKlbh_WLFJildROlM",
    authDomain: "FrictionRamp.firebaseapp.com",
    databaseURL: "https://frictionramp-default-rtdb.firebaseio.com/"
  };
  
  firebase.initializeApp(firebaseConfig);

  let rampaDesce = firebase.database().ref("led");
  let rampaSobe = firebase.database().ref("rampaSobe");
  let rampaPara = firebase.database().ref("rampaPara");


  rampaSobe.on("value", function (snapshot) {
    this.informacaBancoDeDados = snapshot.val();

    if (this.informacaBancoDeDados == "off") {
      Sobe.on();
    } else {
      return;
    }
  })

  rampaDesce.on("value", function (snapshot) {
    this.informacaBancoDeDados = snapshot.val();

    if (this.informacaBancoDeDados == "off") {
      Desce.on();
    } else {
      return;
    }
  })

  rampaPara.on("value", function (snapshot) {
    Para.on();
  })



  board.repl.inject({
    sobir: Sobe,
    descer: Desce,
    para: Para
  });
 
});