 $(document).ready(function(){
	$('.stepper').activateStepper({
		showFeedbackLoader: true,
		linearStepsNavigation: true
	});
 });

 function getEquipo(search){
	//alert('entra');
	buscar_por = $('#buscar_por').val();
	valor = search.value;
	//alert(buscar_por);
	$.get('/../api/equipo/'+buscar_por+'/'+valor, function(data, status){
		inner = "";
		data.forEach( function(equipo, index) {
			inner += `
				<li>
					<div class="collapsible-header">
						<i class="material-icons left">
							more_vert
						</i>
						Numero de serie: ${equipo.numero_serie}
						<a class="right green-text " style="padding:none;margin:none;" onclick="$('#id_equipo').val(${equipo.id_equipo})"> Seleccionar
							<i style="padding:none;margin:none;" class="material-icons right green-text tooltipped" data-position="top" data-delay="50" data-tooltip="Seleccioar el equipo" >
								open_in_browser
							</i>
						</a>
						
					</div>
					<div class="collapsible-body">
						<strong> Clave inventarial: </strong>
						<span>${equipo.clave_inventarial} </span>
						<br>
						<strong> Marca: </strong>
						<span>${equipo.marca} </span>
						<br>
						<strong> Modelo: </strong>
						<span>${equipo.modelo} </span>
						<br>
						<strong> Tipo de equipo: </strong>
						<span>${equipo.nombre} </span>
						<br>
					</div>
				</li>
			`;
		});
		$('#lista_equipos').html(inner);
	});
	return false;
 }

 function validarEquipo(){
	// id_equipo = $('#id_equipo');
	// if(id_equipo.val() == ''){
	// 	alert('Seleccione un equipo')
	// }else{
	// 	//$('.stepper').nextStep();
	// }
 }