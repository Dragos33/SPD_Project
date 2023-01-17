import Header from './components/Header'
import CarsInStock from './components/Stock'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Stock from './components/Stock'
import SoldCars from './components/SoldCars'
import Statistics from './components/Statistics'
import Main from './components/Main'
import CarPhoto from './images/carPhoto.gif'
import {useState} from 'react'

function App() {
	const [mouseColor1, setMouseColor1] = useState(false)
	const [mouseColor2, setMouseColor2] = useState(false)
	const [mouseColor3, setMouseColor3] = useState(false)
	const [mouseColor4, setMouseColor4] = useState(false)
	const liStyle = {
		margin: '1rem',
		backgroundColor: 'rgba(45, 138, 138, 0.2)',
		paddingLeft: '1rem',
		paddingRight: '1rem',
		borderRadius: '1rem',
	}
	const LinkStyle = {
		color: 'aliceblue',
		textDecoration: 'none',
	}
	return (
		<div className='app-container'>
			<Router>
				<nav>
					<ul
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-evenly',
							alignContent: 'center',
							alignItems: 'center',
							color: 'aliceblue',
							fontSize: '1.5rem',
							listStyle: 'none',
							fontWeight: '600',
							background: ' rgb(2, 0, 36)',
							background:
								'linear-gradient(169deg,rgba(2, 0, 36, 1) 17%,rgba(98, 36, 36, 1) 54%, rgba(23, 89, 102, 1) 100%)',
						}}>
						<li
							style={{
								margin: '1rem',
								backgroundColor: mouseColor1
									? 'rgba(45, 138, 138, 0.5)'
									: 'rgba(45, 138, 138, 0.2)',
								paddingLeft: '1rem',
								paddingRight: '1rem',
								paddingBottom: '0.2rem',
								borderRadius: '1rem',
							}}>
							{' '}
							<Link
								onMouseEnter={() => setMouseColor1(true)}
								onMouseLeave={() => setMouseColor1(false)}
								style={LinkStyle}
								to='/'>
								Home
							</Link>
						</li>
						<li
							style={{
								margin: '1rem',
								backgroundColor: mouseColor2
									? 'rgba(45, 138, 138, 0.5)'
									: 'rgba(45, 138, 138, 0.2)',
								paddingLeft: '1rem',
								paddingRight: '1rem',
								paddingBottom: '0.2rem',
								borderRadius: '1rem',
							}}>
							{' '}
							<Link
								onMouseEnter={() => setMouseColor2(true)}
								onMouseLeave={() => setMouseColor2(false)}
								style={LinkStyle}
								to='/stock'>
								Cars in Stock
							</Link>
						</li>
						<img
							style={{
								witdh: '5rem',
								height: '5rem',
								borderRadius: '1rem',
							}}
							src={CarPhoto}
							alt='car photo'
						/>
						<li
							style={{
								margin: '1rem',
								backgroundColor: mouseColor3
									? 'rgba(45, 138, 138, 0.5)'
									: 'rgba(45, 138, 138, 0.2)',
								paddingLeft: '1rem',
								paddingRight: '1rem',
								paddingBottom: '0.2rem',
								borderRadius: '1rem',
							}}>
							{' '}
							<Link
								onMouseEnter={() => setMouseColor3(true)}
								onMouseLeave={() => setMouseColor3(false)}
								style={LinkStyle}
								to='/sold'>
								Sold Cars
							</Link>
						</li>
						<li
							style={{
								margin: '1rem',
								backgroundColor: mouseColor4
									? 'rgba(45, 138, 138, 0.5)'
									: 'rgba(45, 138, 138, 0.2)',
								paddingLeft: '1rem',
								paddingRight: '1rem',
								paddingBottom: '0.2rem',
								borderRadius: '1rem',
							}}>
							{' '}
							<Link
								onMouseEnter={() => setMouseColor4(true)}
								onMouseLeave={() => setMouseColor4(false)}
								style={LinkStyle}
								to='/statistics'>
								Statistics
							</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/sold' element={<SoldCars />} />
					<Route path='/stock' element={<Stock />} />
					<Route path='/statistics' element={<Statistics />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
