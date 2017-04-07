function toast(text) {
	Materialize.toast(text, 4000, 'rounded');
}
function error(text) {
	vNotify.error({text: JSON.stringify(text),
	 title: 'Error: ',
	 position: 'bottomRight'
	});
}
function success(text) {
	vNotify.success({text: text,
	 title: 'Información: ',
	 position: 'topRight'
	});
}
$(document).ready(function (){
	$('select').material_select();
	$(".dropdown-button").dropdown();
});


