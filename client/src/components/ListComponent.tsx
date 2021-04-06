import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {findAll} from "../services/RestService";
import {Button, List, ListItem, ListItemText} from "@material-ui/core";
import {MeasurementModel} from "../model/MeasurementModel";
import RefreshIcon from "@material-ui/icons/Refresh";

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
        button: {
            margin: theme.spacing(1),
        }
    }),
);

export default function ListComponent() {
    const classes = useStyles()
    const [measurementArr, setMeasurementArr] = React.useState([])
    const [isReloading, setReloading] = React.useState(true)

    if(isReloading) {
        findAll("http://localhost:3001/api/v1/measurements").then( data => {
            setMeasurementArr(data)
            setReloading(false)
        }).catch(err => console.log(err.message))
    }

    const handleRefreshBtnOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setReloading(true);
    }

    return (
        <Grid item lg={3} md={3} sm={12} xs={12}>
            <Paper className={classes.paper}>MEASUREMENTS</Paper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <List>
                        {
                            measurementArr ? measurementArr.map((measurement: MeasurementModel) => (
                                <ListItem key={measurement.id}>
                                    <ListItemText id={`${measurement.id}`}
                                                  primary={`${measurement.id}. ${measurement.index.name}, ${measurement.unit.name}, ${measurement.over}, ${measurement.under}`}/>
                                </ListItem>
                            )) : ("")
                        }

                    </List>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        endIcon={<RefreshIcon/>}
                        type="button"
                        onClick={handleRefreshBtnOnClick}
                    >
                        Refresh
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
