 $(document).ready(function(){
	$('.stepper').activateStepper({
		showFeedbackLoader: true,
		linearStepsNavigation: true
	});
	handlerTipoReparacion();
	$('.modal').modal();
	 $(function() {
      $('#calificacion_servicio').barrating({
        theme: 'bars-movie'
      });
   });
	//$('.js-signature').children().width('100%');
 });

 function validarReporte(form){
 	errores = [];
 	id_equipo = form.id_equipo.value;
 	tipo_reparacion = form.tipo_reparacion.value;
 	if(id_equipo == ''){
 		errores.push('id_equipo: Especifique el id_equipo')
 	}
 	switch (tipo_reparacion) {
 		case '1': // en sitio
 			diagnostico_equipo = form.diagnostico_equipo.value;
 			firma_img = form.firma_img.value;
 			if(diagnostico_equipo == ''){
 				errores.push('diagnostico_equipo: Debe poner el diagnostico del equipo.')
 			}
 			if(firma_img == ''){
 				errores.push('firma_img: Debe ingresar la firma de conformidad.')
 			}
 			break;
 		case '2': // salida de equipo
 			break;
 		case '3': // dictamen de baja
 			break;
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

 function handlerTipoReparacion(){
 	switch ($('#tipo_reparacion').val()) {
		case '1':
			enSitio()
			break;
		case '2':
			salidaEquipo();
			break;
		case '3':
			dictamenBaja();
			break;
	}
 }

 function enSitio(){
 	inner = `
 			 <div class="input-field">
 				<textarea id="diagnostico_equipo" name="diagnostico_equipo" class="materialize-textarea" data-length="120" required="true" ></textarea>
 				<label for="diagnostico_equipo">Diagnostico del equipo</label>
 			 </div>	
 			 <input type="hidden" id="firma_img" name="firma_img" required="true">
 			 <p>Firma de conformidad: </p>
 			 <div id="firma" style="margin-bottom: 3em;" class="left">
 			 
 			 </div>
 			 <div class="js-signature center" data-width="700" data-height="200" data-border="1px solid black" data-line-color="#272b33">

 			 </div>
 			 <button type="button"  class="btn-floating waves-effect waves-light red lighten-1" onclick="clearCanvas();"> <i class="material-icons">delete</i></button>
 			 <button type="button" id="guardarFirma" class="btn-floating waves-effect waves-light color-back" onclick="saveSignature();"> <i class="material-icons">save</i></button>
 			 <script>
 			 	$('.js-signature').jqSignature();
				$('.js-signature').eq(0).on('jq.signature.changed', function() {
					$('#guardarFirma').attr('disabled', false);
				});
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
				}
 			 </script>
 			`;
 	$('#div_tipo_reparacion').html(inner);
 }
 function salidaEquipo(){
 	 inner = `<p class="thin">*El empleado solicitante debe firmar la autorización de salida del equipo.</p>
 			 <input type="hidden" id="firma_salida" name="firma_salida" required="true">
 			 <p>Firma de salida: </p>
 			 <div id="firma" style="margin-bottom: 3em;" class="left">
 			 
 			 </div>
 			 <div class="js-signature center" data-width="700" data-height="200" data-border="1px solid black" data-line-color="#272b33">

 			 </div>
 			 <button type="button"  class="btn-floating waves-effect waves-light red lighten-1" onclick="clearCanvas();"> <i class="material-icons">delete</i></button>
 			 <button type="button" id="guardarFirma" class="btn-floating waves-effect waves-light color-back" onclick="saveSignature();"> <i class="material-icons">save</i></button>
 			 <script>
 			 	$('.js-signature').jqSignature();
				$('.js-signature').eq(0).on('jq.signature.changed', function() {
					$('#guardarFirma').attr('disabled', false);
				});
				function clearCanvas() {
					$('.js-signature').eq(0).jqSignature('clearCanvas');
					$('#guardarFirma').attr('disabled', true);
				}

				function saveSignature() {
					$('#firma').empty();
					var dataUrl = $('.js-signature').eq(0).jqSignature('getDataURL');
					$('#firma_salida').val(dataUrl);
					var img = $('<img style="width: 50%;border: dashed 1px black;">').attr('src', dataUrl);
					$('#firma').append(img);
					$('#modal_rating').modal('open');
				}
 			 </script>
 			`;
 	$('#div_tipo_reparacion').html(inner);
 }

 function dictamenBaja(){
 	inner = `
	 		<p class="grey-text">*Llene los siguientes datos para generar el dictamen de baja.</p>
 			 <div class="input-field">
 				<textarea id="diagnostico_equipo" name="diagnostico_equipo" class="materialize-textarea" data-length="120" required="true" ></textarea>
 				<label for="diagnostico_equipo">Diagnostico del equipo</label>
 			 </div>	
 			 <input type="hidden" id="firma_img" name="firma_img" required="true">
 			 <p>Firma de conformidad: </p>
 			 <div id="firma" style="margin-bottom: 3em;" class="left">
 			 
 			 </div>
 			 <div class="js-signature center" data-width="700" data-height="200" data-border="1px solid black" data-line-color="#272b33">

 			 </div>
 			 <button type="button"  class="btn-floating waves-effect waves-light red lighten-1" onclick="clearCanvas();"> <i class="material-icons">delete</i></button>
 			 <button type="button" id="guardarFirma" class="btn-floating waves-effect waves-light color-back" onclick="saveSignature();"> <i class="material-icons">save</i></button>
 			 <script>
 			 	$('.js-signature').jqSignature();
				$('.js-signature').eq(0).on('jq.signature.changed', function() {
					$('#guardarFirma').attr('disabled', false);
				});
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
				}
 			 </script>
 			`;
 	$('#div_tipo_reparacion').html(inner);
 }


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
						<a class="right green-text" style="padding:none;margin:none;" onclick="$('#id_equipo').val(${equipo.id_equipo})"> Seleccionar
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