import React, {useReducer} from 'react'
import CountUp from 'react-countup'
import {useEffect, useState} from 'react'
import {getDatabase, ref, onValue, update} from 'firebase/database'

export default function SoldCars() {
	const [carsArray, setCarsArray] = useState([])
	const [carsProfitLastYear, setCarsProfitLastYear] = useState(0)
	const [carsSoldLastYear, setCarsSoldLastYear] = useState(0)
	const [carsProfitLastFiveYears, setCarsProfitLastFiveYears] = useState(0)
	const [carsSoldLastFiveYears, setCarsSoldLastFiveYears] = useState(0)
	const [carsProfitSinceBeginning, setCarsProfitSinceBeginning] = useState(0)
	const [carsSoldSinceBeginning, setCarsSoldSinceBeginning] = useState(0)
	const [showBestSelling, setBestSelling] = useState(false)
	const [bestSellingCar, setBestSellingCar] = useState('Ford')
	const [displayData, setDisplayData] = useState(false)

	const getDataFromDB = () => {
		const db = getDatabase()
		const feedValRef = ref(db, 'sold_cars')
		onValue(feedValRef, (snapshot) => {
			const data = snapshot.val()
			setCarsArray(Object.values(data))
		})
	}

	const getSellingValues = () => {
		let pricesArrayLastYear = carsArray
			.filter((item) => item.car_year == 2022)
			.map((car) => car.price)
		let pricesArrayLastFiveYears = carsArray
			.filter(
				(item) =>
					item.car_year == 2022 ||
					item.car_year == 2021 ||
					item.car_year == 2020 ||
					item.car_year == 2019 ||
					item.car_year == 2018
			)
			.map((car) => car.price)
		let pricesArraySinceBeginning = carsArray.map((car) => car.price)
		setCarsProfitLastYear(
			Math.floor(pricesArrayLastYear.reduce((a, b) => a + b, 0) * 0.1)
		)
		setCarsSoldLastYear(
			carsArray.filter((item) => item.car_year == 2022).length
		)
		setCarsProfitLastFiveYears(
			Math.floor(pricesArrayLastFiveYears.reduce((a, b) => a + b, 0) * 0.1)
		)
		setCarsSoldLastFiveYears(
			carsArray.filter(
				(item) =>
					item.car_year == 2022 ||
					item.car_year == 2021 ||
					item.car_year == 2020 ||
					item.car_year == 2019 ||
					item.car_year == 2018
			).length
		)
		setCarsProfitSinceBeginning(
			Math.floor(pricesArraySinceBeginning.reduce((a, b) => a + b, 0) * 0.1)
		)
		setCarsSoldSinceBeginning(carsArray.length)
	}

	useEffect(() => {
		getDataFromDB()
		getSellingValues()
		setBestSelling(true)
	}, [])

	return (
		<div style={{height: '100vh'}}>
			<h1
				style={{
					textAlign: 'center',
					color: 'aliceblue',
					fontFamily: 'cursive',
					marginTop: '3vh',
					fontSize: '4rem',
				}}>
				Sold cars statistics
			</h1>
			<div style={{marginTop: '5vh'}}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}>
					<button
						style={{
							height: '4rem',
							width: '12rem',
							background: 'rgb(205,77,48)',
							background:
								'linear-gradient(11deg, rgba(205,77,48,1) 0%, rgba(172,140,7,1) 41%, rgba(191,61,29,1) 80%)',
							borderRadius: '1rem',
							fontSize: '1.5rem',
							fontWeight: '600',
							color: 'darkblue',
							fontFamily: 'cursive',
							marginBottom: '3rem',
						}}
						onClick={() => {
							getSellingValues()
							setDisplayData(!displayData)
							setBestSelling(true)
						}}>
						Show results
					</button>
				</div>
				{displayData && (
					<div>
						<div style={{display: 'flex', justifyContent: 'space-evenly'}}>
							<div
								style={{
									color: 'aliceblue',
									fontFamily: 'cursive',
									fontSize: '2rem',
								}}>
								<div style={{marginBottom: '3rem'}}>
									<span>
										Cars sold this year:{' '}
										<CountUp duration={0.75} end={carsSoldLastYear} />
									</span>
								</div>
								<div style={{marginBottom: '3rem'}}>
									<span>
										Cars sold in the last five years:{' '}
										<CountUp duration={0.75} end={carsSoldLastFiveYears} />
									</span>
								</div>
								<div style={{marginBottom: '3rem'}}>
									<span>
										Cars sold since the beginning:{' '}
										<CountUp duration={0.75} end={carsSoldSinceBeginning} />
									</span>
								</div>
								<div style={{}}>
									<span>The best selling car: </span>
								</div>
							</div>
							<div
								style={{
									color: 'aliceblue',
									fontFamily: 'cursive',
									fontSize: '2rem',
									display: 'flex',
									flexDirection: 'column',
								}}>
								<div style={{marginBottom: '3rem'}}>
									Profit:{' '}
									<CountUp
										separator='.'
										duration={0.75}
										end={carsProfitLastYear}
									/>{' '}
									<span style={{color: 'green'}}>$</span>
								</div>
								<div style={{marginBottom: '3rem'}}>
									Profit:{' '}
									<CountUp
										separator='.'
										duration={0.75}
										end={carsProfitLastFiveYears}
									/>{' '}
									<span style={{color: 'green'}}>$</span>
								</div>
								<div style={{marginBottom: '3rem'}}>
									Profit:{' '}
									<CountUp
										separator='.'
										duration={0.75}
										end={carsProfitSinceBeginning}
									/>{' '}
									<span style={{color: 'green'}}>$</span>
								</div>
								{showBestSelling && (
									<div style={{color: 'darkblue'}}>{bestSellingCar}</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
