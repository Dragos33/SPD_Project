import React, {useEffect, useState} from 'react'
import {getDatabase, ref, onValue, update} from 'firebase/database'

export default function Stock() {
	const [carsArray, setCarsArray] = useState([])
	const [searchedText, setSearchedText] = useState([])
	const [stockNumber, setStockNumber] = useState(0)
	const [stockCars, setSTockCars] = useState([])
	const [stockVisible, setStockVisible] = useState(false)
	const [searchVisible, setSearchVisible] = useState(false)

	const getDataFromDB = () => {
		const db = getDatabase()
		const feedValRef = ref(db, 'cars_in_stock')
		onValue(feedValRef, (snapshot) => {
			const data = snapshot.val()
			setCarsArray(Object.values(data))
		})
	}

	const searchStock = (item) => {
		let stockValue = carsArray.filter(
			(value) =>
				value.car_make.toUpperCase() == item.toUpperCase() ||
				value.car_model.toUpperCase() == item.toUpperCase()
		)
		setSTockCars(stockValue)
		setStockNumber(stockValue.length)
	}

	const displayCars = () => {
		return stockCars.map((car) => (
			<>
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<div style={{textAlign: 'center', marginLeft: '2rem'}}>
						{car.car_make}
					</div>
					<div
						style={{
							width: '8rem',
							textAlign: 'center',
							marginLeft: '-3rem',
						}}>
						{car.car_model}
					</div>
					<div style={{textAlign: 'center'}}>{car.car_year}</div>
					<div style={{textAlign: 'center'}}>{car.car_KM}</div>
					<div style={{textAlign: 'center', marginRight: '4rem'}}>
						{car.car_VIN}
					</div>
				</div>
			</>
		))
	}

	useEffect(() => {
		getDataFromDB()
	}, [])

	return (
		<div style={{height: '130vh'}}>
			<div
				style={{
					marginTop: '3rem',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<div>
					<h1
						style={{
							fontFamily: 'cursive',
							fontSize: '5rem',
							color: 'aliceblue',
						}}>
						Check the stock
					</h1>
				</div>
				<div style={{marginTop: '3rem'}}>
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<input
							placeholder='Type a brand or model name'
							style={{
								textAlign: 'center',
								backgroundColor: 'aliceblue',
								width: '20rem',
								height: '3rem',
								borderRadius: '5rem',
								fontSize: '1.3rem',
								fontFamily: 'cursive',
								fontWeight: '600',
								color: '#9F2020',
								marginRight: '1rem',
							}}
							type='text'
							value={searchedText}
							onChange={(value) => setSearchedText(value.target.value)}
						/>{' '}
						<button
							style={{
								background: 'rgb(205,77,48)',
								background:
									'linear-gradient(11deg, rgba(205,77,48,1) 0%, rgba(172,140,7,1) 41%, rgba(191,61,29,1) 80%)',
								width: '7rem',
								height: '3rem',
								borderRadius: '5rem',
								fontSize: '1.5rem',
								fontWeight: '600',
								color: 'black',
								fontFamily: 'cursive',
							}}
							onClick={() => {
								searchStock(searchedText)
								setSearchVisible(true)
							}}>
							Search
						</button>
					</div>
					<button
						style={{
							background: 'rgb(205,77,48)',
							background:
								'linear-gradient(11deg, rgba(205,77,48,1) 0%, rgba(172,140,7,1) 41%, rgba(191,61,29,1) 80%)',
							width: '12rem',
							height: '3rem',
							borderRadius: '5rem',
							fontSize: '1.5rem',
							fontWeight: '600',
							color: 'black',
							marginTop: '2rem',
							marginLeft: '4rem',
						}}
						onClick={() => setStockVisible(!stockVisible)}>
						{stockVisible ? 'Hide' : 'Display'} stock
					</button>
				</div>
				{searchVisible && (
					<div
						style={{
							marginTop: '1rem',
							marginLeft: '-5rem',
							fontSize: '2rem',
							fontFamily: 'cursive',
						}}>
						<p style={{color: 'aliceblue'}}>
							There are {stockNumber} cars in stock
						</p>
					</div>
				)}
				{stockVisible && (
					<div
						style={{
							width: '60rem',
							maxHeight: '30rem',
							marginBottom: '3rem',
							backgroundColor: 'aliceblue',
							overflow: 'auto',
							backgroundColor: ' rgba(20, 138, 138, 0.6)',
							color: 'black',
							fontWeight: '600',
							borderRadius: '3rem',
						}}>
						<tr>
							<th style={{paddingRight: '7rem', paddingLeft: '2rem'}}>Make</th>
							<th style={{paddingRight: '10.3rem'}}>Model</th>
							<th style={{paddingRight: '8.4rem'}}>Year</th>
							<th style={{paddingRight: '12rem'}}>KM</th>
							<th style={{}}>VIN</th>
						</tr>
						{displayCars()}
					</div>
				)}
			</div>
		</div>
	)
}
