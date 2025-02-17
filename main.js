const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');

//infobox dekstop var
const desktopInfobox = document.querySelectorAll(
	'.planet-box__data-infobox div'
);
const planetImg = document.querySelector('.planet-img');
const planetName = document.querySelector('.planet-box__data--name');
const planetDescription = document.querySelector(
	'.planet-box__data--description'
);
const planetSource = document.querySelector('.planet-box__data--source');
const planetSurface = document.querySelector('.planet-surface img');

//infobox mobile
const mobileInfobox = document.querySelectorAll('.info-choice-box__item');

const body = document.querySelector('body');
const main = document.querySelector('main');

//desktop navitems
const desktopNavItems = document.querySelectorAll('.link-item');

//mobile navitems
const moblieNavItems = document.querySelectorAll('.nav-planet');

document.addEventListener('DOMContentLoaded', () => {
	fetch('data.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Błąd wczytywania pliku JSON');
			}
			return response.json();
		})
		.then(data => {
			handleData(data);
			updateContent(data);
			updateMobileContent(data);
		})
		.catch(error => console.error('Wystąpił błąd:', error));
});

const getPlanetHTML = (data, index) => {
	return `
        <div class="info-choice-box">
            <p class="info-choice-box__item overview ${
							data[index].name
						}-item active-item">overview</p>
            <p class="info-choice-box__item structure">structure</p>
            <p class="info-choice-box__item surface">surface</p>
        </div>
        <div class="planet-box">
            <div class="desktop">
                <div class="planet-box__img">
                    <img src="${
											data[index].images.planet
										}" alt="" class="${data[
		index
	].name.toLowerCase()}-img planet-img" />
					<div class="planet-surface">
							<img src"${data[index].images.geology}" class="hidden" />
						</div>
                </div>
                <div class="planet-box__data">
                    <div class="planet-box--strech">
                        <p class="planet-box__data--name">${
													data[index].name
												}</p>
                        <p class="planet-box__data--description">${
													data[index].overview.content
												}</p>
                        <p class="planet-box__data--source">
                            Source: <a target="_blank" href="${
															data[index].overview.source
														}">Wikipedia</a>
                        </p>
                    </div>
                    <div class="planet-box__data-infobox">
                        <div class="desktop-overview active-box">
                            <p class="number">01</p>
                            <p>overview</p>
                        </div>
                        <div class="desktop-structure">
                            <p class="number">02</p>
                            <p>structure</p>
                        </div>
                        <div class="desktop-surface">
                            <p class="number">03</p>
                            <p>surface</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="planet-box__info">
                <div class="planet-box__info--data">
                    <p class="type">rotation time</p>
                    <p class="number">${data[index].rotation}</p>
                </div>
                <div class="planet-box__info--data">
                    <p class="type">revolution time</p>
                    <p class="number">${data[index].revolution}</p>
                </div>
                <div class="planet-box__info--data">
                    <p class="type">radius</p>
                    <p class="number">${data[index].radius}</p>
                </div>
                <div class="planet-box__info--data">
                    <p class="type">average temp.</p>
                    <p class="number">${data[index].temperature}</p>
                </div>
            </div>
        </div>`;
};

const handleData = data => {
	hamMenu.addEventListener('click', () => {
		hamMenu.classList.toggle('active');
		offScreenMenu.classList.toggle('active');
		body.classList.toggle('scroll-blocked');
	});

	desktopInfobox.forEach(item => {
		item.addEventListener('click', () => {
			desktopInfobox.forEach(el => el.classList.remove('active-infobox'));
			item.classList.add('active-infobox');
			updateContent(data);
		});
	});

	mobileInfobox.forEach(item => {
		item.addEventListener('click', () => {
			mobileInfobox.forEach(el =>
				el.classList.remove('active-item', 'mercury-item')
			);
			item.classList.add('active-item', 'mercury-item');
			updateMobileContent(data);
		});
	});

	handleDisplayingPlanet(data);
	handleDisplayMobile(data);
};

//desktop
const handleDisplayingPlanet = data => {
	desktopNavItems.forEach((planet, index) => {
		planet.addEventListener('click', () => {
			main.innerHTML = getPlanetHTML(data, index);

			const newDesktopInfobox = document.querySelectorAll(
				'.planet-box__data-infobox div'
			);

			const updatePlanetContent = data => {
				const desktopOverview = document.querySelector('.desktop-overview');
				const desktopStructure = document.querySelector('.desktop-structure');
				const desktopSurface = document.querySelector('.desktop-surface');
				const planetSurface = document.querySelector('.planet-surface img');

			

				// Pobranie nowo wygenerowanych elementów
				const planetImg = document.querySelector('.planet-img');
				const planetDescription = document.querySelector(
					'.planet-box__data--description'
				);
				const planetSource = document.querySelector(
					'.planet-box__data--source a'
				);

				if (desktopOverview.classList.contains('active-box')) {
					planetImg.setAttribute('src', data[index].images.planet);
					planetDescription.textContent = data[index].overview.content;
					planetSource.setAttribute('href', data[index].overview.source);
					planetSurface.classList.add('hidden');
				} else if (desktopStructure.classList.contains('active-box')) {
					planetImg.setAttribute('src', data[index].images.internal);
					planetDescription.textContent = data[index].structure.content;
					planetSource.setAttribute('href', data[index].structure.source);
					planetSurface.classList.add('hidden');
				} else if (desktopSurface.classList.contains('active-box')) {
					planetImg.setAttribute('src', data[index].images.planet);
					planetDescription.textContent = data[index].geology.content;
					planetSource.setAttribute('href', data[index].geology.source);
					planetSurface.setAttribute('src', data[index].images.geology);
					planetSurface.classList.remove('hidden');
				}
			};

			const planetColors = [
				'#419ebb',
				'#eda249',
				'#6d2ed5',
				'#d14c32',
				'#d83a34',
				'#cd5120',
				'#1ec1a2',
				'#2d68f0',
			];

			const updateActiveBoxColor = () => {
				document.documentElement.style.setProperty(
					'--active-color',
					planetColors[index] || '#ccc'
				);
			};

			updateActiveBoxColor();

			newDesktopInfobox.forEach(item => {
				item.addEventListener('click', () => {
					newDesktopInfobox.forEach(el => el.classList.remove('active-box'));
					item.classList.add('active-box');
					updatePlanetContent(data, index);
					updateActiveBoxColor();
				});
			});
		});
	});
};

const updateContent = data => {
	const dekstopOverview = document.querySelector('.desktop-overview');
	const dekstopStructure = document.querySelector('.desktop-structure');
	const dekstopSurface = document.querySelector('.desktop-surface');
	const planetSurface = document.querySelector('.planet-surface img');

	if (dekstopOverview.classList.contains('active-infobox')) {
		planetImg.setAttribute('src', data[0].images.planet);
		planetDescription.textContent = data[0].overview.content;
		planetSource.setAttribute('href', data[0].overview.source);
		planetSurface.classList.add('hidden');
	} else if (dekstopStructure.classList.contains('active-infobox')) {
		planetImg.setAttribute('src', data[0].images.internal);
		planetDescription.textContent = data[0].structure.content;
		planetSource.setAttribute('href', data[0].structure.source);
		planetSurface.classList.add('hidden');
	} else if (dekstopSurface.classList.contains('active-infobox')) {
		planetImg.setAttribute('src', data[0].images.planet);
		planetDescription.textContent = data[0].geology.content;
		planetSource.setAttribute('href', data[0].geology.source);
		planetSurface.setAttribute('src', data[0].images.geology);
		planetSurface.classList.remove('hidden');
	}
};

//mobile
const handleDisplayMobile = data => {
	moblieNavItems.forEach((mobileItem, index) => {
		mobileItem.addEventListener('click', () => {
			console.log(data[index]);

			main.innerHTML = getPlanetHTML(data, index);

			offScreenMenu.classList.toggle('active');
			hamMenu.classList.toggle('active');
			body.classList.toggle('scroll-blocked');

			const newMobileInfobox = document.querySelectorAll(
				'.info-choice-box__item'
			);
			const planetImg = document.querySelector('.planet-img');
			const planetDescription = document.querySelector(
				'.planet-box__data--description'
			);
			const planetSource = document.querySelector(
				'.planet-box__data--source a'
			);
			const planetSurface = document.querySelector('.planet-surface img');

			const planetColors = [
				'#419ebb',
				'#eda249',
				'#6d2ed5',
				'#d14c32',
				'#d83a34',
				'#cd5120',
				'#1ec1a2',
				'#2d68f0',
			];

			const updateActiveBoxColor = () => {
				document.documentElement.style.setProperty(
					'--active-color',
					planetColors[index] || '#ccc'
				);
			};
			updateActiveBoxColor();

			const updateContent = () => {
				const overview = document.querySelector('.overview');
				const structure = document.querySelector('.structure');
				const surface = document.querySelector('.surface');

				if (overview.classList.contains('active-item')) {
					planetImg.setAttribute('src', data[index].images.planet);
					planetDescription.textContent = data[index].overview.content;
					planetSource.setAttribute('href', data[index].overview.source);
					planetSurface.classList.add('hidden');
					console.log(overview);
				} else if (structure.classList.contains('active-item')) {
					planetImg.setAttribute('src', data[index].images.internal);
					planetDescription.textContent = data[index].structure.content;
					planetSource.setAttribute('href', data[index].structure.source);
					planetSurface.classList.add('hidden');
				} else if (surface.classList.contains('active-item')) {
					planetImg.setAttribute('src', data[index].images.planet);
					planetDescription.textContent = data[index].geology.content;
					planetSource.setAttribute('href', data[index].geology.source);
					planetSurface.setAttribute('src', data[index].images.geology);
					planetSurface.classList.remove('hidden');
				}
			};

			newMobileInfobox.forEach(item => {
				item.addEventListener('click', () => {
					newMobileInfobox.forEach(el => el.classList.remove('active-item'));
					item.classList.add('active-item');
					updateContent();
					updateActiveBoxColor();
				});
			});
		});
	});
};

const updateMobileContent = data => {
	const overview = document.querySelector('.overview');
	const structure = document.querySelector('.structure');
	const surface = document.querySelector('.surface');

	overview.style.borderBottom = `4px solid transparent`;
	structure.style.borderBottom = `4px solid transparent`;
	surface.style.borderBottom = `4px solid transparent`;

	if (overview.classList.contains('active-item')) {
		planetImg.setAttribute('src', data[0].images.planet);
		planetDescription.textContent = data[0].overview.content;
		planetSource.setAttribute('href', data[0].overview.source);
		overview.style.borderBottom = `4px solid #419ebb`;
		planetSurface.classList.add('hidden');
	} else if (structure.classList.contains('active-item')) {
		planetImg.setAttribute('src', data[0].images.internal);
		planetDescription.textContent = data[0].structure.content;
		planetSource.setAttribute('href', data[0].structure.source);
		structure.style.borderBottom = `4px solid #419ebb`;

		planetSurface.classList.add('hidden');
	} else if (surface.classList.contains('active-item')) {
		planetImg.setAttribute('src', data[0].images.planet);
		planetDescription.textContent = data[0].geology.content;
		planetSource.setAttribute('href', data[0].geology.source);
		surface.style.borderBottom = `4px solid #419ebb`;
		planetSurface.setAttribute('src', data[0].images.geology);
		planetSurface.classList.remove('hidden');
	}
};
