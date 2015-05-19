var current_page = "home";
var is_animating = false;

$(function() {
	$('#email-form').submit(function (e) {
	    e.preventDefault();
	    if ($('#email-form-text').val().match(/^[\w.-]+@[\w-]+\.[\w-]{2,99}$/)) {
	    	$("#email-error").text("");
		    $("section#email").animate({opacity: 0}, 300, complete = function() {
		    	$("section#email").hide();
			    $("section#type").show();
			    $("section#type").animate({opacity: 1}, 300);
		    });
	    }
	    else {
	    	$("#email-error").text("That email doesn't appear to be valid");
	    }
	});

	$('#contact-form').submit(function (e) {
	    e.preventDefault();
        $("#contact-success").hide();
	    $("#contact-error").text("");
	    $("#contact-form input, #contact-form textarea").removeClass("error");
	    if ($("#contact-name").val().trim() == "") {
	    	$("#contact-name").addClass("error");
	    	$("#contact-error").text("Please enter a name.");
	    }
	    else if (!$("#contact-email").val().match(/^[\w.-]+@[\w-]+\.[\w-]{2,99}$/)) {
	    	$("#contact-email").addClass("error");
	    	$("#contact-error").text("Please enter a valid email address.");
	    }
	    else if ($("#contact-msg").val().trim() == "") {
	    	$("#contact-msg").addClass("error");
	    	$("#contact-error").text("Please enter a message.");
	    }
	    else {
	    	$.ajax({
	    		type: "POST",
	    		url: "/mail",
	    		data: {
	    			name: $("#contact-name").val(),
	    			email: $("#contact-email").val(),
	    			msg: $("#contact-msg").val()
	    		},
	    		success: function() {
	    			$("#contact-success").show();
	    		}
	    	});
	    }
	});
});

function submit_form(type) {
	var url = "";
	switch (type) {
		case "school":
			url = '//repurposenetwork.us10.list-manage.com/subscribe/post-json?u=2900ce3d7fdfea3fd123759ae&id=a3f42d69f2&c=?';
		break;
		case "business":
			url = '//repurposenetwork.us10.list-manage.com/subscribe/post-json?u=2900ce3d7fdfea3fd123759ae&id=cccea28833&c=?';
		break;
		default:
			$("#email-result-msg")[0].innerHTML = "Sorry, we only support schools and businesses right now.";
			$("#email-result-msg").removeClass("error");
			$("section#type").animate({opacity: 0}, 300, complete = function() {
				$("section#type").hide();
				$("section#email-result").show();
				$("section#email-result").animate({opacity: 1}, 300);
			});
			return;
		break;
	}
	$.ajax({
	    url: url,
	    type: 'POST',
	    data: $('#email-form').serialize(),
	    dataType: 'jsonp',
	    success: function(data) {
	    	var err = data['result'] != "success";
			$("#email-result-msg")[0].innerHTML =
			(err ? "Error: " : "") + data.msg;
			if (err) $("#email-result-msg").addClass("error");
			else $("#email-result-msg").removeClass("error");

			$("section#type").animate({opacity: 0}, 300, complete = function() {
				$("section#type").hide();
				$("section#email-result").show();
				$("section#email-result").animate({opacity: 1}, 300);
			});
	    }
    });
}

function close_result() {
	$("section#email-result").animate({opacity: 0}, 300, complete = function() {
		$("section#email-result").hide();
		$("section#email").show();
		$("section#email").animate({opacity: 1}, 300);
	});
}

function goto_page(page) {
	if (is_animating) return;
	if (current_page === page) return;
	is_animating = true;
	$("#navigation li").removeClass("selected");
	$("#nav-" + page).addClass("selected");
	switch (page) {
		case "home":
			anim_pages(current_page, "home", "right");
			$("#content-bg").animate({height:"350px"}, 100);
			current_page = "home";
		break;
		case "about":
			anim_pages(current_page, "about", current_page === "home" ? "left" : "right");
			$("#content-bg").animate({height:"350px"}, 100);
			current_page = "about";
		break;
		case "team":
			anim_pages(current_page, "team", current_page === "contact" ? "right" : "left");
			$("#content-bg").animate({height:"1300px"}, 100);
			current_page = "team";
		break;
		case "contact":
			anim_pages(current_page, "contact", "left");
			$("#content-bg").animate({height:"500px"}, 100);
			current_page = "contact";
		break;
	}
}

function anim_pages(toHide, toShow, dir) {
	if (dir == "left") {
		$("#" + toHide).animate({
			opacity: 0,
			left: "-" + (window.innerWidth) + "px"},
			300, complete = function(){
				$("#" + toHide).hide();
				is_animating = false;
			});

		$("#" + toShow).css({left: "0", right:"-" + (window.innerWidth/2) + "px", opacity:0})
		$("#" + toShow).show();
		$("#" + toShow).animate({
			opacity: 1,
			right: "0px"},
			300, complete = function() { is_animating = false; });
	}
	else {
		$("#" + toHide).animate({
			opacity: 0,
			right: "-" + (window.innerWidth) + "px"},
			300, complete = function(){
				$("#" + toHide).hide();
				is_animating = false;
			});

		$("#" + toShow).css({right: "0", left:"-" + (window.innerWidth/2) + "px", opacity:0})
		$("#" + toShow).show();
		$("#" + toShow).animate({
			opacity: 1,
			left: "0px"},
			300, complete = function() { is_animating = false; });
	}
}