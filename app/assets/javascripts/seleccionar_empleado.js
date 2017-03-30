 $(document).ready(function(){
    $('.modal').modal({opacity: .7});
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

$().ready(function (){
	$('#formValidate').validate({
		rules:{
			nombre: {
				required: true,
				minlength: 3
			},
			password: {
				required: true,
				minlength: 6
			},
			id_empleado: {
				required: true
			}
		},
		messages: {
			nombre:{
                required: "Ingrese un nombre de usuario",
                minlength: "El tamaño minimo del nombre es de 3 caracteres"
	        },
	        password: {
	        	required: "Ingrese una contraseña",
	        	minlength: "El tamaño minimo de la contraseña es de 6 caracteres"
	        },
	        id_empleado:{
	        	required: "El usuario debe estar ligado a un empleado"
	        }
		},
		errorElement : "div",
	    errorPlacement : function(error, element) {
	      var placement = $(element).data('error');
	      if (placement) {
	        $(placement).append(error)
	      } else {
	        error.insertAfter(element);
	      }
	    }
	});
})
