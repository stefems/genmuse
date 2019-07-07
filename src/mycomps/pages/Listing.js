import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import rainImage from '../../images/rain.gif';
import podcastImage from '../../images/podcast.gif';

const styles = (theme) => {
	return ({
		container: {
			display: "flex",
			fontFamily: "PT Sans, sans-serif",
			color: "rgba(0,0,0,.63)",
			padding: "48px",
			justifyContent: "center"
		},
		left: {
			marginBottom: "20%",
			marginTop: "48px",
		},
		right: {
			marginTop: "14%"
		},
		itemContainer: {
			margin: "0 40px",
			borderRadius: "4px",
			'&:hover': {
				cursor: "pointer",
				boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
			}
		},
		imageContainer: {
			display: "flex",
		},
		image: {
			width: "100%"
		},
		itemTitle: {
			fontSize: "24px",
			fontWeight: "bold",
			textAlign: "left",
			padding: "12px"
		},
		itemLabel: {
			fontSize: "18px",
			textAlign: "left",
			padding: "12px"
		}
	})
};

class Listing extends React.Component {

	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
		};
	}

	render_item = ({image, title, label, link}, left) => {
		const { classes } = this.props;
		return (
			<div onClick={() => link ? this.props.history.push(link) : ""} className={classes.itemContainer}>
				{left ? <div className={classes.imageContainer}>
					<img alt={label} className={classes.image} src={image}/>
				</div> : ""}
				<div className={classes.itemTitle}>
					{title}
				</div>
				<div className={classes.itemLabel}>
					{label}
				</div>
				{left ? "" : <div className={classes.imageContainer}>
					<img alt={label} src={image}/>
				</div>}
			</div>
		);
	}

	render() {
		const { classes } = this.props;
		const rain = {
			image: rainImage,
			title: "Rain and Thunder With Generative String Instruments", label: "An experiment with making rain sound more... harmonious?", link: "/generate-music-rain-and-strings"};
		const podcast = {
			image: podcastImage,
			title: "Podcast Storm: Coming Soon", label: "Podcasts Podcasts Podcasts Podcasts Podcasts", link: null};
		return (
			<div className={classes.container}>
				<div className={classes.left}>
					{this.render_item(rain, true)}
				</div>
				<div className={classes.right}>
					{this.render_item(podcast, false)}
				</div>
			</div>
		);
	}
}

export default compose(
	withStyles(styles),
	withRouter
)(Listing);