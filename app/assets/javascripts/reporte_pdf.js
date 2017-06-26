function generatedPDF(folio) {
    $.get(`/../api/detalle_reporte/${folio}`, (reporte, status) => {
        

        if(status == 'success'){
            var doc = new jsPDF('p','mm','letter');
            //doc.addImage(reporte['logo'], 'PNG', 40, 40, 30, 30);
            //Encabezado
            doc.setFontSize(12);
            doc.setFontType('bold');
            doc.text(50, 15, 'DIRECCION GENERAL DE TECNOLOGIAS DE LA INFORMACION');
            doc.text(100, 20, 'AREA DE SOPORTE TECNICO');
            doc.text(103, 25, 'FORMATO: DGTI-DTV-1.0');
            doc.setLineWidth(1);
            doc.line(10, 30, 205, 30);

            //Tabla
            doc.setFontSize(11);
            doc.setFontType('bold');
            doc.text(20, 37.5, 'Folio:');
            doc.text(65, 37.5, 'Fecha de Solicitud:');
            doc.text(140, 37.5, 'Oficio relacionado:');

            //Folio
            doc.setFontType('normal');
            doc.text(32, 37.5, reporte.folio+'' || '');
            //Fecha
            doc.text(105, 37.5, reporte.fecha_solicitud || '');
            //Oficio relacionado
            doc.text(180, 37.5, reporte.no_oficio || '');

            //Datos del solicitante
            doc.setFontType('bold');
            doc.text(85, 43, 'DATOS SOLICITANTE');
            doc.text(15, 49, 'Nombre:');
            doc.text(125, 49, 'Telefono:');
            doc.text(15, 55, 'E-mail:');
            doc.text(15, 61, 'Adscripcion:');

            doc.setFontType('normal');
            //nombre
            doc.text(45, 49, reporte.nombre || '');
            //Telefono
            doc.text(145, 49, reporte.telefono || '');
            //E-mail
            doc.text(45, 55,  reporte.email || '');
            //Adscripción
            doc.text(45, 61, reporte.adscripcion || '');


            //Lineas Horizontales
            doc.setLineWidth(0.1);
            doc.line(10, 33, 205, 33);
            
            y=33;
            for (var i = 1; i <= 5; i++) {
                y+=6;
                doc.line(10, y, 205, y);
            }

            //Servicio que solicita
            doc.setFontType('bold');
            doc.text(15, 67, 'Servicio que solicita: ');
            doc.setFontType('normal');
            //Sistemas
            doc.text(60, 67, reporte.servicio_solicita);

            //Descripcion breve de la falla
            doc.setFontType('bold');
            doc.text(75, 73.5, 'DESCRIPCION BREVE DE LA FALLA');

            //Lineas Horizontales
            doc.setLineWidth(0.1);
            
            // descripcion breve de la falla subrayar texto
            doc.setFontSize('normal')
            doc.text(15, 79.5, reporte.descripcion_problema);
            y+=6;
            doc.line(10, y, 205, y);
            y+=6;
            for (var i = 1; i <= 14; i++) {
                y+=6;
                doc.line(10, y, 205, y);
            }

            //Datos del equipo
            doc.text(83, 109, 'DATOS DEL EQUIPO');
            doc.text(15, 115, 'Nombre del equipo:');
            doc.text(115, 115, 'Grupo de trabajo:');

            doc.setFontType('normal');
            //Nombre del equipo
            doc.text(53, 115, reporte.nombre_equipo || '');
            //Grupo de trabajo
            doc.text(150, 115, reporte.grupo_de_trabajo || '');

            doc.setFontType('bold');
            doc.text(39, 121, 'Marca:');
            doc.text(130, 127, 'No. Serie:');
            doc.text(20, 127, 'Clave Inventarial:');
            doc.text(133, 121, 'Modelo:');
            doc.setFontType('normal');
            
            //Marca
            doc.text(53, 121, reporte.marca || '');
            //No.Serie
            doc.text(150, 127, reporte.numero_serie || '');
            //Clave Inventarial
            doc.text(53, 127, reporte.clave_inventarial || '');
            //Modelo
            doc.text(150, 121, reporte.modelo || ''); 

            //Segunda parte
            //Especificaciones tecnicas
            doc.setFontType('bold');
            doc.text(75, 133, 'ESPECIFICACIONES TECNICAS');
            doc.text(30, 139, 'Disco Duro:');
            doc.text(113, 139, 'Sistema Operativo:');
            doc.text(25, 145, 'Memoria RAM:');
            doc.text(125, 145, 'Procesador:');
            doc.text(23, 151, 'Observaciones:');

            doc.setFontType('normal');
            //Disco duro
            doc.text(53, 139, reporte.disco_duro || '');
            //Sistema operativo
            doc.text(150, 139, reporte.sistema_operativo || '');
            //Memoria RAM
            doc.text(53, 145, reporte.memoria_ram || '');
            //Procesador
            doc.text(150, 145, reporte.procesador || '');
            //Observaciones
            doc.text(53, 151, reporte.observaciones || '');

            //Tipo de Reparacion
            doc.setFontType('bold');
            doc.text(15, 157, 'Tipo de Reparación: ');

            doc.setFontType('normal');
            doc.text(53, 157, reporte.tipo_reparacion);


            doc.setFontType('bold');
            doc.text(70, 163, 'Autorizacion de Salida de Equipo');

            y+=22;
            doc.line(60, y, 140, y);
            doc.text(85, 185, 'Jose Perez Leon');

            for (var i = 1; i <= 3; i++) {
                y+=6;
                doc.line(10, y, 205, y);
            }

            //Datos del soporte
            doc.setFontType('bold');
            doc.text(80, 192, 'DATOS DEL SOPORTE');
            doc.text(15, 197.5, 'Nombre de quien brinda el soporte:');
            doc.text(15, 203.5, 'Diagnostico del equipo:');
            doc.text(15, 227.5, 'Carpeta de respaldo:');

            doc.setFontType('normal');
            //Nombre de quien brinda el soporte
            doc.text(85, 197.5, 'Eva');
            // firma de salida de equipo
            //Diagnostico del equipo 
            doc.text(20, 209.5, reporte.diagnostico_equipo || '');
            y+=6;
            for (var i = 1; i <= 6; i++) {
                y+=6;
                doc.line(10, y, 205, y);
            }

            //Datos de entrega del equipo
            doc.setFontType('bold');
            doc.text(75, 233.5, 'DATOS DE ENTREGA DEL EQUIPO');
            doc.text(15, 239, 'El equipo fue reparado:');
            doc.text(90, 239, 'El equipo se instalo en su ubicacion respectiva:');
            
            doc.text(45, 247, 'Fecha de entrega:');
            doc.text(135, 247, 'Firma de Conformidad:');

            //Fecha de entrega
            doc.setFontType('normal');
            doc.text(50, 254, reporte.fecha_entrega || '');
            //Firma conformidad

            y+=18;
            for (var i = 1; i <= 2; i++) {
                y+=6;
                doc.line(10, y, 205, y);
            }

            doc.setFontType('bold');
            doc.text(15, 269.5, 'Calificacion del servicio:');
            
            doc.setFontType('normal');
            //Se realizo respaldo?
            doc.text(65, 227.5,reporte.carpeta_respaldo || 'No se realizo respaldo');
            //El equipo fue reparado
            doc.text(65, 239, reporte.reparado || '');
            //El equipo se instalo correctamente en su ubicacion
            doc.text(180, 239, reporte.instalado_en_ubicacion || '');
            //Calificacion del servicio
            doc.text(65, 269.5, reporte.calificacion_servicio);


            //Lineas verticales
            doc.setLineWidth(0.1);
            doc.line(10, 33, 10, y);
            doc.line(205, 33, 205, y);
            //Primera fila: Gral
            doc.line(55, 33,55,39);
            doc.line(135, 33,135,39);
            //Datos solicitante
            doc.line(105, 45,105,51);
            //Datos del equipo
            doc.line(105,111,105,123);
            //Especificaciones Tecnicas
            doc.line(105, 135,105, 147);
            doc.output('dataurlnewwindow');            
        }
    });
}
