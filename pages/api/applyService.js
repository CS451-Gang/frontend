export const getCourses = () => ([
    {id: "CS101", title: "Problem Solving and Programming I"},
    {id: "CS101L", title: "Problem Solving and Programming I - Lab"},
    {id: "CS201R", title: "Problem Solving and Programming II"},
    {id: "CS201L", title: "Problem Solving and Programming II - Lab"},
    {id: "CS191", title: "Discrete Structures I"},
    {id: "CS291", title: "Discrete Structures II"},
    {id: "CS303", title: "Data Structures"},
    {id: "CS320", title: "Data Communications and Networking"},
    {id: "CS349", title: "Java Programming with Applications"},
    {id: "CS3494R", title: "Applied Probability"},
    {id: "CS404", title: "Introduction to Algorithms and Complexity"},
])

export const getMajors = () => ([
    {id: "CS", title: "Computer Science"},
    {id: "IT", title: "Information Technology"},
    {id: "ECE", title: "Electrical and Computing Engineering"},
    {id: "EE", title: "Electrical Engineering"},
])

export const getGradDegrees = () => ([
    {id: "BS", title: "Bachelor of Science"},
    {id: "MS", title: "Master of Science"},
    {id: "PhD", title: "Doctor of Philosophy"},
])

export const createApplication = async (application) => {
    let cleaned_application = {}
    for (const [key, value] of Object.entries(application)) {
        if (value == "") {
            cleaned_application[key] = null
        } else {
            cleaned_application[key] = value
        }
    }

    const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cleaned_application)
    })
    return response
}
