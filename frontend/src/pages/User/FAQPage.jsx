import React from "react";
import {Card} from "@mui/material";
import { Accordion } from "@mui/material";
import {AccordionSummary} from "@mui/material";
import {AccordionDetails} from "@mui/material";
import Typography from "@mui/material/Typography";
import { MdExpandMore } from "react-icons/md";

const faqs = [
   
    {
        question: "Can I apply for multiple jobs at the same time?",
        answer: "Yes, students can apply for multiple jobs due to the availability.",
    },
    {
        question: "Will I be paid directly through the platform?",
        answer: "No, payments are handled directly between students and employers. However, future updates may include integrated payment tracking for freelance jobs.",
    },
    {
        question:
            "What should I do if I face issues with an employer (non-payment etc.)?",
        answer: "Students can report employers through the emailing procedures.",
    },
    {
        question: "Can I cancel my job application after submitting it?",
        answer: "Yes, students can cancel their application. Do it as early as possible before the job begins to allow other applicants to apply for the post.",
    },
    {
        question:
            "How can students contact a company regarding a job opportunity?",
        answer: "Contact numbers are provided in the portal.",
    },
];


export default function FAQPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Frequently Asked Questions
            </h1>
            {faqs.map((faq, index) => (
                // <Card key={index} className="p-4 my-2 border">
                    <Accordion key={index}>
                        <AccordionSummary sx={{
                            paddingY:"15px",
                            paddingX:"20px",
                            
                        }} expandIcon={<MdExpandMore />}>
                            <Typography sx={{
                                fontSize:"20px"
                            }}>
                                {faq.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className="text-md md:text-xl" sx={{
                                fontSize:"17px"
                            }}>{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                // </Card>
            ))}
        </div>
    );
}
