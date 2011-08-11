var egg = [];
$(document).ready(function(){
  projshow.init();
  portfolioPop.init();

  
  $(document).keypress(function(e){
    egg.push(e.charCode);
    if(egg.length > 6){
      egg.splice(0, 1);
    }
    if( (egg.length == 6) && (egg[0] == 114) && (egg[1] == 97) && (egg[2] == 121) && (egg[3] == 114) && (egg[4] == 97) && (egg[5] == 121) ){
      var rayrayAjectives = [
        "healthy :D",
        "sad :(",
        "happy :)",
        "ARNGRY :@",
        "lonely",
        "sleepy",
        "confusedy :S",
        "fed up with this $&*# and wishes we'd all shut up"

      ];
      var rayrayAjective = rayrayAjectives[Math.floor(Math.random()*rayrayAjectives.length)];
      var html = '<div id="healthy" style="position: fixed; left: 0; top: 0; right: 0; bottom: 0; background: #000; z-index: 100; text-align: center">'
        + '<h1 style="color: #fff;" >RayRay ' + rayrayAjective + '</h1>'
        + '<img src="http://a1.sphotos.ak.fbcdn.net/hphotos-ak-snc1/5409_223510270633_618555633_7694629_1901913_n.jpg" />'
        + '</div>';
      $('body').append(html);
      $("#healthy").click(function(){$(this).remove() ; });
    }
  });
});

var vendorprefix = function(){
  if($.browser.webkit)
    return "-webkit-";
  else if($.browser.mozilla)
    return "-moz-";
  else if($.browser.opera)
    return "-o-";
  else
    return "";
}();

var projshow = {
  cont: null,
  imgcont: null,

  indicont: null,
  indis: null,
  indiwidth: 26,
  indioffset: 29,

  width: 850,

  currentIndex: 0,

  switchSpeed: 5500,
  interval: null,

  init: function(){
    projshow.cont = $(".homeCarousel");
    projshow.imgcont = projshow.cont.find(".container");
    projshow.cont.find("a.next").click(projshow.goNext);
    projshow.cont.find("a.prev").click(projshow.goPrev);
    projshow.initIndis(); 
    
    projshow.interval = window.setInterval(projshow.goNext, projshow.switchSpeed);
  },
  initIndis: function(){
    projshow.indicont = projshow.cont.find(".projInfo .indicator");
    projshow.indis = projshow.indicont.find("a");
    projshow.indis.click(function(e){
      projshow.setIndex( parseInt($(this).attr("rel")) );
      e.preventDefault();
    });
    
    var indis = projshow.indis;
    var i = 0;
    indis.each(function(){
      $(this).css({
        position: 'absolute',
        left: ( (i * projshow.indiwidth) + projshow.indioffset) + "px"
      }).attr("rel", i);
      i++;
    });    
  },

  goNext: function(e){
    var idx = projshow.currentIndex+1;
    if( (idx + 1) >  projshow.indis.length)
      idx = 0;
    projshow.setIndex(idx);
    if(e && e.preventDefault)
      e.preventDefault();
  },

  goPrev: function(e){
    var idx = projshow.currentIndex-1;
    if(idx < 0)
      idx = projshow.indis.length - 1;
    projshow.setIndex(idx);
    e.preventDefault();
  },

  stop: function(){
    window.clearInterval(projshow.interval);
  },

  setIndex: function(idx){
    window.clearInterval(projshow.interval);
    projshow.interval = window.setInterval(projshow.goNext, projshow.switchSpeed);
    if(projshow.currentIndex == idx)
      return;

    projshow.setIndiIndex(idx);
    projshow.setImageIndex(idx);
    projshow.setTextIndex(idx);
    projshow.currentIndex = idx;
  },

  setImageIndex: function(idx){
    var left = 0 - (idx * projshow.width);
    left = left + "px";
    projshow.imgcont.stop().animate({"margin-left": left}, 200);
  },

  setIndiIndex: function(idx){
    var active = projshow.indicont.find("a.active");
    active.attr("rel", idx).animate({
        left: ((projshow.indiwidth * idx) + projshow.indioffset)
      }, 200);

    var me, pos;
    for(var i=0; i<projshow.indis.length - 1; i++){
      me = $(projshow.indis[i+1]);
      if(i < idx)
        pos = i;
      else
        pos = i+1;

      me.attr("rel", pos).animate({
          left: ((projshow.indiwidth * pos) + projshow.indioffset)
        }, 200);
    }
  },

  setTextIndex: function(idx){
    var data = projshow.imgcont.find("article:eq(" + idx + ")");
    var me = projshow.cont.find("hgroup");
    
    me.animate({right: "-650px"}, 50, function(){
      me.find("h3").html(data.find(".title").html());
      me.find("h4").html(data.find(".desci").html());
      me.animate({right: "200px"}, 200);
    });
  }
}

var portfolioPop = {
  container: null,
  pageIdx: 0,
  pageCount: 0,
  prevPage: null,
  nextPage: null,
  init: function(){
    portfolioPop.container = $(".portfoliopop");
    portfolioPop.container.mouseenter(portfolioPop.mouseenter).mouseleave(portfolioPop.mouseleave);
    portfolioPop.pageCount = portfolioPop.container.find(".page").length;
   
    portfolioPop.prevPage = portfolioPop.container.find("a.newer");    
    portfolioPop.prevPage.click(portfolioPop.go_prevPage);
    portfolioPop.nextPage = portfolioPop.container.find("a.older"); 
    portfolioPop.nextPage.click(portfolioPop.go_nextPage);

    
    
    $(".showPortfolio").click(function(e){
      e.preventDefault();
      projshow.stop();        
      if($.browser.webkit){
        portfolioPop.doWebkit(this);
      }
      else{
        portfolioPop.doOther(this);
      }
    });
        
  },

  close: function(){
    if($.browser.webkit){
      portfolioPop.doWebkit();
    }
    else{
      portfolioPop.doOther();
    }
  },

  showContainer: function(e, fade){
    var bodyWidth = $("body").width();
    var popWidth = portfolioPop.container.width();
    var top = $(e).position().top + 36;
    var left = (bodyWidth - popWidth) / 2;

    portfolioPop.container.css({
      top: top + "px",
      left: left + "px"
    });
    if(fade){
      portfolioPop.container.fadeIn(1000);
    }
    else{
      portfolioPop.container.show();
    }
  },

  hideContainer: function(e){
    portfolioPop.container.hide();
  },

  fadeElse: function(op, timing){
    var me;
    $("section").each(function(){
      me = $(this);
      if(! me.hasClass("portfoliopop") ){
        me.animate({opacity: op}, timing);
      }
    });
  },
  
  webkitOut: function(e){
    this.removeEventListener("webkitTransitionEnd", portfolioPop.webkitOut);
    portfolioPop.container.hide();
  },

  doWebkit: function(e){    
    if( portfolioPop.container.is(":visible") ){
      var border = portfolioPop.container.find(".border");
      border[0].addEventListener("webkitTransitionEnd", portfolioPop.webkitOut);
      border.removeClass("pop");
      portfolioPop.fadeElse(1, 501);
    }
    else{
      portfolioPop.showContainer(e);            
      portfolioPop.fadeElse(0.25, 1000);
      setTimeout(function(){
        portfolioPop.container.find(".border").addClass("pop");
      }, 10);

    }
    
  },

  doOther: function(e){
    if( portfolioPop.container.is(":visible") ){
      portfolioPop.container.fadeOut(501);
      portfolioPop.fadeElse(1, 501);
    }
    else{
      portfolioPop.showContainer(e, true);
      portfolioPop.fadeElse(0.25, 1000);
    }
  },

  cancel: false,
  mouseenter: function(){
    portfolioPop.cancel = true;
  },

  mouseleave: function(){
    portfolioPop.cancel = false;
    setTimeout(function(){
      if(!portfolioPop.cancel){
        portfolioPop.close();
      }
    }, 500);
  },
  
  go_nextPage: function(e){
    e.preventDefault();
    portfolioPop.pageIdx++;
    if(portfolioPop.pageIdx < portfolioPop.pageCount){
      var margin = 0 - (portfolioPop.pageIdx * 881);
      portfolioPop.container.find(".bookinner").animate({marginLeft: margin + "px"}, 250);
    }
    else{
      portfolioPop.pageIdx = portfolioPop.pageCount - 1;
    }
    portfolioPop.updateButtonStates();
  },

  go_prevPage: function(e){
    e.preventDefault();
    portfolioPop.pageIdx--;
    if(portfolioPop.pageIdx >= 0){
      var margin = 0 - (portfolioPop.pageIdx * 881);
      portfolioPop.container.find(".bookinner").animate({marginLeft: margin + "px"}, 250);
    }
    else{
      portfolioPop.pageIdx = 0;
    }
    portfolioPop.updateButtonStates();
  },

  updateButtonStates: function(){
    if(portfolioPop.pageIdx == 0){
      if(!portfolioPop.prevPage.hasClass("disabled")){
        portfolioPop.prevPage.addClass("disabled");
      }
    }
    else{
      portfolioPop.prevPage.removeClass("disabled");
    }

    if( (portfolioPop.pageIdx + 1) == portfolioPop.pageCount){
      if(!portfolioPop.nextPage.hasClass("disabled")){
        portfolioPop.nextPage.addClass("disabled");
      }
    }
    else{
      portfolioPop.nextPage.removeClass("disabled");
    }
  }
}

var gmap = {
  address: "396 Queen St, Auckland, New Zealand",
  geocoder: null,
  map: null,
  options: {
    zoom: 16,
    maxZoom: 16,
    minZoom: 16,
    mapTypeId: null, //google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    disableZoom: true,
    draggable: false
  },
  init: function(){
    gmap.geocoder = new google.maps.Geocoder();    
    gmap.geocoder.geocode( { 'address': gmap.address}, gmap.codingReady);
  },
  codingReady: function(results, status){
    gmap.options.mapTypeId = google.maps.MapTypeId.ROADMAP;
    gmap.map = new google.maps.Map(document.getElementById("mapcanvas"), gmap.options);
    
    var pos = results[0].geometry.location;
    var cent = new google.maps.LatLng(-36.85089991406209, 174.75709676742554);

    gmap.map.setCenter(cent);
    var infinityMarker = new google.maps.Marker({
      map: gmap.map,
      icon: '/resources/infinity/images/iwmap.png',
      position: pos
    });
  }
}