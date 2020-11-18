$(document).ready(function(){



// $('#akronInfoDiv').toggle('fast'); 
// $('#minneapolisInfoDiv').toggle('fast'); 
// $('#louisvilleInfoDiv').toggle('fast'); 


$("#akronInfoDiv").hide(); 
$("#minneapolisInfoDiv").hide(); 
$("#louisvilleInfoDiv").hide(); 

mainButton


//menu button toggle
$("#mainButton").on('click' ,function(){
    $('#mainInfoDiv').toggle('slow'); 
});

$("#akronButton").on('click' ,function(){
    $('#akronInfoDiv').toggle('slow'); 
    $("#akronWeather").hide(); 
});

$("#minneapolisButton").on('click' ,function(){
    $('#minneapolisInfoDiv').toggle('slow'); 
    $("#minneapolisWeather").hide(); 
});


$("#louisvilleButton").on('click' ,function(){
    $('#louisvilleInfoDiv').toggle('slow'); 
    $("#louisvilleWeather").hide(); 
   
});





//weather toggle
$("#akronWeatherButton").on('click' ,function(){
    $('#akronWeather').toggle('slow'); 
});

$("#minneapolisWeatherButton").on('click' ,function(){
    $('#minneapolisWeather').toggle('slow'); 
});

$("#louisvilleWeatherButton").on('click' ,function(){
    $('#louisvilleWeather').toggle('slow'); 
});


$("td").hover(
    // in callback
    function() {
        $(this).css('background-color', 'WhiteSmoke');
    },
    // out callback
    function() {
        $(this).css('background-color', '');
    });



});



