 $(document).ready(function(){
    $('.collapsible').collapsible();
  });
        
$(function(){
   	$('.stepper').activateStepper();

   	solucion = $('#solucion');
   	solucion.change( function(){
		//alert($("#solucion").is(':checked'));
		setSolucion(solucion.is(':checked'));
	});
   	setSolucion(solucion.is(':checked'));
});

function tipoSolicitud(tipoSolicitud){
	if(tipoSolicitud.value == 2){
		$('#for_no_oficio').html(`
				<input type="number" class="validate" required name="no_oficio">
				<label for="no_oficio"> Número de oficio </label>
			`);
	}else{
		$('#for_no_oficio').html('');
	}
}


function setSolucion(checked){
	if(checked){
		$('#descripcion_solucion').html('');
		// si se soluciono el problema, entonces que se describa la solución
		$('#opciones_solucion').html(`<textarea id="solucion_text" class="materialize-textarea" data-length="120"></textarea>
										<label for="solucion_text"> Describa la solución de la solicitud</label>`);
		$('textarea#solucion_text').characterCounter();
	}else{
		// Si no se soluciono el problema dirijira se 
		//seleccionara un usuario de soporte para que reciba el reporte
		$.get('/../api/usuarios/', function(data, status){
			$('#descripcion_solucion').html('<p>*Seleccione un usuario de soporte para darle seguimiento a la solicitud.</p>')
			empleados = "<ul class='collection big-margin-bottom'>";
			data.forEach( function(element, index) {
				empleados += `<li class="collection-item">
					<i class="material-icons left"> settings </i>
				${element.nombre}
				<i class="material-icons right green-text">add_circle</i>
				</li>`;
			});
			empleados += "</ul>";
			$('#opciones_solucion').html(empleados);
			$('.collapsible').collapsible();
		});
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
										arrow_drop_down_circle
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