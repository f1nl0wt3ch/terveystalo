import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        }
    })
);

export default function BannerComponent() {
    const classes = useStyles();
    return (
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <Paper className={classes.paper}>
                <Typography variant="h6">SIMPLE WEBAPP USING NODEJS, EXPRESS, REACT AND TYPESCRIPT</Typography>
            </Paper>
        </Grid>
    );
}
