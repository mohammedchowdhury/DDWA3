$(document).ready(function () {

    $("h1").addClass("text-center");
    $("h2").addClass("text-center");

    $("h1:contains(Team Up)").removeClass().addClass("page-header");

    $('#yellowHeading').text('Yellow Team');

    $("#orangeHeading").css("color", "orange");
    $("#blueHeading").css("color", "blue");
    $("#redHeading").css("color", "red");
    $("#yellowHeading").css("color", "yellow");


    //Add Joseph Banks and Simon Jones to the Yellow Team list.
    $("#yellowTeamList").prepend("<li>Allen Bailey</li>");
    $("#yellowTeamList").prepend("<li>Simon Jones </li>");

    //Hide the element containing the text "Hide Me!!!"
    $("#oops").hide();

    //Remove the element containing the text "Bogus Contact Info" from the footer.
    $("#footerPlaceholder").remove();
    //Add a paragraph element containing your name and email to the footer. The text must be in Courier font and be 24 pixels in height.
    $("#footer").prepend("<p id='footerinfo'>Mohammed Chowdhury MohammedChowdhury60@gmail.com</p>");

    $("#footerinfo").css("font", "Courier");
    $( "#footerinfo" ).css( "fontSize", "24px" );

});