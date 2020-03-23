# RestPHP
Utilizzando il database mysql fornito, realizzare in PHP le seguenti API rest per le tabelle student (/students.php) e class (classes.php):  

* GET /students.php  -->  ritorna il json con tutti gli stuenti  

* GET /students.php/:id   -->  studente con id passato in input  

* POST /students.php { 'name': 'xxxx', 'surname': 'xxxxx', 'taxCode': 'xxxxx', sidiCode: 'xxxxx'} -->  inserisce lo studente e restituisce il json dello studente inserito  

* DELETE /students.php/:id   -->  cancella lo studente con id passato in input  

* PATCH /students.php/:id { 'id': xxx, 'name': 'xxxx', 'surname': 'xxxxx', 'taxCode': 'xxxxx', sidiCode: 'xxxxx'}   -->  aggiorna lo studente con id passato in input (solo i campi passati in input)  

* PUT /students.php/:id { 'id': xxx, 'name': 'xxxx', 'surname': 'xxxxx', 'taxCode': 'xxxxx', sidiCode: 'xxxxx'}   -->  aggiorna lo studente con id passato in input (tutti i campi, mette a null i campi non presenti)

Realizzazione della grafica tramite framework bootstrap (template -----)

![Image of Frontend](https://github.com/giamberinigiulia/RestPHP/blob/master/images/icons/Frontend.PNG)
