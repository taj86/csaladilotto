import React from 'react';
import logo from './logo.png';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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

function App() {
	const [age, setAge] = React.useState('');
	const classes = useStyles();
	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<div className="App">
			<header className="header">
				<img src={logo} className="logo" alt="logo" />
				<p>Családi lottó</p>
			</header>
			<div className="content">
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="name-label">Neved</InputLabel>
					<Select
						labelId="name-label"
						id="name"
						value={age}
						onChange={handleChange}
						label="Neved"
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
					<Button variant="contained" color="primary">
						Regisztrálok
					</Button>
				</div>
			</div>
			<footer className="footer">
				<p>Powered by TAJ 2021</p>
			</footer>
		</div>
	);
}

export default App;
