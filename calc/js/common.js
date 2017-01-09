$(document).ready(function(){
	function fix(num){
		return num.toFixed(2);
	}
	//等额本息还款法
	function decalc(amount,mrate,mouth){
		var mres = (amount*mrate*(Math.pow((1+mrate),(mouth))))/(Math.pow((1+mrate),(mouth))-1);
		$("#de_repay").text(fix(mres));
		$("#de_interest").text(fix(mres*mouth-amount));
		$("#de_total").text(fix(mres*mouth));
	}
	//等额本金还款法
	function djcalc(amount,mrate,mouth){
		var first = (amount/mouth)+(amount*mrate),
			all = ((amount/mouth+amount*mrate)+amount/mouth*(1+mrate))/2*mouth,
			reduce = amount/mouth*mrate;
		$("#dj_repay").text(fix(first));
		$("#dj_interest").text(fix(all-amount));
		$("#dj_reduce").text(fix(reduce));
		$("#dj_total").text(fix(all));
	}
	$(".point").on("change",function(){
		var value=$(this).val();
		if(value == 1){
			$(".dkarea").addClass("off");
			$(".dked").removeClass("off");
		}else if(value == 2){
			$(".dkarea").removeClass("off");
			$(".dked").addClass("off");
		}
	})
	$("#baserate").on("change",function(){
		var value = $(this).val(),
			rates = fix(4.9*value);
		$("#rate").val(rates+"%");
		var a = parseFloat($("#rate").val());
	})
	$("#reset_btn").click(function(e){
		e.preventDefault();
		var cal = $("input[name='calctype']:checked").val();
		if (cal == 1) {
			$("#amount").val("");
		}else if(cal == 2){
			$("#unit").val("");
			$("#area").val("");
		}
	})	
	// 计算输出
	$("#calc_btn").click(function(e){
		e.preventDefault();
		var calctype = $("input[name='calctype']:checked").val();
		if(calctype == 1){
			var amount = $("#amount").val(),
				years = $("#years").val(),
				mouth = years*12,
				mrate = parseFloat($("#rate").val())/1200;
			if (amount == "") {
				alert("贷款金额不能为空");
				$("#amount").focus();
			}else{
				$(".dktotal").text(amount);
				$(".dkmouth").text(mouth);
				decalc(amount,mrate,mouth);
				djcalc(amount,mrate,mouth);
			}
		}else if(calctype == 2){
			var unit = $("#unit").val(),
				area = $("#area").val(),
				amount = unit*area*(1-$("#downpay").val()),
				years = $("#years").val(),
				mouth = years*12,
				mrate = parseFloat($("#rate").val())/1200;
			if(unit == ""){
				alert("平米单价不能为空");
				$("#unit").focus();
			}else if(area == ""){
				alert("面积不能为空");
				$("#area").focus();
			}else{
				$(".dktotal").text(amount);
				$(".dkmouth").text(mouth);
				decalc(amount,mrate,mouth);
				djcalc(amount,mrate,mouth);
			}
		}
	})
})