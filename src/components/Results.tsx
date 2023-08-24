import React, { useContext } from 'react'
import { GameContext } from '../context/gameContext'
import styles from '../styles/Results/styles.module.scss'
import ResultsHeader from './ResultsHeader'
import ResultsRow from './ResultsRow'

const Results = () => {
	const { timeLine, isStarted } = useContext(GameContext)
	return (
		<div className={styles.results}>
			<ResultsHeader isStarted={isStarted} />
			<div className={styles.resultsgridcontent}>
				<div className={styles.resultsHeader}>
					<p>Guessed color</p>
					<p>Correct color</p>
					<p>Score</p>
				</div>
				{timeLine.length > 0 &&
          timeLine.map((item, i) => (
            <ResultsRow key={i} item={item} />
          ))}
			</div>
		</div>
	)
}

export default React.memo(Results)
