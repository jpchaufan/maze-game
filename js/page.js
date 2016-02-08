function dropdownClick(){
	$('.handle-story').on('click', function(){
		$('.menu-story').slideToggle();
	});
	$('.handle-instructions').on('click', function(){
		$('.menu-instructions').slideToggle();
	});
	$('sidebar .handle-about').on('click', function(){
		$('sidebar .menu-about').slideToggle();
	});
	$('aside .handle-about').on('click', function(){
		$('aside .menu-about').slideToggle();
	});
}
dropdownClick();

window.onkeydown = function(e) {
  if (e.keyCode == 32) {
    e.preventDefault();
  }
};






