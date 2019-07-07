import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
	return ({
		container: {
			fontFamily: "PT Sans, sans-serif",
			display: "flex",
			alignItems: "center",
			padding: "24px",
			justifyContent: "space-between",
			color: "rgba(0,0,0,.63)"
		},
		titleContainer: {
			display: "flex",
			alignItems: "center",
		},
		title: {
			fontSize: "40px",
			paddingRight: "24px",
			borderRight: "solid rgba(0,0,0,.63) 1px",
		},
		subtitle: {
			paddingLeft: "24px",
			fontSize: "20px",
			fontFamily: "Roboto"
		},
		right: {
			display: "flex",
			alignItems: "center",
			whiteSpace: "nowrap",
			flexWrap: "nowrap"
		},
		nav: {
			fontSize: "20px",
			marginLeft: "24px",
			borderRadius: "4px",
			padding: "12px",
			'&:hover': {
				cursor: "pointer",
				boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
			}
		}
	});
}

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
		};
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.container}>
				<div className={classes.titleContainer}>
					<div className={classes.title}>
						GM
					</div>
					<div className={classes.subtitle}>
						Generative Musings
					</div>
				</div>
				<div className={classes.right}>
					<div className={classes.nav}>
						projects
					</div>
					<div className={classes.nav}>
						submit/propose
					</div>
					<div className={classes.nav}>
						about/contact
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Header);