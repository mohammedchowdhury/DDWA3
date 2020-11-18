let iconLink = "http://openweathermap.org/img/w/"; 
$("document").ready(function() {
    $('#hideMe').hide();
    $("#getWeather-button").click(function (event) {
        if(validateZipCode()){
        $('#errorMessages').empty();
        $('#hideMe').show();
        calculateDailyWeather(); 
        calculateWeeklyWeather(); 
        }else{
            error();
        }

    }); 
});

function validateZipCode(){
    let zipcode = $("#Zipcode").val();
    if(zipcode.length!=5){
        return false;
    }
    zipcode = String(zipcode);
    for(let i = 0; i<zipcode.length;i++){
        console.log(zipcode.charAt(i)); 
        if(isNaN(zipcode.charAt(i))){
            return false; 
        }
    }
    return true; 
}

function calculateDailyWeather(){
    let zipcode = $("#Zipcode").val();
$.ajax ({
    type: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/weather?zip='+zipcode+',US&appid=9a94aa440a7af08000fac2be8a5b2a01',
    success: function (data, status) {
        //alert("was successful");
        
        let cityName = $("#cityName"); 
        cityName.html("Current condition in "+data.name); 
        
        let icon = data.weather[0].icon; 
        let iconLinkccomplete = iconLink+icon+".png"; 

        let showIcon = $("#showIcon");
        showIcon.html('<img src='+iconLinkccomplete+"></img>"); 

        let showIconDecs = $("#showIconDecs");
        showIconDecs.text(data.weather[0].main+": "+data.weather[0].description); 

        let showTemp = $("#showTemp"); 
        let showHumidity = $("#showHumidity"); 
        let showWindSpeed = $("#showWindSpeed"); 

        let unitvalue = $("#units").val(); 
        let temp = data.main.temp; 
        
        if(unitvalue=='Imperial'){//farenheite
            temp = converttoFarenheite(temp); 
            temp = "Temperature : "+temp+" F";
       }else{//celcius 
        temp = converttoCel(temp); 
        temp = "Temperature : "+temp+" C";
       }
       showTemp.text(temp); 
       showHumidity.text("Humidity: "+data.main.humidity+"%");
       showWindSpeed.text("Wind: "+data.wind.speed+" miles/hour");

    //    var time = data.list[i].dt_txt;
    //    var d = new Date(time);

    //1599343200000 5 mins early

      

       //d=d.toDateString(); 


       var time2  = data.sys.sunrise+(1599343480000); 
       var sunrise = new Date(time2);
       $("#sunriseTime").text(sunrise);

       var time  = data.sys.sunset+(1599343480000); 
       var sunsetTime = new Date(time);
       $("#sunsetTime").text(sunsetTime);
      
       



    // "sys": {
    //     "type": 1,
    //     "id": 4698,
    //     "country": "US",
    //     "sunrise": 1600944327,
    //     "sunset": 1600987755
    // },



        },
        error: function() {    
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.  Please try again later.'));
            $('#hideMe').hide();
        }
    });
}

function calculateWeeklyWeather(){
    let zipcode = $("#Zipcode").val();

    $.ajax ({
        type: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/forecast?zip='+zipcode+'&appid=9a94aa440a7af08000fac2be8a5b2a01',
        success: function (data, status) {
            let counter =1 ; 
            for(let i=0;i<data.list.length;i=i+8){
                var time = data.list[i].dt_txt;
                var d = new Date(time);
                d=d.toDateString(); 
                let tempString = "<p>"+d+"</><br>";
    
                let icon = data.list[i].weather[0].icon; 
                let iconLinkccomplete = iconLink+icon+".png"; 
                tempString+="<img src="+iconLinkccomplete+"></img><br>"
    
                let tempMin = data.list[i].main.temp_min;
                let tempMax = data.list[i].main.temp_max;
    
                let unitvalue = $("#units").val(); 
                if(unitvalue=='Imperial'){
                    tempMin = converttoFarenheite(tempMin);
                    tempMax = converttoFarenheite(tempMax);
                    finalTemp = "H: "+tempMax+" F"+" L: "+tempMin+" F";   
               }else{//celcius 
                tempMin = converttoCel(tempMin);
                tempMax = converttoCel(tempMax);
                finalTemp = "H: "+tempMax+" C"+" L: "+tempMin+" C";   
               }
               tempString += finalTemp; 
               let days = $("#day"+counter);
               days.html(tempString); 
               counter++;
            }
            },
            error: function() {    
                $('#errorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Error calling web service.  Please try again later.'));
                $('#hideMe').hide();
            }
        });
    }
function converttoCel(temp){
    temp = temp-273.15; 
    temp = temp.toFixed(2);
    return temp;
}
function converttoFarenheite(temp){
    temp = temp-273.15;
    temp = temp*(9/5) + 32; 
    temp = temp.toFixed(2);
    return temp; 
}
function error(){
    $('#errorMessages').empty();
    $('#errorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Invalid Zipcode.'));
}