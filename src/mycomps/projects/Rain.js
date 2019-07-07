import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import MinimalTabs from '../structural/MinimalTabs';
import rainImage from '../../images/rain.gif';
import rainImagePaused from '../../images/rain.png';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import HelpIcon from '@material-ui/icons/Help';
import LightTooltip from '../display/LightTooltip';

const styles = (theme) => {
	return ({
		container: {
			display: "flex",
			padding: "24px 96px",
			color: "rgba(0,0,0,.63)",
		},
		right: {
			display: "flex",
			width: "50%",
			marginLeft: "12px"
		},
		left: {
			display: "flex",
			width: "50%",
			flexWrap: "wrap",
			textAlign: "left",
			marginRight: "12px"
		},
		image: {
			width: "100%"
		},
		playIcon: {
			position: "absolute",
			top: "calc(50% - 2em + 12px)",
			color: "white",
			width: "100%",
			height: "3em",
		},
		playControlsContainer: {
			position: "relative",
			cursor: "pointer",
			margin: "auto"
		},
		dateAndAuthor: {
			fontSize: "16px",
			width: "100%",
			marginBottom: "6px"
		},
		title: {
			width: "100%",
			fontSize: "24px",
			fontWeight: "bold"
		},
		description: {
			fontSize: "18px",
			width: "100%",
			marginTop: "12px"
		},
		switchLabel: {
			fontFamily: "PT Sans, sans-serif",
			fontSize: "18px"
		},
		labelPlacementStart: {
			marginLeft: 0
		},
		inputContainer: {
			display: "flex",
			alignItems: "center",
			margin: "24px 0",
			fontSize: "18px"
		},
		helpIcon: {
			cursor: "help"
		},
		inlineInput: {
			margin: "0 8px",
			maxWidth: "80px"
		},
		inputOverride: {
			textAlign: "right",
		}
	});
}

class Rain extends React.Component {

	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			paused: true,
			thunder_form: {
				mute: false,
				repeat: 7,
				offset: 3
			},
			instrument_form: {
			}
		};
		this.tabs = [
			{
				label: "thunder",
				content: this.render_thunder
			},
			{
				label: "instruments",
				content: this.render_instruments
			}
		];
		this.instrument_tabs = [
			{
				label: "cello",
				content: () => this.render_instrument("cello")
			},
			{
				label: "mandolin",
				content: () => this.render_instrument("mandolin")
			},
			{
				label: "viola",
				content: () => this.render_instrument("viola")
			},
			{
				label: "violin",
				content: () => this.render_instrument("violin")
			},
		];
		this.instrument_tabs.forEach( ({label}) => {
			this.state.instrument_form[label] = {
				mute: false,
				repeat: 9,
				offset: 3,
				chorus: 9
			};
		});
	}

	togglePlay = () => {
		this.setState( (state) => ({paused: !state.paused}));
	}

	switch_change_thunder = (input) => {
		const target = input.target.value;
		this.setState( (state) => {
			let thunder_form = state.thunder_form;
			thunder_form[target] = !thunder_form[target];
			return {thunder_form: thunder_form};
		});
	}

	switch_change = (input) => {
		const instrument = input.target.value.split("_")[0];
		const target = input.target.value.split("_")[1];
		this.setState( (state) => {
			let instrument_form = state.instrument_form;
			instrument_form[instrument][target] = !instrument_form[instrument][target];
			return {instrument_form: instrument_form};
		});
	}

	input_change = (input) => {
		const target = input.target.id;
		const value = input.target.value;
		this.setState( (state) => {
			let thunder_form = state.thunder_form;
			thunder_form[target] = parseInt(value) || "";
			return {thunder_form: thunder_form};
		});
	}

	render_thunder = () => {
		const classes = this.props.classes;
		return (
			<div>
				<div className={classes.inputContainer}>
					<FormControlLabel
						value="mute"
						control={<Switch onChange={this.switch_change_thunder} color="primary" />}
						label="Mute"
						labelPlacement="start"
						classes={{labelPlacementStart: classes.labelPlacementStart, label: classes.switchLabel}}
					/>
				</div>
				<div className={classes.inputContainer}>
					Trigger thunder every 
					<span>
						<TextField
							id="repeat"
							value={this.state.thunder_form.repeat}
							onChange={this.input_change}
							className={classes.inlineInput}
							InputLabelProps={{
								shrink: true,
							}}
							classes={{root: classes.inputOverride}}
							margin="normal"
						/>
					</span> seconds
				</div>
				<div className={classes.inputContainer}>
					Randomness Offset
					<span>
						<TextField
							id="offset"
							value={this.state.thunder_form.offset}
							onChange={this.input_change}
							className={classes.inlineInput}
							InputLabelProps={{
								shrink: true,
							}}
							margin="normal"
							classes={{root: classes.inputOverride}}
						/>
					</span>
					<LightTooltip title="Adds a random amount of seconds (between 0 and your value) that are either added or substracted from the number above.">
						<HelpIcon className={classes.helpIcon}/>
					</LightTooltip>
				</div>
			</div>
		);
	}

	render_instrument = (instrument) => {
		const classes = this.props.classes;
		return (
			<div>
				<div className={classes.inputContainer}>
					<FormControlLabel
						value={instrument + "_mute"}
						control={<Switch onChange={this.switch_change} color="primary" />}
						label="Mute"
						labelPlacement="start"
						classes={{labelPlacementStart: classes.labelPlacementStart, label: classes.switchLabel}}
					/>
				</div>
				<div className={classes.inputContainer}>
					Chorus Number
					<span>
						<TextField
							id="offset"
							value={this.state.thunder_form.offset}
							onChange={this.input_change}
							className={classes.inlineInput}
							InputLabelProps={{
								shrink: true,
							}}
							margin="normal"
							classes={{root: classes.inputOverride}}
						/>
					</span>
					<LightTooltip title="Plays several of the same track with a slight timing offset to create a chorus effect.">
						<HelpIcon className={classes.helpIcon}/>
					</LightTooltip>
				</div>
			</div>
		);
	}

	render_instruments = () => {
		const classes = this.props.classes;
		return (
			<div>
				<div className={classes.inputContainer}>
					Trigger random instrument sound every 
					<span>
						<TextField
							id={"instrument_repeat"}
							value={this.state.thunder_form.repeat}
							onChange={this.input_change}
							className={classes.inlineInput}
							InputLabelProps={{
								shrink: true,
							}}
							classes={{root: classes.inputOverride}}
							margin="normal"
						/>
					</span> seconds
				</div>
				<div className={classes.inputContainer}>
					Randomness Offset
					<span>
						<TextField
							id="instrument_offset"
							value={this.state.thunder_form.offset}
							onChange={this.input_change}
							className={classes.inlineInput}
							InputLabelProps={{
								shrink: true,
							}}
							margin="normal"
							classes={{root: classes.inputOverride}}
						/>
					</span>
					<LightTooltip title="Adds a random amount of seconds (between 0 and your value) that are either added or substracted from the number above.">
						<HelpIcon className={classes.helpIcon}/>
					</LightTooltip>
				</div>
				<MinimalTabs color="#3f51b5" tabs={this.instrument_tabs}/>
			</div>
		);
	}

	render() {
		const { classes } = this.props;
		const { paused } = this.state;
		console.log(this.state);
		return (
			<div className={classes.container}>
				<div className={classes.left}>
					<div className={classes.dateAndAuthor}>
						7/7/19 - SMK
					</div>
					<div className={classes.title}>
						Rain and Thunder With Generative String Instruments
					</div>
					<div className={classes.description}>
						Ambient rain and thunder with random string instrument notes. Tweak the settings below. 
					</div>
					<div>
						<MinimalTabs tabs={this.tabs}/>
					</div>
				</div>
				<div className={classes.right}>
					<div onClick={this.togglePlay} className={classes.playControlsContainer}>
						<PlayCircleFilledWhiteIcon className={classes.playIcon}/>
						{paused ? 
							<img className={classes.image} alt="bladerunner rainscape" src={rainImagePaused}/>
							: <img className={classes.image} alt="bladerunner rainscape" src={rainImage}/>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Rain);