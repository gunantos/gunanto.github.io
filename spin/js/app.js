let theWheel = new Winwheel({
	'canvasId': 'myCanvas',
	'numSegments': 8,
	'outerRadius': 207,
	'innerRadius': 85,
	'responsive': true,
	'textFontSize': 20,
	'textMargin': 0,
	'segments': [{
			'strokeStyle': '#000000',
			'textFillStyle': '#000000',
			'fillStyle': '#d4a53d',
			'text': '5.000'
		},
		{
			'strokeStyle': '#000000',
			'textFillStyle': '#ffffff',
			'fillStyle': '#ff0000',
			'text': '20.000'
		},
		{
			'strokeStyle': '#000000',
			'textFillStyle': '#000000',
			'fillStyle': '#d4a53d',
			'text': '10.000'
		},
		{
			'strokeStyle': '#000000',
			'textFillStyle': '#ffffff',
			'fillStyle': '#ff0000',
			'text': '100.000'
		},
		{
			'strokeStyle': '#000000',
			'textFillStyle': '#000000',
			'fillStyle': '#d4a53d',
			'text': '5.000'
		},
		{
			'strokeStyle': '#000000',
			'textFillStyle': '#ffffff',
			'fillStyle': '#ff0000',
			'text': 'IPHONE14'
		},
		{
			'strokeStyle': '#000000',
			'textFillStyle': '#000000',
			'fillStyle': '#d4a53d',
			'text': '50.000'
		},
		{
			'strokeStyle': '#000000',
			'textFillStyle': '#ffffff',
			'fillStyle': '#ff0000',
			'text': '10.000'
		}
	],
	'animation': {
		'type': 'spinToStop',
		'duration': 5,
		'spins': 8,
		'callbackSound': playSound,
		'callbackFinished': alertPrize
	},
	'pins': {
		'outerRadius': 6,
		'responsive': true, // This must be set to true if pin size is to be responsive.
	},
});

let audio = new Audio('tick.mp3'); // Create audio object and load desired file.

function playSound() {
	// Stop and rewind the sound (stops it if already playing).
	audio.pause();
	audio.currentTime = 0;

	// Play the sound.
	audio.play();
}

function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;
	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]
		];
	}
	return array;
}

function PercFJquery(pairs) {
	const PrizeTable = pairs
	let DaftarPrice = []
	PrizeTable.forEach(Hadiah => {
		const PriceLoot = new Array(Hadiah.fjquery).fill(Hadiah.id)
		DaftarPrice.push(...PriceLoot)
	})
	DataHadiah = shuffle(DaftarPrice)
	RandomArray = Math.round(Math.random() * DataHadiah.length)
	const AmbilHadiah = DaftarPrice[RandomArray]
	return AmbilHadiah
}

result = PercFJquery([{
	'id': 1,
	'fjquery': 45
}, {
	'id': 2,
	'fjquery': 0
}, {
	'id': 3,
	'fjquery': 5
}, {
	'id': 4,
	'fjquery': 0
}, {
	'id': 5,
	'fjquery': 45
}, {
	'id': 6,
	'fjquery': 0
}, {
	'id': 7,
	'fjquery': 0
}, {
	'id': 8,
	'fjquery': 5
}]);

function startSpin() {
	var stopAt = theWheel.getRandomForSegment(result);
	theWheel.animation.stopAngle = stopAt;
	theWheel.startAnimation();
}



function alertPrize(ind) {
   var msg = `<div id="welcome">
  <h3 style="font-weight:bold;"> Selamat anda memenang kan hadiah! !</h3>
  <p style="text-align: center"><h1>${ind.text}</h1></p>
</div>`
	show_alert2(msg);
}

function show_alert2(message) {
	$('.alert-text2').html(message);
	$('.alert-bg2').toggleClass('active');
}
$('.alert-close2').click(function() {
	$('.alert-bg2').toggleClass('active');
});


show_alert2(`<div id="welcome">
  <h3 style="font-weight:bold;"> Selamat Datang !</h3>
  <p style="font-size:12px;">ami terlebih dahulu mengucapkan selamat kepada setiap member yang memiliki tiket untuk berkesempatan memenangkan hadiah menarik yang ditawarkan di Roda Kemenangan ini, Untuk kalian yang memiliki tiket silahkan masukkan ke kolom kode yang disediakan dan klik tombol spin untuk memulai peruntungan anda. </p>
  <div style="text-align:left;margin-top: 15px;">
    <p style="background:red;color:#fff;padding-left:10px;">Syarat & Ketentuan:</p>
    <ul style="padding-left:30px;margin-top:0;background:#f9d6d0;">
      <li>ini hanya demo tekan 12345 untuk memulai spin</li>
    </ul>
  </div>
  <div style="text-align:center">
    <button id="agree" class="btn btn-success close_all_modal">Oke, Terima Kasih!</button>
  </div>
</div>`);

$(document).ready(function() {

	$('.close_all_modal').click(function() {
		$('.alert-bg2').removeClass('active');
	});
	$('#kode_voucher').click(function() {
		var kode = $('#kode').val()
		if (kode == '12345') {
			startSpin();
		}
	});
});