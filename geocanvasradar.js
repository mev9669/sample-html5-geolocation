/*
 * Copyright (c) 2012, Intel Corporation
 * File revision: 04 October 2012
 * Please see http://software.intel.com/html5/license/samples 
 * and the included README.md file for license terms and conditions.
 */

		function refresh_coords(){
			navigator.geolocation.getCurrentPosition(updateLocation, handleLocationError);
		}
		
		function check(){
			
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(updateLocation, handleLocationError);				
			}
			
			try{
				document.createElement("canvas").getContext("2d");
			}
			catch(e){
			}
		}

		window.addEventListener("load", check, true);
		
		//Function: Draw a shape the size of the canvas to add a background color effect.
		function colorCanvas(){

			var canvas = document.getElementById('surface');
			var context = canvas.getContext('2d');

			context.save();
			
			context.beginPath();
			context.rect(0, 0, 200, 400); //context.rect(x, y, width, height);
			
			context.moveTo(400, 400); // give the (x,y) coordinates
			context.lineTo(400, 0);
			context.lineTo(200, 200);
			
			context.fillStyle = '#7BDA58';
			context.fill();
			
			context.closePath();
			context.restore();
		}
		window.addEventListener("load", colorCanvas, true);
		
		function drawtree(context, trunk_stat){
			context.beginPath();
			
			context.moveTo(-25, -50);
			context.lineTo(-10, -80);
			context.lineTo(-20, -80);
			context.lineTo(-5, -110);
			context.lineTo(-15, -110);
			
			context.lineTo(0, -140);
			
			context.lineTo(15, -110);
			context.lineTo(5, -110);
			context.lineTo(20, -80);
			context.lineTo(10, -80);
			context.lineTo(25, -50);
			
			context.closePath();
									
			if(trunk_stat == true){
				context.fillStyle='#339900';
				context.fill();
					
				context.stroke();
					
				var trunkGradient = context.createLinearGradient(-5, -50, 5, -50);
				trunkGradient.addColorStop(0, '#663300');
				trunkGradient.addColorStop(0.4, '#996600');
				trunkGradient.addColorStop(1, '#552200');
				context.fillStyle = trunkGradient;
				context.fillRect(-5, -50, 10, 50);
			}
		}
		
		function layshadow(context){
			context.save();
			context.transform(1, 0, -0.5, 1, 0, 0);
			context.scale(1, 0.6);		
			context.fillStyle = 'rgba(0, 0, 0, 0.2)';
			context.fillRect(-5, -50, 10, 50);
						
			drawtree(context, false);
			context.fill();
			context.restore();
		}
		
		function tree1(){
			var canvas = document.getElementById('surface');
			var context = canvas.getContext('2d');			
			context.save();			
			context.translate(30, 150);			
			layshadow(context);		
			drawtree(context, true);
			context.restore();
		}
		
		window.addEventListener("load", tree1, true);

		function tree2(){
			var canvas = document.getElementById('surface');
			var context = canvas.getContext('2d');
			
			context.save();
			
			context.translate(370, 150);		
			layshadow(context);
			drawtree(context, true);

			context.restore();
		}
		
		window.addEventListener("load", tree2, true);
			
		function drawtext(){
			var canvas = document.getElementById('surface');
			var context = canvas.getContext('2d');			
			context.save();			
			context.font = "italic 24pt Times";			
			context.lineWidth = 1;

			context.fillStyle='#DE971E';
			context.fillText("Are You Near?", 130, 50);

			context.strokeStyle = '#DE1E4A'; 
			context.strokeText("Are You Near", 130, 50);
			
			context.restore();
		}		
		
		window.addEventListener("load", drawtext, true);
		
		function drawDestinationcoords(){
			var canvas = document.getElementById('surface');
			var context = canvas.getContext('2d');
			
			context.save();			
			context.font = "bold 20pt Times";			
			context.lineWidth = 1;
			context.fillStyle = "#000000";
			context.fillText("45.5416, -122.9601", 130, 80); //Latitude, Longitude
			
			//Restores the canvas state
			context.restore();
		}
		
		window.addEventListener("load", drawDestinationcoords, true);
		
		function tree3(){
			var canvas = document.getElementById('surface');
			var context = canvas.getContext('2d');
			
			context.save();
			context.translate(370, 440);
			
			layshadow(context);
			drawtree(context, true);

			context.restore();
		}
		
		window.addEventListener("load", tree3, true);
		
		function drawCircle(x, y, radius, fillcolor){
			var canvas = document.getElementById('surface');
			var context = canvas.getContext('2d');
			context.fillStyle = fillcolor; 
			context.beginPath();
			context.arc(x,y,radius,0,Math.PI*2,true);
			context.closePath();
			context.fill();
			context.lineWidth = 2;

			context.strokeStyle = "#000000";
			context.stroke();
		}
		
		function drawRing2(){
			drawCircle(200, 200, 80, "#FFFFFF");
		}
		
		window.addEventListener("load", drawRing2, true);
		
		function drawRing1(){		
			drawCircle(200, 200, 55, "#FFFFFF");
		}
		
		window.addEventListener("load", drawRing1, true);
			
		function drawRing0(){
			drawCircle(200, 200, 30, "#FFFFFF");
		}
		
		window.addEventListener("load", drawRing0, true);	
		
		//Function: Sets the tag with the relevant error message
		function updateStatus(message){
			document.getElementById("error").innerHTML = message;
		}					
		
		function updateLocation(position){
			var longitude = position.coords.longitude;
			var latitude = position.coords.latitude;
			var timestamp = position.timestamp;
			var time = new Date(timestamp);
			document.getElementById("longitude").innerHTML = longitude;
			document.getElementById("latitude").innerHTML = latitude;
			document.getElementById("timestamp").innerHTML = time.toString(); //Wrong date & time
			
			document.getElementById("error").innerHTML = "";
			var targetLati = 45.5416;
			var targetLong = -122.9601;
			if( ( (longitude < (targetLong + 0.0625)) && (longitude > (targetLong - 0.0625)) ) && ( (latitude > (targetLati - 0.0625)) && (latitude < (targetLati + 0.0625)) ) ){
					drawCircle(200, 200, 30, "#FF0000");
			}
			
			else if( (( (longitude > (targetLong + 0.125)) && (longitude < (targetLong + 0.0625)) ) || ( (longitude > (targetLong - 0.125)) && (longitude < (targetLong - 0.0625)) ) ) && ( ((latitude > (targetLati - 0.125)) && (latitude < (targetLati - 0.0625))) || (latitude > (targetLati + 0.0625)) && (latitude < (targetLati + 0.125))) ){
					drawRing2();	
					drawCircle(200, 200, 55, "#FF8000");	
					drawRing0();
			}
			
			else {
					drawCircle(200, 200, 80, "#FFFF00");	
					drawRing1();
					drawRing0();
			}
			document.getElementById("distn").innerHTML = calc_distance(latitude, longitude, targetLati, targetLong) + " mile(s) away";
		}                                       
		
		function handleLocationError(error){
			switch(error.code){
				case 0:
				updateStatus("There was an error an error while retrieving your location: "+error.message);
				break;
				
				case 1:
				updateStatus("The user prevented this page from retrieving a location.");
				break;
				
				case 2:
				updateStatus("The browser was unable to determine your location: "+error.message);
				break;
				
				case 3:
				updateStatus("The browser timed out before retrieving the location.");
				break;			
			}
		}	