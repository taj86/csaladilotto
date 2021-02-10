import React from 'react';
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
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
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
	console.warn(props)
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
	const [user, setUser] = React.useState('');
	const [checkedNumbers, setNumbers] = React.useState([]);
	const [checkedNumber, setNumber] = React.useState("");
	const addItem = function(item) {
    setNumbers([
      ...checkedNumbers,
      item
    ]);
    setNumber("");
  };

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

	return (
		<div className="App">
			<header className="header">
				<div className="header-box">
					{userLoggedIn && <label>{'Hello @' + userLoggedIn + '!'}</label>}
					{userLoggedIn && <Avatar alt={userLoggedIn} src={userimages[userLoggedIn]} />}
				</div>
				<img src={logo} className="logo" alt="logo" />
				<p>Családi lottó</p>
			</header>
			<div className="content">
				{!userLoggedIn && 
					<form name="login" onSubmit={login}>
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
						<div className={classes.root}>
							<Button type="submit" variant="contained" color="primary">
								Belépek
							</Button>
						</div>
					</form>
				}
				{userLoggedIn && // TODO: ha már játszott, ne jelenjen meg a lottózós táblázat
					<div>
						<h3>Az eheti számok ({weekNumber}.hét):</h3>
						<div className="lotto-inputs">
							<LottoNumbers numbers={numbers} checkedNumbers={checkedNumbers} addItem={addItem}/>
						</div>
						<div className={classes.root}>
							<Button type="button" variant="contained" color="primary">
								Elküld
							</Button>
						</div>
					</div>
				}
			</div>
			<footer className="footer">
				<p>Powered by TAJ 2021</p>
			</footer>
		</div>
	);
}

export default App;
