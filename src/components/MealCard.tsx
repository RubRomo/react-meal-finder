import {
    Image,
    Button,
    Card,
    CardBody,
    CardFooter,
    Heading,
} from "@chakra-ui/react";
import { Meal } from "../types";
import { useState } from "react";

type Props = {
    meal: Meal;
    //fn doesnt receive an aargument since it comes at higher level
    openRecipe: () => void;
};

const MealCard = ({ meal, openRecipe }: Props) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <Card boxShadow="lg">
            <CardBody>
                <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    borderRadius="lg"
                    onLoad={handleImageLoad}
                    opacity={imageLoaded ? "1" : "0"}
                    style={{ transition: "opacity 0.3s ease-in-out" }}
                />
                <Heading size="md" color="blue.400" mt={4}>
                    {meal.strMeal}
                </Heading>
            </CardBody>
            <CardFooter pt="0">
                <Button
                    onClick={openRecipe}
                    variant="solid"
                    colorScheme="white"
                    bgColor="blue.400"
                >
                    See Receipe
                </Button>
            </CardFooter>
        </Card>
    );
};

export default MealCard;
