$(function() {
	getPage();
	//【添加】的功能
	$("#add").click(function() {
		$('#exampleModalLabel').text("添加教室");
		$('#modify').modal('show');
	});


})
//查询全部
function getPage() {
	mypost(queryClasses, {},
		function(data) {
			dataRow = ""
			var c_name;
			var c_id;
			for (var i = 0; i < data.length; i++) {
				c_name = data[i].c_name;
				c_id = "'" + data[i].c_id + "'";
				var row = '<tr>' +
					'<th scope="row">' + (i + 1) + '</th>' +
					'<td >' + c_name + '</td>' +
					'<td><a href="javascript:remove(' + c_id + ')" style="color: #CA0C16;">删除' +
					'</a>&nbsp;&nbsp;<a href="javascript:edit(' + c_id + ')">编辑</a></td></tr>';
				dataRow += row;
			}
			$("tbody").append(dataRow)


		})

}
//删除
function remove(id) {
	if (confirm("确定删除数据？")) {
		mypost(deleteClassesByCid, {
				"c_id": id
			},
			function(data) {
				if (data.msc == 200) {
					reset()
				}

			})
	}
}
//添加
function addClasses(c_name) {

	mypost(addClassesapi, {
			"c_name": c_name
		},
		function(data) {
			if (data.msc == 200) {
				reset()
			}

		})
}
//进入修改功能
function edit(id) {
	$('#exampleModalLabel').text("修改教室");
	$('#modify').modal('show');
	mypost(toeditClasses, {
			"c_id": id,
		},
		function(data) {
			var c_id = data.c_id;
			var c_name = data.c_name;
			$("#c_id").val(c_id);
			$("#c_name").val(c_name);
		})

}
//判断是否是是修改还是增加	
function modify() {
	var c_id = $("#c_id").val();
	var c_name = $("#c_name").val();
	if (c_id.length == 0) {
		addClasses(c_name)
	} else {
		editClasses(c_id, c_name);
	}


}

//修改
function editClasses(c_id, c_name) {
	mypost(editClassesapi, {
			"c_id": c_id,
			"c_name": c_name
		},
		function(data) {
			if (data.msc == 200) {
				reset()
			}
		})

}
// 清空表单刷新
function reset() {

	$("#tbody").empty()
	$('#modify').modal('hide');
	getPage();
	$("#c_id").val("");
	$("#c_name").val("");
}
