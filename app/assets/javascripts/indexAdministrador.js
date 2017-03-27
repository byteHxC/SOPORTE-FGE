function cambiarEstado(id_usuario, estado){
	cambia = false;
	swal({
		title: "¿Confirmar cambio de estado de este usuario?" + estado.value,
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
	   					id_usuario: id_usuario
	   				},
	   				success: function(res){
	   					swal('Estado cambiado!', "...", "success");
	   				}
	   			})
	   		}
	   }
	)
	return cambia;
}