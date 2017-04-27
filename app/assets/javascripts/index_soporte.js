$(document).ready(function() {
    $('#buscar_por').change(function(){
    	filtro = $('#buscar_por').val();
    	if(filtro == 'tipo_servicio'){
    		$('input.autocomplete').autocomplete({
    			data: {
    				"Sistemas": null,
    				"Redes": null,
    				"Internet": null,
    				"Telefonia": null,
    				"Soporte Técnico": null
    			},
    			onAutocomplete: function(val){

    			},
    			minLength: 1,
    		});
    	}else if(filtro == 'tipo_solicitud'){
    		$('input.autocomplete').autocomplete({
    			data: {
    				"Via telefonica": null,
    				"Oficio": null,
    				"Presencial": null,
    			},
    			onAutocomplete: function(val){

    			},
    			minLength: 1,
    		});
    	}
    });
});
function buscarSolicitud(form){
    //alert('/api/solicitud/buscar/'+form.filtro.value+'/'+form.valor.value);
    $.get('/api/solicitud/buscar/'+form.filtro.value+'/'+form.valor.value, function(data, status){
        innerHTML = '';
        data.forEach(function(solicitud, index){
            color = 'red darken-1';
            if(solicitud.prioridad == "media")
                color = 'yellow lighten-1'
            if(solicitud.prioridad == "baja")
                color = 'green lighten-1'  

            innerHTML += '<tr>';
            innerHTML += `<td class=${color} > ${solicitud.prioridad}</td>
                          <td>${solicitud.fecha}</td>
                          <td>${solicitud.descripcion_problema}</td>
                          <td>${solicitud.tipo_servicio}</td>
                          <td>${solicitud.tipo_solicitud}</td>
                          <td>${solicitud.empleado_solicitante}</td>
                          <td>
                                <a class="left-align" href="/solicitud/atender/${solicitud.id_solicitud}">Atender <i class="material-icons">exit_to_app</i></a>
                          </td>`;

            innerHTML += '</tr>';
        });
        $('#rows_solicitud').html(innerHTML);
    });
    return false;
}



