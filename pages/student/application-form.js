import { Autocomplete, FormControl, FormGroup, FormLabel, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls';
import * as applyService from '../api/applyService.js';
import axios from 'axios'

const initialValues = {
    fullName: "",
    // firstName: "",
    // lastName: "",
    email: "",
    stuID: null,
    gradDegree: "",
    gradSem: "",
    umkcGPA: "",
    umkcHours: "",
    undergradDegree: "",
    currMajor: "",
    isIntl: false,
    isGtaCert: false,
    certTerm: "",
    prevDegree: false,
    grader: true,
    labInstructor: true,
    course: "",
    grade: "",
}

export default function ApplyForm() {
    const [studentId, setStudentId] = useState(initialValues);
    const [email, setEmail] = useState("");
    let [message, setMessage] = useState("");
    let [prevApplication, setPrevApplication] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // If these error out, we should probably redirect to login
            const accountStatusResponse = await axios.get('http://localhost:3000/api/account-status')
                .catch(err => {
                    console.log(`error: ${JSON.stringify(err)}`);
                    // window.location.replace('/student/login')
                });

            // If this errors out, there's likely been a server error. Log it and redirect.
            await axios.get(`http://localhost:3000/api/applications/${accountStatusResponse.data.sub}`)
                .then(response => {
                    setPrevApplication(response.data.data);
                    console.log(response.data.data)
                })
                .catch(err => {
                    console.log(`error: ${JSON.stringify(err)}`);
                    setPrevApplication([]);
                });
            
            setStudentId(accountStatusResponse.data.sub)
            setEmail(accountStatusResponse.data.email)
        }
        fetchData();
    }, []);


    console.log(`using id: ${studentId}`);
    console.log(`using email: ${email}`);
    console.log(`using prevApplication: ${prevApplication}`);
    
    const validate = (fieldValues = values) => {
        console.log(values.grade)

        //Checks if the elements pass the validation tests. If the condition is true for all properties, return true. Otherwise, false
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? '' : 'Full name is required';
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "Email is not valid."
        if ('stuID' in fieldValues)
            temp.stuID = `${values.stuID}`.length > 6 ? "" : "Minimum of 8 numbers required."
        if ('gradSem' in fieldValues)
            temp.gradSem = fieldValues.gradSem ? "" : "This field is required."
        if ('gradDegree' in fieldValues)
            temp.gradDegree = fieldValues.gradDegree.length != 0 ? "" : "This field is required."
        if ('currMajor' in fieldValues)
            temp.currMajor = fieldValues.currMajor.length != 0 ? "" : "This field is required."
        if ('course' in fieldValues)
            temp.course = fieldValues.course.length != 0 ? "" : "This field is required."
        if ('grade' in fieldValues)
            temp.grade = fieldValues.grade ? "" : "This field is required."

        setErrors({
            ...temp
        })
        console.log(`fieldvalues = ${JSON.stringify(fieldValues)}`)
        console.log(`values = ${JSON.stringify(values)}`)
        console.log(`temp = ${JSON.stringify(temp)}`)
        console.log(`returning ${Object.values(temp).every(x => x == "")}`)

        if (fieldValues == values)
        
            return Object.values(temp).every(x => x == "")
    }

    if (studentId) {
        initialValues.stuID = studentId;
    }

    if (email) {
        initialValues.email = email;
    }

    if (prevApplication.length > 0) {
        // If a user has multiple previous applications, we should only use one.
        prevApplication = prevApplication[0];
        console.log(`prevApplication: ${JSON.stringify(prevApplication)}`);
        initialValues.fullName = prevApplication.full_name;
        initialValues.email = prevApplication.email;
        initialValues.stuID = prevApplication.student_id;
        initialValues.gradDegree = prevApplication.current_level;
        initialValues.gradSem = prevApplication.graduating_semester;
        initialValues.umkcGPA = prevApplication.cumulative_gpa;
        initialValues.umkcHours = prevApplication.hours_completed;
        initialValues.undergradDegree = prevApplication.undergraduate_degree;
        initialValues.currMajor = prevApplication.current_major;
        initialValues.isIntl = prevApplication.international_student;
        initialValues.isGtaCert = prevApplication.gta_certified;
        initialValues.certTerm = prevApplication.gta_certification_term;
        initialValues.prevDegree = prevApplication.gta_previous_degree;
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialValues, true, validate);

    const handleSubmit = async event => {
        event.preventDefault()
        console.log("sending data...");

        if (validate()) {
            try {
                const response = await applyService.createApplication(values)
                console.log("saw response " + JSON.stringify(response))
                if (response.status == 201) {
                    console.log("Application submitted successfully.")
                    window.location.href = "/student/application-submitted"
                } else if (response.status === 406) {
                    console.log("Application already exists.")
                    window.location.href = "/student/manage-application"
                }
            } catch (e) {
                console.log("validate saw error")
                console.log(e)
            }
        } else {
            console.log("not validating")
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Grid container
                    direction="column"
                    alignItems="flex-start"
                    sx={{ m: 1 }}
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    rowSpacing={4}
                >
                    <Grid item xs={12} sm={12} justifyContent="flex-end" >
                        <FormControl
                            required
                            component="fieldset"
                            variant="standard">
                            <FormLabel>Applying For:</FormLabel>
                            <FormGroup row
                                sx={{ marginLeft: 3 }}>
                                <Controls.CheckBox
                                    name="grader"
                                    label="Grader"
                                    onChange={handleInputChange}
                                    value={values.grader}
                                />
                                <Controls.CheckBox
                                    name="labInstructor"
                                    label="Lab Instructor"
                                    onChange={handleInputChange}
                                    value={values.labInstructor}
                                />
                            </FormGroup>
                        </FormControl>
                        <p className="error">{ message }</p>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ display: "flex", gap: "1rem", width: "100%" }}>
                        <Controls.UserInput
                            type="text"
                            name="fullName"
                            label="Full Name"
                            value={values.fullName}
                            onChange={handleInputChange}
                            error={errors.fullName}
                        />
                        {/* <Controls.UserInput
                            type="text"
                            name="firstName"
                            label="First Name"
                            value={values.firstName}
                            onChange={handleInputChange}
                            error={errors.firstName}
                        />
                        <Controls.UserInput
                            type="text"
                            name="lastName"
                            label="Last Name"
                            value={values.lastName}
                            onChange={handleInputChange}
                            error={errors.lastName}
                        /> */}
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ display: "flex", gap: "1rem", width: "100%" }}>
                        <Controls.UserInput
                            type="text"
                            name="email"
                            label="UMKC Email"
                            value={values.email}
                            onChange={handleInputChange}
                            error={errors.email}
                        />
                        <Controls.UserInput
                            type="text"
                            name="stuID"
                            label="Student ID"
                            value={values.stuID}
                            onChange={handleInputChange}
                            error={errors.stuID}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ display: "flex", gap: "1rem", width: "100%" }}>
                        <Controls.Select
                            name="gradDegree"
                            label="Current Level:"
                            value={values.gradDegree}
                            options={applyService.getGradDegrees()}
                            onChange={handleInputChange}
                            error={errors.gradDegree}
                        />
                        <Controls.Select
                            name="currMajor"
                            label="Current Major:"
                            value={values.currMajor}
                            options={applyService.getMajors()}
                            onChange={(event) => handleInputChange(event)}
                            error={errors.currMajor}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ display: "flex", gap: "1rem", width: "100%" }}>
                        <Controls.UserInput
                            type="text"
                            name="gradSem"
                            label="Graduation Semester"
                            helperText="Choose 'May/Dec' for month"
                            value={values.gradSem}
                            onChange={handleInputChange}
                            error={errors.gradSem}
                        />
                        <Controls.UserInput
                            type="number"
                            name="umkcGPA"
                            label="UMKC Culmulative GPA"
                            value={values.umkcGPA}
                            onChange={handleInputChange}
                            error={errors.umkcGPA}
                            helperText="Leave blank if first semester is in progress"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ display: "flex", gap: "1rem", width: "100%" }}>
                        <Controls.UserInput
                            type="number"
                            name="umkcHours"
                            label="Hours Completed at UMKC"
                            value={values.umkcHours}
                            onChange={handleInputChange}
                            error={errors.umkcHours}
                            helperText="Leave blank if first semester is in progress"
                        />
                        <Controls.UserInput
                            type="text"
                            name="undergradDegree"
                            label="Undergraduate Degree"
                            value={values.undergradDegree}
                            onChange={handleInputChange}
                            error={errors.undergradDegree}
                            helperText="If applicable, e.g., BTEC, BSCS, IT"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ display: "flex", gap: "1rem", width: "100%" }}>

                        <Controls.Select
                            name="course"
                            label="Course Preference"
                            value={values.course}
                            options={applyService.getCourses()}
                            onChange={handleInputChange}
                            error={errors.course}
                        />
                        <Controls.Select
                            name="grade"
                            label="Grade Received"
                            value={values.grade}
                            options={applyService.getGrades()}
                            onChange={(handleInputChange)}
                            error={errors.grade}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ display: "flex", gap: "1rem", width: "100%" }}>
                        <FormControl
                            component="fieldset"
                            variant="standard"
                        >
                            <FormLabel>For international Students ONLY:</FormLabel>
                            <Controls.CheckBox
                                name="isIntl"
                                label="Are you an International Student?"
                                onChange={handleInputChange}
                                value={values.isIntl}
                            />
                            <FormGroup
                                sx={{ marginLeft: 3 }}>
                                <Controls.CheckBox
                                    name="isGtaCert"
                                    label="Are you GTA Certified?"
                                    onChange={handleInputChange}
                                    value={values.isGtaCert}
                                />
                                <Controls.CheckBox
                                    name="prevDegree"
                                    label="Do you have a previous degree from a US institute?"
                                    onChange={handleInputChange}
                                    value={values.prevDegree}
                                />
                                <Controls.UserInput
                                    type="month"
                                    name="certTerm"
                                    label="Which term did you complete your certification?"
                                    helperText="Choose 'May/Jul/Dec' for month"
                                    value={values.certTerm}
                                    onChange={handleInputChange}
                                    error={errors.certTerm}
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                        // href="/student/application-submitted"
                        />
                    </Grid>
                </Grid>
            </Form>
        </>
    )
}
