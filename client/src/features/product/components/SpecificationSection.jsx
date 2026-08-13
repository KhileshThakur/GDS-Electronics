import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import {
    FormCard,
    FormSection
} from "../../../components/html";

const SpecificationSection = ({
    specifications,
    setFormData
}) => {
    const addSpecification = () => {
        setFormData(prev => ({
            ...prev,
            specifications: [
                ...prev.specifications,
                {
                    key: "",
                    value: ""
                }
            ]
        }));
    };

    const updateSpecification = (
        index,
        field,
        value
    ) => {
        setFormData(prev => {
            const specifications = [
                ...prev.specifications
            ];

            specifications[index][field] = value;

            return {
                ...prev,
                specifications
            };
        });
    };

    const removeSpecification = (
        index
    ) => {
        setFormData(prev => ({
            ...prev,
            specifications:
                prev.specifications.filter(
                    (_, i) => i !== index
                )
        }));
    };

    return (
        <FormCard title="Specifications">
            <div className="space-y-4">
                <Button
                    type="button"
                    onClick={addSpecification}
                >
                    + Add Specification
                </Button>

                {(specifications || []).map(
                    (specification, index) => (
                        <div
                            key={index}
                            className="border rounded-lg p-4"
                        >

                            <FormSection>
                                <Input
                                    label="Key"
                                    value={specification.key}
                                    onChange={(e)=>
                                        updateSpecification(
                                            index,
                                            "key",
                                            e.target.value
                                        )
                                    }
                                />

                                <Input
                                    label="Value"
                                    value={specification.value}
                                    onChange={(e)=>
                                        updateSpecification(
                                            index,
                                            "value",
                                            e.target.value
                                        )
                                    }
                                />
                            </FormSection>

                            <Button
                                type="button"
                                onClick={() =>
                                    removeSpecification(index)
                                }
                            >
                                Remove
                            </Button>
                        </div>
                    )
                )}
            </div>
        </FormCard>
    );
};

export default SpecificationSection;