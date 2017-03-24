select empleado.id_empleado, concat(empleado.nombre,' ', empleado.apellido_paterno, ' ',empleado.apellido_materno) as nombre, empleado.cuip, empleado.num_empleado, 
puesto.descripcion as puesto ,
adscripcion_municipio.adscripcion,
adscripcion_municipio.municipio
from cat_empleado as empleado 
join cat_puesto as puesto on empleado.id_puesto = puesto.id_puesto 
join adscripcion_municipio on adscripcion_municipio.id_adscripcion=empleado.id_adscripcion;

-- View: vista para consultas empleados y su informacion basica
create view empleado_info as 
select empleado.id_empleado, concat(empleado.nombre,' ', empleado.apellido_paterno, ' ',empleado.apellido_materno) as nombre, empleado.cuip, empleado.num_empleado, 
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