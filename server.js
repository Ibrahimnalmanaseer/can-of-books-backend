'use strict';

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

const mongoose = require('mongoose');
app.use(express.json());





mongoose.connect(process.env.MONGODP ||process.env.MONGOCLOUD  , {useNewUrlParser: true, useUnifiedTopology: true}); // 1 - connect mongoose with DB

const BooksSchema = new mongoose.Schema({
  title:String,
  description:String,
  status:String

});


const Book = mongoose.model('Book', BooksSchema);

// async function seedData(){
//       const GoneWithwind= new Book({ title:"Gone with Wind",
//       description:"Scarlett O'Hara, the beautiful, spoiled daughter of a well-to-do Georgia plantation owner, must use every means at her disposal to claw her way out of the poverty she finds herself in after Sherman's March to the Sea.",
//       status:'available'})

//      const HarryPotter=new Book({
//       title:"Harry Potter and the Sorcerer's Stone",
//       description:"Harry Potter's life is miserable. His parents are dead and he's stuck with his heartless relatives, who force him to live in a tiny closet under the stairs. But his fortune changes when he receives a letter that tells him the truth about himself: he's a wizard",
//       status:'Available'

//      })

//      const Mockingbird=new Book({
//       title:"To Kill a Mockingbird",
//       description:"The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. To Kill A Mockingbird, became both an instant bestseller and a critical success when it was first published in 1960.",
//       status:'Available'

//      })

//      await HarryPotter.save();
//      await Mockingbird.save();

//   await GoneWithwind.save();
// }


// seedData();



app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/books',BooksHandler)
app.post('/addbook',NewBookHandler)
app.delete('/deletebook/:id',deleteCatHandler);


async function deleteCatHandler(req,res) {
  const bookid= req.params.id;

  Book.deleteOne({_id:bookid},(err,result)=>{
    
    
    
    Book.find({},(err,result)=>{

      if (err){
        console.log(err)
      }
      else{
        res.send(result);
        
      };
    })
    
  }
    
    )
  

}


async function NewBookHandler(req,res){

    const receivedData =req.body;
    
    await Book.create({

      title:receivedData.title,
      description:receivedData.description,
      status:receivedData.status
    })

    Book.find({},(err,result)=>{

      if (err){
        console.log(err)
      }
      else{
        res.send(result);
        
      };
    })

  };



function BooksHandler(req,res){



   Book.find({},(err,result)=>{

    if (err){
      console.log(err)
    }
    else{
      res.send(result);
      
    };
 
})

}





app.listen(PORT, () => console.log(`listening on ${PORT}`));
