(function($){

	var pageNum     = parseInt(ajax_var.startPage) + 1;
	var max         = parseInt(ajax_var.maxPages);
	var nextLink    = ajax_var.nextLink;
	var buttonText  = ajax_var.buttonText;
	var loadingText = ajax_var.loadingText;
	var noText      = ajax_var.noText;

	if(pageNum <= max) {
		$('.loop.load-more .port-layout')
		.append('<div class="nz-load-more" id="nz-load-more-posts"><a href="#" class="button large button-normal grey animate-false hover-fill">'+buttonText+'</a><div class="nz-loader"></div>');
		$('<div class="port-post port-post-'+ pageNum +' nz-clearfix"></div>').insertAfter('.loop .port-post-1');
	}

	$('.port-layout #nz-load-more-posts a').click(function() {
	
		if(pageNum <= max) {

			var $this = $(this);
				$this.parent().addClass('clicked');

			var portContainer = $('.port-post-'+ pageNum).wrap('<div class="lazy-load"></div>');
			
			portContainer.load(nextLink + ' .portfolio',
				function() {

					$this.parent().removeClass('clicked');
					var sizer = portContainer.find('.portfolio');

					$('.post-gallery').flexslider({
						animation:'fade',
						smoothHeight:false,
						touch: true,
						animationSpeed: 450,
						slideshow:false,
						directionNav:false,
						controlNav:true,
						pauseOnHover: true,
						prevText: "",
						nextText: "",
					});

					if ($('.port-layout').hasClass('animation-true')) {
						var child   = sizer;
						var length  = child.length;
						var i       = 0;
						var timer   = '';

						function animation() {
							$(child[i]).addClass('css-animated');
							i++;
							if (i == length ) {clearInterval(timer);}
						}

						portContainer.one('inview', function(event, isInView, visiblePartX, visiblePartY){
					    	if (isInView) {
					    		setTimeout(function(){
									portContainer.unwrap();
									var timer = setInterval(animation, 250);
								},50);
					    	};
					    });
					} else {
						setTimeout(function(){
							$('.lazy-load').addClass('in');
						},300);

						setTimeout(function(){
							portContainer.unwrap();
						},600);
					};

					pageNum++;

					nextLink = nextLink.replace(/\/page\/[0-9]*/, '/page/'+ pageNum);

					$('<div class="port-post port-post-'+ pageNum +' nz-clearfix"></div>').insertAfter(portContainer);
					if(pageNum <= max) {$('.port-layout #nz-load-more-posts a').text(buttonText);} 
					else {$('.port-layout #nz-load-more-posts a').text(noText);}
				}
			);
		}
		
		return false;
	});

})(jQuery);