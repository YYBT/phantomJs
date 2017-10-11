var page = require('webpage').create();
page.open('https://www.douyu.com/586808', function(status) {
  console.log("Status: du:" + status);
  if(status === "success") {
    page.render('dusuccess.png');
    var t2 = window.setTimeout(hello1,15000); 
    

    function hello1(){
      console.log("hello1");
      var t1 = window.setInterval(hello,1000);
      
              function hello(){
                page.render('duexample.png');
                var content = page.evaluate(function () {
  
                  var element = document.getElementById("js-chat-cont").children[2].children[0].innerText;
  
                  return element;
          
                 });
                  // for(var i =0;i<content.children.length;i++){
                    console.log(content);
                    
                  // }
                  
              }

    }
    window.clearTimeout(t1);//去掉定时器 

  }
  // phantom.exit();
});
