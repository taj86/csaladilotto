import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import andi from './img/andi.jpg'
import atis from './img/atis.jpg'
import benji from './img/benji.jpg'
import bia from './img/bia.jpg'
import doma from './img/doma.jpg'
import edit from './img/edit.jpg'
import taj from './img/taj.jpg'
import tika from './img/tika.jpg'
import timi from './img/timi.jpg'
import zoli from './img/zoli.jpg'
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
	root: {
	'& > *': {
		margin: theme.spacing(1),
	},
	'& .MuiTextField-root': {
		margin: theme.spacing(1),
		minWidth: 150,
	}
  },
  formControl: {
		margin: theme.spacing(1),
		minWidth: 150,
  },
	selectEmpty: {
		marginTop: theme.spacing(2),
  },
}));

const userimages = {
	andi: andi,
	atis: atis,
	benji: benji,
	bia: bia,
	doma: doma,
	edit: edit,
	taj: taj,
	tika: tika,
	timi: timi,
	zoli: zoli,
}

let numbers = [];

for(var i = 1; i < 91; i++) {
	numbers.push(i)
}

const LottoNumbers = function(props) {
	return props.numbers.map(function(number) {
		let isChecked = props.checkedNumbers.includes(number.toString()) ? 'checked' : '';

		return(
			<label className={`lotto-number ${isChecked}`} key={number}>
				<input type="checkbox" name="number" value={number} onClick={(event)=> { props.addItem(event.target.value); }}></input>
				{number}
			</label>
		)
	})
};

Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

function App() {
	const [user, setUser] = useState('');
	const [error, setError] = useState('');
	const [weeklyNumbersUploaded, setWeeklyNumbersUploaded] = useState(false);
	const [checkedNumbers, setNumbers] = useState([]);
	const addItem = function(item) {
		setError('');
		if (checkedNumbers.includes(item)) {
			let newNumbers = checkedNumbers.filter(function(itemToRemove) {
				return itemToRemove !== item
			});
			setNumbers(newNumbers);
		} else if (checkedNumbers.length < 5) {
			setNumbers([...checkedNumbers, item]);
		}
	};

	const uploadNumbers = function(numbers) {
		setError('')
		if (numbers.length < 5) {
			setError('Megtaníthatlak 5-ig számolni...')
		} else {
			const  requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: 'upload_numbers',
					payload: {
						numbers: numbers.sort().join('|'),
						user: userLoggedIn
					},
				}),
			};
		
			fetch("https://taj.co.hu/lotto.php", requestOptions)
			.then(() => {
				setWeeklyNumbersUploaded(true) 
			})
			.catch(() => {
				setError('Sajnálom, nem sikerült feltölteni... :(')
			})
		}
	}

	const getNumbers = function() {
		const  requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				action: 'get_numbers',
				payload: {
					week: weekNumber-1,
					user: userLoggedIn
				},
			}),
		};
	
		fetch("https://taj.co.hu/lotto.php", requestOptions)
			.then((response) => {
				setNumbers(response.split('|'))
			})
			.catch(() => {
				setError('Sajnálom, nem sikerült lekérni... :(')
			})
	}

	const getCurrentUserUploadedNumbers = function() {
		const  requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				action: 'get_hasuploaded',
				payload: {
					week: weekNumber,
					user: userLoggedIn
				},
			}),
		};
	
		fetch("https://taj.co.hu/lotto.php", requestOptions)
			.then((response) => {
				setWeeklyNumbersUploaded(true)
			})
			.catch(() => {
				setError('Sajnálom, már induláskor elhasaltam, mint a szar... :(')
			})
	}

	const classes = useStyles();
	const handleChange = (event) => {
		setUser(event.target.value);
	};
	const login = () => {
		localStorage.setItem('user', user);
	};
	const userLoggedIn = localStorage.getItem('user');
	const today = new Date();
	const weekNumber = today.getWeek() - 1;

  useEffect(() => {
    getCurrentUserUploadedNumbers()
  }, []);

	return (
		<div className="App">
			<header className="header">
				<div className="header-box">
					{userLoggedIn && <label>{'Hello @' + userLoggedIn + '!'}</label>}
					{userLoggedIn && <Avatar alt={userLoggedIn} src={userimages[userLoggedIn]} />}
				</div>
				<img src={logo} className="logo" alt="logo" />
				<p className="header-title">Családi lottó</p>
			</header>
			<div className="content">
				{!userLoggedIn && 
					<form name="login" onSubmit={login} className={classes.root}>
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel id="name-label">Ki vagy?</InputLabel>
							<Select
								labelId="name-label"
								id="name"
								value={user}
								onChange={handleChange}
								label="Ki vagy?"
								required
							>
								<MenuItem value="">
									<em>válassz!</em>
								</MenuItem>
								<MenuItem value={"andi"}>Andi</MenuItem>
								<MenuItem value={"atis"}>Atis</MenuItem>
								<MenuItem value={"benji"}>Benji</MenuItem>
								<MenuItem value={"bia"}>Bia</MenuItem>
								<MenuItem value={"doma"}>Doma</MenuItem>
								<MenuItem value={"edit"}>Edit</MenuItem>
								<MenuItem value={"taj"}>TAJ</MenuItem>
								<MenuItem value={"tika"}>Tika</MenuItem>
								<MenuItem value={"timi"}>Timi</MenuItem>
								<MenuItem value={"zoli"}>Zoli</MenuItem>
							</Select>
						</FormControl>
						<TextField id="outlined-basic" label="Jelszó" type="password" variant="outlined" required />
						<div className={classes.root}>
							<Button type="submit" variant="contained" color="primary">
								Belépek
							</Button>
						</div>
					</form>
				}
				{userLoggedIn && !weeklyNumbersUploaded &&
					<div>
						<h3>Tedd meg a(z) {weekNumber}.heti tipped:</h3>
						<div className={classes.root}>
							<Button type="button" variant="contained" color="secondary" onClick={getNumbers}>
								Előző heti számok másolása
							</Button>
						</div>
						<div className={classes.root}>
							<Paper elevation={3}>
								<div className="lotto-inputs">
									<LottoNumbers numbers={numbers} checkedNumbers={checkedNumbers} addItem={addItem}/>
								</div>
							</Paper>
						</div>
						<div className={classes.root}>
							<Button type="button" variant="contained" color="primary" onClick={ () => { uploadNumbers(checkedNumbers) } }>
								Elküld
							</Button>
						</div>
					</div>
				}
			{error !== '' && <Alert severity="error">{error}</Alert>}
			</div>
			<footer className="footer">
				<p>Powered by TAJ 2021</p>
			</footer>
		</div>
	);
}

export default App;
