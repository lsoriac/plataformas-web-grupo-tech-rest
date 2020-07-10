   //=======================
   //========PUERTO=========
   //=======================
   //configuramos el puerto
   process.env.PORT = process.env.PORT || 3000

   //=======================
   //========ENTORNO========
   //=======================

   process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

   //=======================
   //=====BASE DE DATOS=====
   //=======================

   let urlBD

   if (process.env.NODE_ENV === 'dev') {
       urlBD = 'mongodb://localhost:27017/grupo-tech'
   } else {
       urlBD = 'mongodb+srv://grupo-tech-user:qwer789@cluster0.td4kz.mongodb.net/grupo-tech'
   }
   process.env.urlBD = urlBD