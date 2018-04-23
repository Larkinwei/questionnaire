var answer1=[0,1,2,3,4,5,6];
var answer2=["爸爸","妈妈","爷爷","奶奶","小朋友"];
var answer3=["搜索小程序","微信群/微信好友介绍","其他小程序推荐","微信公众号菜单","微信公众号文章","其他"];
var answer4=["家长","小朋友","家长和小朋友都有使用"];
var answer5=["喜马拉雅APP","宝宝巴士故事小程序","凯叔讲故事APP","荔枝APP","企鹅FM APP","故事类微信公众号or小程序","咔哒讲故事","蜻蜓APP","其他"];
var answer6=["喜马拉雅APP","宝宝巴士故事小程序","凯叔讲故事APP","荔枝APP","企鹅FM APP","故事类微信公众号or小程序","咔哒讲故事","蜻蜓APP","其他"];
var answer7=["内容全","故事类型多","因为是免费的","故事分类清晰","个性化推荐精准","孩子自己喜欢用","界面好操作","习惯用这个了,不想换","其他"];


//数组乱序，最后一个不变
function shuffle(array){
	let arr=array.concat();
	var newArray=[];
	while(arr.length>0){
		var index=parseInt(Math.random()*(arr.length-1));
		newArray.push(arr[index]);
		arr.splice(index,1);
	}
	return newArray;
}
// 加载单选或多选答案
function loadAnswer(el,data,type,name,order){
	let answer=data
	if(order){
		answer=shuffle(data)
	}
	var html='';
	//问题1
	for(var i=0;i<answer.length;i++){
		html+=`<label for="${name}_${i}" class="weui_cell weui_check_label">
					<div class="weui_cell_hd">
						<input type=${type} class="weui_check" id="${name}_${i}" name=${name} value="${answer[i]}">
						<span class="weui_icon_checked"></span>
					</div>
					<div class="weui_cell_bd">
						<p>${answer[i]}</p>
					</div>
				</label>`
	}
	el.html(html)
}

var $q1=$("#question1")
var $q2=$("#question2")
var $q3=$("#question3")
var $q4=$("#question4")
var $q5=$("#question5")
var $q6=$("#question6")
var $q7=$("#question7")
var $q8=$("#question8")
var $q9=$("#question9")
// loadFirstQuestion();
loadAnswer($("#answer1"),answer1,"radio","question1",false)

$("[name='question1']").change(function(event) {
	var checkedValue=$("input[name='question1']:checked").val()
	if(checkedValue==2){
		loadAnswer($("#answer2"),answer2,"radio","question2",false)
		$q2.show()
		changeQ2()
	}else{
		$q2.hide()
	}
});

function changeQ2(){
	$("[name='question2']").change(function(event) {
		var q2Value=$("input[name='question2']:checked").val()
		if(q2Value!="小朋友"){
			loadAnswer($("#answer3"),answer3,"radio","question3",true)
			loadAnswer($("#answer4"),answer4,"radio","question4",false)
			loadAnswer($("#answer5"),answer5,"checkbox","question5",true)
			loadAnswer($("#answer6"),answer6,"radio","question6",true)
			$q3.show()
			$q4.show()
			$q5.show()
			$q6.show()
			controlCheckedNum($("input[name='question5']"),$("#question5 .warning-txt"))
			changeQ6()
		}else{
			$q3.hide()
			$q4.hide()
			$q5.hide()
			$q6.hide()
		}
	});
}
function changeQ6(){
	$("[name='question6']").change(function(event) {
		var q6Value=$("input[name='question6']:checked").val()
		if(q6Value=="其他"){
			loadAnswer($("#answer7"),answer7,"checkbox","question7",true)
			$q7.show()
			$q8.show()
			$q9.show()
			controlCheckedNum($("input[name='question7']"),$("#question7 .warning-txt"))
		}else{
			$q7.hide()
			$q8.show()
			$q9.show()
		}
	});
}

//多选题最多选择3个
function controlCheckedNum(inputEl,warningEl){
	var select =inputEl,
  maxNums= 3;
  for(var i in select){
	 select[i]. onclick = function (){
     var _select = inputEl,
     cNums = 0;
     for(var i in _select){
      // if(i == 'length') break ;
      if(_select[i].checked){
       cNums ++;
     	}
  	}
   	if(cNums > maxNums){
     	this.checked = false;
     	warningEl.show()
    }else{
     	warningEl.hide()
    }
   }
 }
}
//获取复选框值
function getCheboxVal(el){
    obj = el
    check_val = [];
    for(k in obj){
        if(obj[k].checked)
            check_val.push(obj[k].value);
    }
    return check_val;
}
//提交
$("#submit-btn").click(function(){      
	let q1Val=$("input[name='question1']:checked").val()
	let q2Val=$("input[name='question2']:checked").val()
	let q3Val=$("input[name='question3']:checked").val()
	let q4Val=$("input[name='question4']:checked").val()
	let q5Val=getCheboxVal($("input[name='question5']:checked"))
	let q6Val=$("input[name='question6']:checked").val()
	let q7Val=getCheboxVal($("input[name='question7']:checked"))
	let q8Val=$("#q8Val").val()
	let q9Val=$("#q9Val").val()
	if(q1Val==undefined){$("#question1 .warning-txt").show();window.location.href = "#question1";};
	if(q2Val==undefined){$("#question2 .warning-txt").show();window.location.href = "#question2";};
	if(q3Val==undefined){$("#question3 .warning-txt").show();window.location.href = "#question3";};
	if(q4Val==undefined){$("#question4 .warning-txt").show();window.location.href = "#question4";};
	if(q6Val==undefined){$("#question6 .warning-txt").show();window.location.href = "#question6";};
	if(q8Val==""){$("#question8 .warning-txt").show();window.location.href = "#question8";};
	if(q5Val.length==0){
		$("#question5 .warning-txt").html("这道题必须回答哦");
		$("#question5 .warning-txt").show();
		window.location.href = "#question5";
	}
	if(q6Val=="其他"&&q7Val.length==0){
		$("#question7 .warning-txt").html("这道题必须回答哦");
		$("#question7 .warning-txt").show();
		window.location.href = "#question7";
	}
	// console.log(q1Val,q2Val,q3Val,q4Val,q5Val,q6Val,q7Val,q8Val,q9Val)
	if(q1Val!=undefined&&q2Val!=undefined&&q3Val!=undefined&&q4Val!=undefined&&q5Val.length!=0&&q6Val!=undefined&&q8Val!=""){
		let result={
			question1:q1Val,
			question2:q2Val,
			question3:q3Val,
			question4:q4Val,
			question5:q5Val,
			question6:q6Val,
			question7:q7Val,
			question8:q8Val,
			question9:q9Val
		}
	console.log(result)
	$(".page").hide()
	$(".weui_msg").show()
	}
})