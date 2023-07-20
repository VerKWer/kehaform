(async () => {
	async function awaitElem(elemId) {
		for(let attemtps = 0; attemtps < 1000; ++attemtps) {
			const elem = document.getElementById(elemId);
			if(elem == null) {
				await new Promise(r => setTimeout(r, 10));
			} else {
				return;
			}
		}
		throw new Error(`Element ${elemId} didn't appear. Giving up!`);
	}

	async function readData() {
		const section1Button = document.getElementById("formula-step-4");
		const section2Button = document.getElementById("formula-step-11");
		const section3Button = document.getElementById("formula-step-13");
		const section4Button = document.getElementById("formula-step-19");
		const sectionButtons = [
			document.getElementById("formula-step-4"),
			document.getElementById("formula-step-11"),
			document.getElementById("formula-step-13"),
			document.getElementById("formula-step-19")
		];
		const indicators = ["root_6", "root_12_1","root_14", "root_20_3"];
		const result = [];
		let lastSection = -1;

		async function readSection1() {
			if(lastSection < 0) {
				return;
			}
			sectionButtons[0].click();
			await awaitElem(indicators[0]);
			console.log("Reading section 1");
			const inputs = document.querySelectorAll("#\\32 627047 input");
			inputs.forEach(input => {
				result.push(input.value);
			});
			await readSection2();
		}

		async function readSection2() {
			if(lastSection < 1) {
				return;
			}
			sectionButtons[1].click();
			await awaitElem(indicators[1]);
			console.log("Reading section 2");
			const inputs = document.querySelectorAll("#\\32 627047 input");
			inputs.forEach(input => {
				result.push(input.value);
			});
			await readSection3();
		}

		async function readSection3() {
			if(lastSection < 2) {
				return;
			}
			sectionButtons[2].click();
			await awaitElem(indicators[2]);
			console.log("Reading section 3");
			const inputs = document.querySelectorAll("#\\32 627047 input");
			inputs.forEach(input => {
				result.push(input.value);
			});
			await readSection4();
		}

		async function readSection4() {
			if(lastSection < 3) {
				return;
			}
			sectionButtons[3].click();
			await awaitElem(indicators[3]);
			console.log("Reading section 4");
			const inputs = document.querySelectorAll("#\\32 627047 input,textarea");
			const workplaces = [];
			let workplace;
			let offset = 0;
			[workplace, offset] = readWorkplace(inputs, offset);  // main workplace
			workplaces.push(workplace);
			offset += 2;  // skip "Yes" and "No" radio button
			for(;;) {  // additional workplaces
				[workplace, offset] = readWorkplace(inputs, offset);
				if(workplace === null) {
					break;
				}
				workplaces.push(workplace);
			}
			result.push(workplaces);
			result.push(inputs[inputs.length - 1].textContent);  // additional information
		}

		function readWorkplace(inputs, offset) {
			if(offset + 73 > inputs.length) {
				return [null, offset];
			}
			const workplace = [];
			workplace.push(inputs[offset++].value);  // municipality
			workplace.push(inputs[offset++].value);  // address
			workplace.push(inputs[offset++].textContent);  // load/unload

			const workerTable = inputs[offset].closest("table");
			const nRows = workerTable.querySelectorAll("input").length / 7;
			const workers = [];
			for(let row = 0; row < nRows; ++row) {
				const vals = [];
				for(let i = 0; i < 7; ++i) {
					vals.push(inputs[offset++].value);
				}
				if(!vals.every((s) => s === "")) {  // non-empty row
					workers.push(...vals);
				}
			}
			workplace.push(workers);

			if(workers.length < 70) {
				offset += 70 - workers.length;
			}
			return [workplace, offset];
		}

		for(let i = 0; i < sectionButtons.length; ++i) {
			const b = sectionButtons[i];
			if(b !== null && !b.disabled) {
				++lastSection;
			}
		}
		if(lastSection + 1 < indicators.length && document.getElementById(indicators[lastSection + 1]) !== null) {
			++lastSection;
		}

		await readSection1();

		return result;
	}

	let data = await readData();
	console.log(data);
	prompt("Copy with Ctrl+C", `eval(await (await fetch("https://raw.githubusercontent.com/VerKWer/kehaform/master/writeV1.js")).text())(${JSON.stringify(data)})`);
})();
