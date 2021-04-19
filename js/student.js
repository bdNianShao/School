$(function() {
getPage();

// 新增
$("#add").click(function () {
	getClasses();
	$('#exampleModalLabel').text("添加学生");
	$('#modify').modal('show');
});


})

	
 function getPage() {
	mypost(queryStudent, {
		}, 
		function(data) {
			dataRow =""
			var c_name ;
			var s_id ;
			var s_name ;
			for( var i = 0 ;i < data.length ;i++)
			{
				c_name = data[i].classes.c_name;
				s_id = "'"+data[i].s_id+ "'";
				s_name = data[i].s_name;
				
				var row = '<tr>' +
				'<th scope="row">' + (i+1) + '</th>' +
				'<td >' + s_name + '</td>' +
				'<td >' + c_name + '</td>' +
				'<td><a href="javascript:remove(' + s_id+ ')" style="color: #CA0C16;">删除' +
				'</a>&nbsp;&nbsp;<a href="javascript:edit(' + s_id + ')">编辑</a></td></tr>';
				dataRow += row;
				
			}
			$("tbody").append(dataRow)
			
			
		})
	 
}
 function getClasses(id) {
	 $("#classeslist").empty()
		mypost(queryClasses, {
		}, 
		function(data) {
			classeslist =""
			var c_name ;
			var c_id;
			for( var i = 0 ;i < data.length ;i++)
			{
				c_name = data[i].c_name;
				c_id = data[i].c_id;
				if(id == c_id) 
				{
					classeslist+=' <option selected="selected"  value='+c_id+'>'+c_name+'</option>'
				}else
				{
					classeslist+=' <option  value='+c_id+'>'+c_name+'</option>'
				}
				
				
			}
			$("select").append(classeslist)
			
		})
	 
}

 function remove(id) {
        if (confirm("确定删除数据？")) {
		   mypost(deleteStudentById, {
			  "s_id" :id
			}, 
       	function(data) {
			if(data.msc ==  200 ){
				reset()
			}
       		
       	})
        }
}
	
function edit(id) {
	$('#exampleModalLabel').text("修改学生");
	
	$('#modify').modal('show');
	mypost(toedit, {
		"s_id":id,
		}, 
		function(data) {
			c_name = data.classes.c_name;
			c_id = data.classes.c_id;
			var s_id  = data.s_id;
			var s_name =data.s_name;
			$("#s_id").val(s_id);
			$("#s_name").val(s_name);
			getClasses(c_id);
		})
	
}
	//判断我是否是修改还是增加	
 function modify() {  
  var s_id = $("#s_id").val();
  var c_id = $("#classeslist").val();
  var s_name = $("#s_name").val();
  if( s_id.length == 0 )
  {
	    addStudent(c_id,s_name);
  }
  else{
		editStudent(c_id,s_id,s_name);
  }

	 
 }
 //修改
function editStudent(c_id,s_id,s_name) {  
	mypost(editStudentapi, {
		"s_id":s_id,
		"c_id":c_id,
		"s_name":s_name
		}, 
		function(data) {
			if(data.msc ==  200 ){
				reset()
			}
		})
	
	
}
//添加
function  addStudent(c_id,s_name){
	mypost(addStudentapi, {
		"c_id":c_id,
		"s_name":s_name
		}, 
		function(data) {
			if(data.msc ==  200 ){
				reset()
			}
			
		})
}

// 清空表单刷新
function reset(){
		
		$("#tbody").empty()
		$('#modify').modal('hide');
		
		$("#s_id").val("");
        $("#s_name").val("");
		getPage()
	}