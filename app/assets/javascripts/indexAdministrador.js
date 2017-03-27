function cambiarEstado(id_usuario, estado){
	cambia = false;
	swal({
		title: "¿Confirmar cambio de estado de este usuario?" + estado,
		text: "Esto afectara el ingreso del usuario al sistema",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55", 
		confirmButtonText: "Si, estoy seguro.",
	   	cancelButtonText: "No, cancelar.",
	   	closeOnConfirm: false,
	   	closeOnCancel: true,
	   }, function(isConfirm){
	   		if(isConfirm){
	   			cambia = true;
	   			$.ajax({
	   				url: '/usuario/',
	   				method: 'PUT',
	   				data: {
	   					id_usuario: id_usuario,
	   					estado: estado
	   				},
	   				success: function(xml, textStatus, xhr){
	   					if(xhr.status == 200)
	   						swal('Estado cambiado!', "...", "success");
	   					else
	   						swal('Error al cambiar al estado', "...", "error");
	   				}
	   			})
	   		}else{
	   			return false;
	   		}   
	   	}
	)
	return false;
}

function buscarUsuario(form){
	usuario = form.nombre.value || "";
	if(usuario != ""){
		$.get('/../api/usuario/'+usuario, function(data, status){
			usuario = `
					<tr class="row">
						<td>
							${data.nombre}
						</td>
						<td>
							${data.rol}
						</td>
						<td>
							<div class="input-field">
								<select  name="estado" onchange="return cambiarEstado(${data.id_usuario}, '${data.estado}');" >
									`;
									if(data.estado == "activo"){
										usuario += `
													<option value="activo" selected="true"> Activo </option>
													<option value="inactivo" > Inactivo </option>
													`;
									}else if(data.estado == "inactivo"){
										usuario += `
													<option value="activo"> Activo </option>
													<option value="inactivo" selected="true"> Inactivo </option>
													`;
									}
									
								usuario += `</select>
							</div>
						</td>
						<td>
							<a href="/empleado/${data.id_empleado}">
							 Ver empleado </a>
						</td>
					</tr>
					`;
				$('#body_usuarios').html(usuario);
				$(document).ready(function (){
					$('select').material_select();
				});
		});

	}else{
		window.location('/');
	}
	return false;
}

