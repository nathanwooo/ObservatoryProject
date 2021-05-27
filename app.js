document.addEventListener("DOMContentLoaded", function(){
    var div0=document.createElement('div');
    div0.id="headerblock";
    var header = document.createElement('h2');
    var title = document.createTextNode('Weather in Hong Kong');
    header.appendChild(title);
    div0.appendChild(header);
    var div1=document.createElement('div');
    div1.id="flexbox1";
    var div2=document.createElement('div');
    var div3=document.createElement('div');
    div3.id="templist";
    var div4=document.createElement('div');
    div4.id="forecastlist";
    
    var WR;
    var weathericon=new Image;
    weathericon.id="weathericon";
    var br1=document.createElement('br');
    function fetchrequest1(){
        fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en")
            .then(response => {
                if (response.status == 200) {
                    response.json().then( data => {
                        WR=data;                      
                        
                        weathericon.src="https://www.hko.gov.hk/images/HKOWxIconOutline/pic"+WR.icon[0]+".png";
                        
                        div1.appendChild(weathericon);
                          
                        var tempicon=  new Image(22,48);
                        tempicon.src="images/thermometer.png";
                        
                        var temp = document.createElement('div');
                        var temp1 = document.createTextNode(WR.temperature.data[1].value+"°C  ");
                        
                        temp.appendChild(tempicon);
                        temp.appendChild(temp1);
                        div1.appendChild(temp);
                        var humicon=  new Image(28,34);
                        humicon.src="images/drop.png";
                        
                        var hum = document.createElement('div');
                        var hum1 = document.createTextNode(WR.humidity.data[0].value +"%    ");
                        hum.appendChild(humicon);
                        hum.appendChild(hum1);
                        div1.appendChild(hum);
                        var rainicon=  new Image(48,48);
                        rainicon.src="images/rain.png";
                        
                        var rain = document.createElement('div');
                        var rain1 = document.createTextNode(WR.rainfall.data[13].max +"mm     ");
                        rain.appendChild(rainicon);
                        rain.appendChild(rain1);
                        div1.appendChild(rain);
                        
                        if (WR.uvindex !=""){
                            var uvicon=  new Image(48,48);
                            uvicon.src="images/UVindex.png";
                            
                            var uv = document.createElement('div');
                            var uv1 = document.createTextNode(WR.uvindex.data[0].value);
                            uv.appendChild(uvicon);
                            uv.appendChild(uv1);
                            div1.appendChild(uv);
                        }
                        
                        if (WR.warningMessage!= ""){
                            var warning=document.createElement('span');
                            var warning0=document.createElement('span');
                            var warning1=document.createTextNode("Warning ");
                            warning.id="warning";
                            warning0.appendChild(warning1);
                            
                            var warningicon=new Image(12,8);
                            warningicon.src="images/arrow.png";
                            warning0.appendChild(warningicon);
                            warning.appendChild(warning0);
                            div0.appendChild(warning);
                            var br=document.createElement('br');
                            warning.appendChild(br);
                            var warningmes=document.createElement('div');
                            var warningmes0=document.createElement('div');
                            var warningmes1=document.createTextNode(WR.warningMessage[0]);
                            warningmes0.appendChild(warningmes1);
                            warningmes.appendChild(warningmes0);
                            warning.onmouseover=function(){
                                warning0.style.borderRadius="15px 15px 0px 0px";
                                warning.appendChild(warningmes);
                                

                            }
                            warning.onmouseleave=function(){
                                warning0.style.borderRadius="15px";
                                warning.removeChild(warningmes);
                            }
                        }
                        var br=document.createElement('br');
                        div0.appendChild(br);
                        var br2=document.createElement('br');
                        div0.appendChild(br2);
                        var time = document.createElement('div');
                        time.id="time";
                        var time1 = document.createTextNode("Last update: "+WR.updateTime.substring(11,16));
                        
                        time.appendChild(time1);
                        div0.appendChild(time); 
                        
                        var reload=new Image(32,32);
                        reload.id="reload";
                        reload.src="images/reload.png";
                        div0.appendChild(reload);
                        reload.onclick=function(){
                            location.reload();
                        }
                        var tempbut=document.createElement('span');
                        var tempbut1=document.createTextNode("Temperature");
                        tempbut.id="tempbut";
                        tempbut.appendChild(tempbut1);
                        div2.appendChild(tempbut);
                        var forecastbut=document.createElement('span');
                        var forecastbut1=document.createTextNode("Forecast");
                        forecastbut.id="forecastbut";
                        forecastbut.appendChild(forecastbut1);
                        div2.appendChild(forecastbut);
                        tempbut.onclick=function(){
                            tempbut.style.backgroundColor="white";
                            forecastbut.style.backgroundColor="lightgrey";
                            div3.style.display="flex";
                            div4.style.display="none";
                        }
                        forecastbut.onclick=function(){
                            tempbut.style.backgroundColor="lightgrey";
                            forecastbut.style.backgroundColor="white";
                            div3.style.display="none";
                            div4.style.display="flex";
                        }
                        
                        for (var i=0;i<WR.temperature.data.length;i++){
                            var district=document.createElement('p');
                            var districtinfo=document.createTextNode(WR.temperature.data[i].place);
                            district.appendChild(districtinfo);
                            
                            var district1=document.createElement('div');
                            var districtinfo1=document.createTextNode(WR.temperature.data[i].value+"°C");
                            district1.appendChild(districtinfo1);
                            district.appendChild(district1);
                            var cancel=new Image(24,24);
                            cancel.src="images/cancel.ico";
                            cancel.classList.add("cancel");
                            
                            district.appendChild(cancel);
                            district.classList.add("districtx");
                            div3.appendChild(district);
                            

                        }
                        var cancelarray=document.querySelectorAll(".cancel");
                        cancelarray.forEach(element => {
                            
                        
                            element.onclick=function(){
                                
                                element.parentElement.style.display="none";
                            }
                        })


                    });
                }
            })
    }
    var WF;
    function fetchrequest2(){
        fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en")
        .then(response=>{
            if (response.status==200){
                response.json().then(data=>{
                    WF=data;
                    for (var i=0;i<9;i++){
                        var forecast=document.createElement('div');
                        var forecasticon=new Image;
                        forecasticon.src="https://www.hko.gov.hk/images/HKOWxIconOutline/pic"+WF.weatherForecast[i].ForecastIcon+".png";
                        forecast.appendChild(forecasticon);
                        
                        var fdate=document.createElement('span');
                        fdate.id="fdate";
                        var fdate1=document.createTextNode(WF.weatherForecast[i].forecastDate.substring(6,8)+"/"+WF.weatherForecast[i].forecastDate.substring(4,6));
                        fdate.appendChild(fdate1);
                        forecast.appendChild(fdate);
                        var fweek=document.createElement('span');
                        var fweek1=document.createTextNode(WF.weatherForecast[i].week);
                        fweek.appendChild(fweek1);
                        forecast.appendChild(fweek);
                        
                        var ftemp=document.createElement('span');
                        var ftemp1=document.createTextNode(WF.weatherForecast[i].forecastMintemp.value+"°C | "+WF.weatherForecast[i].forecastMaxtemp.value+"°C");
                        ftemp.appendChild(ftemp1);
                        forecast.appendChild(ftemp);
                        var fhum=document.createElement('span');
                        var fhum1=document.createTextNode(WF.weatherForecast[i].forecastMinrh.value+"% - "+WF.weatherForecast[i].forecastMaxrh.value+"%");
                        fhum.appendChild(fhum1);
                        forecast.appendChild(fhum);
                        div4.appendChild(forecast);
                    }
                    


                })
            }
        })
    }
    fetchrequest1();
    fetchrequest2();
    div0.appendChild(div1);
    document.body.appendChild(div0);
    document.body.appendChild(br1);
    document.body.appendChild(div2);
    
    document.body.appendChild(div3);
    document.body.appendChild(div4);
    
    
    
    

});