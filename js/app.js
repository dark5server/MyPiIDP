(function(){

	var settings = {
		channel: 'hikari',
		publish_key: 'pub-c-9ee31e0d-4a2e-4081-ba3e-d046a98ebed2',
		subscribe_key: 'sub-c-84d0b7ee-10ed-11e6-8c3e-0619f8945a4f'
	};

	var pubnub = PUBNUB(settings);

	var iot = document.getElementById('iot');
	var led0 = document.getElementById('led0r');
	var led1 = document.getElementById('led1r');
	var led2 = document.getElementById('led2r');
	var led3 = document.getElementById('led3r');
	var led4 = document.getElementById('led4r');
	var chk = document.getElementById('chkled');
	var led1x, led2x, led3x, led4x
	
	document.getElementById("led0").hidden = true;
	document.getElementById("smodes").hidden = true
	document.getElementById("chkledx").hidden = true
	document.getElementById("led1chkx").hidden = true
	document.getElementById("led2chkx").hidden = true
	document.getElementById("led3chkx").hidden = true
	document.getElementById("led4chkx").hidden = true


	pubnub.subscribe({
		channel: settings.channel,
		callback: function(m) {
			if(m.led1c) {
				document.getElementById('led1chk').checked = true;
			}
			else{ 
				document.getElementById('led1chk').checked = false;
			}
			if(m.led2c) {
				document.getElementById('led2chk').checked = true;
			}
			else{ 
				document.getElementById('led2chk').checked = false;
			}
			if(m.led3c) {
				document.getElementById('led3chk').checked = true;
			}
			else{ 
				document.getElementById('led3chk').checked = false;
			}
			if(m.led4c) {
				document.getElementById('led4chk').checked = true;
			}
			else{ 
				document.getElementById('led4chk').checked = false;
			}
		}
	})

	/* 
		Data settings:

		Servo

		item: 'door'
		open: true | false

		LED

		item: 'light-*'
		brightness: 0 - 10

	*/

	function publishUpdate(data) {
		pubnub.publish({
			channel: settings.channel, 
			message: data
		});
	}

	function reset(){
		document.getElementById("led0r").value = '0';
		document.getElementById("led1r").value = '0';
		document.getElementById("led2r").value = '0';
		document.getElementById("led3r").value = '0';
		document.getElementById("led4r").value = '0';
		publishUpdate({item: 'led0', brightness: 0});	
	}

	// UI EVENTS
	iot.addEventListener('change', function(e){
		if (this.checked){
			publishUpdate({item: 'manual', brightness: 0});
			document.getElementById("smodes").hidden = false;
			document.getElementById("chkledx").hidden = false;
			document.getElementById("led0r").value = '0';
			document.getElementById("led1r").value = '0';
			document.getElementById("led2r").value = '0';
			document.getElementById("led3r").value = '0';
			document.getElementById("led4r").value = '0';
			//var alp = 15
			//var text0 = {'my : ', alp, 'eeek ', alp;
			//window.alert('none');
		}
		else {
			publishUpdate({item: 'auto', brightness: 0});
			document.getElementById("smodes").hidden = true;
			document.getElementById("chkledx").hidden = true;
		}
	//	publishUpdate({item: 'iot', open: this.checked});
	}, false);
	cmode.addEventListener('change', function(e){
		if (this.checked){
			document.getElementById("led0").hidden = false;
			document.getElementById("led1").hidden = true;
			document.getElementById("led2").hidden = true;
			document.getElementById("led3").hidden = true;
			document.getElementById("led4").hidden = true;
			reset()
		}
		else {
			document.getElementById("led0").hidden = true;
			document.getElementById("led1").hidden = false;
			document.getElementById("led2").hidden = false;
			document.getElementById("led3").hidden = false;		
			document.getElementById("led4").hidden = false;
			reset()
		}
		//publishUpdate({item: 'iot', open: this.checked});
	}, false);
	led0.addEventListener('change', function(e){
		publishUpdate({item: 'led0', brightness: +this.value});
	}, false);

	led1.addEventListener('change', function(e){
		publishUpdate({item: 'led1', brightness: +this.value});
	}, false);

	led2.addEventListener('change', function(e){
		publishUpdate({item: 'led2', brightness: +this.value});
	}, false);
	
	led3.addEventListener('change', function(e){
		publishUpdate({item: 'led3', brightness: +this.value});
	}, false);
	
	led4.addEventListener('change', function(e){
		publishUpdate({item: 'led4', brightness: +this.value});
	}, false);
	chk.addEventListener('change', function(e){
		if (this.checked){
			document.getElementById('chkled').disabled = true;
			reset()
			publishUpdate({item: 'cled', brightness: 10});
			setTimeout(function(){

				document.getElementById('chkled').checked = false;
				document.getElementById('chkled').disabled = false;
				document.getElementById("led1chkx").hidden = false
				document.getElementById("led2chkx").hidden = false
				document.getElementById("led3chkx").hidden = false
				document.getElementById("led4chkx").hidden = false				
			}, 2000);
		}
	}, false);

})();
