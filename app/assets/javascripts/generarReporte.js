 $(document).ready(function(){
    $('.stepper').activateStepper({
   		showFeedbackLoader: true,
   		linearStepsNavigation: false
   	});
 });

 function getEquipo(search){
 	buscar_por = $('#search').val();
 	valor = search.value;
 	$.get('/../api/');
 	return false;
 }