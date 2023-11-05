<template>
 
  <!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>制作调查问卷</title>
		<link href="11_14.css" rel="stylesheet" type="text/css"/>
	</head>
 
	<body>
		<div class="index">
		<h1 class="biaoti">调查问卷</h1>
		<hr width="597px" color="black"/>
		<form class="biaodan">
			<ol>
				<li>请选择今天的日期</li>
				<label><input type="date" name="riqi"/></label>
				<br />
				<br />
				<li>你的学历是？</li>
				<label><input type="radio" name="xueli" ></label>高中及以下<br />
				<label><input type="radio" name="xueli"/></label>大专<br />
				<label><input type="radio" name="xueli"/></label>本科<br />
				<label><input type="radio" name="xueli"/></label>硕士研究生<br />
				<br />
				<li>你从事拳击/健身教练的时间？</li>
				<label><input type="radio" name="time1"/></label>刚开始<br />
				<label><input type="radio" name="time1"/></label>1~2年<br />
				<label><input type="radio" name="time1"/></label>3~4年<br />
				<label><input type="radio" name="time1"/></label>5~10年<br />
				<br />
				<li>你是通过什么渠道学会拳击/其他这项技术的？</li>
				<label><input type="radio" name="jishu"/></label>部队<br />
				<label><input type="radio" name="jishu"/></label>拳馆<br />
				<label><input type="radio" name="jishu"/></label>武校<br />
				<label><input type="radio" name="jishu"/></label>少林寺<br />
				<label><input type="radio" name="jishu"/></label>其他<br />
				<br />
				<li>你晚上睡觉的时间是？</li>
				<label><input type="radio" name="night" /></label>晚上八点至九点<br />
				<label><input type="radio" name="night" /></label>晚上十点点至十一点<br />
				<label><input type="radio" name="night" /></label>晚上十二点以后<br />
				<label><input type="radio" name="night" /></label>通宵<br />
				<br />
				<li>你早上起床的时间是？</li>
				<label><input type="radio" name="time2"/></label>早上六点至七点<br />
				<label><input type="radio" name="time2"/></label>早上八点至九点<br />
				<label><input type="radio" name="time2"/></label>早上十点至十一点<br />
				<label><input type="radio" name="time2"/></label>中午十二点之后<br />
				<br />
				<li>你最近有锻炼身体吗？</li>
				<label><input type="radio" name="duanlian"/></label>一周三到五次<br />
				<label><input type="radio" name="duanlian"/></label>一周一到两次<br />
				<label><input type="radio" name="duanlian"/></label>一周一次<br />
				<label><input type="radio" name="duanlian"/></label>很久没锻炼了<br />
				<br />
				<li>你近期与别人发生过矛盾吗？</li>
				<label><input type="radio" name="maodun"/></label>有，没和好<br />
				<label><input type="radio" name="maodun"/></label>有，和好了<br />
				<label><input type="radio" name="maodun"/></label>有，并且打了一架<br />
				<label><input type="radio" name="maodun"/></label>有，就吵了下嘴<br />
				<label><input type="radio" name="maodun"/></label>没有<br />
				<br />
				<li>你喜欢的运动有？（可多选）</li>
				<label><input type="checkbox" name="sport" value="1"/></label>篮球<br />
				<label><input type="checkbox" name="sport" value="2"/></label>乒乓球<br />
				<label><input type="checkbox" name="sport" value="3"/></label>羽毛球<br />
				<label><input type="checkbox" name="sport" value="4"/></label>拳击<br />
				<label><input type="checkbox" name="sport" value="5"/></label>柔术<br />
				<label><input type="checkbox" name="sport" value="5"/></label>摔跤<br />
				<label><input type="checkbox" name="sport" value="5"/></label>散打<br />
				<br />
				<li>你期待的工资是？</li>
				<label><input type="radio" name="xueli"/></label>3000~5000<br />
				<label><input type="radio" name="xueli"/></label>5000~10000<br />
				<label><input type="radio" name="xueli"/></label>10000~15000<br />
				<label><input type="radio" name="xueli"/></label>15000~20000<br />
				<br />
				<li>你的意见:</li>
				<br />
				<textarea name="message"  placeholder="你的宝贵意见对我们帮助很大" required></textarea>	
			</ol>
			<br />
				<button id="tijiao">提交</button>	
		</form>
		</div>
	</body>
</html>
  </template>
  
  <script>

  </script>
  
  <style>
  
  </style>