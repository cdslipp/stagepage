import { getContext, setContext } from 'svelte';

const PROGRAM_KEY = Symbol('PROGRAM');

export class ProgramState {
	data = $state(null);
	currentSectionId = $state(null);
	showMenu = $state(false);

	constructor(initialData) {
		this.data = initialData;
	}

	get programStructure() {
		return this.data.structure || { sections: [], menuItems: [] };
	}

	get currentSection() {
		if (!this.currentSectionId) return null;
		return this.programStructure.sections.find((s) => s.id === this.currentSectionId);
	}

	get currentSectionContent() {
		if (!this.currentSectionId) return null;
		return this.data[this.currentSectionId];
	}

	setCurrentSection(sectionId) {
		this.currentSectionId = sectionId;
	}

	toggleMenu() {
		this.showMenu = !this.showMenu;
	}

	getNextSection() {
		if (!this.currentSectionId) return null;
		const currentIndex = this.programStructure.sections.findIndex(
			(s) => s.id === this.currentSectionId
		);
		return this.programStructure.sections[currentIndex + 1];
	}

	getPreviousSection() {
		if (!this.currentSectionId) return null;
		const currentIndex = this.programStructure.sections.findIndex(
			(s) => s.id === this.currentSectionId
		);
		return this.programStructure.sections[currentIndex - 1];
	}

	navigateToNext() {
		const nextSection = this.getNextSection();
		if (nextSection) {
			this.setCurrentSection(nextSection.id);
		}
	}

	navigateToPrevious() {
		const previousSection = this.getPreviousSection();
		if (previousSection) {
			this.setCurrentSection(previousSection.id);
		}
	}
}

export function setProgramState(initialData) {
	return setContext(PROGRAM_KEY, new ProgramState(initialData));
}

export function getProgramState() {
	return getContext(PROGRAM_KEY);
}
