import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BannerComponent from "./components/BannerComponent";
import ListComponent from "./components/ListComponent";
import InsertComponent from "./components/InsertComponent";
import UpdateComponent from "./components/UpdateComponent";
import DeleteComponent from "./components/DeleteComponent";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

function App() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <BannerComponent/>
                <ListComponent/>
                <InsertComponent/>
                <UpdateComponent/>
                <DeleteComponent/>
            </Grid>
        </div>
    )
}

export default App;
