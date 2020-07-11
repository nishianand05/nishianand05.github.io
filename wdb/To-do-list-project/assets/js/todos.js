// check off specific todos by clicking

$("ul").on("click","li",function(){
	$(this).toggleClass("completed")
});


$("ul").on("click","span",function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	event.stopPropogation();

})

$("input[type='text']").keypress(function(event){
	if(event.which===13){
		var todotext = $(this).val();
		$("ul").append("<li><span><i class='fas fa-trash'></i></span> "+todotext+"</li>")
		$(this).val("");
	}

});

$(".fa-edit").click(function(){
	$("input[type='text']").fadeToggle();

});
