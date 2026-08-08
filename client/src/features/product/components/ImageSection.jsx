import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import {
    FormCard
} from "../../../components/admin";

const ImageSection = ({
    images,
    setFormData
}) => {
    const addImage = () => {
        setFormData(prev => ({
            ...prev,
            images: [
                ...prev.images,
                {
                    url: "",
                    publicId: ""
                }
            ]
        }));
    };

    const updateImage = (
        index,
        value
    ) => {

        setFormData(prev => {
            const images = [...prev.images];
            images[index].url = value;

            return {
                ...prev,
                images
            };
        });
    };

    const removeImage = (
        index
    ) => {
        setFormData(prev => ({
            ...prev,
            images:
                prev.images.filter(
                    (_, i) => i !== index
                )
        }));
    };

    return (
        <FormCard title="Images">
            <div className="space-y-4">
                <Button
                    type="button"
                    onClick={addImage}
                >
                    + Add Image
                </Button>

                {(images || []).map(
                    (image, index) => (
                        <div
                            key={index}
                            className="flex gap-3 items-end"
                        >
                            <div className="flex-1">
                                <Input
                                    label={`Image ${index + 1}`}
                                    value={image.url}
                                    onChange={(e)=>
                                        updateImage(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <Button
                                type="button"
                                onClick={() =>
                                    removeImage(index)
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

export default ImageSection;