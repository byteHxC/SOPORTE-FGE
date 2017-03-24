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
								<i class="material-icons right">
									add_circle
								</i>
							</div>
							<div class="collapsible-body">
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