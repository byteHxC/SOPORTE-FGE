select empleado.id_empleado, concat(empleado.nombre,' ', empleado.apellido_paterno, ' ',empleado.apellido_materno) as nombre, empleado.cuip, empleado.num_empleado, 
puesto.descripcion as puesto ,
adscripcion_municipio.adscripcion,
adscripcion_municipio.municipio
from cat_empleado as empleado 
join cat_puesto as puesto on empleado.id_puesto = puesto.id_puesto 
join adscripcion_municipio on adscripcion_municipio.id_adscripcion=empleado.id_adscripcion;

-- View: vista para consultas empleados y su informacion basica
create view empleado_info as 
select empleado.id_empleado, empleado.telefono, empleado.email, concat(empleado.nombre,' ', empleado.apellido_paterno, ' ',empleado.apellido_materno) as nombre, empleado.cuip, empleado.num_empleado, 
puesto.descripcion as puesto ,
adscripcion_municipio.adscripcion,
adscripcion_municipio.municipio
from cat_empleado as empleado 
join cat_puesto as puesto on empleado.id_puesto = puesto.id_puesto 
join adscripcion_municipio on adscripcion_municipio.id_adscripcion=empleado.id_adscripcion;

select *from empleado_info;
-- View: vista para consulatar la adscripcion y municipio
create view adscripcion_municipio as 
select adscripcion.id_adscripcion, adscripcion.descripcion as adscripcion, 
municipio.descripcion as municipio
from cat_adscripcion as adscripcion
join cat_municipio as municipio on adscripcion.id_municipio = municipio.id_municipio;

select *from adscripcion_municipio;

-- View: vista para mostrar las solciitudes
create or replace view listar_solicitudes as 
	select solicitud.id_solicitud, date_format(solicitud.fecha,'%e/%m/%Y %r') as fecha, solicitud.descripcion_problema, tipo_servicio.nombre as tipo_servicio, tipo_solicitud.nombre as tipo_solicitud, concat(cat_empleado.nombre,' ', cat_empleado.apellido_paterno, ' ',cat_empleado.apellido_materno) as empleado_solicitante, notificacion_solicitud.prioridad, notificacion_solicitud.atendida, notificacion_solicitud.id_usuario_soporte as id_usuario_soporte from solicitud join cat_tipo_servicio as tipo_servicio on solicitud.id_tipo_servicio = tipo_servicio.id_tipo_servicio join cat_tipo_solicitud as tipo_solicitud on tipo_solicitud.id_tipo_solicitud = solicitud.id_tipo_solicitud join notificacion_solicitud on notificacion_solicitud.id_solicitud = solicitud.id_solicitud join cat_empleado on solicitud.id_empleado_solicitante = cat_empleado.id_empleado;

select *from listar_solicitudes;


select reporte.folio, solicitud.fecha as fecha_solicitud, solicitud.no_oficio, cat_tipo_solicitud.nombre as tipo_solicitud, empleado_info.nombre, empleado_info.telefono, empleado_info.adscripcion, empleado_info.email, cat_tipo_solicitud.nombre as servicio_solicita, solicitud.descripcion_problema, cat_equipo.nombre as nombre_equipo, cat_equipo.grupo_de_trabajo, cat_equipo.marca, cat_equipo.modelo, cat_equipo.numero_serie, cat_equipo.clave_inventarial, cat_equipo.disco_duro, cat_equipo.memoria_ram, cat_equipo.sistema_operativo, cat_equipo.procesador, cat_equipo.observaciones, cat_tipo_reparacion.nombre as tipo_reparacion, reporte.firma_salida, reporte.diagnostico_equipo, reporte.reparado, reporte.fecha_entrega, reporte.instalado_en_ubicacion, reporte.firma_conformidad, reporte.calificacion_servicio from reporte join solicitud on reporte.id_solicitud = solicitud.id_solicitud join empleado_info on solicitud.id_empleado_solicitante=empleado_info.id_empleado join cat_tipo_solicitud on solicitud.id_tipo_solicitud = cat_tipo_solicitud.id_tipo_solicitud join cat_tipo_servicio on solicitud.id_tipo_servicio=cat_tipo_servicio.id_tipo_servicio join cat_equipo on reporte.id_equipo = cat_equipo.id_equipo join notificacion_solicitud on solicitud.id_solicitud=notificacion_solicitud.id_solicitud join cat_tipo_reparacion on reporte.id_tipo_reparacion=cat_tipo_reparacion.id_tipo_reparacion where reporte.folio = 4;