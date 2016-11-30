$(function(){
	var t;
	$.ajax({
		type:'get',
		url:'/user',
		success:function(data){
			data.forEach(function(v){
				$("<tr data-id="+v.id+"><td>"+v.id+"</td><td><input type='text' class='input-medium name' value="+v.name+"></td><td><input type='text' class='input-small phone' value="+v.phone+"></td><td class='delete'>×</td></tr>").appendTo("tbody")
			})
		}
	})
	$("#add").on("click",function(){
		$.ajax({
			type:'post',
			url:'/user',
			success:function(data){
				$("<tr data-id="+data.id+"><td>"+data.id+"</td><td><input type='text' class='input-medium name'></td><td><input type='text' class='input-small phone' ></td><td class='delete'>×</td></tr>").appendTo("tbody");
			
			}
		})
	})
	$("tbody").on("click",".delete",function(){
		var tr=$(this).closest('tr');
		$.ajax({
			type:'delete',
			url:'/user',
			data:{id:tr.attr("data-id")},
			success:function(data){
				if(data.state=="ok"){
					tr.remove();
				}
			}
		})
	})
	$('tbody').on("keyup","input",function(e){
		var data={};
		data.id=$(this).closest("tr").attr("data-id");
		if($(this).hasClass("name")){
			data.name=$.trim($(this).val());
		}else if($(this).hasClass("phone")){
			data.phone=$.trim($(this).val());
		}
		//节流
		clearTimeout(t);
	   t=setTimeout(function(){
	      $.ajax({
	      	type:'put',
	      	url:'/user',
	      	data:data,
	      	success:function(r){

	      	}
	      })
		},200)
	})
	
	

})