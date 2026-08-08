import { Link } from "react-router-dom";

import Container from "../../../components/ui/Container";


const NotFoundPage = () => {

    return (

        <Container>

            <div className="
                min-h-[70vh]

                flex
                items-center
                justify-center

                text-center
            ">

                <div className="
                    max-w-lg
                ">

                    {/* 404 */}

                    <div className="
                        text-[clamp(7rem,25vw,11rem)]

                        font-black
                        leading-none

                        tracking-[-0.08em]

                        text-[var(--text)]
                    ">

                        4
                        <span className="
                            text-[var(--secondary)]
                        ">
                            0
                        </span>
                        4

                    </div>


                    {/* Content */}

                    <p className="
                        mt-5

                        text-xs
                        sm:text-sm

                        font-semibold

                        uppercase
                        tracking-[0.15em]

                        text-[var(--primary)]
                    ">
                        Page Not Found
                    </p>


                    <h1 className="
                        mt-2

                        text-2xl
                        sm:text-3xl

                        font-bold

                        text-[var(--text)]
                    ">
                        Oops! Wrong circuit.
                    </h1>


                    <p className="
                        mt-3

                        text-sm
                        sm:text-base

                        text-[var(--text-light)]
                    ">
                        This page doesn't seem to exist.
                        Let's get you back to the store.
                    </p>


                    {/* Actions */}

                    <div className="
                        mt-7

                        flex
                        flex-col
                        sm:flex-row

                        justify-center

                        gap-3
                    ">

                        <Link
                            to="/"
                            className="
                                px-6
                                py-3

                                rounded-[var(--radius-md)]

                                bg-[var(--primary)]

                                text-white

                                text-sm
                                font-semibold

                                hover:bg-[var(--primary-dark)]

                                transition-colors
                            "
                        >
                            Back Home
                        </Link>


                        <Link
                            to="/products"
                            className="
                                px-6
                                py-3

                                rounded-[var(--radius-md)]

                                border
                                border-[var(--border)]

                                text-[var(--text)]

                                text-sm
                                font-semibold

                                hover:border-[var(--secondary)]
                                hover:text-[var(--secondary)]

                                transition-colors
                            "
                        >
                            Browse Products
                        </Link>

                    </div>

                </div>

            </div>

        </Container>

    );

};


export default NotFoundPage;