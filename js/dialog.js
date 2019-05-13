var dialogLayer = function() {

	var title;
	var maskDiv, dialogDiv;

	this.getDialog = function() {
		return dialogDiv;
	}
	
	this.open = function(title, width, height) {
		if (!maskDiv)
			createMask();
		var content = createDialog(title, width, height);
		return content;
	}

	this.close = function() {
		remove();
	}

	var createDialog = function(title, width, height) {
		var dialogLayer = document.createElement("div");
		var dialogTitle = document.createElement("div");
		var closeDialog = document.createElement("span");
		var dialogTitleText = document.createElement("span");
		var dialogContent = document.createElement("div");
		dialogLayer.className = "dialogLayer";
		var dlr_left = (document.documentElement.clientWidth / 2) - (width / 2);
		var dlr_top = (document.documentElement.clientHeight / 2) - (height / 2);
		dlr_left = dlr_left < 0 ? 0 : dlr_left;
		dlr_top = dlr_top < 0 ? 0 : dlr_top;
		dialogLayer.style.left = dlr_left + "px";
		dialogLayer.style.top = dlr_top + "px";
		dialogLayer.style.zIndex = "1000000001";
		dialogLayer.style.width = width + "px";
		dialogLayer.style.height = height + "px";
		dialogTitle.className = "dialogTitle";
		var moveable = false, mx, my, dleft, dtop;
		dialogTitle.onmousedown = function(e) {
			moveable = true;
			mx = e.clientX;
			my = e.clientY;
			dleft = dialogLayer.offsetLeft;
			dtop = dialogLayer.offsetTop;
		};
		document.onmousemove = function(e) {
			e = e ? e : (window.event ? window.event : null);
			if (moveable) {
				var tmp_dlr_left = dleft + (e.clientX - mx);
				var tmp_dlr_top = dtop + (e.clientY - my);
				tmp_dlr_left = tmp_dlr_left < 0 ? 0 : tmp_dlr_left;
				tmp_dlr_top = tmp_dlr_top < 0 ? 0 : tmp_dlr_top;
				dialogLayer.style.left = tmp_dlr_left + "px";
				dialogLayer.style.top = tmp_dlr_top + "px";
			}
		};
		dialogTitle.onmouseup = function(e) {
			moveable = false;
		};
		closeDialog.className = "closeDialog";
		closeDialog.onclick = function() {
			remove();
		};
		dialogTitleText.className = "dialogTitleText";
		dialogTitleText.innerHTML = title;
		dialogContent.className = "dialogContent";
		dialogContent.style.height = (height - 40) + "px";
		dialogTitle.appendChild(closeDialog);
		dialogTitle.appendChild(dialogTitleText);
		dialogLayer.appendChild(dialogTitle);
		dialogLayer.appendChild(dialogContent);
		document.body.appendChild(dialogLayer);
		dialogDiv = dialogLayer;
		return dialogContent;
	}

	var createMask = function() {
		var mask = document.createElement("div");
		mask.style.margin = "0px";
		mask.style.padding = "0px";
		mask.style.border = "0px none";
		mask.style.backgroundColor = "rgb(255, 255, 255)";
		mask.style.backgroundImage = "none";
		mask.style.position = "absolute";
		mask.style.zIndex = "1000000000";
		mask.style.top = "0px";
		mask.style.left = "0px";
		mask.style.opacity = "0.7";
		mask.style.width = "100%";
		mask.style.height = document.body.scrollHeight + "px";
		document.body.appendChild(mask);
		maskDiv = mask;
	}

	var remove = function() {
		if (dialogDiv) {
			document.body.removeChild(dialogDiv);
			dialogDiv = undefined;
		}
		if (maskDiv) {
			document.body.removeChild(maskDiv);
			maskDiv = undefined;
		}
	}

}