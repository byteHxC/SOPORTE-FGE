function toast(text) {
	Materialize.toast(text, 4000, 'rounded');
}
function error(text) {
	vNotify.error({text: text,
	 title: 'Error de autentificación',
	 position: 'bottomRight'
	});
}

$(document).ready(function (){
	$('select').material_select();
	$(".dropdown-button").dropdown();
});


