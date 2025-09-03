/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {   

   	// update the toggle button 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout the navigation panel
   	nav.fadeOut();   		
   	     
  	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function(form) {

			var sLoader = $('#submit-loader');

			$.ajax({      	

		      type: "POST",
		      url: "inc/sendEmail.php",
		      data: $(form).serialize(),
		      beforeSend: function() { 

		      	sLoader.fadeIn(); 

		      },
		      success: function(msg) {

	            // Message was sent
	            if (msg == 'OK') {
	            	sLoader.fadeOut(); 
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();   
	            }
	            // There was an error
	            else {
	            	sLoader.fadeOut(); 
	               $('#message-warning').html(msg);
		            $('#message-warning').fadeIn();
	            }

		      },
		      error: function() {

		      	sLoader.fadeOut(); 
		      	$('#message-warning').html("Something went wrong. Please try again.");
		         $('#message-warning').fadeIn();

		      }

	      });     		
  		}

	});


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		

})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    const counterBars = document.querySelectorAll(".counter-bar-fill");

    counterBars.forEach((bar) => {
        const targetPercent = parseInt(bar.getAttribute("data-percent"));
        const counterText = bar.parentElement.querySelector(".counter-text");
        let currentPercent = 0;

        const interval = setInterval(() => {
            if (currentPercent >= targetPercent) {
                clearInterval(interval);
            } else {
                currentPercent++;
                bar.style.width = `${currentPercent}%`;
                counterText.textContent = `${currentPercent}%`;
            }
        }, 20); // Adjust speed by changing the interval time
    });
});
function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}
function toggleDropdown1() {
  document.getElementById("myDropdown1").classList.toggle("show");
}
function toggleDropdown2() {
  document.getElementById("myDropdown2").classList.toggle("show");
}
function toggleDropdown3() {
  document.getElementById("myDropdown3").classList.toggle("show");
}

document.getElementById('clickableElement').addEventListener('click', function () {
    // Add the 'blast' class to trigger the animation
    this.classList.add('blast');

    // Hide the pokeball and show new content after 3 seconds
    setTimeout(() => {
        this.style.display = 'none'; // Hide the pokeball
        document.getElementById('hiddenContent').style.display = 'block'; // Show new content
    }, 1800); // Match the duration of the animation
});

document.getElementById("clickableElement").addEventListener("click", function () {
		let content = document.getElementById("hiddenContent");
		if (content.style.display === "none") {
			content.style.display = "block";

			// Fetch GitHub data only when opened
			fetchGitHubStats("Soham-047"); // <-- replace with your GitHub username
		} else {
			content.style.display = "none";
		}
	});

	function fetchGitHubStats(username="Soham-047") {
		// Fetch total public repos
		fetch(`https://api.github.com/users/${username}`)
			.then(response => response.json())
			.then(data => {
				document.getElementById("repo-count").textContent = `Repositories: ${data.public_repos}+`;
			});

		// Fetch contributions (using GitHub API v3 or external service)
		fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
			.then(response => response.json())
			.then(data => {
				let total = data.totalContributions || 0;
				document.getElementById("contrib-stats").textContent = `Total Contributions: ${total}+`;
			})
			.catch(() => {
				document.getElementById("contrib-stats").textContent = "Contributions: Not Available";
			});
	}

	function fetchPortfolioProjects(username) {
		fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`)
			.then(response => response.json())
			.then(repos => {
				let projectsList = document.getElementById("github-projects");
				projectsList.innerHTML = "";

				repos.forEach((repo, index) => {
					let li = document.createElement("li");
					li.style.marginBottom = "20px";

					li.innerHTML = `
						<a href="${repo.html_url}" target="_blank">
							${index + 1}). ${repo.name}
						</a>
						<div class="dropdown">
							<button onclick="toggleDropdown(${index})" class="dropdown-btn">${repo.name}</button>
							<div id="dropdown-${index}" class="dropdown-content">
								<p>${repo.description || "No description available."}</p>
							</div>
						</div>
					`;
					projectsList.appendChild(li);
				});
			})
			.catch(err => {
				document.getElementById("github-projects").innerHTML = "<li>Error fetching repos.</li>";
			});
	}

	// Dropdown toggle
	function toggleDropdown(id) {
		let dropdown = document.getElementById(`dropdown-${id}`);
		dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
	}

	// Call with your GitHub username
	fetchPortfolioProjects("Soham-047");