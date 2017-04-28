 $(document).ready(function(){
    $('.stepper').activateStepper({
   		showFeedbackLoader: true,
   		linearStepsNavigation: true
   	});
 });

 function getEquipo(search){
 	alert('entra');
 	buscar_por = $('#search').val();
 	valor = search.value;
 	$.get('/../api/');
 	return false;
 }

 function validarEquipo(){
 	id_equipo = $('#id_equipo');
 	if(id_equipo.val() == ''){
 		alert('Seleccione un equipo')
 		id_equipo.val('50');
 	}else{
 		//$('.stepper').nextStep();
 	}
 }