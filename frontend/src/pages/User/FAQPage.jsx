import React from "react";
import {Card} from "@mui/material";
import { Accordion } from "@mui/material";
import {AccordionSummary} from "@mui/material";
import {AccordionDetails} from "@mui/material";
import Typography from "@mui/material/Typography";
import { MdExpandMore } from "react-icons/md";

const faqs = [
    {
        question: "What is Tech Corp?",
        answer: "Tech Corp is a leading company in software development, providing innovative solutions for businesses.",
    },
    {
        question: "How can I apply for a job?",
        answer: "You can apply for a job by visiting our careers page and submitting your application online.",
    },
    {
        question: "What benefits does Tech Corp offer?",
        answer: "Tech Corp offers competitive salaries, health insurance, remote work options, and professional growth opportunities.",
    },
];

export default function FAQPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Frequently Asked Questions
            </h1>
            {faqs.map((faq, index) => (
                <Card key={index} className="p-4 my-2 border">
                    <Accordion>
                        <AccordionSummary expandIcon={<MdExpandMore />}>
                            <Typography className="font-semibold">
                                {faq.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                </Card>
            ))}
        </div>
    );
}
