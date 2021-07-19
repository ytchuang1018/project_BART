//按下下一步開始
function button_start(){
	$('#exp_start').css('visibility','visible');
	$('#button_start').hide();
	$('#text').html('');
	$('#text').css('visibility','hidden');
	$('#text1').html("目前金額: NT "+money+"<br><br>第 "+trial_n+" 顆氣球 , 共 30 顆"+"<br><br>累積金額:    "+total_money);
	
}

//將按鍵的按鈕功能關掉
function button_close(){
	$('#pump').prop('disabled',true);
	$('#collect').prop('disabled',true);
}

//將按鍵的按鈕功能打開
function button_open(){
	$('#pump').prop('disabled',false);
	$('#collect').prop('disabled',false);
}


function pump_click(){
	if (money < outcome){
		money=money+1;
		$('#img_balloon').attr("src","./temp_cht/balloon_no_background_"+money+".png");
		$('#text1').html("目前金額: NT "+money+"<br><br>第 "+trial_n+" 顆氣球,共 30 顆"+"<br><br>累積金額:    "+total_money);
	} else {
		
		$('#img_balloon').attr("src","./temp_cht/feedback.png");
		button_close();
		setTimeout("button_open();",1000);
		trial_n=trial_n+1;
		if (trial_n < total_trial_n){
			
			setTimeout("$('#img_balloon').attr('src','./temp_cht/balloon_no_background_0.png');",1000);
			
			$('#text1').html("目前金額: NT "+money+"<br><br>第 "+trial_n+" 顆氣球,共 30 顆"+"<br><br>累積金額:    "+total_money);
			
			$.ajax({
				url: 'receive.php',
				data: "user_name="+name+"&trial_n="+trial_n+"&pump_n="+money+"&outcome="+outcome,
				type:"POST",
				
				success: function(msg){
					//alert(msg);
				},
				error:function(xhr, ajaxOptions, thrownError){ 
					alert(xhr.status); 
					alert(thrownError); 
				}
			});
			money=0;
			outcome = Math.floor(Math.random() * (9-3+1)) + 3;
			
		} else {
			button_final_click();
		}
	}
	
}

function collect_click(){
	total_money=total_money+money;
	trial_n=trial_n+1;
	if (trial_n<total_trial_n){
		
		$('#img_balloon').attr("src","./temp_cht/balloon_no_background_0.png");
		
		$.ajax({
			url: 'receive.php',
			data: "user_name="+name+"&trial_n="+trial_n+"&pump_n="+money+"&outcome="+outcome,
			type:"POST",
			
			success: function(msg){
				//alert(msg);
			},
			error:function(xhr, ajaxOptions, thrownError){ 
				alert(xhr.status); 
				alert(thrownError); 
			}
		});
		money=0;
		outcome = Math.floor(Math.random() * (9-3+1)) + 3;
		
		$('#text1').html("目前金額: NT "+money+"<br><br>第 "+trial_n+" 顆氣球,共 30 顆"+"<br><br>累積金額:    "+total_money);
		
		
	} else {
		button_final_click();
	}
}

function button_final_click(){
	$('#text').css("visibility","visible");
	$('#text').html("恭喜您完成第一個遊戲了! 感謝您的參與! <br> 接下來是第二個遊戲, 以下為<a href='../IGT_LossCV_Behavior/index.php'>連結</a>").css({"font-size":"30px","top":"30px"});
	$('#exp_start').hide();
	
	$.ajax({
		url: 'receive.php',
		data: "user_name="+name+"&trial_n="+trial_n+"&pump_n="+money+"&outcome="+outcome,
		type:"POST",
		
		success: function(msg){
			//alert(msg);
		},
		error:function(xhr, ajaxOptions, thrownError){ 
			alert(xhr.status); 
			alert(thrownError); 
		}
	});
	
	
}

//global variable
var outcome = 9;
var money=0;
var trial_n=0;
var total_trial_n=30;
var name="";
var total_money=0;

$(document).ready(function(){
	$("#dialog").dialog({ autoOpen: false });
	$('#button').click(function(){
		name=$('#input_name').val();
		
		if (name !="" && name !="undefined"){
			$.ajax({
				url:"login_chk.php",
				data:"user_name="+name,
				type : "POST",
				
				success: function(msg){
					//alert(msg);
					if(msg !="success"){
						alert('此名字已有人使用了!請再輸入別的名字!');
					} else {
						$('#input_section').hide();
						$('#input_name_section').hide();
						$('#button').css("visibility","hidden");
						$('#button_start').css("visibility","visible");
						$('#text').css({"visibility":"visible","marginTop":"100px","textAlign":"left","marginLeft":"40%"}).html("規則: <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.每次點擊氣球打氣, 可得1元, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.當您一按收集, 這回合的金額就會進入累積金額, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.當氣球一爆炸, 這回合的金額就會歸零, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.總共有30個氣球,<br>了解規則後就可以按下一步開始");
					}
				},
				error:function(xhr, ajaxOptions, thrownError){ 
					alert(xhr.status); 
					alert(thrownError); 
				}
			}); 
			
		} else {
			alert('請先輸入您的名字');
		}
	});
});
