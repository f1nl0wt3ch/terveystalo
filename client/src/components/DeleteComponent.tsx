import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React, {useEffect} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Button, Checkbox, List, ListItem, ListItemText} from "@material-ui/core";
import {MeasurementModel} from "../model/MeasurementModel";
import {deleteMeasurement, findAll} from "../services/RestService";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        button: {
            margin: theme.spacing(1),
        },
        form: {
            margin: theme.spacing(2),
            padding: theme.spacing(1)
        }
    })
);

export default function DeleteComponent() {
    const classes = useStyles()
    const [measurementArr, setMeasurementArr] = React.useState([])
    const [checked, setChecked] = React.useState([0]);
    const [status, setStatus] = React.useState(null)

    useEffect(()=> {
        findAll("http://localhost:3001/api/v1/measurements").then(data => {
            setMeasurementArr(data)
        }).catch(err => console.log(err.message))
    }, [measurementArr]);

    const handleToggle = (value: number) => () => {
        console.log("value: "+value)
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleDeleteBtnOnClick = () => {
        const zeroPos = checked.indexOf(0)
        if(zeroPos !== -1) {
            checked.splice(zeroPos, 1)
        }
        deleteMeasurement("http://localhost:3001/api/v1/measurement", checked)
            .then(res => {
                console.log(res)
                setStatus(res)
            })
            .catch(err => {
                console.log(err)
                setStatus(err.message)
            })
    }


    return (
        <Grid item lg={3} md={3} sm={12} xs={12}>
            <Paper className={classes.paper}>DELETE</Paper>
            <Grid container spacing={3} alignContent="center">
                <form className={classes.form}>
                    <Grid item xs={12}>
                        <List>
                            {
                                measurementArr ? measurementArr.map((measurement: MeasurementModel, index:number) => (
                                    <ListItem key={index} dense button onClick={handleToggle(measurement.id)}>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(measurement.id) !== -1}
                                            tabIndex={-1}
                                            value={measurement.id}
                                            disableRipple
                                            inputProps={{'aria-labelledby': `${measurement.index.name}, ${measurement.unit.name}, ${measurement.over}, ${measurement.under}`}}
                                        />
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
                            endIcon={<DeleteIcon/>}
                            className={classes.button}
                            type="button"
                            onClick={handleDeleteBtnOnClick}
                        >
                            Delete
                        </Button>
                    </Grid>
                </form>
            </Grid>
            {
                (status) ? (<Typography>{`Result: ${status}`}</Typography>) : ("")
            }
        </Grid>
    )
}
