 $(document).ready(function(){
	$('.stepper').activateStepper({
		showFeedbackLoader: true,
		linearStepsNavigation: true
	});
	carpetaRespaldo();
	$('.js-signature').jqSignature();
	$('.js-signature').eq(0).on('jq.signature.changed', function() {
		$('#guardarFirma').attr('disabled', false);
	});

	$('.modal').modal();
	 $(function() {
      $('#calificacion_servicio').barrating({
        theme: 'bars-movie'
      });
   });
	
 });

 function validarEntrega(form){
 	errores = [];
 	folio = form.folio;
 	diagnostico_equipo = form.diagnostico_equipo.value;
 	respaldo = form.respaldo.checked;
 	if(diagnostico_equipo == ''){
 		errores.push('Falta el diagnostico de equipo')
 	}
 	if(respaldo == true){
 		carpeta_respaldo = form.carpeta_respaldo.value;
 		if(carpeta_respaldo == ''){
 			errores.push('Indique la ruta y servidor donde se encuentra el respaldo.')
 		}
 	}
 	firma_img = form.firma_img.value;
 	if(firma_img == ''){
		errores.push('firma_img: Debe ingresar la firma de conformidad.')
	}
	
	if(errores.length > 0){
 		// no pasa :c
 		errorTop(errores);
 		return false;
 	}else{
 		// pasa validacion
 		if($('#calificacion_servicio').val() == 0){
	 		$('#modal_rating').modal('open');
	 	}
	 	$('#calificacion').val($('#calificacion_servicio').val());
 		return true;
 	}
 }
 function clearCanvas() {
		$('.js-signature').eq(0).jqSignature('clearCanvas');
		$('#guardarFirma').attr('disabled', true);
	}

	function saveSignature() {
		$('#firma').empty();
		var dataUrl = $('.js-signature').eq(0).jqSignature('getDataURL');
		$('#firma_img').val(dataUrl);
		var img = $('<img style="width: 50%;border: dashed 1px black;">').attr('src', dataUrl);
		$('#firma').append(img);
		$('#modal_rating').modal('open');
		$('#calificacion').val($('#calificacion_servicio').val());
	}

 function carpetaRespaldo(){
 	check = document.getElementById('respaldo');
 	if(check.checked){
 		$('#div_carpeta_respaldo').html(`
 			<i class="material-icons prefix"> folder </i>
			<input type="text" class="validate" name="carpeta_respaldo" id="carpeta_respaldo" required="true"/>
			<label for="carpeta_respaldo" class="thin"> Nombre de la carpeta de respaldo</label>`);
 	}else{
 	 	$('#div_carpeta_respaldo').html('');
 	}
 }