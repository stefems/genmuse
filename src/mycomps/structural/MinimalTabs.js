import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const TabOverride = withStyles({
	indicator: {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		'& > div': {
			maxWidth: 70,
			width: '100%',
			backgroundColor: "rgba(0,0,0,.63)"
		},
	},
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const MinimalTab = withStyles(theme => ({
	root: {
		textTransform: 'uppercase',
		color: 'rgba(0,0,0,.63)',
		fontWeight: theme.typography.fontWeightRegular,
		fontSize: theme.typography.pxToRem(15),
		marginRight: theme.spacing(1),
		'&:focus': {
			opacity: 1,
		},
	},
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		marginTop: "24px"
	},
	typography: {
		padding: theme.spacing(3),
	},
	content: {
		padding: "24px"
	}
}));

export default function MinimalTabs({tabs, color}) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	function handleChange(event, newValue) {
		setValue(newValue);
	}
	return (
		<div className={classes.root}>
				<TabOverride value={value} onChange={handleChange}>
					{tabs.map( (tab) => (
						<MinimalTab key={tab.label} style={{color: color ? color : "unset"}} label={tab.label}
						/>
					))}
				</TabOverride>
				{tabs.map( (tab, index) => (
					<div key={tab.label} className={classes.content} style={{display: value !== index ? "none" : "flex"}}>{tab.content()}</div>
				))}
		</div>
	);
}