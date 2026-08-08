import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import {
    FormCard,
    FormSection
} from "../../../components/admin";

const VariantSection = ({
    variants,
    setFormData
}) => {
    const addVariant = () => {
        setFormData(prev => ({
            ...prev,
            variants: [
                ...prev.variants,
                {
                    name: "",
                    sku: "",
                    price: 0,
                    discountPrice: 0,
                    stock: 0,
                    attributes: []
                }
            ]
        }));
    };

    const updateVariant = (
        index,
        field,
        value
    ) => {

        setFormData(prev => {
            const variants = [...prev.variants];
            variants[index][field] = value;
            return {
                ...prev,
                variants
            };
        });
    };

    const removeVariant = (index) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants.filter(
                (_, i) => i !== index
            )
        }));
    };
    const addAttribute = (variantIndex) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants.map((variant, index) => {
                if (index !== variantIndex) {
                    return variant;
                }
                return {
                    ...variant,
                    attributes: [
                        ...(variant.attributes || []),
                        {
                            key: "",
                            value: ""
                        }
                    ]
                };
            })
        }));
    };
    const updateAttribute = (
        variantIndex,
        attributeIndex,
        field,
        value
    ) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants.map((variant, index) => {
                if (index !== variantIndex) {
                    return variant;
                }
                return {
                    ...variant,
                    attributes: variant.attributes.map((attribute, i) => {
                        if (i !== attributeIndex) {
                            return attribute;
                        }
                        return {
                            ...attribute,
                            [field]: value
                        };
                    })
                };
            })
        }));
    };
    const removeAttribute = (
        variantIndex,
        attributeIndex
    ) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants.map((variant, index) => {
                if (index !== variantIndex) {
                    return variant;
                }
                return {
                    ...variant,
                    attributes: variant.attributes.filter(
                        (_, i) => i !== attributeIndex
                    )
                };
            })
        }));
    };

    return (
        <FormCard title="Variants">

            <div className="space-y-4">
                <Button
                    type="button"
                    onClick={addVariant}
                >
                    + Add Variant
                </Button>

                {(variants || []).map(
                    (variant, index) => (
                        <div
                            key={index}
                            className="border rounded-lg p-4 space-y-4"
                        >
                            <div className="flex justify-between items-center">

                                <h2 className="text-lg font-semibold">
                                    Variant {index + 1}
                                </h2>
                                <Button
                                    type="button"
                                    onClick={() => removeVariant(index)}
                                >
                                    Remove
                                </Button>

                            </div>
                            <FormSection>
                                <Input
                                    label="Variant Name"
                                    value={variant.name}
                                    onChange={(e) =>
                                        updateVariant(
                                            index,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                />

                                <Input
                                    label="SKU"
                                    value={variant.sku}
                                    onChange={(e) =>
                                        updateVariant(
                                            index,
                                            "sku",
                                            e.target.value
                                        )
                                    }
                                />

                                <Input
                                    label="Price"
                                    type="number"
                                    value={variant.price}
                                    onChange={(e) =>
                                        updateVariant(
                                            index,
                                            "price",
                                            e.target.value
                                        )
                                    }
                                />

                                <Input
                                    label="Discount Price"
                                    type="number"
                                    value={variant.discountPrice}
                                    onChange={(e) =>
                                        updateVariant(
                                            index,
                                            "discountPrice",
                                            e.target.value
                                        )
                                    }
                                />

                                <Input
                                    label="Stock"
                                    type="number"
                                    value={variant.stock}
                                    onChange={(e) =>
                                        updateVariant(
                                            index,
                                            "stock",
                                            e.target.value
                                        )
                                    }
                                />
                            </FormSection>
                            <div className="space-y-3 mt-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">
                                        Attributes
                                    </h3>

                                    <Button
                                        type="button"
                                        onClick={() =>
                                            addAttribute(index)
                                        }
                                    >
                                        + Add Attribute
                                    </Button>
                                </div>

                                {(variant.attributes || []).map(
                                    (attribute, attributeIndex) => (
                                        <div
                                            key={attributeIndex}
                                            className="grid md:grid-cols-3 gap-3"
                                        >
                                            <Input
                                                label="Key"
                                                value={attribute.key}
                                                onChange={(e) =>
                                                    updateAttribute(
                                                        index,
                                                        attributeIndex,
                                                        "key",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <Input
                                                label="Value"
                                                value={attribute.value}
                                                onChange={(e) =>
                                                    updateAttribute(
                                                        index,
                                                        attributeIndex,
                                                        "value",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <div className="flex items-end">
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        removeAttribute(
                                                            index,
                                                            attributeIndex
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )
                )}
            </div>
        </FormCard>
    );
};

export default VariantSection;