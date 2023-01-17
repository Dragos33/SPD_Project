import React from 'react'
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Label,
	Legend,
	BarChart,
	Bar,
} from 'recharts'
import {useEffect, useState} from 'react'
import {getDatabase, ref, onValue, update} from 'firebase/database'
import StatisticsImage from '../images/statistics.gif'

export default function Statistics() {
	const [carsArray, setCarsArray] = useState([])
	const [dataForSoldYears, setDataForSoldYears] = useState([])
	const [mostSoldCars, setMostSoldCars] = useState([])
	const [yearsSales, setYearsSales] = useState([])
	const [statisticsVisible, setStatisticsVisible] = useState(false)

	const getDataFromDB = () => {
		const db = getDatabase()
		const feedValRef = ref(db, 'sold_cars')
		onValue(feedValRef, (snapshot) => {
			const data = snapshot.val()
			setCarsArray(Object.values(data))
		})
	}
	const soldCarsPerYears = () => {
		let carsSoldIn2022 = carsArray.filter(
			(item) => item.date_of_sale.split('.')[2] == '2022'
		)
		let carsSoldIn2021 = carsArray.filter(
			(item) => item.date_of_sale.split('.')[2] == '2021'
		)
		let carsSoldIn2020 = carsArray.filter(
			(item) => item.date_of_sale.split('.')[2] == '2020'
		)
		let carsSoldIn2019 = carsArray.filter(
			(item) => item.date_of_sale.split('.')[2] == '2019'
		)
		let carsSoldIn2018 = carsArray.filter(
			(item) => item.date_of_sale.split('.')[2] == '2018'
		)
		let carsSoldIn2017 = carsArray.filter(
			(item) => item.date_of_sale.split('.')[2] == '2017'
		)
		setDataForSoldYears([
			{year: 2017, Cars_Sold: carsSoldIn2017.length},
			{year: 2018, Cars_Sold: carsSoldIn2018.length},
			{year: 2019, Cars_Sold: carsSoldIn2019.length},
			{year: 2020, Cars_Sold: carsSoldIn2020.length},
			{year: 2021, Cars_Sold: carsSoldIn2021.length},
			{year: 2022, Cars_Sold: carsSoldIn2022.length},
		])
	}

	const bestSeller = () => {
		let Ford = carsArray.filter((item) => item.car_make == 'Ford').length
		let Mazda = carsArray.filter((item) => item.car_make == 'Mazda').length
		let Honda = carsArray.filter((item) => item.car_make == 'Honda').length
		let Dodge = carsArray.filter((item) => item.car_make == 'Dodge').length
		let Audi = carsArray.filter((item) => item.car_make == 'Ford').length
		let BMW = carsArray.filter((item) => item.car_make == 'BMW').length

		setMostSoldCars([
			{model: 'Ford', Number_of_cars_sold: Ford},
			{model: 'Mazda', Number_of_cars_sold: Mazda},
			{model: 'Honda', Number_of_cars_sold: Honda},
			{model: 'Dodge', Number_of_cars_sold: Dodge},
			{model: 'Audi', Number_of_cars_sold: Audi},
			{model: 'BMW', Number_of_cars_sold: BMW},
		])
	}

	const calculateProfitEvolution = () => {
		let year2022 =
			carsArray
				.filter((item) => item.date_of_sale.split('.')[2] == '2022')
				.map((item) => item.price)
				.reduce((a, b) => a + b, 0) * 0.1

		let year2021 =
			carsArray
				.filter((item) => item.date_of_sale.split('.')[2] == '2021')
				.map((item) => item.price)
				.reduce((a, b) => a + b, 0) * 0.1
		let year2020 =
			carsArray
				.filter((item) => item.date_of_sale.split('.')[2] == '2020')
				.map((item) => item.price)
				.reduce((a, b) => a + b, 0) * 0.1
		let year2019 =
			carsArray
				.filter((item) => item.date_of_sale.split('.')[2] == '2019')
				.map((item) => item.price)
				.reduce((a, b) => a + b, 0) * 0.1
		let year2018 =
			carsArray
				.filter((item) => item.date_of_sale.split('.')[2] == '2018')
				.map((item) => item.price)
				.reduce((a, b) => a + b, 0) * 0.1
		let year2017 =
			carsArray
				.filter((item) => item.date_of_sale.split('.')[2] == '2017')
				.map((item) => item.price)
				.reduce((a, b) => a + b, 0) * 0.1
		setYearsSales([
			{year: 2017, profit: Math.floor(year2017)},
			{year: 2018, profit: Math.floor(year2018)},
			{year: 2019, profit: Math.floor(year2019)},
			{year: 2020, profit: Math.floor(year2020)},
			{year: 2021, profit: Math.floor(year2021)},
			{year: 2022, profit: Math.floor(year2022)},
		])
	}

	useEffect(() => {
		getDataFromDB()
		soldCarsPerYears()
		bestSeller()
		calculateProfitEvolution()
	}, [])

	return (
		<div style={{height: '100vh'}}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<button
					style={{
						display: 'block',
						height: '4rem',
						width: '20rem',
						background: 'rgb(205,77,48)',
						background:
							'linear-gradient(11deg, rgba(205,77,48,1) 0%, rgba(172,140,7,1) 41%, rgba(191,61,29,1) 80%)',
						borderRadius: '1rem',
						fontSize: '1.5rem',
						fontWeight: '600',
						color: 'darkblue',
						fontFamily: 'cursive',
						marginBottom: '5rem',
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
					onClick={() => {
						calculateProfitEvolution()
						soldCarsPerYears()
						bestSeller()
						setStatisticsVisible(!statisticsVisible)
					}}>
					{' '}
					Display statistics
				</button>
				{!statisticsVisible && (
					<div>
						<img
							src={StatisticsImage}
							alt='statistics image'
							// style={{width: '35vw', height: '30vh'}}
						/>
					</div>
				)}
			</div>
			{statisticsVisible && (
				<div style={{display: 'flex', justifyContent: 'space-evenly'}}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginRight: '2rem',
						}}>
						<div style={{marginBottom: '3rem'}}>
							<BarChart width={700} height={260} data={dataForSoldYears}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='year'></XAxis>
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar
									name='Number of cars sold each year'
									style={{fontSize: '2rem'}}
									dataKey='Cars_Sold'
									fill='#8884d8'
								/>
								{/* <Bar dataKey='uv' fill='#82ca9d' /> */}
							</BarChart>
						</div>
						<BarChart width={700} height={260} data={mostSoldCars}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='model'></XAxis>
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar
								name={'Number of sold cars for each model'}
								style={{fontSize: '2rem'}}
								dataKey='Number_of_cars_sold'
								fill='#4484d8'
							/>
						</BarChart>
					</div>
					<div>
						<LineChart
							width={700}
							height={260}
							data={yearsSales}
							margin={{top: 5, right: 30, left: 20, bottom: 5}}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='year' />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line
								name={'Profit evolution in the past five years'}
								type='monotone'
								dataKey='profit'
								stroke='#8884d8'
								strokeWidth={3}
							/>
						</LineChart>
						<div style={{marginLeft: '5rem'}}>
							<img src={StatisticsImage} alt='statistics image' />
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
