const data = [
    {
        VideoLocation: "#vid-0",
        PatternLocation: "resources/markers/pattern-Individual_Blocks-0.patt",
    },
    {
        VideoLocation: "#vid-1",
        PatternLocation: "resources/markers/pattern-Individual_Blocks-1.patt",
    },
    {
        VideoLocation: "#vid-2",
        PatternLocation: "resources/markers/pattern-Individual_Blocks-2.patt",
    },
    {
        VideoLocation: "#vid-3",
        PatternLocation: "resources/markers/pattern-Individual_Blocks-3.patt",
    }

];

var markersURLArray = [];
var markersNameArray = [];
var Url = "";

const start = async () => {
    AFRAME.registerComponent("markers_start", {
        init: function () {
            console.log("Add markers to the scene");
            var sceneEl = document.querySelector("a-scene");
            //list of the markers
            for (var i = 0; i < 4; i++) {
                var url = data[i].PatternLocation;
                markersURLArray.push(url);
                markersNameArray.push("Marker_" + i);
            }
            for (var k = 0; k < 4; k++) {
                var markerEl = document.createElement("a-marker");
                markerEl.setAttribute("type", "pattern");
                markerEl.setAttribute("url", markersURLArray[k]);
                markerEl.setAttribute("id", markersNameArray[k]);
                markerEl.setAttribute("registerevents", {
                    video: data[k].VideoLocation,
                });
                markerEl.setAttribute("play-pause", "");
                markerEl.setAttribute("location", "");
                sceneEl.appendChild(markerEl);

		var entity = document.createElement('a-entity');
                entity.setAttribute('id', 'container-entity' )
                markerEl.appendChild(entity);

                var cube = document.createElement("a-box");
                cube.setAttribute("id", "vid-box");
                cube.setAttribute("material", { src: data[k].VideoLocation });
                cube.object3D.position.set(0, 0, 0);
                cube.object3D.rotation.set(0, 0, 0);
                entity.appendChild(cube);
		
		var plane1 = document.createElement("a-plane");
                plane1.setAttribute("id", "plane-btn-fb");
                plane1.setAttribute("src", "#facebook");
                plane1.setAttribute("play-pause", {video: data[k].VideoLocation});
                plane1.object3D.position.set(-0.5, 0.5, 0.7);
                plane1.object3D.rotation.set(-90, 0, 0);
                plane1.object3D.scale.set(0.3, 0.3, 0.5);
                entity.appendChild(plane1);

                var plane2 = document.createElement("a-plane");
                plane2.setAttribute("id", "plane-btn-ctl");
                plane2.setAttribute("src", "#play");
                plane2.setAttribute("play-pause", {video: data[k].VideoLocation});
                plane2.object3D.position.set(0, 0.5, 0.7);
                plane2.object3D.rotation.set(-90, 0, 0);
                plane2.object3D.scale.set(0.3, 0.3, 0.5);
                entity.appendChild(plane2);

                var plane3 = document.createElement("a-plane");
                plane3.setAttribute("id", "plane-btn-wp");
                plane3.setAttribute("src", "#whatsapp");
                plane3.object3D.position.set(0.5, 0.5, 0.7);
                plane3.object3D.rotation.set(-90, 0, 0);
                plane3.object3D.scale.set(0.3, 0.3, 0.5);
                entity.appendChild(plane3);
            }
        },
    });
    AFRAME.registerComponent("registerevents", {
        schema: {
            video: { type: "selector" },
        },
        init: function () {
            this.video = this.data.video;
            this.video.pause();
            const btn = document.getElementById('location-btn');
            const marker = this.el;
            marker.addEventListener("markerFound", () => {
                var markerId = marker.id;
                btn.className = 'button';
		console.log("Marker Found: ", markerId);
                if (this.el.object3D.visible == true) {
                    if (!this.toggle) {
                        this.toggle = true;
                        this.video.play();
                        console.log('object visible play vid');
                    }
                }
            	if (this.el.object3D.visible == true) {
                    var myVideo = document.querySelector(`#${this.video.id}`);
                    this.el.addEventListener("click", function () {
                        console.log('clicked');
                        if (!this.toggle) {
                            this.toggle = true;
                            myVideo.play();
                            console.log(this.toggle);
                            console.log('video playing');
                            return
                        }else {
                            this.toggle = false;
                            myVideo.pause();
                            console.log(this.toggle);
                            console.log('video paused');
                            return;
                        }
                    });
                } 
	    });

            marker.addEventListener("markerLost", () => {
                var markerId = marker.id;
		btn.className = 'button-inv';
                console.log("Marker Lost: ", markerId);
                console.log('object not visible');
                this.toggle = false;
                console.log(this.toggle);
                this.video.pause();
            });
        marker.flushToDOM();
	}

    });
    AFRAME.registerComponent("location", {
        init: function () {
            const marker = this.el;
            const btn = document.getElementById('location-btn');
	    marker.addEventListener("markerFound", () => {
                var markerId = marker.id;
                if (markerId === 'Marker_0') {
                    Url = "https://www.google.com/maps/place/Sports+Drome/@12.895956,77.5763877,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae154c63d1dd97:0xeabe1258b6933afe!8m2!3d12.8959508!4d77.5785764!16s%2Fg%2F11g30tn7tf";
                    btn.className = 'button';
		}
                else if (markerId === 'Marker_1') {
                    Url = "https://www.google.com/maps/place/Meridian+Fitness/@12.9031812,77.5859514,15z/data=!4m6!3m5!1s0x3bae15a2936ae4d7:0x242b6e9837c4c455!8m2!3d12.9031812!4d77.5859514!16s%2Fg%2F11p654md19";
                    btn.className = 'button';
		}
                else if (markerId === 'Marker_2') {
                    Url = "https://www.google.com/maps/dir/13.0089314,77.5573596/Prafulla+Enclave,+Halady+Rd,+Koteshwara+Proper,+Karnataka+576222+@13.593053,74.713309/@13.2911506,73.8908877,7z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x3bbc91be62b45ca9:0x8568c98391e2caf6!2m2!1d74.7133091!2d13.5930534!3e9";
                    btn.className = 'button';
		}
		else if (markerId === 'Marker_3'){
		    Url = "https://www.google.com/maps/place/Almond+greens/@12.9031437,77.5860027,15z/data=!4m6!3m5!1s0x3bae15a0c9415d73:0x462f44f04199da46!8m2!3d12.9031437!4d77.5860027!16s%2Fg%2F11ptq6jq6q";
		    btn.className = 'button';
		}
            });

            document.querySelector(".btn").addEventListener("click", function () {
                window.open(Url, '_blank');
            });
        }
    });

	AFRAME.registerComponent("play-pause", {
        	schema: {
            		video: { type: "selector" },
        	},
        	init: function () {
          		this.video = this.data.video;
          		const marker = this.el;
          		console.log("in regsiter event fun");
			 if (this.el.object3D.visible == true) {
          			var myVideo = document.querySelector(`#${this.video.id}`);
			}
          		var videoControls = document.querySelector("#plane-btn-ctl");
          		marker.addEventListener("click", function () {
            			console.log(videoControls.src);
            			console.log("Hello");
            			if (!this.toggle) {
                			this.toggle = true;
              				myVideo.play();
              				console.log("pause");
              				videoControls.setAttribute("src", "#pause");
              				console.log(videoControls);
            			} else {
                			this.toggle = false;
              				myVideo.pause();
              				console.log("play");
              				videoControls.setAttribute("src", "#play");
              				console.log(videoControls);
            			}
          		});
          	marker.flushToDOM();
		},
      });
}

start();
