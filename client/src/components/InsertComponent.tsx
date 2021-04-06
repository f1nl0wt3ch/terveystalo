import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {IndexModel} from "../model/IndexModel";
import {findAll, insertNewMeasurement} from "../services/RestService";
import SendIcon from '@material-ui/icons/Send';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        form: {
            margin: theme.spacing(2),
            padding: theme.spacing(1),
            color: theme.palette.background.paper
        },
        textField: {
            marginTop: theme.spacing(2),
            marginLeft: "auto",
            marginRight: "auto"
        },
        button: {
            margin: theme.spacing(1),
        }
    }),
);

export default function InsertComponent() {
    const classes = useStyles()
    const [status, setStatus] = React.useState(null)
    const [over, setOver] = React.useState(0)
    const [under, setUnder] = React.useState(0)
    const [index, setIndex] = React.useState("");
    const [indexArr, setIndexArr] = React.useState([]);
    const [unit, setUnit] = React.useState("");
    const [unitArr, setUnitArr] = React.useState([]);

    React.useState(() => {
        findAll("http://localhost:3001/api/v1/indexes").then(data => {
            setIndexArr(data)
        }).catch(err => console.log(err.message))
        findAll("http://localhost:3001/api/v1/units").then(data => {
            setUnitArr(data)
        }).catch(err => console.log(err.message))
    })

    const handleChangeIndex = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndex(event.target.value);
    };
    const handleChangeUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnit(event.target.value);
    };

    const handleChangeOver = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOver(Number(event.target.value));
    };

    const handleChangeUnder = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnder(Number(event.target.value));
    };

    const handleButtonSubmit = () => {
        const insertedData = {
            index: {
                id: Number(index)
            },
            unit: {
                id: Number(unit)
            },
            over: over,
            under: under
        }
        insertNewMeasurement("http://localhost:3001/api/v1/measurement", insertedData)
            .then(res => {
                setStatus(res.msg)
            }).catch(err => {
            setStatus(err)
        })
        console.log(JSON.stringify(insertedData, null, 4))
    }

    return (
        <Grid item lg={3} md={3} sm={12} xs={12}>
            <Paper className={classes.paper}>INSERT</Paper>
            <ValidatorForm
                onSubmit={handleButtonSubmit}
                onError={errors => console.log(errors)}
                className={classes.form}
                autoComplete="off">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextValidator
                            id="outlined-select-currency-native"
                            select
                            value={index}
                            name="index"
                            validators={['required', 'minStringLength:1']}
                            errorMessages={['this field is required', 'Index is not selected']}
                            onChange={handleChangeIndex}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Index"
                            variant="outlined"
                        >
                            {indexArr.map((option: IndexModel) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </TextValidator>
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                            id="outlined-select-currency-native"
                            select
                            value={unit}
                            name="unit"
                            validators={['required', 'minStringLength:1']}
                            errorMessages={['this field is required', 'Unit is not selected']}
                            onChange={handleChangeUnit}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Unit"
                            variant="outlined"
                        >
                            {unitArr.map((option: IndexModel) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </TextValidator>
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                            id="outlined-helperText"
                            label="Over"
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
                            label="Under"
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
                            endIcon={<SendIcon/>}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </ValidatorForm>
            {
                (status) ? (<Typography>{`Result: ${status}`}</Typography>) : ("")
            }
        </Grid>
    )
}
