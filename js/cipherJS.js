$(document).ready(function() {
    document.body.onmousedown = function() {
        return false;
    }
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    var w = $("#canvas").width();
    var h = $("#canvas").height();
    var mx, my;
	
	var alphabet = "abcdefghijklmnopqrstuvwxyz"; //Original string for the alphabet, will be split into individual array indexes
	var alphabetArr; //The array that will store the letters of the "alphabet" variable in an array format
	
	
	var keyArr;
	var messageArr;
	
	var selection;
	
	var shift;
	
    
    function init() //Sets all base values
        {
			alphabetArr = alphabet.split(""); // This is where the alphabet string is divided into array indexes
		}
    init(); // Invokes init()
    function refresh() // Redraws frames
        {
            ctx.clearRect(0, 0, w, h); // Removes all drawings from the canvas
            ctx.fillStyle = "#292E37"; // Sets the drawing colour to bodyColour(Gunmetal Grey)
            ctx.fillRect(0, 0, w, h); // Draws a Gunmetal Grey rectangle over the canvas
        }
	function giveMessage()
		{
			var key;
			var mess;
			
			key = prompt("Set keyword: ");
			console.log("Key has been set as: " + key);
			
			mess = prompt("Write your message: ");
			console.log("Message has been set as: " + mess);
			
			createText(key,10,80,"#F5F5DC","1.2em Arial");
			
			keyArr = key.split("");
			messageArr = mess.split("");
			console.log("Key and Message have been split into array indexes");
		
		}

	
	function caesar()
		{
			var shift = keyArr.length;
			
			for(var i=0; i < messageArr.length; i++)
				{
					if(i + shift > 25)
						{
							messageArr[i] = alphabetArr[(i+shift)-25]
							
						}
					else
						{
							messageArr[i] = alphabetArr[i+shift];
						}
						
					
				}
			
		
		}
	function polyAlpha()
		{
			var result = []
			var keyRes = keyArr.length + 1
			
			for(var j=0; j < messageArr.length; j++)
				{
					keyRes++;
					
					if(keyRes >= keyArr.length){keyRes = 0};
					
					
					//if(keyRes == keyArr.length + 1){keyRes = 0};
					if((alphabetArr.indexOf(messageArr[j]) + alphabetArr.indexOf(keyArr[keyRes])) > 25)
						{
							console.log("Post-encrypted value exceeded key length -- value: " + 
									   (alphabetArr.indexOf(messageArr[j]) + alphabetArr.indexOf(keyArr[keyRes])));
									   
							messageArr[j] = alphabetArr[(alphabetArr.indexOf(messageArr[j]) + alphabetArr.indexOf(keyArr[keyRes]))-25]
							
							console.log("Correction succesful" + (alphabetArr.indexOf(messageArr[j]) + alphabetArr.indexOf(keyArr[keyRes]))-25);
						}
					else
						{
							
							//if(keyRes == keyArr.length + 1){keyRes = 0};
							messageArr[j] = alphabetArr[alphabetArr.indexOf(messageArr[j]) + alphabetArr.indexOf(keyArr[keyRes])]
						}
					//console.log("Succesful key: " + keyRes);
				
				}
		
		}
	function decodeCaesar(tries)
		{
			for(var t=0; t < tries; t++)
				{
					for(var i=0; i < messageArr.length; i++)
						{
							if((i + tries) > 25)
								{
									messageArr[i] = alphabetArr[(i+tries)-25]
									
								}
							else
								{
									messageArr[i] = alphabetArr[i+tries];
								}
						}
					console.log(messageArr.join("-"))
				}
		}
    function createText(text, x, y, style, font) // Custom function for generating text, instead of typing fillStyle,font etc. a billion times
        {
            ctx.fillStyle = style; // Sets the drawing colour to the argument 'style'
            if (style === undefined) // Checks to see if something was assigned to 'style'
            {
                ctx.fillStyle = trimColour; //Sets the default colour to trimColour
            }
            ctx.font = font; // Sets the font the argument 'font'
            if (font === undefined) // Checks to see if something as assigned to 'font'
            {
                ctx.font = ".7em Arial"; // Sets the default font to '.7em Arial'
            }
            ctx.fillText(text, x, y); // Draws the text
        }

    function engine() // Backbone of the game
        {
            setTimeout(function() // Creates a genuine FPS r
                {
                    requestAnimationFrame(engine); // Asks the browser for an animation frame, browser processes all frames within the assigned timeout
                    //Code Here!
					refresh();
					//for(var k=0; k < alphabetArr.length; k++) createText(k,10*(k*1.5),20,"#F5F5DC","1.2em Arial");
					
					createText(alphabetArr,10,40,"#F5F5DC","1.2em Arial");
					
					
					createText(messageArr.join("-"),10,80,"#F5F5DC","1.2em Arial");
					
				
                    //^Code Here^
                }, 1000 / 60); // Asks the browser to render 60 frames per 1000 milliseconds (1 second)
        }
    engine(); // Invokes the engine() function
	
	giveMessage();
	//caesar();
	//decodeCaesar(10);
	polyAlpha();
	
    canvas.addEventListener('click', function(evt) {}, false);
    canvas.addEventListener('mouseout', function() {
        pause = true;
    }, false);
    canvas.addEventListener('mouseover', function() {
        pause = false;
    }, false);
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        mx = mousePos.x;
        my = mousePos.y;
    }, false);

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    window.addEventListener('keydown', function(evt) {
        var key = evt.keyCode;
        //p 80
        //r 82
        //1 49
        //2 50
        //3 51
    }, false);
})