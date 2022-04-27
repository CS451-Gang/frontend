import { FormControl, FormGroup, FormLabel } from '@mui/material';
import React from 'react'
import { Grid } from '@mui/material';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls';
import * as applyService from '../api/applyService.js';

const initialValues = {
    firstName: "Nima",
    lastName: "Currie",
    email: "nima.currie@umsystem.edu",
    stuID: 18371749,
    gradDegree: "BS",
    gradSem: "May 2022",
    umkcGPA: "4.0",
    umkcHours: "120",
    undergradDegree: "",
    currMajor: "CS",
    isIntl: false,
    isGtaCert: false,
    certTerm: "",
    prevDegree: false,
    grader: true,
    labInstructor: false,
    courses: {}
}

export default function ApplyForm() {

    const validate = (fieldValues = values) => {
        //Checks if the elements pass the validation tests. If the condition is true for all properties, return true. Otherwise, false
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "Email is not valid."
        if ('stuID' in fieldValues)
            temp.stuID = values.stuID.length > 7 ? "" : "Minimum of 8 numbers required."
        if ('gradSem' in fieldValues)
            temp.gradSem = fieldValues.gradSem ? "" : "This field is required."
        // if ('undergradDegree' in fieldValues)
        //     temp.undergradDegree = fieldValues.undergradDegree?"":"This field is required."
        if ('gradDegree' in fieldValues)
            temp.gradDegree = fieldValues.gradDegree.length != 0 ? "" : "This field is required."
        if ('currMajor' in fieldValues)
            temp.currMajor = fieldValues.currMajor.length != 0 ? "" : "This field is required."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
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
        if (validate()) {
            try {
                const response = await applyService.createApplication(values)
                if (response.status == 201) {
                    console.log("Application submitted successfully.")
                    window.location.href = "/student/application-submitted"
                } else if (response.status === 406) {
                    console.log("Application already exists.")
                    window.location.href = "/student/manage-application"
                }
            } catch (e) {
                console.log(e)
            }
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
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ display: "flex", gap: "1rem", width: "100%" }}>
                        <Controls.UserInput
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
                        />
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
                        <Controls.UserInput
                            type="month"
                            name="gradSem"
                            label="Graduation Semester"
                            helperText="Choose 'May/Dec' for month"
                            placeholder="MMM/YYYY"
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
                            name="gradDegree"
                            label="Current Level:"
                            value={values.gradDegree}
                            options={applyService.getGradDegrees()}
                            onChange={handleInputChange}
                            error={errors.gradDegree}
                        //can use a backend api to fetch options. see Dockerstorage(?)
                        />
                        <Controls.Select
                            name="currMajor"
                            label="Current Major:"
                            value={values.currMajor}
                            options={applyService.getMajors()}
                            onChange={(event) => handleInputChange(event)}
                            error={errors.currMajor}
                        //can use a backend api to fetch options. see Dockerstorage(?)
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ display: "flex", gap: "1rem", width: "100%" }}>
                        <FormControl
                            component="fieldset"
                            variant="standard"
                        >
                            <FormLabel>For international Students ONLY</FormLabel>
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
                    <Grid item xs={12} sm={6} style={{ display: "flex", gap: "1rem", width: "100%" }}>
                        {/* <Controls.AutoSelection
                    name="courses"
                    label="Courses you could serve as lab instructor or grade for:"
                    value={values.courses}
                    options={applyService.getCourses()} //fix this import
                    onChange={handleInputChange}
                    /> */}
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                        />
                    </Grid>
                </Grid>
            </Form>
        </>
    )
}
