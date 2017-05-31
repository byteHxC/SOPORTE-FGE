function modalDetalleEquipo(id_equipo) {
	$('#detalle_equipo').modal('open');
	$.get('/../api/equipo/'+id_equipo, (data, status) => {
		equipo = ``;
		equipo = `
					<h4 class="bold center"> Información de equipo </h4>
					<div class="row">
						<div class="col s12 m12 l4 left">
							<label> Tipo de equipo </label>
							<input type="text" readonly value="${data.tipo_equipo}" />
						</div>
					</div>
					<div class="row">
						<div class="col s12 m12 l4 left">
							<label> Marca </label>
							<input type="text" readonly value="${data.marca}" />
						</div>
						<div class="col s12 m12 l4 right offset-l2">
							<label> Modelo </label>
							<input type="text" readonly value="${data.modelo}" />
						</div>
					</div>
					<div class="row">
						<div class="col s12 m12 l6 left">
							<label> Nº de serie </label>
							<input type="text" readonly value="${data.numero_serie}" />
						</div>
					</div>
					<div class="row">
						<div class="col s12 m12 l6 left">
							<label> Clave inventarial </label>
							<input type="text" readonly value="${data.clave_inventarial}" />
						</div>
					</div>
					<h4 class="bold center"> Especificaciones técnicas </h4>
					<div class="row">
						<div class="col s12 m12 l4 offset-l1">
							<label> Disco duro </label>
							<input type="text" readonly value="${data.disco_duro}"/>
						</div>
						<div class="col s12 m12 l4 offset-l1">
							<label> Sistema Operativo </label>
							<input type="text" readonly value="${data.sistema_operativo}" />
						</div>
					</div>
					<div class="row">
						<div class="col s12 m12 l4 offset-l1">
							<label> Memoria RAM </label>
							<input type="text" readonly value="${data.memoria_ram}"/>
						</div>
						<div class="col s12 m12 l4 offset-l1">
							<label> Procesador </label>
							<input type="text" readonly value="${data.procesador}"/>
						</div>
					</div>
					<div class="row">
						<div class="col s12 m12 l10">
							<label>Observaciones</label>
							<textarea class="materialize-textarea" readonly>${data.observaciones}
							</textarea>
						</div>
					</div>
				`;
		$('#content-equipo').html(equipo);
	});
	
}

function modalDetalleSolicitud(id_solicitud){
	$('#detalle_solicitud').modal('open');
	solicitud = ``;
	$.get('/../api/reporte/'+id_solicitud, function(data, status){
		if(data.firma_salida != ''){
			firmas = `<div class="row">
						<div class="col s12 m12 l5 center">
							<img src="../../signatures/${data.firma_salida}" class="responsive-img" style="border: 1px dashed black;"/>
							<p class="thin"> Firma de salida de equipo por: Calixto Santos perez</p>
						</div>
						<div class="col s12 m12 l5 offset-l2 center">
							<img src="../../signatures/${data.firma_conformidad}" class="responsive-img" style="border: 1px dashed black;"/>
							<p class="thin"> Firma de conformidad y entrega de equipo de: Calixto Santos perez</p>
						</div>
				
					</div>`;
		}else{
			firmas = `<div class="row">
				<div class="col s12 m12 l5 center">
					<img src="../../signatures/${data.firma_conformidad}" class="responsive-img" style="border: 1px dashed black;"/>
					<p class="thin"> Firma de conformidad de Calixto Santos perez</p>
				</div>
			</div>`;
		}
		solicitud = `
				<h4 class="bold"> Detalle de la solicitud</h4>
				<div class="row">
					<div class="col s12 m12 l4 left">
						<label> Tipo de solicitud </label>
						<input type="text" readonly value="${data.tipo_solicitud}"/>
					</div>
					<div class="col s12 m12 l4 right">
						<label>Fecha de solicitud</label>
						<input type="text" readonly value="${data.fecha_solicitud}"/>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m12 l4 left">
						<label> Empleado solicitante </label>
						<input type="text" readonly value="${data.empleado_solicitante}"/>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m12 l4 left">
						<label> Tipo de servicio</label>
						<input type="text" readonly value="${data.tipo_servicio}"/>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m12 l10">
						<label>Descripcion del problema</label>
						<textarea class="materialize-textarea" readonly>
							${data.descripcion_problema}
						</textarea>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m12 l6 left">
						<div class="chip left">
							 Atendio solicitud: ${data.registro_solicitud}
							<img class="left responsive-img" src="../../images/user_soporte.png" alt="Contact Person">
						</div>
					</div>
				</div>
				<h4 class="bold">Datos soporte</h4>
				<div class="row">
					<div class="col s12 m12 l4 left">
						<label>Tipo de reparacion</label>
						<input type="text" readonly value="${data.tipo_reparacion}"/>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m12 l10">
						<label> Diagnostico</label>
						<textarea class="materialize-textarea left" readonly >
							${data.diagnostico_equipo}
						</textarea>
					</div>
				</div>
				${firmas}
			`;
		$('#content-solicitud').html(solicitud);
	});
}			
			
