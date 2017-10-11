var page = require('webpage').create();
var webURL;
var userId = "1762328940";
var urlheader;

page.open('http://h5.m.taobao.com/taolive/video.html?userId='+userId, function(status) {
  console.log("Status: " + status);
  if(status === "success") {
  
    page.onResourceReceived = function(response) {
      console.log("获取到URL："+response.url+"\n\n");
      //websocket token
      var fdStart = response.url.indexOf("http://h5api.m.taobao.com/h5/mtop.user.getusersimple/1.0/");
      if(fdStart == 0){
        
        if (response.stage === "end"){
          webURL = response.url;
          console.log("获取到URL："+webURL+"\n\n");
        }
      }else{

      }
      
      //直播信息
      var livedetail = response.url.indexOf("http://h5api.m.taobao.com/h5/mtop.mediaplatform.live.livedetail/2.0");
      if(livedetail == 0){
        // webURL = response.url;
        // console.log("获取到URL："+webURL);
      }

    };
    
    page.onResourceRequested = function(requestData, request) {
      console.log("获取到URL："+response.url+"\n\n");
      var fdStart = requestData.url.indexOf("http://h5api.m.taobao.com/h5/mtop.user.getusersimple/1.0/");
      if(fdStart == 0){
        webURL = requestData.url;
        urlheader = requestData.headers;
        console.log('Skipping', requestData['body']);

      }   
    };
    setTimeout(function() {
     
      console.log("\n 3s webURL"+webURL+"\n");
      console.log(JSON.stringify(urlheader));

      var xhr = new XMLHttpRequest();
      xhr.open("get", webURL, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
        }
      };
      xhr.send(null);

  }, 3000);

    // page.render('success.png');//截图
    // console.log("等待15秒后获取数据");
    // var t2 = window.setTimeout(hello1,15000); 

    // function hello1(){
    //   console.log("开始获取数据");
    //   var t1 = window.setInterval(hello,1000);

    //           function hello(){
    //             page.render('example.png');//截图

    //             var content = page.evaluate(function () {
    //               var element = document.getElementById('J_Msg_List');
    //               console.log("webURL"+webURL);
    //               return element;
    //              });
    //              console.log(content.innerText);
    //           }

    // }
    // window.clearTimeout(t1);//去掉定时器 

  }
  // phantom.exit();
});
