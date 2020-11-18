// function handleReady() {
//     alert("Ready to go!");
// }
// // Run a named function when the document is ready.
// $(document).ready(handleReady);

// // This...
// jQuery(document).ready(function () {
//     alert("Ready to go!!!");
// });
 
// // is equivalent to this.
// $(document).ready(function () {
//     alert("Ready to go!!!");
// });
 
// Run an anonymous function when the document is ready.
// $(document).ready(function () {
//     alert("Ready to go!");

// });

// $("H1").toggle();


$('#myDiv').append('<p>A new paragraph of text...</p>');

$('#myDiv').css({ 'width': '400', 'background-color': 'CornflowerBlue' });
$('H1').removeClass('text-center');

$("p").on("click", function () {
    $("p").toggle("slow");
})

$("div").hover(
    // in callback
    function () {
        $(this).css("background-color", "CornflowerBlue");
    },
    // out callback
    function () {
        $(this).css("background-color", "");
    }
);

$("h1").hover(
    function(){
        $(this).css("color", "DarkOrange");
    },
    function(){
        $(this).css("color", "");
    }


);