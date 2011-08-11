var infinityWeb = {
    init: function(){
        infinityWeb.cufon();
        if($("div.feature-gallery").length > 0){
            infinityWeb.gallery.init();
        }
    }, //end-of init
    cufon: function(){
        Cufon.replace('h1, div.copy strong', {fontFamily: 'Neutraface Slab Text Bold'});
	    Cufon.replace('div.tags a', {hover: true, fontFamily: 'Neutraface Slab Text Bold'});
	    Cufon.replace('div.divRollover > a span', {fontFamily: 'Neutraface Slab Text Light'});
        //Cufon.now();
    },//end-of cufon
    gallery: {
        currImage: 1,
        init: function(){
            $gallery = $('div.feature-gallery ul').html();
	        $('div.feature-gallery ul').hide();

            if($('a.return').length > 0){
	            var $gap = $('a.return').position().left + parseInt($('a.return').css('marginLeft'));
	            var $list = '<li style="width:'+$gap+'px; height: 1px;"></li>';
	            $list += $gallery;
	            $('div.feature-gallery ul').html($list);
	        }

            $('div.feature-gallery ul').show();
            $('div.feature-gallery ul li img:not(:first)').css('opacity', 0.2)

            $('div.gallery-buttons a', 'div.info-container').click(infinityWeb.gallery.on_galleryButtonsClick);
        },//end of gallery:init
        on_galleryButtonsClick: function(e){
            e.preventDefault();
            if( $(this).find('span').hasClass('nextBtn')){
                if(infinityWeb.gallery.currImage < $('div.feature-gallery ul li').length-1){			
				    $('span.prevBtn', 'div.info-container').css('visibility', 'visible');
				    var $distance = 0;
				    for(var i=1; i<infinityWeb.gallery.currImage+1; i++){
					    var wid = parseInt($('div.feature-gallery ul li:eq('+i+')').width());
					    $distance -= wid;
				    }
				    $('div.feature-gallery ul').animate({
				        marginLeft: $distance
				      }, 600);
				    infinityWeb.gallery.currImage++;
                    infinityWeb.gallery.updateNumber();
			    }
            }
            else{
                if(infinityWeb.gallery.currImage > 1){
				    $('span.nextBtn', 'div.info-container').css('visibility', 'visible');
				    infinityWeb.gallery.currImage--;
				    var $distance = 0;
				    for(var i=1;i<infinityWeb.gallery.currImage;i++){
					    var wid = parseInt($('div.feature-gallery ul li:eq('+i+')').width());
					    $distance -= wid;
				    }
				    $('div.feature-gallery ul').animate({
				        marginLeft: $distance
				      }, 600);
				  
				    infinityWeb.gallery.updateNumber();
			    }
            }
            window.location.hash = infinityWeb.gallery.currImage;
        },//end of gallery: on_galleryButtonsClick
        updateNumber: function(){
            $('div.feature-gallery ul li:not(:eq('+infinityWeb.gallery.currImage+')) img')
                .stop().animate({opacity: 0.2}, 600);
	        $('div.feature-gallery ul li:eq('+infinityWeb.gallery.currImage+') img')
                .stop().animate({opacity: 1}, 600);
				  
	        $('span#position', 'div.info-container').text(infinityWeb.gallery.currImage);
	        if(infinityWeb.gallery.currImage == 1){
		        $('span.prevBtn', 'div.info-container').css('visibility', 'hidden');
	        }
	        if(infinityWeb.gallery.currImage == $('div.feature-gallery ul li').length-1){
		        $('span.nextBtn', 'div.info-container').css('visibility', 'hidden');
	        }
        }//end of gallery:updateNumber
    }//end of gallery
}