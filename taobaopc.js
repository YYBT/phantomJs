var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP)';
// 打开网址
page.open('https://taobaolive.taobao.com/room/index.htm?userId=2305964150', function(status) {
  console.log("Status: " + status);
  // 打开成功
  if(status === "success") {
    // 截图
    // page.render('success.png');
    // 延迟15秒 抓取聊天数据
    var t2 = window.setTimeout(hello1,15000); 

    // 模拟滚动页面，加载商品列表
    var content = page.evaluate(function () {
      var element = window.scrollTo(10000,0);
      return element;
     });

    function hello1(){
      console.log("hello1");

      // 每5秒 抓取下聊天数据
      var t1 = window.setInterval(hello,500);
      
      function hello(){
        // 截图
        // page.render('example.png');
        // 获取聊天列表
        var content = page.evaluate(function () {
          var element = document.getElementById("J_Feed_Containter").children[0].children[0].lastChild.innerText;
          if (element){
            return element;
          }else
            element = '聊天未连接';
        });
        console.log(content);

        //  获取商品列表
        var content1 = page.evaluate(function () {
          var element = document.getElementsByClassName('lr-all-item-list')[0];
          var array = new Array();
          for (var i=0;i<element.children.length;i++){
            var dic = new Array();
            // 商品图片
            var img = element.children[i].children[1].children[0].children[0].style.backgroundImage;
            var text = element.children[i].children[1].children[0].children[1].innerText;

            var strs= new Array(); //定义一数组 
            strs=text.split("\n"); //字符分割 
            
            // 商品图片，商品名字，商品价格，商品购买数
            array.push({'img':img,'text':strs[0],'price':strs[1],'buy':strs[2]});
          }
          return array;
        });
      
        console.log('总共商品数：'+content1.length);

        //  模拟点击加载商品
        var content2 = page.evaluate(function () {
          var element = document.getElementsByClassName('lr-liveshare-tip')[0].click();
          return element;
        });

         //  直播状态
        var content3 = page.evaluate(function () {
          // 0 在直播  1结束   "直播已经结束"
          var element = document.getElementsByClassName('lr-video-err-mask').length;
          // 0 在直播 1结束   "主播休息中"
          var element1 = document.getElementsByClassName('lr-status-desc').length;

          if(element == 1 || element1 == 1){
            return 1;
          }else
            return 0;
        });
        if(content3 == 0){
          console.log('直播中');
        }else{
          console.log('直播结束');
        }

        //  在线人数
        var content4 = page.evaluate(function () {
          var element = document.getElementById("J_video-panel").children[0].children[1].lastChild.innerText;
          return element;
        });
        console.log(content4);

        //  点赞人数
        var content5 = page.evaluate(function () {
          var element = document.getElementsByClassName('like-btn')[0].innerText;
          return element;
        });
        console.log('点赞人数:'+content5);

      }
    }
    window.clearTimeout(t1);//去掉定时器 
  }
  // phantom.exit();
});
