function modifica(element)
{
	//inserimento con dati precompilati
	let container = $(`#classi-row-${element.id}`);
	console.log($(`#classi-row-${element.id}`));
	container.append(`
		<div class="quickViewTrigger">MODAL TRIGGER 1</div>
		<!-- HIDDEN -->
		<div class="quickViewContainer">
			<div id="quickViewCloseButton" class="close" style="margin-right:10px;"><span></span></div>
			<div class="quickViewTitle">MODAL 1</div>
			<div class="quickViewBody">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacus dolor, vestibulum id fermentum molestie, tempor in ligula. Sed quis leo a erat vehicula hendrerit. Morbi ac elementum risus. Donec pretium euismod sapien quis sagittis. Phasellus sit amet
			volutpat sem.</div>
		</div>

		<div class="modal fade" id="modal-body-modifica class-${element.id}" tabindex="-1" role="dialog" aria-labelledby="modal-label" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="modal-label">Modifica classe</h5>
						<button type="button" class="close" data-dismiss="modal-modifica" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label for="recipient-section" class="col-form-label">Sezione:</label> 
							<input type="text" class="form-control" id="recipient-section" required>
						</div>
						
						<div class="form-group">
							<label for="recipient-year" class="col-form-label">Anno:</label>
							<select id="recipient-year" class="form-control">
								
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
		`);
		console.log(container);
}


function aggiungi(anno, sezione)
{
	//preparo la richiesta ajax
	var xhr = new XMLHttpRequest();
	var id = -1;
	//asincrona
	xhr.open("POST", 'http://localhost/phprest/classes.php', false);
	//configuro la callback di risposta ok
	xhr.onload = function() {
		//scrivo la risposta nel body della pagina
		if (xhr.readyState === 4 && xhr.status === 200) 
		{
			id = JSON.parse(xhr.response).classeInfo.id; //{"status":true,"classeInfo":{"id":"78"}}
			console.log(id);
		}
	};
	//configuro la callback di errore
	xhr.onerror = function() { 
		alert('Errore');
	};
	//invio la richista ajax
	
	var new_class=JSON.stringify({"year": anno, "section": sezione});
	xhr.send(new_class);

	let container = $("#classi-table-body");
			container.append(`
				<tr id='classi-row-${id}'>
					<td class="cell100 column1">${sezione} </td>
					<td class="cell100 column2">${anno}</td>

					<td class="cell100 column3">
						<button class="btn" value="${id}" onclick="visualizza(this)"><i class="fas fa-list"></i></button>
					</td>
					<td class="cell100 column4">
						<button class="btn" value="${id}" onclick="modifica(this)" data-toggle="#modal" data-target="#modal-body-modifica"><i class="fas fa-edit"></i></button>
					</td>
					<td class="cell100 column5">
						<button class="btn" value="${id}" onclick="elimina(this)"><i class="fas fa-trash"></i></button>
					</td>
				</tr>
				
				`);
}

function visualizza(element)
{
	if (document.querySelector("#studenti-table-class-"+element.value) == null)
	{
		//console.log($("#studenti-table-class-"+element.value).rows.length);
		var url = 'http://localhost/phprest/students_classes.php?class=' + element.value;
		//query per visualizzazione
		// "SELECT S.* FROM student as S inner join student_class as SC on S.id=SC.id_student where SC.id_class=:id"
		var xhr = new XMLHttpRequest();
		
		xhr.open("GET", url, true);
		//configuro la callback di risposta ok

		xhr.onload = function() {
			//scrivo la risposta nel body della pagina
			if (xhr.readyState === 4 && xhr.status === 200) 
			{
				var studenti =JSON.parse(xhr.response);
				//console.log(studenti.student_classInfo);
				//console.log(element.value);
				//let container = $("#classi-row-" + element.value);
				
				let container = $("#classi-row-"+element.value);
				//console.log(container.contents("#studenti-table-body-class-"+element.value));
				var Row = document.querySelector("#studenti-table-body-class-"+element.value);
				//console.log(Row);
				if(Row===null) //create the table if not exists
				{
					//container.empty();
					var block = `
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
					studenti.student_classInfo.forEach(element => 
					{
						block+=`
							<tr id='studenti-row-${element.id}'>
								<td class="cell100 column1">${element.name} </td>
								<td class="cell100 column2">${element.surname}</td>
								<td class="cell100 column3">${element.sidi_code}</td>
								<td class="cell100 column4">${element.tax_code}</td>
								<td class="cell100 column5">
									<button class="btn" value="${element.id}" onclick="modificastudent(this)" data-toggle="modal-modifica" data-target="#modal-body-modifica" ><i class="fas fa-edit"></i></button>
								</td>
								<td class="cell100 column6">
									<button class="btn" value="${element.id}" onclick="eliminastudent(this)"><i class="fas fa-trash"></i></button>
								</td>
							</tr>
							`;
					});

					block += `<tr> <button type="button" class="btn " data-toggle="modal" data-target="#modal-body"><i class="fas fa-plus-circle"></i></button></tr>`;
					block+="</tbody></table></div>";
					block+=`</div></td></tr>`;

					var table = document.querySelector("#classi-row-"+element.value);
					$("#classi-row-"+element.value).last().after(block);


					$(`#studenti-table-body-class-${element.value}`).append(`<div><button type="button" class="btn btn-add-studente" data-toggle="modal" id="btn-add-studente-${element.value}" data-target="#modal-body"><i class="fas fa-plus-circle"></i></button></div>`);

					$('.js-pscroll').each(function(){
						var ps = new PerfectScrollbar(this);
			
						$(window).on('resize', function(){
							ps.update();
						});
					});
				}
				else //delete the table if exists
				{
					//console.log($("#classi-row-" +element.value).is($("#studenti-table-body-class-" +element.value)));
					//console.log($("#classi-row-" +element.value).contents($("#studenti-table-body-class-" +element.value)));
					//$("#studenti-table-body-class-" +element.value).last().after(block).empty();
				}
			}
		};
		//configuro la callback di errore
		xhr.onerror = function() { 
			alert('Errore');
		};
		//invio la richista ajax

		xhr.send();
	}
	else if(document.querySelector("#studenti-table-class-"+element.value).style.display=='none')
	{
		document.querySelector("#studenti-table-class-"+element.value).style.display = '';
	}
	else
	{
		document.querySelector("#studenti-table-class-"+element.value).style.display = 'none';
	}
}

//elimina classe
function elimina(element) //element contiene l'ID della classe 
{
	//console.log(element.value);

	var xhr = new XMLHttpRequest(); 
	//asincrona
	var url = 'http://localhost/phprest/classes.php/' + element.value; //http://localhost/phprest/classes.php/classe-2
	xhr.open("DELETE", url , false);
	//console.log(url);
	//configuro la callback di risposta ok
	xhr.onload = function() {
		//scrivo la risposta nel body della pagina
		//document.getElementById('risposta').innerHTML = xhr.response;
	};
	//configuro la callback di errore
	xhr.onerror = function() { 
		alert('Errore');
	};
	//invio la richista ajax
	xhr.send();
	
	var deletedRow = document.querySelector("#classi-row-" + element.value);
	deletedRow.parentNode.removeChild(deletedRow); //prende il genitore della riga e elimina la riga stessa
}

function eliminastudent(element)
{
	//console.log(element.value);

	var xhr = new XMLHttpRequest();
	//asincrona
	var url = 'http://localhost/phprest/students.php/' + element.value; //http://localhost/phprest/classes.php/classe-2
	xhr.open("DELETE", url , false);
	//console.log(url);
	//configuro la callback di risposta ok
	xhr.onload = function() {
		//scrivo la risposta nel body della pagina
		//document.getElementById('risposta').innerHTML = xhr.response;
	};
	//configuro la callback di errore
	xhr.onerror = function() { 
		alert('Errore');
	};
	//invio la richista ajax
	xhr.send();
	
	var deletedRow = document.querySelector("#studenti-row-" + element.value);
	deletedRow.parentNode.removeChild(deletedRow); //prende il genitore della riga e elimina la riga stessa
}


/*
	Richiesta GET visualizzazione classe/elenco classe
*/
//preparo la richiesta ajax
var xhr = new XMLHttpRequest();
//asincrona
xhr.open("GET", 'http://localhost/phprest/classes.php', false);
//configuro la callback di risposta ok
xhr.onload = function() {
	//scrivo la risposta nel body della pagina
	if (xhr.readyState === 4 && xhr.status === 200) 
	{
		var classi = JSON.parse(xhr.response);
		// console.log(classi);
		let container = $("#classi-table-body");
		classi.classeInfo.forEach(element => 
		{
			container.append(`
				<tr id='classi-row-${element.id}'>
					<td class="cell100 column1">${element.section} </td>
					<td class="cell100 column2">${element.year}</td>

					<td class="cell100 column3">
						<button class="btn" value="${element.id}" onclick="visualizza(this)"><i class="fas fa-list"></i></button>
					</td>
					<td class="cell100 column4">
						<button class="btn" value="${element.id}" onclick="modifica(this)"><i class="fas fa-edit"></i></button>
					</td>
					<td class="cell100 column5">
						<button class="btn" value="${element.id}" onclick="elimina(this)"><i class="fas fa-trash"></i></button>
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

$('.js-pscroll').each(function(){
	var ps = new PerfectScrollbar(this);

	$(window).on('resize', function(){
		ps.update();
	})
});