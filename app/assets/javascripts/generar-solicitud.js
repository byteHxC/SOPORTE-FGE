 $(document).ready(function(){
    $('.collapsible').collapsible();

 });
        
$(function(){
   	$('.stepper').activateStepper({
   		showFeedbackLoader: true,
   		linearStepsNavigation: false
   	});
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
		$('#opciones_solucion').html(`<textarea id="descripcion_solucion" name="descripcion_solucion" class="materialize-textarea" data-length="120" required="true" ></textarea>
										<label for="descripcion_solucion"> Describa la solución de la solicitud</label>`);
		$('textarea#descripcion_solucion').characterCounter();
	}else{
		// Si no se soluciono el problema dirijira se 
		//seleccionara un usuario de soporte para que reciba el reporte
		$.get('/../api/usuarios/', function(data, status){
			$('#descripcion_solucion').html('<p>*Seleccione un usuario de soporte para darle seguimiento a la solicitud.</p>')
			empleados = "<ul class='collection big-margin-bottom'>";
			data.forEach( function(element, index) {
				empleados += `<li class="collection-item">
					<div class="row">
						<div class="col s6 m6 l6">
							<div class="chip left">
					    		<img class="left" src="/images/user_soporte.png" alt="Contact Person">
					    		${element.nombre}
					    	</div>
					  	</div>
					  	<div class="col s6 m6 l6">
						      <input class="right" name="usuario_soporte" type="radio" id="${element.id_usuario}" value="${element.id_usuario}" required="true"/>
						      <label class="right" for="${element.id_usuario}">Seleccionar</label>
					  	</div>

					</div>
					 
				</li>`;
			});
			empleados += "</ul>";
			$('#opciones_solucion').html(empleados);
			$('.collapsible').collapsible();
		});
	}
}
function getEmpleado(input){
	nombre = input.value;
	$.get('/../api/empleado/buscar/nombre/'+nombre, function(data, status){
			empleados = "";
			data.forEach( function(element, index) {
				empleados += `<li>
								<div class="collapsible-header">
									<i class="material-icons left">
										arrow_drop_down_circle
									</i>
									${element.nombre}
									<i class="material-icons right green-text tooltipped" onclick="seleccionarEmpleado(${element.id_empleado});" data-position="top" data-delay="50" data-tooltip="Seleccioar al empleado" >
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
			if(empleados == ""){
				$('#empleados_list').html("<p class='red-text center'> No se encontraron resultados</p>");
			}else{
				$('#empleados_list').html(empleados);
			}		
			
			$('.stepper').resetStepper(2);
			
	});
	return false;
}

function seleccionarEmpleado(id_empleado){
	$('#empleado_solicitante').val(id_empleado);
}

