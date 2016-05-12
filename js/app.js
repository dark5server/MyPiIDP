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
	
	document.getElementById("led0").hidden = true;
	document.getElementById("smodes").hidden = true

	pubnub.subscribe({
		channel: settings.channel,
		callback: function(m) {
			if(m.temperature) {
				document.querySelector('[data-temperature]').dataset.temperature = m.temperature;
			}
			if(m.humidity) {
				document.querySelector('[data-humidity]').dataset.humidity = m.humidity;
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

	// UI EVENTS
	iot.addEventListener('change', function(e){
	if (this.checked){
			document.getElementById("smodes").hidden = false;
		}
		else {
			document.getElementById("smodes").hidden = true;
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
			document.getElementById("led0r").value = '0';
			publishUpdate({item: 'led0', brightness: 0});
		}
		else {
			document.getElementById("led0").hidden = true;
			document.getElementById("led1").hidden = false;
			document.getElementById("led1r").value = '0';
			document.getElementById("led2").hidden = false;
			document.getElementById("led2r").value = '0';
			document.getElementById("led3").hidden = false;
			document.getElementById("led3r").value = '0';			
			document.getElementById("led4").hidden = false;
			document.getElementById("led4r").value = '0';
			publishUpdate({item: 'led0', brightness: 0});
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
	
})();
