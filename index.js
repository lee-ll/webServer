var express=require('express');
var mysql=require('mysql');
var bodyParser=require('body-parser');
//开启一个服务器
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//创建一个连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'user'//需要连接的数据库
});
connection.connect();
//建立监听
app.listen(3000,function(){
	console.log("服务器在3000端口启动");
})
app.get('/admin',function(req,res){
  res.sendFile(__dirname+'/site/index.html');
})
//获取数据库中所有条目
app.get('/user',function(req,res){
	var sql='select * from list';
	connection.query(sql,function(err,rows){
		res.json(rows);
	})
})
//删除
.delete('/user',function(req,res){
	var sql='delete from list where id=?';
	connection.query(sql,[req.body.id],function(err,rows){
		if(!err){
			res.json({state:'ok'});
		}
	})
})
//增加条目
.post('/user',function(req,res){
    var sql="insert into list set ?";
    connection.query(sql,{name:''},function(err,rows){
       res.json({id:rows.insertId});
    })
})
.put('/user',function(req,res){
	if(req.body.name){
		var sql='update list set name=? where id=?';
		connection.query(sql,[req.body.name,req.body.id],function(err,rows){
			res.json("更新成功");
		})
	}else if(req.body.phone){
		var sql='update list set phone=? where id=?';
		connection.query(sql,[req.body.phone,req.body.id],function(err,rows){
			res.json("更新成功");
		})
	}
	
})
//对页面中的请求作出回应  可以用文件路径访问资源 开启静态服务器
app.use(express.static(__dirname+'/site/public'));