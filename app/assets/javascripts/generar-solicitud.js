$(function(){
   	$('.stepper').activateStepper();
   	solucion = $('#solucion');
   	solucion.change( function(){
		//alert($("#solucion").is(':checked'));
		if(solucion.is(':checked')){
			$('#opciones_solucion').html('<p> si </p>');
		}else{
			$('#opciones_solucion').html('<p> no </p>');
		}
	});

	if(solucion.is(':checked')){
		$('#opciones_solucion').html('<p> si </p>');
	}else{
		$('#opciones_solucion').html('<p> no </p>');
	}
});



function setSolucion(check){
	alert(check.val());
	if(check.val() == "on"){
		check.append('<p>Si </p>');
	}else{
		check.append('<p>No </p>');
	}
}

function getEmpleado(form){
	nombre = form.nombre_empleado.value;
	$.get('/../api/empleado/buscar/nombre/'+nombre, function(data, status){
			empleados = "";
			data.forEach( function(element, index) {
				empleados += `<li>
								<div class="collapsible-header">
									<i class="material-icons left">
										account_circle
									</i>
									${element.nombre}
									<i class="material-icons right green-text" onclick="seleccionarEmpleado(${data.id_empleado});">
										add_circle
									</i>
								</div>
								<div class="collapsible-body">
									<strong> ID empleado: </strong>
									<span>${element.id_empleado} </span>
									<br>
									<strong> CUIP: </strong>
									<span>${element.cuip} </span>
									<br>
									<strong> Numero de empleado: </strong>
									<span>${element.num_empleado} </span>
									<br>
									<strong> Puesto: </strong>
									<span>${element.puesto} </span>
									<br>
									<strong> Adscripcion: </strong>
									<span>${element.adscripcion} </span>
									<br>
								</div>
							</li>`;
			});			
			$('#empleados_list').html(empleados);
	});
	return false;
}