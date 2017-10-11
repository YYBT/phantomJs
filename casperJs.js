var casper = require('casper').create();
casper.start();
casper.open("http://h5.m.taobao.com/taolive/video.html?userId=1804792584");
casper.then(function() {
    //logic here
    this.waitForSelector("#J_Msg_List",
    function pass () {
       console.log("Continue");
    },
    function fail () {
        this.die("Did not load element... something is wrong");
    }
);

  });
casper.on('resource.received',function(resource){
    // if (resource.url.indexOf("http://h5api.m.taobao.com/h5/mtop.user.getusersimple/1.0/") && resource.stage == "end") {
    //     var data = casper.evaluate(function(url){
    //         // synchronous GET request
    //         return __utils__.sendAJAX(url, "GET");
    //     }, resource.url);
        console.log(resource.url+"\n")
    // }
   
     
})
casper.run();
