//主项目地址
var domain = "http://localhost:8080/SSM_PostgreSQL";
/**
 * @description  学生模块的api
 * @param {Object} api
 * @param {Object} parameters
 * @param {Object} callback
 */

var queryStudent = "/student/query";
var deleteStudentById = "/student/delet"
var addStudentapi = "/student/add"
var editStudentapi = "/student/edit"
var toedit = "/student/toedit"
//==========================================================================
/**
 * @description  班级模块的api
 * @param {Object} api
 * @param {Object} callback
 * @param {Object} parameters
 */
var queryClasses = "/classes/query";
var deleteClassesByCid = "/classes/delete";
var addClassesapi = "/classes/add"
var editClassesapi = "/classes/edit"
var toeditClasses = "/classes/toedit"
//==========================================================================
//封装的ajax的方法
function mypost(api, parameters, callback) {
	$.ajax({
		url: domain + api,
		data: parameters,
		type: 'POST',
		dataType: 'json',
		success: callback,
		error: function() {
			//异常处理；  
			console.log('error : 服务器内部错误');
			console.log("-------------------------")
		}
	});
}
