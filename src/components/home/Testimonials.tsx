"use client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Container from "../shared/Container";

const testimonialsData = [
    {
        id: 1,
        name: "Ayesha Rahman",
        role: "Mother of 2",
        feedback:
            "TrustCare made babysitting stress-free. I could book a caretaker easily and felt confident about the safety of my kids.",
    },
    {
        id: 2,
        name: "Mahmudul Hasan",
        role: "Son of Elderly Parent",
        feedback:
            "The elderly care service was excellent. My father received compassionate support and companionship at home.",
    },
    {
        id: 3,
        name: "Nusrat Jahan",
        role: "Working Professional",
        feedback:
            "I booked special care for my sick mother. The caretaker was professional, kind, and ensured proper attention.",
    },
];

const successMetrics = [
    { id: 1, number: 500, label: "Families Served" },
    { id: 2, number: 1200, label: "Bookings Completed" },
    { id: 3, number: 300, label: "Trusted Caretakers" },
];

const Testimonials: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true, 
        threshold: 0.2,    
    });

    return (
        <section className="py-20 bg-gray-50">
            <Container>
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        What Families Say
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Hear from our happy clients and see how TrustCare is making a
                        difference.
                    </p>
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {testimonialsData.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                        >
                            <p className="text-gray-600 italic mb-4">
                                “{testimonial.feedback}”
                            </p>
                            <h4 className="text-gray-800 font-semibold">
                                {testimonial.name}
                            </h4>
                            <span className="text-sm text-gray-500">{testimonial.role}</span>
                        </div>
                    ))}
                </div>

                {/* Success Metrics */}
                <div ref={ref} className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
                        Our Impact in Numbers
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {successMetrics.map((metric) => (
                            <div key={metric.id}>
                                <h3 className="text-4xl font-bold text-pink-600 mb-2">
                                    {inView ? <CountUp end={metric.number} duration={1} /> : 0}+
                                </h3>
                                <p className="text-gray-700 font-medium">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </Container>
        </section>
    );
};

export default Testimonials;