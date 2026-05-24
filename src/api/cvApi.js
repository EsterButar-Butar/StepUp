// import api from "../services/api";

// export const getCVResult = async () => {
//     const response = await api.get("/cv-result");

//     return response.data;

// };

export const getCVResult = async () => {
    return {

        user: {
            name: "Safika Safira",
            email: "safika@mail.com",
            phone: "+62xxxxxxxx",
            location: "Semarang",
            linkedin: "linkedin.com/in/safika",
            github: "github.com/safika",
        },

        summary:
            "Frontend-focused informatics student with strong analytical and organizational skills.",

        skills: [
            "React.js",
            "JavaScript",
            "UI Design",
        ],

        projects: [],

        experience: [],

        organizations: [],

        certifications: [],
    };
};