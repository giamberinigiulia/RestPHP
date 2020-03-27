function apportamodificastudent(x,id,name,surname,SIDI,TAX)//parametri student
{
	if(name=="" || surname=="" || SIDI =="" || TAX =="")
	{
		alert("Non devono rimanere campi vuoti! Riprova");
		//$(`#modal-body-modifica-student-${id}`).modal("show");
	}
	else
	{
		var xhr = new XMLHttpRequest();
		var url = 'http://localhost/phprest/students.php/'+id;
		//asincrona
		xhr.open("PUT", url, true);
		//configuro la callback di risposta ok
		xhr.onload = function() {
			//scrivo la risposta nel body della pagina
			if (xhr.readyState === 4 && xhr.status === 200) 
			{
				updatestudenti(x);
				$('.modal-backdrop').remove();
			}
		};
		//configuro la callback di errore
		xhr.onerror = function() { 
			alert('Errore');
		};
		//invio la richista ajax
		
		var update_student=JSON.stringify({"name": name, "surname": surname, "sidicode": SIDI , "taxcode":TAX});
		xhr.send(update_student);
	}
}

function modificastudent(element,classe) // non funziona
{

	var url = 'http://localhost/phprest/students.php/' + element.id;
	var xhr = new XMLHttpRequest();
	
	xhr.open("GET", url, true);
	//configuro la callback di risposta ok

	xhr.onload = function() 
	{
		if (xhr.readyState === 4 && xhr.status === 200) 
		{
			$studente = JSON.parse(xhr.response).studentInfo;
			console.log(classe);
			//inserimento con dati precompilati
			let container = $(`#studenti-row-${element.id}`);
			console.log(container);
			container.append(`
				<div class="modal modal-centered fade" id="modal-body-modifica-student-${element.id}">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="modal-label">Modifica studente</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<div class="form-group">
									<label for="recipient-section-${$studente.id}" class="col-form-label">Name:</label> 
									<input type="text" class="form-control" id="recipient-name-${$studente.id}" value="${$studente.name}" required>
								</div>
								<div class="form-group">
									<label for="recipient-section-${$studente.id}" class="col-form-label">Surname:</label> 
									<input type="text" class="form-control" id="recipient-surname-${$studente.id}" value="${$studente.surname}" required>
								</div>
								<div class="form-group">
									<label for="recipient-section-${$studente.id}" class="col-form-label">SIDI code:</label> 
									<input type="text" class="form-control" id="recipient-sidi-${$studente.id}" value="${$studente.sidi_code}" required>
								</div>
								<div class="form-group">
									<label for="recipient-section-${$studente.id}" class="col-form-label">TAX code:</label> 
									<input type="text" class="form-control" id="recipient-tax-${$studente.id}" value="${$studente.tax_code}" required>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
								<button type="button" class="btn btn-primary" value="${element.value}" data-dismiss="modal" onclick="apportamodificastudent(this,${$studente.id},document.querySelector('#recipient-name-${$studente.id}').value, document.querySelector('#recipient-surname-${$studente.id}').value, document.querySelector('#recipient-sidi-${$studente.id}').value, document.querySelector('#recipient-tax-${$studente.id}').value)">Salva modifiche</button>
							</div>
						</div>
					</div>
				</div>
				`);
				$(`#modal-body-modifica-student-${element.id}`).modal("show");
		}
	}
	xhr.onerror = function() { 
		alert('Errore');
	};

	xhr.send();

}

function apportamodificaclasse(id,anno,sezione)
{
	if(sezione=="")
	{
		alert("Non devono rimanere campi vuoti! Riprova");
		//$(`#modal-body-modifica-class-${id}`).modal("show");
	}
	else
	{
		var xhr = new XMLHttpRequest();
		var url = 'http://localhost/phprest/classes.php/'+id;
		//asincrona
		xhr.open("PUT", url, true);
		//configuro la callback di risposta ok
		xhr.onload = function() {
			//scrivo la risposta nel body della pagina
			if (xhr.readyState === 4 && xhr.status === 200) 
			{
				visualizzaclassi();
				$('.modal-backdrop').remove();
			}
		};
		//configuro la callback di errore
		xhr.onerror = function() { 
			alert('Errore');
		};
		//invio la richista ajax
		
		var update_classe=JSON.stringify({"year": anno, "section": sezione});
		xhr.send(update_classe);
	}
}

function modificaclasse(element) // non funziona
{

	var url = 'http://localhost/phprest/classes.php/' + element.value;
	
	var xhr = new XMLHttpRequest();
	
	xhr.open("GET", url, true);
	//configuro la callback di risposta ok

	xhr.onload = function() 
	{
		if (xhr.readyState === 4 && xhr.status === 200) 
		{
			$classe = JSON.parse(xhr.response).classeInfo;
			//inserimento con dati precompilati
			let container = $(`#classi-row-${element.value}`);
			console.log(container);
			container.append(`
				<div class="modal fade" id="modal-body-modifica-class-${element.value}">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="modal-label">Modifica classe</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<div class="form-group">
									<label for="recipient-section-${$classe.id}" class="col-form-label">Sezione:</label> 
									<input type="text" class="form-control" id="recipient-section-${$classe.id}" value="${$classe.section}" required>
								</div>
								
								<div class="form-group">
									<label for="recipient-year-${$classe.id}" class="col-form-label">Anno:</label>
									<select id="recipient-year-${$classe.id}" class="form-control">
										
									</select>
								</div>
								<script> // Dynamically add years to the select 
									var i = 1970;

									var data = new Date();
									var thisYear= data.getFullYear();

									var stringa="";
									for (i; i <= 2030; i++) {
										if(i == thisYear) stringa += "<option id='" + i + "' value='" + i + "'>" + i + "</option>";
										else stringa += "<option value='" + i + "'>" + i + "</option>";
										
									}
									
									document.querySelector("#recipient-year-${$classe.id}").innerHTML = stringa;
									$('#recipient-year-${$classe.id} option[value="${$classe.year}"]').prop('selected',true);
								</script>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
								<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="apportamodificaclasse(${$classe.id},document.querySelector('#recipient-year-${$classe.id}').value, document.querySelector('#recipient-section-${$classe.id}').value)">Salva modifiche</button>
							</div>
						</div>
					</div>
				</div>
				`);
				$(`#modal-body-modifica-class-${element.value}`).modal("show");
		}
	}
	xhr.onerror = function() { 
		alert('Errore');
	};

	xhr.send();

}

function aggiungiclasse(anno, sezione) //funziona (solo per le classi)
{
	if(sezione=="")
	{
		alert("Non devono rimanere campi vuoti! Riprova");
		//$(`#modal-body`).modal("show");
	}
	else
	{
		//preparo la richiesta ajax
		var xhr = new XMLHttpRequest();
		var id = -1;
		//asincrona
		xhr.open("POST", 'http://localhost/phprest/classes.php', true);
		//configuro la callback di risposta ok
		xhr.onload = function() {
			//scrivo la risposta nel body della pagina
			if (xhr.readyState === 4 && xhr.status === 200) 
			{
				id = JSON.parse(xhr.response).classeInfo.id; //{"status":true,"classeInfo":{"id":"78"}}
				visualizzaclassi();
				$(`#modal-body`).modal("hide");
			}
		};
		//configuro la callback di errore
		xhr.onerror = function() { 
			alert('Errore');
		};
		//invio la richista ajax
		
		var new_class=JSON.stringify({"year": anno, "section": sezione});
		xhr.send(new_class);
	}
}

function aggiungistudente(classe,name,surname,sidi,tax)
{
	if(name=="" || surname =="" || sidi =="" || tax=="" || sidi.length  !=7 || tax.length != 16)
	{
		alert("Non devono rimanere campi vuoti! Riprova");
		//$(`#modal-body-aggiungi-studente-${classe.value}`).modal("show");
	}
	else
	{
		//preparo la richiesta ajax
		var xhr = new XMLHttpRequest();
		var id = -1;
		//asincrona
		xhr.open("POST", 'http://localhost/phprest/students.php', true);
		//configuro la callback di risposta ok
		xhr.onload = function() {
			//scrivo la risposta nel body della pagina
			if (xhr.readyState === 4 && xhr.status === 200) 
			{
				id = JSON.parse(xhr.response).studentInfo.id; //{"status":true,"classeInfo":{"id":"78"}}
				if(id!==-1)
				{
					var xhr2 = new XMLHttpRequest();
					//asincrona
					xhr2.open("POST", 'http://localhost/phprest/students_classes.php', true);
					//configuro la callback di risposta ok
					xhr2.onload = function() {
						//scrivo la risposta nel body della pagina
						if (xhr2.readyState === 4 && xhr2.status === 200) 
						{
							updatestudenti(classe);
							$('.modal-backdrop').remove();
						}
					};
					//configuro la callback di errore
					xhr2.onerror = function() { 
						alert('Errore');
					};
					//invio la richista ajax
					
					var new_student_classes=JSON.stringify({"id_student": id, "id_class": classe.value});
					xhr2.send(new_student_classes);

				}
			}
		};
		//configuro la callback di errore
		xhr.onerror = function() { 
			alert('Errore');
		};
		//invio la richista ajax
		var new_student=JSON.stringify({"name": name, "surname": surname, "sidicode": sidi, "taxcode": tax});
		xhr.send(new_student);
	}
}

function updatestudenti(element)
{
		var url = 'http://localhost/phprest/students_classes.php?class=' + element.value;
		var xhr = new XMLHttpRequest();
		
		xhr.open("GET", url, true);
		//configuro la callback di risposta ok

		xhr.onload = function() {
			//scrivo la risposta nel body della pagina
			if (xhr.readyState === 4 && xhr.status === 200) 
			{
				var studenti = JSON.parse(xhr.response);

				let container = $("#classi-row-"+element.value);

				$("#studenti-table-body-class-"+element.value).empty();
				$("#studenti-table-class-"+element.value).remove();
				
					var  block = `
							<tr id="studenti-table-class-${element.value}">
								<td align="center" colspan="6" class="table-studenti" id="studenti-table-body-class-${element.value}">
											<div class="table100 ver1 m-b-110">
												<div class="table100-head">
													<table>
														<thead>
															<tr class="row100 head">
																<th class="cell100 column1">Name</th>
																<th class="cell100 column2">Surname</th>
																<th class="cell100 column3">SIDI</th>
																<th class="cell100 column4">Tax Code</th>
																<th class="cell100 column5">Edit</th>
																<th class="cell100 column6">Delete</th>
															</tr>
														</thead>
													</table>
												</div>
												
												<div class="table100-body js-pscroll">
													<table>
														<tbody>
														
								`;
					var classe=element;
					studenti.student_classInfo.forEach(element => 
					{
						var obj =
						{
							id: element.id,
							value: classe.value
						}
						block+=`
							<tr id='studenti-row-${element.id}'>
								<td class="cell100 column1">${element.name} </td>
								<td class="cell100 column2">${element.surname}</td>
								<td class="cell100 column3">${element.sidi_code}</td>
								<td class="cell100 column4">${element.tax_code}</td>
								<td class="cell100 column5">
									<button class="btn" id="${obj.id}" value="${obj.value}" onclick="modificastudent(this)" data-toggle="modal-modifica" data-target="#modal-body-modifica" ><i class="fas fa-edit"></i></button>
								</td>
								<td class="cell100 column6">
									<button class="btn" value="${element.id}" onclick="eliminastudent(this)"><i class="fas fa-trash"></i></button>
								</td>
							</tr>
							`;
					});

					block += `<tr> <button type="button" class="btn " data-toggle="modal" data-target="#modal-body-aggiungi-studente-${element.value}" ><i class="fas fa-plus-circle"></i></button>`;
					block+=` <div class="modal modal-centered fade" id="modal-body-aggiungi-studente-${element.value}">
						<div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="modal-label">Nuovo studente</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<div class="form-group">
										<label for="recipient-section-${element.value}" class="col-form-label">Name:</label> 
										<input type="text" class="form-control" id="recipient-name-${element.value}" required autofocus>
									</div>
									<div class="form-group">
										<label for="recipient-section-${element.value}" class="col-form-label">Surname:</label> 
										<input type="text" class="form-control" id="recipient-surname-${element.value}" required>
									</div>
									<div class="form-group">
										<label for="recipient-section-${element.value}" class="col-form-label">SIDI code:</label> 
										<input type="text" class="form-control" id="recipient-sidi-${element.value}" required>
									</div>
									<div class="form-group">
										<label for="recipient-section-${element.value}" class="col-form-label">TAX code:</label> 
										<input type="text" class="form-control" id="recipient-tax-${element.value}" required>
									</div>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
									<button type="button" class="btn btn-primary" value="${element.value}" data-dismiss="modal" onclick="aggiungistudente(this,document.querySelector('#recipient-name-${element.value}').value, document.querySelector('#recipient-surname-${element.value}').value, document.querySelector('#recipient-sidi-${element.value}').value, document.querySelector('#recipient-tax-${element.value}').value)">Aggiungi</button>
								</div>
							</div>
						</div>
					</div>
					</tr>`;
					block += "</tbody></table></div>";
					block += `</div></td></tr>`;
					var table = document.querySelector("#classi-row-"+element.value); //document.querySelector == $
					$("#classi-row-"+element.value).last().after(block);

					$('.js-pscroll').each(function(){
						var ps = new PerfectScrollbar(this);
			
						$(window).on('resize', function(){
							ps.update();
						});
					});
				}
		};
		//configuro la callback di errore
		xhr.onerror = function() { 
			alert('Errore');
		};
		//invio la richista ajax

		xhr.send();

}

function visualizzaclassi()
{
	//preparo la richiesta ajax
	var xhr = new XMLHttpRequest();
	//asincrona
	xhr.open("GET", 'http://localhost/phprest/classes.php', true);
	//configuro la callback di risposta ok
	xhr.onload = function() {
		//scrivo la risposta nel body della pagina
		if (xhr.readyState === 4 && xhr.status === 200) 
		{
			var classi = JSON.parse(xhr.response);
			// console.log(classi);
			let container = $("#classi-table-body");
			container.empty();
			classi.classeInfo.forEach(element => 
			{
				container.append(`
					<tr id='classi-row-${element.id}'>
						<td class="cell100 column1">${element.section} </td>
						<td class="cell100 column2">${element.year}</td>

						<td class="cell100 column3">
							<button class="btn" value="${element.id}" onclick="visualizzastudenti(this)"><i class="fas fa-list"></i></button>
						</td>
						<td class="cell100 column4">
							<button class="btn" value="${element.id}" onclick="modificaclasse(this)" data-toggle="#modal" data-target="#modal-body-modifica-class-${element.id}"><i class="fas fa-edit"></i></button>
						</td>
						<td class="cell100 column5">
							<button class="btn" value="${element.id}" onclick="eliminaclasse(this)"><i class="fas fa-trash"></i></button>
						</td>
					</tr>
					
					`);
			});
		}
	};
	//configuro la callback di errore
	xhr.onerror = function() { 
		alert('Errore');
	};
	//invio la richista ajax
	xhr.send();

}

function visualizzastudenti(element)
{
	$(`#vuoto-${element.value}`).remove();
	
	if (document.querySelector("#studenti-table-class-"+element.value) == null)
	{
		updatestudenti(element);
	}
	else if(document.querySelector("#studenti-table-class-"+element.value).style.display=='none')
	{
		document.querySelector("#studenti-table-class-"+element.value).style.display = '';
	}
	else
	{
		document.querySelector("#studenti-table-class-"+element.value).style.display = 'none';
		$("#classi-row-"+element.value).last().after(`<tr id="vuoto-${element.value}"></tr>`);
	}
}

//elimina classe
function eliminaclasse(element) //element contiene l'ID della classe 
{

	var xhr = new XMLHttpRequest(); 
	//asincrona
	var url = 'http://localhost/phprest/classes.php/' + element.value; //http://localhost/phprest/classes.php/classe-2
	xhr.open("DELETE", url , true);
	//configuro la callback di risposta ok
	xhr.onload = function() {
		if (xhr.readyState === 4 && xhr.status === 200) 
		{
			var deletedRow = document.querySelector("#classi-row-" + element.value);
			deletedRow.parentNode.removeChild(deletedRow); //prende il genitore della riga e elimina la riga stessa
		}
	};
	//configuro la callback di errore
	xhr.onerror = function() { 
		alert('Errore');
	};
	//invio la richista ajax
	xhr.send();
}

function eliminastudent(element)
{

	var xhr = new XMLHttpRequest();
	//asincrona
	var url = 'http://localhost/phprest/students.php/' + element.value; //http://localhost/phprest/classes.php/classe-2
	xhr.open("DELETE", url , true);
	//configuro la callback di risposta ok
	xhr.onload = function() {
		if (xhr.readyState === 4 && xhr.status === 200) 
		{
			var deletedRow = document.querySelector("#studenti-row-" + element.value);
			deletedRow.parentNode.removeChild(deletedRow); //prende il genitore della riga e elimina la riga stessa
		}
	};
	//configuro la callback di errore
	xhr.onerror = function() { 
		alert('Errore');
	};
	//invio la richista ajax
	xhr.send();

}


$(document).ready(visualizzaclassi());

$('.js-pscroll').each(function(){
	var ps = new PerfectScrollbar(this);

	$(window).on('resize', function(){
		ps.update();
	})
});