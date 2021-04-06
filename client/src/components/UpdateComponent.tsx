import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
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

export default function UpdateComponent() {
    const classes = useStyles()

    return (
        <Grid item lg={3} md={3} sm={12} xs={12}>
            <Paper className={classes.paper}>UPDATE</Paper>
        </Grid>
    )
}
