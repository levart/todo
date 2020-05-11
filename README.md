## ფრონტი:

- შესაძლბელი უნდა იყოს Todo-შექმნა რედაქტირება;
- Todo assign და reassign უნდა იყოს შესაძლებელი მომხმარებლებზე;
- გაკეთების ვადა და სტატუსი;
- იუზერის რეგისტრაცია ავტორიზაცია.

### უნდა იქნას გამოყენებული:
- Angular 9;
- css პრეპროცესორი (Scss, Sass), თუ გადაწყვიტავთ მხოლოდ css-ის გამოყენებას დაასაბუთეთ რატომ?
- UI ბიბლიოთეკა სურვილისამებრ (Bootstrap, Bulma).



## ბექი:

- უნდა იყოს API რისი მეშვეობითაც მოხდება ბაზაში იმ ინფორმაციის შენახვა რაც ფრონტშია ჩამოწერილი:
   Todo და User ები
- შეგიძლიათ გამოიყენოთ როგორც რელაციური, ასევე არალაციური მონაცემების ბაზა ;
- უნდა იყოს node / express ზე შესრულებული.



# TODO client
Todo frontend.
Angular CLI + bootstrap + ngxs
https://todo-one-pink.now.sh

## Getting Started
```
npm install
npm start
```

# TODO server

Todo backend.
NestJS + Mongoose + mongoDB + Swagger

### Configuration
.env
```
PORT=3000
MODE=DEV
SECRET=JWTSecret
JWT_EXPIRE=84600
DB_URI=MongoDBURL
```

### Getting Started
```
npm install
npm run start:dev
```
Swagger dest: http://localhost:3000/docs
https://todo-croco.herokuapp.com/docs/


