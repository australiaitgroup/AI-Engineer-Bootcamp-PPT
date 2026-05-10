import SlideEngine from './components/SlideEngine';
import S01 from './components/slides/S01_Cover';
import S02 from './components/slides/S02_WhatIsAgent';
import S03 from './components/slides/S03_AgentComponents';
import S04 from './components/slides/S04_Tool';
import S05 from './components/slides/S05_Workflow';
import S06 from './components/slides/S06_AgentTypes';
import S07 from './components/slides/S07_Code01';
import S08 from './components/slides/S08_Code02';
import S09 from './components/slides/S09_Code03';
import S10 from './components/slides/S10_Code04';
import S11 from './components/slides/S11_Logging';
import S12 from './components/slides/S12_Observation';
import S13 from './components/slides/S13_Security';
import S14 from './components/slides/S14_BestPractices';
import S15 from './components/slides/S15_Summary';

export default function App() {
	return (
		<SlideEngine>
			<S01 />
			<S02 />
			<S03 />
			<S04 />
			<S05 />
			<S06 />
			<S07 />
			<S08 />
			<S09 />
			<S10 />
			<S11 />
			<S12 />
			<S13 />
			<S14 />
			<S15 />
		</SlideEngine>
	);
}
