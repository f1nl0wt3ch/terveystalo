import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Button, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {findMeasurementById, updateMeasurement} from "../services/RestService";
import Typography from "@material-ui/core/Typography";
import UpdateIcon from "@material-ui/icons/Update";
import {IndexModel} from "../model/IndexModel";
import {UnitModel} from "../model/UnitModel";
import {MeasurementModel} from "../model/MeasurementModel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        textField: {
            marginTop: theme.spacing(2),
            marginLeft: "auto",
            marginRight: "auto"
        },
        button: {
            margin: theme.spacing(1),
        }
    })
);

export default function UpdateComponent() {
    const classes = useStyles()
    const [id, setId] = React.useState(0)
    const [status, setStatus] = React.useState("")
    const [over, setOver] = React.useState(0)
    const [under, setUnder] = React.useState(0)
    const [index, setIndex] = React.useState({} as IndexModel)
    const [unit, setUnit] = React.useState({} as UnitModel)

    const handleIdOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(Number(event.target.value))
    }

    const handleSearchBtnOnClick = () => {
        findMeasurementById(`http://localhost:3001/api/v1/measurement/${id}`)
            .then(foundMeasurement => {
                console.log(foundMeasurement)
                setId(foundMeasurement.id)
                setUnder(foundMeasurement.under)
                setOver(foundMeasurement.over)
                setIndex(foundMeasurement.index)
                setUnit(foundMeasurement.unit)
                setStatus("")
            })
            .catch(err => {
                setStatus(err.message)
            })
    }

    const handleChangeOver = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOver(Number(event.target.value));
    };

    const handleChangeUnder = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnder(Number(event.target.value));
    };

    const handleUpdateBtnOnClick = () => {
        const updatedMeasurement: MeasurementModel = {
            id: id,
            index: index,
            unit: unit,
            over: over,
            under: under
        }
        updateMeasurement("http://localhost:3001/api/v1/measurement", updatedMeasurement)
            .then(res => {
                setStatus(res.msg)
            })
            .catch(err => {
                setStatus(err.message)
            })
    }

    return (
        <Grid item lg={3} md={3} sm={12} xs={12}>
            <Paper className={classes.paper}>UPDATE</Paper>
            <ValidatorForm
                onSubmit={handleSearchBtnOnClick}
                onError={errors => console.log(errors)}
            >
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextValidator
                            id="outlined-helperText"
                            label="Keyword"
                            variant="outlined"
                            className={classes.textField}
                            onChange={handleIdOnChange}
                            name="id"
                            value={id}
                            validators={['required', 'isNumber', 'minNumber: 1']}
                            errorMessages={['this field is required', 'id need to be a number', 'id must be greater than 0']}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            color="primary"
                            endIcon={<SearchIcon/>}
                            type="button"
                            className={classes.textField}
                            onClick={handleSearchBtnOnClick}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </ValidatorForm>
            {
                (status)? (<Typography color='error'>{`${status}`}</Typography>) : (
                    <ValidatorForm
                        onSubmit={handleUpdateBtnOnClick}
                        onError={errors => console.log(errors)}
                    >
                        <Grid container spacing={3} alignContent='center'>
                            <Grid item xs={12}>
                                <TextField
                                    label={index.name}
                                    id="outlined-helperText"
                                    variant="outlined"
                                    size="small"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={unit.name}
                                    id="outlined-helperText"
                                    variant="outlined"
                                    size="small"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    id="outlined-helperText"
                                    label="over"
                                    variant="outlined"
                                    onChange={handleChangeOver}
                                    name="over"
                                    value={over}
                                    validators={['required', 'isNumber', 'minNumber:1']}
                                    errorMessages={['this field is required', 'Over is not a number']}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator
                                    id="outlined-helperText"
                                    label="under"
                                    variant="outlined"
                                    className={classes.textField}
                                    onChange={handleChangeUnder}
                                    name="under"
                                    value={under}
                                    validators={['required', 'isNumber', 'minNumber:1']}
                                    errorMessages={['this field is required', 'Under is not a number', 'This field cannot be empty']}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<UpdateIcon/>}
                                    onClick={handleUpdateBtnOnClick}
                                    type="button"
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                )
            }
        </Grid>
    )
}
