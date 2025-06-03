import {
    Image,
    Text,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    OrderedList,
    ListItem,
    Divider,
    Box,
} from "@chakra-ui/react";
import { MealDetails } from "../types";

type Props = {
    data: MealDetails;
};

const joinIngredients = (data: MealDetails) => {
    const ingredients = [];
    for (let index = 1; index < 20; index++) {
        const ingredient = data[`strIngredient${index}`];
        const measure = data[`strMeasure${index}`];

        if (ingredient !== "") {
            ingredients.push(`${ingredient} - ${measure}`);
        }
    }

    return ingredients;
};

const RecipeModalContent = ({ data }: Props) => {
    const ingredients = joinIngredients(data);
    console.log(ingredients);
    return (
        <>
            <ModalHeader>{data.strMeal.toUpperCase()}</ModalHeader>
            <ModalCloseButton />
            <Divider my={1} />
            <ModalBody>
                <Box
                    position="relative"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Image
                        position="absolute"
                        boxSize="100%"
                        maxHeight="75%"
                        objectFit="cover"
                        src={data.strMealThumb}
                        alt={data.strMeal}
                        filter="blur(5px)"
                        zIndex="1"
                        borderRadius="15px"
                    />
                    <Image
                        boxSize="50%"
                        objectFit="cover"
                        src={data.strMealThumb}
                        alt={data.strMeal}
                        borderRadius="10px"
                        boxShadow="2xl"
                        zIndex="2"
                    />
                </Box>
                <Divider my={4} />
                <Box mt="4" mb="4">
                    <Text as="i" fontSize="xl">
                        Ingredients
                    </Text>
                </Box>

                <OrderedList pl="3">
                    {ingredients.map((i) => {
                        return <ListItem key={i}>{i}</ListItem>;
                    })}
                </OrderedList>

                <Divider my={4} />
                <Box mt="4" mb="4">
                    <Text as="i" fontSize="xl">
                        Steps
                    </Text>
                </Box>

                <Text mt="4" whiteSpace="pre-line">
                    {data.strInstructions}
                </Text>
                <Divider my={4} />
            </ModalBody>
        </>
    );
};

export default RecipeModalContent;
