// Instalar o MongoDB


// Importar o MongoDB

const {MongoClient,ObjectId} = require('mongodb');
const express = require("express");
const app = express();

  const url='mongodb+srv://ivogiordano:b4nc0@banc0db@cluster0.15uk8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const dbName = 'oceandb';

 const client = new MongoClient(url);
async function main() {

// // Realizar a conexão com o banco de dados
  const client = await MongoClient.connect(url);

// // Procurar pela collection que criamos
// // Realizar as operações

  const db = client.db(dbName);

  const collection = db.collection('herois');

//const collection = undefined;



// Informando para o Express considerar o corpo da requisição
// em formato JSON


app.use(express.json());

app.get("/", function (req, res) {
    res.send("Hello, World!");
});

app.get("/oi", function (req, res) {
    res.send("Olá, mundo!");
});

const herois = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];
//               0                   1                2

// [GET] "/herois" - Read All (Ler tudo)
app.get("/herois",async function (req, res) {
    const documentos = await collection.find().toArray();
    
    // res.send(herois.filter(Boolean));
    res.send(documentos);


});

// [GET] "/herois/:id" - Read Single By Id (Ler individualmente - pelo Id)
app.get("/herois/:id", async function (req, res) {
    // Lógica de obtenção do ID
    const id = req.params.id ;

    // console.log(id, typeof id);

    // Lógica de acesso ao dados
    const item = await collection.findOne({ _id:new ObjectId(id)});

    // Lógica de envio desse dado encontrado
    res.send(item);
});

// [POST] "/herois" - Create
app.post("/herois", function (req, res) {
    const item = req.body;

    collection.insertOne(item);
    // herois.push(item.nome);

    res.send("Registro criado com sucesso: " + item.nome);
});

// [PUT] "/herois/:id" - Update (Atualizar)
app.put("/herois/:id", async function (req, res) {
    const id = req.params.id ;

    

    const item = req.body;

    await collection.updateOne(

        {_id: new ObjectId(id)},
        {
            $set: item,
        }

    );



    // herois[id] = item.nome;
//anota
    res.send("Registro atualizado com sucesso: " + item.nome);
});

// [DELETE] "/herois/:id" - Delete (Remover)
app.delete("/herois/:id", async function  (req, res) {
     const id = req.params.id ;

    // delete herois[id];

    await collection.deleteOne({_id: new ObjectId(id)});
    res.send("Registro removido com sucesso.");
});

app.listen(process.env.PORT || 80);

} 

main();
