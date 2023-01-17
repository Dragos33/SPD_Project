import React from 'react'
import db from '../firebase_setup/firebase'
import {getDatabase, ref, onValue, update} from 'firebase/database'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from '../App'

export default function Header() {
	return (
		<div>
			<div
				style={{
					background: 'rgb(2, 0, 36)',
					background:
						'linear-gradient(169deg, rgba(2,0,36,1) 17%, rgba(98,36,36,1) 54%, rgba(23,89,102,1) 100%)',
				}}></div>
		</div>
	)
}
