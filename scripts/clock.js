function resizeCanvas() {
				var conline = document.getElementById("conline");
				line_canvas.width = conline.offsetWidth;
				line_canvas.height = conline.offsetHeight;
				line_canvas_width = line_canvas.width;
				line_canvas_height = line_canvas.height;
				
				var conround = document.getElementById("conround");
				round_canvas.width = conround.offsetWidth;
				round_canvas.height = conround.offsetHeight;
				round_canvas_width = round_canvas.width;
				round_canvas_height = round_canvas.height;
				round_clock_max_radius = round_clock_radius * round_canvas_height;
				/**
				 * Your drawings need to be inside this function otherwise they will be reset when 
				 * you resize the browser window and the canvas goes will be cleared.
				 */
				lineFillClock(); 
				roundFillClock();
			}
			           
            function handleZero(timeComponent)
            {
                if(timeComponent < 10)
                {
                    return "0" + timeComponent;
                }
                else
                {
                    return timeComponent;
                }
            }
           
            function lineFillClock()
            {
                line_context.clearRect(0, 0, line_canvas_width, line_canvas_height);
                var ctime = (new Date());
                var h = ctime.getHours();
                var mins = ctime.getMinutes();
                var secs = ctime.getSeconds();

                var ms = ctime.getMilliseconds();
				
				barEnd = line_canvas_width - 10;

                line_context.beginPath();
                line_context.moveTo(barStart, barGroupHeightOffset);
                line_context.lineTo(barEnd, barGroupHeightOffset);
                line_context.moveTo(barStart, barGroupHeightOffset + 10);
                line_context.lineTo(barEnd, barGroupHeightOffset + 10);
                line_context.moveTo(barStart, barGroupHeightOffset + 20);
                line_context.lineTo(barEnd, barGroupHeightOffset + 20);
                line_context.lineWidth = 2;
                line_context.strokeStyle = "#62478F";
                line_context.stroke();
				line_context.closePath();

                // Hours
                line_context.beginPath();
                line_context.lineWidth = 5;
                barLength = (((barEnd - barStart) / 24) * h) + (((barEnd - barStart) / 1440) * mins)
                line_context.moveTo(barStart, barGroupHeightOffset);
                line_context.lineTo(barLength + barStart, barGroupHeightOffset);
                line_context.strokeStyle = "#95B285";
                line_context.stroke();
				line_context.closePath();

                // 
                line_context.beginPath();
                line_context.lineWidth = 5;
                barLength = (((barEnd - barStart) / 60) * mins) + (((barEnd - barStart) / 3600) * secs)
                line_context.moveTo(barStart, barGroupHeightOffset + 10);
                line_context.lineTo(barLength + barStart, barGroupHeightOffset + 10);
                line_context.strokeStyle = "#C1AF27";
                line_context.stroke();
				line_context.closePath();

                // Seconds
                line_context.beginPath();
                line_context.lineWidth = 5;
                barLength = (((barEnd - barStart) / 60000) * ms) + (((barEnd - barStart) / 60) * secs)
                line_context.moveTo(barStart, barGroupHeightOffset + 20);
                line_context.lineTo(barLength + barStart, barGroupHeightOffset + 20);
                line_context.strokeStyle = "#8C1D74";
                line_context.stroke();
				line_context.closePath();

                requestAnimationFrame(lineFillClock);
            }

            function roundFillClock()
            {
                round_context.clearRect(0, 0, round_canvas_width, round_canvas_height);
                
                var ctime = (new Date());
                var h = ctime.getHours();
                var mins = ctime.getMinutes();
                var secs = ctime.getSeconds();
                var ms = ctime.getMilliseconds();

                canvas = document.getElementById('canvas_round')
               
                var clockString = "" + handleZero(h) + " " + handleZero(mins) + " " + handleZero(secs);
                var x = canvas.width / 2;
                var y = canvas.height / 2;
                
                round_context.textAlign = "center";
                round_context.font = "15px Consolas";
				round_context.fillStyle = "#95B285";
                round_context.fillText(clockString, x, y);
				
				round_context.beginPath();
                round_context.lineWidth = 2;
                round_context.arc(x, y, round_clock_max_radius, -0.5 * Math.PI,1.5 * Math.PI, false);
                round_context.strokeStyle = "#62478F";
                round_context.stroke();
				round_context.closePath();
				
				round_context.beginPath();
                round_context.lineWidth = 2;
                round_context.arc(x, y, round_clock_max_radius -10, -0.5 * Math.PI,1.5 * Math.PI, false);
                round_context.strokeStyle = "#62478F";
                round_context.stroke();
				round_context.closePath();
				
				round_context.beginPath();
                round_context.lineWidth = 2;
                round_context.arc(x, y, round_clock_max_radius - 20, -0.5 * Math.PI,1.5 * Math.PI, false);
                round_context.strokeStyle = "#62478F";
                round_context.stroke();
				round_context.closePath();
				
                // Hours
                round_context.beginPath();
                round_context.lineWidth = 10;
                round_context.arc(x, y, round_clock_max_radius, 1.5 * Math.PI, (-0.5 + ((2.0/1440.0)*(h * 60.0 + mins)))* Math.PI, false);
                round_context.strokeStyle = "#95B285";
                round_context.stroke();
				round_context.closePath();
                
                // Minutes
                round_context.beginPath();
                round_context.lineWidth = 10;
                round_context.arc(x, y, round_clock_max_radius-10, 1.5 * Math.PI, (-0.5 + ((2.0/3600.0)*(mins * 60.0 + secs))) * Math.PI, false);
                round_context.strokeStyle = "#C1AF27";
                round_context.stroke();
				round_context.closePath();
                
                // Seconds
                round_context.beginPath();
                round_context.lineWidth = 10;
                round_context.arc(x, y, round_clock_max_radius-20, 1.5 * Math.PI, (-0.5 + ((2.0/60000.0)*(secs * 1000.0 + ms))) * Math.PI, false);
                round_context.strokeStyle = "#8C1D74";
                round_context.stroke();
				round_context.closePath();
                
                requestAnimationFrame(roundFillClock);
            }