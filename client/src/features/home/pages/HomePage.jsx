import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";

const HomePage = () => {

    return (

        <Container>

            <div className="py-20">

                <Card className="max-w-md">

                    <h2 className="text-2xl font-bold mb-5">

                        UI Test

                    </h2>

                    <Input

                        label="Email"

                        placeholder="Enter email"

                    />

                    <Button
                        className="mt-5"
                    >

                        Continue

                    </Button>

                </Card>

            </div>

        </Container>

    );

};

export default HomePage;