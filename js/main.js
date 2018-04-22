var answer1=[0,1,2,3,4,5,6];
var answer2=["自己","宝宝","妹妹","弟弟","其他"];

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
function loadFirstQuestion(){
	var html='';
	//问题1
	for(var i=0;i<answer.length;i++){
		html+=`<label for="answer${i}" class="weui_cell weui_check_label">
					<div class="weui_cell_hd">
						<input type="radio" class="weui_check" id="answer${i}" name="preventClick" value="${answer[i]}">
						<span class="weui_icon_checked"></span>
					</div>
					<div class="weui_cell_bd">
						<p>${answer[i]}</p>
					</div>
				</label>`
	}
	$("#preventClick").html(html)
}

// 加载单选或多选答案
function loadAnswer(el,data,type,name){
	let answer=shuffle(data)
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

// loadFirstQuestion();
loadAnswer($("#answer1"),answer1,"radio","question1")

$("[name='question1']").change(function(event) {
	var checkedValue=$("input[name='question1']:checked").val()
	console.log(checkedValue)
	if(checkedValue==2){
		loadAnswer($("#answer2"),answer2,"radio","question2")
		$("#question2").show()
	}else{
		$("#question2").hide()
	}
});