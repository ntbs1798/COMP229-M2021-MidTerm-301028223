// modules required for routing
import express,{Request, Response, NextFunction} from 'express';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req:Request, res:Response, next:NextFunction) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req:Request, res:Response, next: NextFunction) => {

  /*****************
   *  CODE ADDED*
   *****************/
   res.render('books/details', { title: 'Add', page: 'details', books: '' });


});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req: Request, res: Response, next: NextFunction) => {

  /*****************
   *  CODE ADDED *
   *****************/
  let id = req.params.id;

  //instantiate a new book item
  let newBook = new book
  ({
    "Title": req.body.Title,
    "Description": req.body.Description,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre
  });
// db.books.insert({contact data is here...})
book.create(newBook,(err)=>{
  if(err)
  {
    console.error(err);
    res.end(err);
  }
  res.redirect('/books');
})
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req: Request, res: Response, next:NextFunction) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
   // pass the id to the db

  // db.books.find({"_id": id})

  book.findById(id,{}, {},(err, bookItemToEdit)=>
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    //show the edit view
    res.render('books/details',{title:'Edit', page:'edit', books: bookItemToEdit})
  });
});


// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req: Request, res: Response, next: NextFunction) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  // instantiate a new Clothing Item
  let updatedBookItem = new book
  ({
    "_id": id,
    "Title": req.body.Title,
    "Description": req.body.Description,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre
  });

  // find the book item via db.contact.update({"_id":id}) and then update
  book.updateOne({_id: id}, updatedBookItem, {}, (err) =>{
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/books');
  });
});


// GET - process the delete by user id
router.get('/delete/:id', (req: Request, res: Response, next:NextFunction) => {

  /*****************
   * CODE ADDED *
   *****************/
  let id = req.params.id;
  // db.books.remove({"_id: id"})
book.remove({_id: id}, (err) => {
  if(err)
  {
    console.error(err);
    res.end(err);
  }

  res.redirect('/books');
});
});


//module.exports = router;
