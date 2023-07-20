(async (args) => {
	function select(elem, selection) {
		if(selection === "") {
			return;
		}
		elem.dispatchEvent(new MouseEvent("mousedown", { button: 0, bubbles: true }));
		elem = document.querySelector("#menu- ul > li[data-value='" + selection + "']");
		if(elem !== null) {
			elem.click();
		}
	}

	function selectCountry(inputElem, country) {
		if(country === "") {
			return;
		}
		const button = inputElem.nextElementSibling.children[1];
		button.click();
		const menu = document.querySelector(".MuiAutocomplete-popper ul");
		const countryItem = document.evaluate("li[text()='" + country + "']", menu).iterateNext();
		if(countryItem !== null) {
			countryItem.click();
		}
	}

	function input(elem, text) {
		if(text === "") {
			return;
		}
		elem.focus();
		document.execCommand("insertText", false, text);
		elem.dispatchEvent(new Event("focusout", { bubbles: true }));
	}

	function selectRadio(elem) {
		elem.focus();
		elem.click();
		elem.dispatchEvent(new Event("focusout", { bubbles: true }));
	}

	async function awaitElem(elemId) {
		for(let attemtps = 0; attemtps < 1000; ++attemtps) {
			const elem = document.getElementById(elemId);
			if(elem == null) {
				await new Promise(r => setTimeout(r, 10));
			} else {
				return elem;
			}
		}
		throw new Exception(`Element ${elemId} didn't appear. Giving up!`);
	}

	async function writeSection1() {
		let argsOff = 0;
		let elem = await awaitElem("root_6");
		const inputs = document.querySelectorAll("#\\32 627047 input");
		const notificationType = args[argsOff++];
		if(notificationType !== "") {
			select(elem, notificationType);
		}
		input(inputs[1], args[argsOff++]);
		input(inputs[2], args[argsOff++]);
		input(inputs[3], args[argsOff++]);
		input(inputs[4], args[argsOff++]);
		input(inputs[5], args[argsOff++]);
		selectCountry(inputs[6], args[argsOff++]);
		input(inputs[7], args[argsOff++]);
		input(inputs[8], args[argsOff++]);
		input(inputs[9], args[argsOff++]);
		const duration = args[argsOff++];
		if(duration !== "") {
			input(inputs[10], duration);
			select(document.getElementById("root_9"), duration);
			if(duration === "yli10") {
				input(document.getElementById("root_10_0"), args[argsOff++]);
				input(document.getElementById("root_10_1"), args[argsOff++]);
				input(document.getElementById("root_10_2"), args[argsOff++]);
				input(document.getElementById("root_10_3"), args[argsOff++]);
			}
		}
		if(argsOff < args.length) {
			document.querySelectorAll("#\\32 627047 > button")[1].click();
			writeSection2(argsOff);
		}
	}

	async function writeSection2(argsOff) {
		await awaitElem("root_12_1");
		const inputs = document.querySelectorAll("#\\32 627047 input");
		input(inputs[0], args[argsOff++]);
		input(inputs[1], args[argsOff++]);
		input(inputs[2], args[argsOff++]);
		input(inputs[3], args[argsOff++]);
		input(inputs[4], args[argsOff++]);
		selectCountry(inputs[5], args[argsOff++]);
		input(inputs[6], args[argsOff++]);
		input(inputs[7], args[argsOff++]);


		if(argsOff < args.length) {
			document.querySelectorAll("#\\32 627047 > button")[1].click();
			writeSection3(argsOff);
		}
	}

	async function writeSection3(argsOff) {
		let elem = await awaitElem("root_14");
		const sector = args[argsOff++];
		if(sector !== "") {
			select(elem, sector);
		}
		const construction = args[argsOff++];
		if(construction !== "") {
			select(document.getElementById("root_15"), construction);
			if(construction === "kylla") {
				let inputs = document.getElementById("root_16-title").parentElement.querySelectorAll("input");
				input(inputs[0], args[argsOff++]);
				input(inputs[1], args[argsOff++]);
				input(inputs[2], args[argsOff++]);
				input(inputs[3], args[argsOff++]);
				input(inputs[4], args[argsOff++]);
				selectCountry(inputs[5], args[argsOff++]);

				inputs = document.getElementById("root_18-title").parentElement.querySelectorAll("input")
				input(inputs[0], args[argsOff++]);
				input(inputs[1], args[argsOff++]);
				input(inputs[2], args[argsOff++]);
				input(inputs[3], args[argsOff++]);
				input(inputs[4], args[argsOff++]);
				selectCountry(inputs[5], args[argsOff++]);
			}
		}

		if(argsOff < args.length) {
			document.querySelectorAll("#\\32 627047 > button")[1].click();
			writeSection4(argsOff);
		}
	}

	async function writeSection4(argsOff) {
		await awaitElem("root_20_3");
		let inputs = document.querySelectorAll("#\\32 627047 input,textarea");
		input(inputs[inputs.length - 1], args[args.length - 1]);
		const workplaces = args[argsOff];
		let inputsOffset = 0;
		if(workplaces.length >= 1) {
			[inputs, inputsOffset] = fillWorkplace(inputs, inputsOffset, workplaces[0]);
		}
		console.log(`Offset after main workplace: ${inputsOffset}`);
		console.log(inputs[inputsOffset]);
		if(workplaces.length > 1) {
			selectRadio(inputs[inputsOffset]);  // select "Yes": other workspaces to report
			inputsOffset += 2;  // the "Yes" and "No" radio buttons are two inputs we need to skip
			additionalWorkplaces(inputsOffset, workplaces);
		} else {
			selectRadio(inputs[inputsOffset + 1]);  // select "No": no other workspaces to report
		}
	}

	function additionalWorkplaces(inputsOffset, workplaces) {
		const buttons = document.getElementById("root_22__title").parentElement.querySelectorAll("button")
		const plusWorkplace = buttons[buttons.length - 1];
		for(let i = 2; i < workplaces.length; ++i) {
			plusWorkplace.click();
		}
		let inputs = document.querySelectorAll("#\\32 627047 input,textarea");  // must be done after adding workplaces
		for(let i = 1; i < workplaces.length; ++i) {
			const workplace = workplaces[i];
			[inputs, inputsOffset] = fillWorkplace(inputs, inputsOffset, workplace);
		}
	}

	function fillWorkplace(inputs, offset, workplace) {
		selectCountry(inputs[offset++], workplace[0]);
		input(inputs[offset++], workplace[1]);
		input(inputs[offset++], workplace[2]);
		const workers = workplace[3];  // worker list
		const plusWorkerButton = document.evaluate("ancestor::table/../following-sibling::button", inputs[offset])
				.iterateNext();
		if(workers.length > 70) {
			for(let i = 10; i < workers.length/7; ++i) {
				plusWorkerButton.click();
			}
			inputs = document.querySelectorAll("#\\32 627047 input,textarea");
		}
		for(let i = 0; i < workers.length; ++i) {
			input(inputs[offset++], workers[i]);
		}
		if(workers.length < 70) {
			offset += 70 - workers.length;
		}
		return [inputs, offset]
	}

	document.querySelector("#\\32 627047 > button").click();
	await writeSection1();
})
