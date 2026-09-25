// MorphoCloud: small behaviour tweaks on top of the stock UI (see mc.css).
(function () {
	function ready(f) {
		if (document.readyState !== "loading") f();
		else document.addEventListener("DOMContentLoaded", f);
	}
	ready(function () {
		var lp = document.getElementById("lp");
		if (lp) {
			lp.placeholder = "instance passphrase";
			lp.focus();
		}

		// Open the upload panel by default so the drop target and progress are visible.
		var up = document.getElementById("opa_up");
		if (up && !document.querySelector(".opview.act"))
			setTimeout(function () { up.click(); }, 50);

		// up2k moves the drop button and ETA into the (hidden) settings table
		// on wide windows; keep them in the narrow-layout containers instead.
		function place() {
			var pairs = [["u2btn", "u2btn_ct"], ["u2etaw", "u2c3t"]];
			for (var i = 0; i < pairs.length; i++) {
				var el = document.getElementById(pairs[i][0]),
					ct = document.getElementById(pairs[i][1]);
				if (el && ct && el.parentNode !== ct)
					ct.appendChild(el);
			}
		}
		if (up) {
			setTimeout(place, 100);
			setTimeout(place, 1000);
			window.addEventListener("resize", function () { setTimeout(place, 0); });
		}
	});
})();
