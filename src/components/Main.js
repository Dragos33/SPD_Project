import React, {useState, useEffect} from 'react'
import db from '../firebase_setup/firebase'
import {getDatabase, ref, onValue, update} from 'firebase/database'
import './Main.css'
import Logo1 from '../images/logo1.png'
import Logo2 from '../images/logo2.png'
import MainCar from '../images/mainCar.gif'

export default function Main() {
	const [carsArray, setCarsArray] = useState([])
	const [totalCost, setTotalCost] = useState(0)

	const getDataFromDB = () => {
		const db = getDatabase()
		const feedValRef = ref(db, 'sold_cars')
		onValue(feedValRef, (snapshot) => {
			const data = snapshot.val()
			setCarsArray(Object.values(data))
		})
	}
	// console.log(carsArray)
	useEffect(() => {
		getDataFromDB()
	}, [])

	return (
		<div className='main-container' style={{height: '130vh'}}>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						marginLeft: '5rem',
					}}>
					<p
						style={{
							color: 'aliceblue',
							fontFamily: 'cursive',
							fontSize: '6rem',
							fontWeight: '800',
							alignSelf: 'center',
						}}>
						Dream cars
					</p>
					<p
						style={{
							color: 'lightgrey',
							fontFamily: 'cursive',
							fontSize: '1.5rem',
						}}>
						With more than 20 years experience in selling cars, we are here to
						help you find your dream car.
					</p>
					<img
						src={MainCar}
						alt='car gif'
						style={{
							width: '35rem',
							height: '25rem',
							borderRadius: '50%',
							alignSelf: 'center',
							marginTop: '1rem',
						}}
					/>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						marginRight: '2rem',
						height: '23vh',
						width: '23vw',
					}}>
					<img src={Logo1} alt='' />
					<img src={Logo2} alt='' />
				</div>
			</div>
		</div>
	)
}
