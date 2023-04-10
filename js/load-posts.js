(function($){

	var pageNum     = parseInt(ajax_var.startPage) + 1;
	var max         = parseInt(ajax_var.maxPages);
	var nextLink    = ajax_var.nextLink;
	var buttonText  = ajax_var.buttonText;
	var loadingText = ajax_var.loadingText;
	var noText      = ajax_var.noText;

	if(pageNum <= max) {
		$('.loop.load-more .blog-layout')
		.append('<div class="nz-load-more" id="nz-load-more-posts"><a href="#" class="button large button-normal grey animate-false hover-fill">'+buttonText+'</a><div class="nz-loader"></div>');
		$('<div class="blog-post blog-post-'+ pageNum +' nz-clearfix"></div>').insertAfter('.loop .blog-post-1');
	}

	$('.blog-layout #nz-load-more-posts a').click(function() {

		if(pageNum <= max) {

			var $this = $(this);
				$this.parent().addClass('clicked');

			var blogContainer = $('.blog-post-'+ pageNum).wrap('<div class="lazy-load"></div>');
			
			blogContainer.load(nextLink + ' .post',
				function() {

					$this.parent().removeClass('clicked');
					var sizer = blogContainer.find('.post');

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

					imagesLoaded( blogContainer, function() {
						blogContainer.shuffle({
							itemSelector: '.post',
							sizer:sizer,
							gutterWidth:0,
							speed: 300,
							easing: 'ease-out' 
						});
					});

					if ($('.blog-layout').hasClass('animation-true')) {
						var child   = sizer;
						var length  = child.length;
						var i       = 0;
						var timer   = '';

						function animation() {
							$(child[i]).addClass('css-animated');
							i++;
							if (i == length ) {clearInterval(timer);}
						}

						blogContainer.one('inview', function(event, isInView, visiblePartX, visiblePartY){
					    	if (isInView) {
					    		setTimeout(function(){
									blogContainer.unwrap();
									var timer = setInterval(animation, 250);
								},50);
					    	};
					    });
					} else {
						setTimeout(function(){
							$('.lazy-load').addClass('in');
						},300);

						setTimeout(function(){
							blogContainer.unwrap();
						},600);
					};

					pageNum++;

					nextLink = nextLink.replace(/\/page\/[0-9]*/, '/page/'+ pageNum);

					$('<div class="blog-post blog-post-'+ pageNum +' nz-clearfix"></div>').insertAfter(blogContainer);
					if(pageNum <= max) {$('.blog-layout #nz-load-more-posts a').text(buttonText);} 
					else {$('.blog-layout #nz-load-more-posts a').text(noText);}
				}
			);
		}
		
		return false;
	});

})(jQuery);