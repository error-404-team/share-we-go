import React, { useState } from 'react';
// import Router from 'next/router';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import { ThemeProvider, withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
// import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
// import { createMuiTheme } from '@material-ui/core/styles';
import ShareLocationBar from './components/ShareLocationBar';
import PlaceAutocompleteAndDirections from './components/PlaceAutocompleteAndDirections';
import CustomDateTimePicker from './components/CustomDateTimePicker';
import TravelCompanion from './components/TravelCompanion';
// import geno from '../image/geno.svg'
import Selectgender from './components/Selectgender';
import { Link, withRouter } from 'react-router-dom';
import CommuteIcon from '@material-ui/icons/Commute';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import firebase from '../../connect/firebase';
import { post, get } from '../../RESTful_API';
import { dateTime } from '../../module';
import { setDate } from 'date-fns';
import AlertCheck from './components/AlertCheck';
import TimerIcon from '@material-ui/icons/Timer';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import WcIcon from '@material-ui/icons/Wc';


require('es6-promise').polyfill();
require('isomorphic-fetch');



// const share_location_theme = createMuiTheme({
//     palette: {
//         primary: {
//             main: 'rgba(255, 255, 255, 0)',
//         }
//     },
// });

// function QontoStepIcon(props) {
//     const classes = useQontoStepIconStyles();
//     const { active, completed } = props;

//     return (
//         <div
//             className={clsx(classes.root, {
//                 [classes.active]: active,
//             })}
//         >
//             {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
//         </div>PlaceAutocompleteAndDirections
//     )
// }

// const useQontoStepIconStyles = makeStyles({
//     root: {
//         color: '#eaeaf0',
//         display: 'flex',
//         height: 22,
//         alignItems: 'center'
//     },
//     active: {
//         color: '#784af4'
//     },
//     circle: {
//         width: 8,
//         height: 8,
//         borderRadius: '50%',
//         backgroundColor: 'currentColor'
//     },
//     completed: {
//         color: '#784af4',
//         zIndex: 1,
//         fontSize: 18
//     }
// })


function getSteps() {
    return ['เส้นทาง', 'วันเวลา', 'จำนวน', 'เพศ'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            // หน้าสร้างเเชร์ Form 1 ต้นทาง-ปลายทาง 
            return (<PlaceAutocompleteAndDirections />);

        case 1:
            // หน้าสร้างเชร์ ตั้งค่าเวลา Form 2
            return (<CustomDateTimePicker />);
        case 2:
            // หน้าสร้างเชร์ จำนวนเพื่อนร่วมทาง (ขาดเพศ) 
            return (<TravelCompanion />);

        case 3:
            //หน้าเเชร์เลือกเพศ
            return (<Selectgender />);

        default:
            return 'Uknown stepIndex';
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '-webkit-fill-available',
        overflow: 'hidden'
        // padding: '30px 0px 10px 0px'
    },
    button: {
        marginRight: theme.spacing(1),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        // marginTop: theme.spacing(1),
        // marginBottom: theme.spacing(1),
    },
    nextStaps: {
        height: '45px',
        bottom: '15px',
        width: '-webkit-fill-available',
        position: 'absolute',
        marginLeft: '22px',
        marginRight: '22px',
    },
}));



function ShareLocation(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(new Set());
    const [skipped, setSkipped] = useState(new Set());
    const [location, setLocation] = useState(new Set());
    const [sex, setSex] = useState(new Set());
    const [max_number, setMaxNumber] = useState(new Set());
    const [date, setDate] = useState(new Set());
    const [user, setUser] = useState(new Set());
    const [open, setOpen] = useState(false);

    firebase.auth().onAuthStateChanged((user) => {
        setUser(user)
    })

    const steps = getSteps();

    // console.log(Router);

    function totalSteps() {
        return getSteps().length;
    }

    function isStepOptional(step) {
        return step === 1;
    }

    function handleSkip() {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(prevSkipped => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    }

    function skippedSteps() {
        return skipped.size;
    }

    function completedSteps() {
        return completed.size;
    }

    function allStepsCompleted() {
        return completedSteps() === totalSteps() - skippedSteps();
    }

    function isLastStep() {
        return activeStep === totalSteps() - 1;
    }

    function handleNext() {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed
                // find the first step that has been completed
                steps.findIndex((step, i) => !completed.has(i))
                : activeStep + 1;

        setActiveStep(newActiveStep);
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    const handleStep = step => () => {
        setActiveStep(step);
    };



    function handleComplete() {
        const newCompleted = new Set(completed);
        newCompleted.add(activeStep);
        setCompleted(newCompleted);
        console.log(activeStep);


        if (activeStep === 0) {
            get.share.location(user.uid).then(function (data) {
                setLocation({
                    start_address: data.routes[0].legs[0].start_address,
                    end_address: data.routes[0].legs[0].end_address
                })
            });
        }
        if (activeStep === 1) {
            get.share.date(user.uid).then(function (data) {
                setDate({
                    end_time: data.end_time.value,
                    start_time: data.start_time.value
                })
            });
        }

        if (activeStep === 2) {
            get.share.max_number(user.uid).then(function (data) {
                setMaxNumber({ value: data.value })
            });
        }

        if (activeStep === 3) {
            get.share.sex(user.uid).then(function (data) {
                setSex({ value: data.value })
            });

        }


        /**
         * Sigh... it would be much nicer to replace the following if conditional with
         * `if (!this.allStepsComplete())` however state is not set when we do this,
         * thus we have to resort to not being very DRY.
         */
        if (completed.size !== totalSteps() - skippedSteps()) {
            handleNext();
        }
    }


    const handleClose = () => {
        setOpen(false);
    };

    function handleReset() {
        // setActiveStep(0);
        // setCompleted(new Set());
        // setSkipped(new Set());
        firebase.auth().onAuthStateChanged((user) => {
            post.status.share(user.uid, { value: "true", uid: user.uid, id: user.uid }, dateTime)
            post.status.owner(user.uid, { value: "true", uid: user.uid, share_id: user.uid }, dateTime)
            post.status.member(user.uid, { value: "false", uid: user.uid, share_id: user.uid }, dateTime)
            post.status.alert(user.uid, { value: "false", uid: user.uid, share_id: user.uid }, dateTime)
            post.status.process(user.uid, { value: "false", uid: user.uid, share_id: user.uid }, dateTime)

            get.users.profile(user.uid).then(function (data) {

                post.share.owner(user.uid, { id: user.uid, profile: data }, dateTime)

                post.share.member(user.uid, { [user.uid]:{share_id: user.uid, uid: user.uid, profile: data} }, dateTime)
            })
        })
        setOpen(true)
        //    props.history.goBack()
    }

    function isStepSkipped(step) {
        return skipped.has(step);
    }

    function isStepComplete(step) {
        return completed.has(step);
    }

    function handleGoBackPage() {
        props.history.goBack();
    }

    function goBack() {
        if (activeStep === 0) {
            handleGoBackPage();
        } else {
            handleBack();
        }
    }



    return (
        <div className={classes.root}>
            <ShareLocationBar>
                <Button onClick={goBack}>
                    <IconButton aria-label="Back" >
                        <ArrowBackIosIcon />
                    </IconButton>
                </Button>
                <Stepper alternativeLabel nonLinear activeStep={activeStep} style={{
                    width: '-webkit-fill-available',
                    padding: '30px 0px 10px 0px'
                }}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const buttonProps = {};
                        if (isStepOptional(index)) {
                            buttonProps.optional = <Typography variant="caption"></Typography>;
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (

                            <Step key={label} {...stepProps} >
                                <StepButton
                                    onClick={handleStep(index)}
                                    completed={isStepComplete(index)}
                                    {...buttonProps}
                                >
                                    {label}
                                </StepButton>

                                {/* <StepLabel StepIconComponent={QontoStepIcon} >{label}</StepLabel> */}

                            </Step>
                        );
                    })}
                </Stepper>
            </ShareLocationBar>
            <div>
                {allStepsCompleted() ? (
                    <div>
                        <center>
                            <div bgcolor="99FF99" shadow="5">
                                <h2>แชร์เส้นทางเสร็จสิ้น <CheckCircleIcon></CheckCircleIcon></h2>
                                <hr />
                            </div>
                        </center>
                        <br />
                        <div bgcolor="#DCDCDC">
                            <center>
                                

                                <div>
                                    <div>
                                        
                                    <body bgcolor="#6666FF">
                                        <hr borderStyle="dotted"></hr>
                                       
                                        <h2>   <RecentActorsIcon></RecentActorsIcon>  ข้อมูลการแชร์</h2>
                                       
                                    </body>
                                    </div>
                                    <body bgcolor="#B4CFFc">
                                    <b>ต้นทาง</b> <EmojiPeopleIcon></EmojiPeopleIcon> 
                                    </body>
                                    
                                    <body bgcolor="#EEEEEE">
                                    {location.start_address}
                                    </body>
                                    <body bgcolor="#B4CFFc">
                                    <b>ปลายทาง</b> <DriveEtaIcon></DriveEtaIcon> 
                                    </body>
                                    <body bgcolor="#EEEEEE">
                                     {location.end_address}
                                    {/* <hr></hr> */}
                                     </body>
                                     <body bgcolor="#B4CFFc">
                                     <b>   <RecentActorsIcon></RecentActorsIcon>   เริ่ม - ปิด การแชร์</b>
                                     </body>

                                    <body bgcolor="#EEEEEE">
                                    <TimerIcon></TimerIcon> <b>เริ่มการแชร์:</b> {date.start_time}
                                    <br />
                                    <TimerOffIcon></TimerOffIcon> <b>ปิดการแชร์:</b> {date.end_time}
                                    <br />
                                    <PeopleAltIcon></PeopleAltIcon> <b>ต้องการผู้ร่วมเดินทางเพิ่ม:</b> {max_number.value} คน
                                    <br />
                                    <WcIcon></WcIcon> <b>ต้องการร่วมเดินทางกับเพศ: {sex.value}</b>
                                    <br/>
                                    <hr border="5"></hr>
                                    </body>
                                </div>
                            </center>
                        </div>

                        <div style={{
                            position: "fixed",
                            bottom: '25px',
                            width: '-webkit-fill-available'
                        }}>
                            <center >
                                <Button variant="contained" onClick={handleReset} color="primary" >เปิดแชร์</Button>
                            </center>
                        </div>
                        <AlertCheck open={open} onClose={handleClose} />
                    </div>
                ) : (
                        <div>

                            {/* <ThemeProvider theme={share_location_theme}> */}
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div style={{
                                position: 'fixed',
                                bottom: '0px',
                                width: '-webkit-fill-available'
                            }}>
                                {/* <center> */}
                                {/* <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>Back</Button> */}
                                {/* <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >Next</Button>
                                    {isStepOptional(activeStep) && !completed.has(activeStep) && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSkip}
                                            className={classes.button}
                                        >Skip</Button>
                                    )} */}

                                {activeStep !== steps.length &&
                                    (completed.has(activeStep) ? (
                                        <Typography variant="caption" className={classes.completed}>Step {activeStep + 1} already completed</Typography>
                                    ) : (
                                            <Button variant="contained" color="primary" className={classes.nextStaps} onClick={handleComplete}>
                                                {completedSteps() === totalSteps() - 1 ? 'เสร็จสิ้นขั้นตอน' : 'ขั้นตอนถัดไป'}
                                            </Button>
                                        ))}
                                {/* </center> */}
                            </div>
                            {/* </ThemeProvider> */}
                        </div>
                    )}
            </div>
        </div>
    )
}

ShareLocation.propTypes = {
    onClose: PropTypes.func,
    map: PropTypes.object
};

export default withRouter(ShareLocation);