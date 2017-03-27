 $(document).ready(function(){
    $('.modal').modal();
});

$(document).ready(function(){
    $('.collapsible').collapsible();
});

function getEmpleado(form){
	num_empleado = form.num_empleado.value;
	$.get('/../api/empleado/'+num_empleado, function(data, status){
			empleado = `<li>
							<div class="collapsible-header">
								<i class="material-icons left">
									account_circle
								</i>
								${data.nombre}
								<i class="material-icons right" onclick="seleccionarEmpleado(${data.id_empleado});">
									add_circle
								</i>
							</div>
							<div class="collapsible-body">
								<strong> ID empleado: </strong>
								<span>${data.id_empleado} </span>
								<br>
								<strong> CUIP: </strong>
								<span>${data.cuip} </span>
								<br>
								<strong> Numero de empleado: </strong>
								<span>${data.num_empleado} </span>
								<br>
								<strong> Puesto: </strong>
								<span>${data.puesto} </span>
								<br>
								<strong> Adscripcion: </strong>
								<span>${data.adscripcion} </span>
								<br>
							</div>
						</li>`;
			$('#empleados_list').html(empleado);
		//alert("data => "+data);
	});
	return false;
}
function seleccionarEmpleado(id_empleado){
	$('#id_empleado').val(id_empleado);
	$('#seleccionar_empleado').modal('close');
}