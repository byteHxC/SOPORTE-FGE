$(document).ready(function(){
	$('.collapsible').collapsible();
	$('#filtro_reparado').change(() => {
		fecha = $('.datepicker').val().split("/");
		if(fecha != null){
			actualizarTablaDeReportes(fecha[1], fecha[0]);
		}else{
			actualizarTablaDeReportes(null, null);
		}
	})
	$('.datepicker').pickadate({
		monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
		showMonthsShort: true,
		format: 'mm/yyyy',
		onClose: () => {
			fecha = $('.datepicker').val().split("/");
			if(fecha != null){
				actualizarTablaDeReportes(fecha[1], fecha[0]);
			}else{
				actualizarTablaDeReportes(null, null);
			}
		}
	});	
});

function modalDetalleEquipo(id_equipo) {
	$('#detalle_equipo').modal('open');
	$.get('/../api/equipo/'+id_equipo, (data, status) => {
		historial_html = `<ul class="collapsible" data-collapsible="accordion">
							<li>
								<div class="collapsible-header color-back white-text thin"> Historial
									<i class="material-icons left"> phonelink_setup </i>
								</div>
							
							</li>
						`;

		data.historial.forEach((historial_item) => {
			historial_html += `<li>
									<div class="collapsible-header"><i class="material-icons">bug_reporte</i>Reporte: <a href="/reporte/${historial_item.folio}">${historial_item.folio_formato}</a></div>
									<div class="collapsible-body">
										<p>
											<strong>Fecha solicitud: </strong>
											${historial_item.solicitud_fecha}
										</p>
										<p>
											<strong>Fecha entrega: </strong>
											${historial_item.reporte_fecha_entrega || "no se ha entregado"}
										</p>
										<p>
											<strong>Atendio el soporte: </strong>
											${historial_item.nombre}
										</p>
										<p>
											<strong>Descripción del problema: </strong>
											${historial_item.descripcion_problema}
										</p>
										<p>
											<strong>Diagnostico: </strong>
											${historial_item.diagnostico_equipo}
										</p>
										<p>
											<strong> El equipo fue : </strong>
											${historial_item.reparado}
										</p>
										<p>
											<strong>Se instalo en su ubicación: </strong>
											${historial_item.instalado_en_ubicacion}
										</p>
										
									</div>
								</li>`;
		});
	
    
		historial_html += `</ul>`;

		equipo = ``;
		equipo = `
					<h4 class="bold center"> Información de equipo </h4>
					<div class="row">
						<div class="col s12 m12 l4 left">
							<label> Tipo de equipo </label>
							<input type="text" readonly value="${data['equipo'].tipo_equipo}" />
						</div>
					</div>
					<div class="row">
						<div class="col s12 m12 l4 left">
							<label> Marca </label>
							<input type="text" readonly value="${data['equipo'].marca}" />
						</div>
						<div class="col s12 m12 l4 right offset-l2">
							<label> Modelo </label>
							<input type="text" readonly value="${data['equipo'].modelo}" />
						</div>
					</div>
					<div class="row">
						<div class="col s12 m12 l6 left">
							<label> Nº de serie </label>
							<input type="text" readonly value="${data['equipo'].numero_serie}" />
						</div>
					</div>
					<div class="row">
						<div class="col s12 m12 l6 left">
							<label> Clave inventarial </label>
							<input type="text" readonly value="${data['equipo'].clave_inventarial}" />
						</div>
					</div>
					<h4 class="bold center"> Especificaciones técnicas </h4>
					<div class="row">
						<div class="col s12 m12 l4 offset-l1">
							<label> Disco duro </label>
							<input type="text" readonly value="${data['equipo'].disco_duro}"/>
						</div>
						<div class="col s12 m12 l4 offset-l1">
							<label> Sistema Operativo </label>
							<input type="text" readonly value="${data['equipo'].sistema_operativo}" />
						</div>
					</div>
					<div class="row">
						<div class="col s12 m12 l4 offset-l1">
							<label> Memoria RAM </label>
							<input type="text" readonly value="${data['equipo'].memoria_ram}"/>
						</div>
						<div class="col s12 m12 l4 offset-l1">
							<label> Procesador </label>
							<input type="text" readonly value="${data.equipo.procesador}"/>
						</div>
					</div>
					<div class="row">
						<div class="col s12 m12 l10">
							<label>Observaciones</label>
							<textarea class="materialize-textarea" readonly>${data.equipo.observaciones}
							</textarea>
						</div>
					</div>
					<div class="row">
						 ${historial_html}
					</div>
				`;
		$('#content-equipo').html(equipo);
    	$('.collapsible').collapsible();
	});
	
}

function actualizarTablaDeReportes(anio, mes){
	reparado = ($('#filtro_reparado').is(':checked')) ? 'true' : 'false';

	if(anio == null && mes == null){
		now = new Date();
		mes = now.getMonth()+1;
		anio = now.getFullYear();
		mes = (mes < 10) ? '0'+mes : mes;
	}
	$.get(`/../api/reportes/${reparado}/${anio}/${mes}`, (reporte, status) => {
		reportes = ``
		
		reporte.forEach((reporte, index) => {
			tipo_reparacion = ""
			if(reporte.nombre == 'En sitio'){
				tipo_reparacion = `<td>${reporte.nombre}</td>`;
			}else{
				if(reporte.reparado == 'reparado'){
					tipo_reparacion = `<td>${reporte.nombre}</td>`;
				}else if (reporte.nombre == "Salida de equipo"){
					tipo_reparacion = `<td>${reporte.nombre}</td><td><a class="btn blue darken-1" style="padding:0px;" href="equipo/entrega/${reporte.folio}">Entrega equipo <i class="material-icons right"></i></a></td>`;
				}
			}
			acciones = ""
			if(reporte.reparado == 'reparado'){
				acciones = `<td>
								<a class="margin-lados tooltiped" data-position="top" data-delay="50" data-tooltip="Ver reporte" href="/reporte/${reporte.folio}"> <i class="material-icons">visibility</i></a>
								<a class="margin-lados tooltiped" data-position="top" data-delay="50" data-tooltip="Imprimir reporte" target="_blank" href="/reporte/pdf/${reporte.folio}"> <i class="material-icons">picture_as_pdf</i></a>
							</td>`;
			}else if(reporte.reparado == 'no reparado'){
				// mostrar imprimir dictamen de baja
				if(reporte.nombre == 'Dictamen de baja'){
					acciones = `<td>${reporte.nombre}</td><td>
									<a class="margin-lados tooltiped" data-position="top" data-delay="50" data-tooltip="Ver dictamen de baja" href="/reporte/${reporte.folio}"> <i class="material-icons">visibility</i></a>
									<a class="margin-lados tooltiped" data-position="top" data-delay="50" data-tooltip="Imprimir dictamen de baja"  target="_blank" href="/dictamen_baja/pdf/${reporte.folio}"> <i class="material-icons">picture_as_pdf</i></a>
								</td>`;
				}
			}
			reportes += `
				<tr>
					<td>${reporte.folio_formato}</td>
					<td>
						<a href="#" class="btn btn-block blue" style="padding:0px;"  onclick="modalDetalleSolicitud(${reporte.id_solicitud});"> Solicitud: ${reporte.id_solicitud} </a> 
					</td>
					<td>
						<a href="#" class="btn btn-block blue" style="padding:0px;" onclick="modalDetalleEquipo(${reporte.id_equipo});"> Equipo: ${reporte.id_equipo} </a>
					</td>
					<td>${reporte.diagnostico_equipo}</td>
					<td>${reporte.reparado}</td>
					${tipo_reparacion}
					${acciones}
				</tr>
			`
		});
		$('#rows_reportes').html(reportes);
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
							<p class="thin"> Firma de salida de equipo por: ${data.empleado_solicitante}</p>
						</div>
						<div class="col s12 m12 l5 offset-l2 center">
							<img src="../../signatures/${data.firma_conformidad}" class="responsive-img" style="border: 1px dashed black;"/>
							<p class="thin"> Firma de conformidad y entrega de equipo de: ${data.empleado_solicitante}</p>
						</div>
				
					</div>`;
		}else{
			firmas = `<div class="row">
				<div class="col s12 m12 l5 center">
					<img src="../../signatures/${data.firma_conformidad}" class="responsive-img" style="border: 1px dashed black;"/>
					<p class="thin"> Firma de conformidad de: ${data.empleado_solicitante}</p>
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
							 Atendio solicitud: ${data.usuario_encargado}
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
			
